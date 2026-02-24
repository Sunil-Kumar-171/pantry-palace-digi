import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/data/products";

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") || "All";
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("featured");

  const setCategory = (cat: string) => {
    if (cat === "All") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", cat);
    }
    setSearchParams(searchParams);
  };

  const filtered = useMemo(() => {
    let result = products;
    if (categoryParam !== "All") {
      if (categoryParam === "New Arrivals") {
        result = result.filter((p) => p.badge === "New");
      } else {
        result = result.filter((p) => p.category === categoryParam);
      }
    }
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
      );
    }
    if (sortBy === "price-asc") result = [...result].sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") result = [...result].sort((a, b) => b.price - a.price);
    if (sortBy === "rating") result = [...result].sort((a, b) => b.rating - a.rating);
    return result;
  }, [categoryParam, search, sortBy]);

  return (
    <main className="container mx-auto px-4 lg:px-8 py-10">
      <div className="mb-10">
        <h1 className="font-display text-3xl font-semibold mb-2">
          {categoryParam === "All" ? "Shop All" : categoryParam}
        </h1>
        <p className="text-muted-foreground text-sm">{filtered.length} pieces</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-card border rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-card border rounded-sm text-sm px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-accent"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 mb-10 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 text-xs font-semibold tracking-wider uppercase rounded-sm whitespace-nowrap transition-colors ${
              categoryParam === cat
                ? "bg-primary text-primary-foreground"
                : "bg-card text-foreground hover:bg-secondary"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-muted-foreground">
          <p className="text-lg font-display">No products found</p>
          <p className="text-sm mt-2">Try adjusting your search or filters</p>
        </div>
      )}
    </main>
  );
};

export default Shop;
