import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import heroBanner from "@/assets/hero-banner.jpg";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

const Index = () => {
  const featured = products.slice(0, 4);
  const newArrivals = products.filter((p) => p.badge === "New");

  return (
    <main>
      {/* Hero */}
      <section className="relative h-[85vh] min-h-[500px] overflow-hidden">
        <img src={heroBanner} alt="Timeless essentials" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 to-foreground/20" />
        <div className="relative z-10 container mx-auto px-4 lg:px-8 h-full flex items-center">
          <div className="max-w-lg animate-fade-in">
            <p className="text-primary-foreground/80 text-sm tracking-[0.3em] uppercase mb-4 font-body">Spring Collection 2026</p>
            <h1 className="font-display text-4xl md:text-6xl font-semibold text-primary-foreground leading-tight mb-6">
              Timeless Elegance, Effortless Style
            </h1>
            <p className="text-primary-foreground/70 mb-8 leading-relaxed font-body">
              Discover our curated collection of modern essentials designed for life beautifully lived.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-3.5 text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-opacity rounded-sm"
            >
              Shop Now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="container mx-auto px-4 lg:px-8 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">Curated For You</p>
            <h2 className="font-display text-3xl font-semibold">Featured Pieces</h2>
          </div>
          <Link to="/shop" className="text-sm font-medium hover:text-accent transition-colors flex items-center gap-1">
            View All <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Banner */}
      <section className="bg-secondary">
        <div className="container mx-auto px-4 lg:px-8 py-20 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3">Our Promise</p>
          <h2 className="font-display text-2xl md:text-4xl font-semibold mb-4">Crafted With Intention</h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed font-body">
            Every piece in our collection is thoughtfully designed using premium materials. We believe in quality over quantity — pieces you'll treasure for years.
          </p>
        </div>
      </section>

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section className="container mx-auto px-4 lg:px-8 py-20">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">Just Landed</p>
              <h2 className="font-display text-3xl font-semibold">New Arrivals</h2>
            </div>
            <Link to="/shop?category=New+Arrivals" className="text-sm font-medium hover:text-accent transition-colors flex items-center gap-1">
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {newArrivals.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default Index;
