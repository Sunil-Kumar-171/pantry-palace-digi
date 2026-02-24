import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useWishlist } from "@/contexts/WishlistContext";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

const Wishlist = () => {
  const { wishlist } = useWishlist();
  const items = products.filter((p) => wishlist.includes(p.id));

  if (items.length === 0) {
    return (
      <main className="container mx-auto px-4 py-20 text-center">
        <Heart className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
        <h1 className="font-display text-2xl font-semibold mb-2">Your Wishlist is Empty</h1>
        <p className="text-muted-foreground mb-6">Save your favorite pieces for later</p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 text-sm font-semibold tracking-wider uppercase rounded-sm"
        >
          Start Shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 lg:px-8 py-10">
      <h1 className="font-display text-3xl font-semibold mb-2">Wishlist</h1>
      <p className="text-muted-foreground text-sm mb-10">{items.length} saved pieces</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </main>
  );
};

export default Wishlist;
