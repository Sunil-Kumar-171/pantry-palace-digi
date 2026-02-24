import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const Cart = () => {
  const { items, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  if (items.length === 0) {
    return (
      <main className="container mx-auto px-4 py-20 text-center">
        <ShoppingBag className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
        <h1 className="font-display text-2xl font-semibold mb-2">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-6">Discover our curated collection</p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 text-sm font-semibold tracking-wider uppercase rounded-sm"
        >
          Continue Shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 lg:px-8 py-10">
      <Link to="/shop" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-8">
        <ArrowLeft className="w-4 h-4" /> Continue Shopping
      </Link>

      <h1 className="font-display text-3xl font-semibold mb-8">Shopping Cart ({totalItems})</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Items */}
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <div key={item.product.id} className="flex gap-4 bg-card p-4 rounded-sm animate-fade-in">
              <Link to={`/product/${item.product.id}`} className="w-24 h-32 flex-shrink-0 rounded-sm overflow-hidden bg-secondary">
                <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
              </Link>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <Link to={`/product/${item.product.id}`} className="font-medium text-sm hover:text-accent transition-colors">
                    {item.product.name}
                  </Link>
                  {(item.size || item.color) && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {item.size && `Size: ${item.size}`}{item.size && item.color && " · "}{item.color && `Color: ${item.color}`}
                    </p>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-1 hover:text-accent">
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-1 hover:text-accent">
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => removeFromCart(item.product.id)} className="p-1 ml-2 text-muted-foreground hover:text-destructive">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <span className="font-semibold text-sm">${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-card p-6 rounded-sm h-fit">
          <h2 className="font-display text-lg font-semibold mb-6">Order Summary</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span>{totalPrice >= 200 ? "Free" : "$15.00"}</span>
            </div>
            <div className="border-t pt-3 flex justify-between font-semibold text-base">
              <span>Total</span>
              <span>${(totalPrice >= 200 ? totalPrice : totalPrice + 15).toFixed(2)}</span>
            </div>
          </div>
          <button className="w-full mt-6 bg-accent text-accent-foreground py-3.5 text-sm font-semibold tracking-wider uppercase rounded-sm hover:opacity-90 transition-opacity">
            Proceed to Checkout
          </button>
          <p className="text-[10px] text-muted-foreground text-center mt-3">Free shipping on orders over $200</p>
        </div>
      </div>
    </main>
  );
};

export default Cart;
