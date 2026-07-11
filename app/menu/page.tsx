"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Search, Flame, Filter, RotateCcw, ShoppingCart } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { AIChatbot } from "@/components/chatbot/AIChatbot";
import { ProductDetailsModal } from "@/components/menu/ProductDetailsModal";
import { menuItems, MenuItem } from "@/data/menu";
import { useCart } from "@/context/CartContext";

// Wrap MenuContent in a Suspense block because it uses useSearchParams
function MenuContent() {
  const { addToCart } = useCart();
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("cat") || "all";

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDiet, setSelectedDiet] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  // Sync category if URL search parameters change
  useEffect(() => {
    setSelectedCategory(searchParams.get("cat") || "all");
  }, [searchParams]);

  const categories = [
    { name: "All Dishes", key: "all" },
    { name: "Kebabs", key: "kebab" },
    { name: "Biryanis", key: "biryani" },
    { name: "Curries", key: "curry" },
    { name: "Dessert", key: "dessert" },
  ];

  const diets = [
    { name: "Best Seller", tag: "Best Seller" },
    { name: "Signature", tag: "Signature" },
    { name: "Vegetarian", tag: "Vegetarian" },
    { name: "Spicy (3🌶️)", tag: "Spicy" },
  ];

  const handleDietChange = (dietTag: string) => {
    setSelectedDiet((prev) =>
      prev.includes(dietTag) ? prev.filter((d) => d !== dietTag) : [...prev, dietTag]
    );
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedDiet([]);
  };

  // Filter logic
  const filteredItems = menuItems.filter((item) => {
    // 1. Category Filter
    if (selectedCategory !== "all" && item.category !== selectedCategory) {
      return false;
    }

    // 2. Search Query Filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const matchName = item.name.toLowerCase().includes(query);
      const matchDesc = item.description.toLowerCase().includes(query);
      if (!matchName && !matchDesc) return false;
    }

    // 3. Dietary Tags Filter
    if (selectedDiet.length > 0) {
      for (const diet of selectedDiet) {
        if (diet === "Spicy") {
          if (item.spiceLevel !== 3) return false;
        } else {
          if (!item.tags.includes(diet)) return false;
        }
      }
    }

    return true;
  });

  return (
    <>
      <Navbar />
      <CartDrawer />
      <AIChatbot />

      <main className="flex-grow pt-32 pb-24 bg-brand-dark min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="text-xs font-bold tracking-widest text-brand-gold uppercase">
              Culinary Vault
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-brand-cream mt-1">Kareem's Royal Menu</h1>
            <div className="w-16 h-0.5 bg-brand-gold mx-auto mt-4" />
            <p className="text-sm text-brand-cream/60 mt-3 max-w-md mx-auto">
              Savor our signature Mughal delicacies prepared freshly with home-ground royal masalas.
            </p>
          </div>

          {/* Search & Filters Controls */}
          <div className="space-y-6 mb-12">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Category tabs */}
              <div className="flex items-center space-x-1 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-none">
                {categories.map((cat) => (
                  <button
                    key={cat.key}
                    onClick={() => setSelectedCategory(cat.key)}
                    className={`px-5 py-2.5 rounded-full font-serif text-xs tracking-wider uppercase font-bold transition-all flex-shrink-0 cursor-pointer ${
                      selectedCategory === cat.key
                        ? "bg-brand-gold text-brand-dark shadow-md"
                        : "bg-brand-card/50 hover:bg-brand-gold/15 text-brand-cream/80 hover:text-brand-gold border border-brand-gold/5"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              {/* Search input */}
              <div className="relative w-full lg:max-w-sm">
                <Search className="w-4 h-4 text-brand-cream/40 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search royal dishes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-brand-card/45 border border-brand-gold/10 focus:border-brand-gold rounded-full pl-11 pr-5 py-3 text-xs text-brand-cream placeholder-brand-cream/30 focus:outline-none focus:ring-1 focus:ring-brand-gold transition-all"
                />
              </div>
            </div>

            {/* Diet Checkboxes */}
            <div className="flex flex-wrap items-center gap-4 bg-brand-card/20 p-4 border border-brand-gold/5 rounded-xl">
              <span className="text-xs font-bold text-brand-gold uppercase tracking-wider flex items-center space-x-1.5 mr-2">
                <Filter className="w-3.5 h-3.5" />
                <span>Filters:</span>
              </span>
              <div className="flex flex-wrap gap-3">
                {diets.map((diet) => (
                  <label
                    key={diet.tag}
                    className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg border text-xs font-semibold cursor-pointer transition-all ${
                      selectedDiet.includes(diet.tag)
                        ? "bg-brand-gold/10 border-brand-gold text-brand-gold"
                        : "border-brand-gold/5 bg-brand-card/30 hover:border-brand-gold/20 text-brand-cream/70 hover:text-brand-cream"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedDiet.includes(diet.tag)}
                      onChange={() => handleDietChange(diet.tag)}
                      className="rounded border-brand-gold/30 text-brand-gold focus:ring-brand-gold bg-brand-dark cursor-pointer hidden"
                    />
                    <span>{diet.name}</span>
                  </label>
                ))}
              </div>
              {(selectedCategory !== "all" || searchQuery.trim() || selectedDiet.length > 0) && (
                <button
                  onClick={handleResetFilters}
                  className="ml-auto text-xs text-brand-cream/50 hover:text-brand-gold flex items-center space-x-1 hover:underline cursor-pointer pt-2 sm:pt-0"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Filters</span>
                </button>
              )}
            </div>
          </div>

          {/* Menu Grid */}
          {filteredItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-brand-gold/5 flex items-center justify-center border border-brand-gold/10">
                <RotateCcw className="w-8 h-8 text-brand-gold/30" />
              </div>
              <h3 className="font-serif text-xl font-bold text-brand-cream">No Royal Dishes Found</h3>
              <p className="text-sm text-brand-cream/60 max-w-sm">
                No items match your criteria. Try adjusting your search query, selecting another category, or resetting filters.
              </p>
              <button
                onClick={handleResetFilters}
                className="mt-2 px-6 py-2.5 bg-brand-gold text-brand-dark hover:bg-brand-gold-hover text-xs font-serif font-bold tracking-widest uppercase rounded-full transition-all shadow-md"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="group bg-brand-card border border-brand-gold/10 hover:border-brand-gold/25 rounded-xl overflow-hidden flex flex-col justify-between shadow-lg transition-all duration-300 hover:translate-y-[-2px]"
                >
                  {/* Item Image */}
                  <div
                    onClick={() => setSelectedItem(item)}
                    className="relative h-48 overflow-hidden cursor-pointer"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-brand-dark/10 group-hover:bg-transparent transition-colors" />
                    <div className="absolute top-3 left-3 flex space-x-1.5">
                      {item.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="text-[8px] font-bold bg-brand-gold text-brand-dark px-1.5 py-0.5 rounded uppercase tracking-wider shadow-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    {item.spiceLevel > 0 && (
                      <div className="absolute top-3 right-3 bg-brand-dark/60 backdrop-blur-sm border border-brand-gold/20 text-brand-gold px-1.5 py-0.5 rounded text-[8px] font-semibold flex items-center space-x-0.5">
                        <Flame className="w-2.5 h-2.5 fill-brand-gold" />
                        <span>{item.spiceLevel}🌶️</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4 flex-grow flex flex-col justify-between">
                    <div className="space-y-1.5">
                      <div className="flex items-start justify-between">
                        <h3
                          onClick={() => setSelectedItem(item)}
                          className="font-serif text-sm font-bold text-brand-cream hover:text-brand-gold transition-colors line-clamp-1 cursor-pointer"
                        >
                          {item.name}
                        </h3>
                        <span className="text-xs font-bold text-brand-gold ml-2">
                          ৳{item.price.toFixed(0)}
                        </span>
                      </div>
                      <p className="text-[11px] text-brand-cream/50 leading-relaxed line-clamp-2">
                        {item.description}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2 mt-4">
                      <button
                        onClick={() => setSelectedItem(item)}
                        className="flex-grow px-3 py-2 border border-brand-gold/20 hover:border-brand-gold text-brand-gold text-[10px] font-semibold rounded-full transition-all cursor-pointer text-center"
                      >
                        Customize
                      </button>
                      <button
                        onClick={() =>
                          addToCart({
                            menuItemId: item.id,
                            name: item.name,
                            price: item.price,
                            image: item.image,
                            quantity: 1,
                            spiceLevel: item.spiceLevel > 0 ? "Medium" : "None",
                            addons: [],
                          })
                        }
                        className="bg-brand-crimson hover:bg-brand-crimson-hover p-2 rounded-full text-brand-cream transition-colors flex items-center justify-center cursor-pointer"
                        aria-label="Quick add to cart"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />

      {/* Selected Item Modal */}
      {selectedItem && (
        <ProductDetailsModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </>
  );
}

export default function MenuPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-brand-dark flex items-center justify-center text-brand-gold">Loading Royal Vault...</div>}>
      <MenuContent />
    </Suspense>
  );
}
