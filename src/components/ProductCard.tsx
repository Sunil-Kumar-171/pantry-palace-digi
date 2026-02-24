import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { Product } from "@/data/products";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";

const ProductCard = ({ product }: { product: Product }) => {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  const wishlisted = isInWishlist(product.id);

  return (
    <div className="group animate-fade-in">
      <div className="relative overflow-hidden rounded-sm bg-card aspect-[3/4] mb-3">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </Link>
        {product.badge && (
          <span className="absolute top-3 left-3 bg-accent text-accent-foreground text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-sm uppercase">
            {product.badge}
          </span>
        )}
        <button
          onClick={() => toggleWishlist(product.id)}
          className="absolute top-3 right-3 p-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-colors"
        >
          <Heart className={`w-4 h-4 ${wishlisted ? "fill-accent text-accent" : ""}`} />
        </button>
        <button
          onClick={() => addToCart(product)}
          className="absolute bottom-0 left-0 right-0 bg-primary/90 text-primary-foreground text-xs font-semibold tracking-wider py-3 text-center translate-y-full group-hover:translate-y-0 transition-transform duration-300 uppercase"
        >
          Add to Cart
        </button>
      </div>
      <Link to={`/product/${product.id}`}>
        <h3 className="font-medium text-sm mb-1 group-hover:text-accent transition-colors">{product.name}</h3>
      </Link>
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold">${product.price}</span>
        {product.originalPrice && (
          <span className="text-xs text-muted-foreground line-through">${product.originalPrice}</span>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
