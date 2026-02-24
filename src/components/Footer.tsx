import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-primary text-primary-foreground mt-20">
    <div className="container mx-auto px-4 lg:px-8 py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <h3 className="font-display text-xl font-semibold mb-4">MAISON</h3>
          <p className="text-sm opacity-70 leading-relaxed">
            Timeless pieces crafted with care. Thoughtfully designed for modern living.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-sm tracking-wide mb-4">SHOP</h4>
          <div className="flex flex-col gap-2 text-sm opacity-70">
            <Link to="/shop" className="hover:opacity-100 transition-opacity">All Products</Link>
            <Link to="/shop?category=New+Arrivals" className="hover:opacity-100 transition-opacity">New Arrivals</Link>
            <Link to="/shop?category=Outerwear" className="hover:opacity-100 transition-opacity">Outerwear</Link>
            <Link to="/shop?category=Knitwear" className="hover:opacity-100 transition-opacity">Knitwear</Link>
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-sm tracking-wide mb-4">HELP</h4>
          <div className="flex flex-col gap-2 text-sm opacity-70">
            <span>Shipping & Returns</span>
            <span>Size Guide</span>
            <span>Contact Us</span>
            <span>FAQ</span>
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-sm tracking-wide mb-4">CONNECT</h4>
          <div className="flex flex-col gap-2 text-sm opacity-70">
            <span>Instagram</span>
            <span>Pinterest</span>
            <span>Newsletter</span>
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center text-xs opacity-50">
        © 2026 MAISON. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
