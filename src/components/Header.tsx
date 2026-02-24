import { Link } from "react-router-dom";
import { ShoppingBag, Heart, Search, Menu, X, User, LogOut } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";

const Header = () => {
  const { totalItems } = useCart();
  const { wishlist } = useWishlist();
  const { user, signOut } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Mobile menu toggle */}
          <button className="lg:hidden p-2 -ml-2" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Logo */}
          <Link to="/" className="font-display text-xl lg:text-2xl font-semibold tracking-wide">
            MAISON
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium tracking-wide">
            <Link to="/shop" className="hover:text-accent transition-colors">Shop All</Link>
            <Link to="/shop?category=New+Arrivals" className="hover:text-accent transition-colors">New Arrivals</Link>
            <Link to="/shop?category=Outerwear" className="hover:text-accent transition-colors">Outerwear</Link>
            <Link to="/shop?category=Knitwear" className="hover:text-accent transition-colors">Knitwear</Link>
            <Link to="/shop?category=Accessories" className="hover:text-accent transition-colors">Accessories</Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-3">
            <Link to="/shop" className="p-2 hover:text-accent transition-colors">
              <Search className="w-5 h-5" />
            </Link>
            <Link to="/wishlist" className="p-2 hover:text-accent transition-colors relative">
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-accent text-accent-foreground text-[10px] flex items-center justify-center font-semibold">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <Link to="/cart" className="p-2 hover:text-accent transition-colors relative">
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-accent text-accent-foreground text-[10px] flex items-center justify-center font-semibold">
                  {totalItems}
                </span>
              )}
            </Link>
            {user ? (
              <button onClick={() => signOut()} className="p-2 hover:text-accent transition-colors" title="Sign Out">
                <LogOut className="w-5 h-5" />
              </button>
            ) : (
              <Link to="/auth" className="p-2 hover:text-accent transition-colors" title="Sign In">
                <User className="w-5 h-5" />
              </Link>
            )}
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <nav className="lg:hidden pb-4 flex flex-col gap-3 text-sm font-medium tracking-wide animate-fade-in">
            <Link to="/shop" onClick={() => setMobileOpen(false)} className="py-2 hover:text-accent transition-colors">Shop All</Link>
            <Link to="/shop?category=New+Arrivals" onClick={() => setMobileOpen(false)} className="py-2 hover:text-accent transition-colors">New Arrivals</Link>
            <Link to="/shop?category=Outerwear" onClick={() => setMobileOpen(false)} className="py-2 hover:text-accent transition-colors">Outerwear</Link>
            <Link to="/shop?category=Knitwear" onClick={() => setMobileOpen(false)} className="py-2 hover:text-accent transition-colors">Knitwear</Link>
            <Link to="/shop?category=Accessories" onClick={() => setMobileOpen(false)} className="py-2 hover:text-accent transition-colors">Accessories</Link>
            {user ? (
              <button onClick={() => { signOut(); setMobileOpen(false); }} className="py-2 text-left hover:text-accent transition-colors">Sign Out</button>
            ) : (
              <Link to="/auth" onClick={() => setMobileOpen(false)} className="py-2 hover:text-accent transition-colors">Sign In</Link>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
