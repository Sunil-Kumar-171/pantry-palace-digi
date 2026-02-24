export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  category: string;
  image: string;
  badge?: string;
  rating: number;
  reviews: number;
  sizes?: string[];
  colors?: string[];
}

export const categories = [
  "All",
  "New Arrivals",
  "Outerwear",
  "Knitwear",
  "Dresses",
  "Accessories",
  "Footwear",
];

export const products: Product[] = [
  {
    id: "1",
    name: "Cashmere Wrap Coat",
    price: 389,
    originalPrice: 520,
    description: "Luxuriously soft cashmere blend wrap coat with a relaxed silhouette. Features a self-tie belt and dropped shoulders for effortless elegance.",
    category: "Outerwear",
    image: "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=600&h=800&fit=crop",
    badge: "Sale",
    rating: 4.8,
    reviews: 124,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Camel", "Charcoal", "Ivory"],
  },
  {
    id: "2",
    name: "Merino Turtleneck",
    price: 145,
    description: "Extra-fine merino wool turtleneck sweater. Lightweight warmth with a refined fit that layers beautifully.",
    category: "Knitwear",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=800&fit=crop",
    rating: 4.9,
    reviews: 89,
    sizes: ["XS", "S", "M", "L"],
    colors: ["Cream", "Black", "Sage"],
  },
  {
    id: "3",
    name: "Silk Midi Dress",
    price: 278,
    description: "Flowing silk midi dress with a subtle sheen. Perfect for transitioning from day to evening with minimal effort.",
    category: "Dresses",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=800&fit=crop",
    badge: "New",
    rating: 4.7,
    reviews: 56,
    sizes: ["XS", "S", "M", "L"],
    colors: ["Champagne", "Midnight"],
  },
  {
    id: "4",
    name: "Leather Tote Bag",
    price: 245,
    description: "Full-grain leather tote with interior organization pockets. Handcrafted with attention to every detail.",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&h=800&fit=crop",
    rating: 4.9,
    reviews: 203,
    colors: ["Tan", "Black", "Burgundy"],
  },
  {
    id: "5",
    name: "Wool Blend Blazer",
    price: 310,
    description: "Tailored wool-blend blazer with a modern relaxed fit. A wardrobe foundation piece for every season.",
    category: "Outerwear",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=800&fit=crop",
    badge: "New",
    rating: 4.6,
    reviews: 78,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Navy", "Grey", "Camel"],
  },
  {
    id: "6",
    name: "Suede Ankle Boots",
    price: 198,
    originalPrice: 265,
    description: "Italian suede ankle boots with a comfortable block heel. Versatile enough for everyday wear.",
    category: "Footwear",
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&h=800&fit=crop",
    badge: "Sale",
    rating: 4.5,
    reviews: 167,
    sizes: ["36", "37", "38", "39", "40", "41"],
    colors: ["Taupe", "Black"],
  },
  {
    id: "7",
    name: "Cable Knit Cardigan",
    price: 175,
    description: "Chunky cable knit cardigan in a cozy oversized fit. Made from organic cotton for breathable comfort.",
    category: "Knitwear",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cda3a04?w=600&h=800&fit=crop",
    rating: 4.8,
    reviews: 91,
    sizes: ["S", "M", "L"],
    colors: ["Oatmeal", "Forest", "Rust"],
  },
  {
    id: "8",
    name: "Minimalist Watch",
    price: 195,
    description: "Swiss-made minimalist watch with a leather strap. Clean dial design with date function.",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&h=800&fit=crop",
    rating: 4.7,
    reviews: 145,
    colors: ["Silver/Tan", "Gold/Black", "Rose Gold/Grey"],
  },
];
