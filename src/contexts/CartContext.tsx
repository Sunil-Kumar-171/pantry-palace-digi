import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { Product, products } from "@/data/products";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

export interface CartItem {
  product: Product;
  quantity: number;
  size?: string;
  color?: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, size?: string, color?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const { user } = useAuth();

  // Load cart from DB when user logs in
  useEffect(() => {
    if (!user) {
      setItems([]);
      return;
    }
    const loadCart = async () => {
      const { data } = await supabase
        .from("cart_items")
        .select("*")
        .eq("user_id", user.id);
      if (data) {
        const cartItems: CartItem[] = data
          .map((row: any) => {
            const product = products.find((p) => p.id === row.product_id);
            if (!product) return null;
            return { product, quantity: row.quantity, size: row.size, color: row.color };
          })
          .filter(Boolean) as CartItem[];
        setItems(cartItems);
      }
    };
    loadCart();
  }, [user]);

  const addToCart = useCallback(
    (product: Product, size?: string, color?: string) => {
      setItems((prev) => {
        const existing = prev.find(
          (i) => i.product.id === product.id && i.size === size && i.color === color
        );
        if (existing) {
          const newItems = prev.map((i) =>
            i.product.id === product.id && i.size === size && i.color === color
              ? { ...i, quantity: i.quantity + 1 }
              : i
          );
          if (user) {
            supabase
              .from("cart_items")
              .update({ quantity: existing.quantity + 1 })
              .eq("user_id", user.id)
              .eq("product_id", product.id)
              .eq("size", size ?? "")
              .eq("color", color ?? "")
              .then();
          }
          return newItems;
        }
        if (user) {
          supabase
            .from("cart_items")
            .insert({ user_id: user.id, product_id: product.id, quantity: 1, size, color })
            .then();
        }
        return [...prev, { product, quantity: 1, size, color }];
      });
    },
    [user]
  );

  const removeFromCart = useCallback(
    (productId: string) => {
      setItems((prev) => prev.filter((i) => i.product.id !== productId));
      if (user) {
        supabase.from("cart_items").delete().eq("user_id", user.id).eq("product_id", productId).then();
      }
    },
    [user]
  );

  const updateQuantity = useCallback(
    (productId: string, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(productId);
        return;
      }
      setItems((prev) => prev.map((i) => (i.product.id === productId ? { ...i, quantity } : i)));
      if (user) {
        supabase
          .from("cart_items")
          .update({ quantity })
          .eq("user_id", user.id)
          .eq("product_id", productId)
          .then();
      }
    },
    [user, removeFromCart]
  );

  const clearCart = useCallback(() => {
    setItems([]);
    if (user) {
      supabase.from("cart_items").delete().eq("user_id", user.id).then();
    }
  }, [user]);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
