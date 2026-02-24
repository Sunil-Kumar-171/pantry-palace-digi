import { useParams, Link } from "react-router-dom";
import { Heart, ArrowLeft, Star, ShoppingBag } from "lucide-react";
import { products } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useState } from "react";
import ProductCard from "@/components/ProductCard";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [selectedSize, setSelectedSize] = useState<string | undefined>();
  const [selectedColor, setSelectedColor] = useState<string | undefined>();
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-muted-foreground">Product not found</p>
        <Link to="/shop" className="text-accent underline text-sm mt-4 inline-block">Back to Shop</Link>
      </div>
    );
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const wishlisted = isInWishlist(product.id);

  const handleAdd = () => {
    addToCart(product, selectedSize, selectedColor);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <main className="container mx-auto px-4 lg:px-8 py-8">
      <Link to="/shop" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-8">
        <ArrowLeft className="w-4 h-4" /> Back to Shop
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        {/* Image */}
        <div className="aspect-[3/4] rounded-sm overflow-hidden bg-card">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>

        {/* Details */}
        <div className="flex flex-col justify-center">
          {product.badge && (
            <span className="text-accent text-xs font-bold tracking-widest uppercase mb-3">{product.badge}</span>
          )}
          <h1 className="font-display text-3xl lg:text-4xl font-semibold mb-3">{product.name}</h1>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-accent text-accent" />
              <span className="text-sm font-medium">{product.rating}</span>
            </div>
            <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
          </div>

          <div className="flex items-center gap-3 mb-8">
            <span className="text-2xl font-semibold">${product.price}</span>
            {product.originalPrice && (
              <span className="text-lg text-muted-foreground line-through">${product.originalPrice}</span>
            )}
          </div>

          <p className="text-muted-foreground leading-relaxed mb-8 font-body">{product.description}</p>

          {/* Sizes */}
          {product.sizes && (
            <div className="mb-6">
              <p className="text-sm font-semibold tracking-wide mb-3">SIZE</p>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`px-4 py-2 text-xs font-medium border rounded-sm transition-colors ${
                      selectedSize === s ? "bg-primary text-primary-foreground border-primary" : "hover:border-foreground"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Colors */}
          {product.colors && (
            <div className="mb-8">
              <p className="text-sm font-semibold tracking-wide mb-3">COLOR</p>
              <div className="flex gap-2 flex-wrap">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    className={`px-4 py-2 text-xs font-medium border rounded-sm transition-colors ${
                      selectedColor === c ? "bg-primary text-primary-foreground border-primary" : "hover:border-foreground"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={handleAdd}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3.5 text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-opacity rounded-sm"
            >
              <ShoppingBag className="w-4 h-4" />
              {added ? "Added!" : "Add to Cart"}
            </button>
            <button
              onClick={() => toggleWishlist(product.id)}
              className="p-3.5 border rounded-sm hover:border-accent transition-colors"
            >
              <Heart className={`w-5 h-5 ${wishlisted ? "fill-accent text-accent" : ""}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="font-display text-2xl font-semibold mb-8">You May Also Like</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default ProductDetail;
