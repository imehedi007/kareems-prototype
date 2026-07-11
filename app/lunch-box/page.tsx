"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { AIChatbot } from "@/components/chatbot/AIChatbot";
import { ProductDetailsModal } from "@/components/menu/ProductDetailsModal";
import { menuItems, MenuItem } from "@/data/menu";
import { ShoppingCart, Flame, SlidersHorizontal, ArrowRight, Clock, Award } from "lucide-react";
import { useCart } from "@/context/CartContext";
import confetti from "canvas-confetti";

export default function LunchBoxPage() {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const { addToCart } = useCart();

  // Filter lunch category items
  const lunchItems = menuItems.filter((item) => item.category === "lunch");

  const handleQuickAdd = (item: MenuItem) => {
    addToCart({
      menuItemId: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1,
      spiceLevel: item.spiceLevel === 3 ? "Spicy" : item.spiceLevel === 2 ? "Medium" : "Mild",
      addons: [],
    });

    // Trigger visual confetti burst
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ["#c5a059", "#722f37", "#faf7f2"],
    });
  };

  return (
    <>
      <Navbar />
      <CartDrawer />
      <AIChatbot />

      <main className="flex-grow pt-32 pb-24 bg-brand-dark relative overflow-hidden">
        {/* Background texture ripples */}
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#c5a059_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="text-xs font-bold tracking-widest text-brand-gold uppercase flex items-center justify-center space-x-1.5 mb-2">
              <Award className="w-4 h-4" />
              <span>Royal Banquet Boxes</span>
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-brand-cream mt-2 tracking-wide">
              Chamber Lunch Sets
            </h1>
            <div className="w-12 h-0.5 bg-brand-gold mx-auto mt-4" />
            <p className="text-sm text-brand-cream/60 mt-4 leading-relaxed">
              Feast like royalty at midday. Authentic Mughlai lunch sets packed fresh, hot, and optimized for corporate catering or individual banquets in Banani.
            </p>
          </div>

          {/* Page Split Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            {/* Left Column: Banner 009 Poster Preview (5 cols) */}
            <div className="lg:col-span-5 flex flex-col">
              <div className="relative rounded-3xl overflow-hidden border border-brand-gold/15 bg-brand-card shadow-2xl p-4 flex flex-col h-full justify-between">
                <div className="relative flex-grow w-full min-h-[450px] lg:min-h-[500px] rounded-2xl overflow-hidden border border-black/20 shadow-inner">
                  <Image
                    src="/images/banner_009.webp"
                    alt="Kareem's Lunch Boxes menu flyer"
                    fill
                    className="object-fill rounded-xl"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    priority
                  />
                </div>
                <div className="text-center mt-4 px-2 flex-shrink-0">
                  <p className="text-[11px] text-brand-cream/50 italic">
                    Original Kareem's Banquet Flyer — All 4 royal packages are now live and purchaseable online.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Dynamic Purchaseable List (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-8">
              <div className="space-y-6">
                <h3 className="font-serif text-lg font-bold text-brand-gold uppercase tracking-wide border-b border-brand-gold/10 pb-3 flex items-center justify-between">
                  <span>Select Your Feast</span>
                  <span className="text-xs font-sans font-normal text-brand-cream/50">
                    {lunchItems.length} Packages Available
                  </span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {lunchItems.map((item) => (
                    <div
                      key={item.id}
                      className="glass border border-brand-gold/10 hover:border-brand-gold/25 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-lg"
                    >
                      <div>
                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[9px] font-bold bg-brand-gold/5 border border-brand-gold/20 text-brand-gold px-1.5 py-0.5 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Header Details */}
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-serif text-md font-bold text-brand-cream hover:text-brand-gold transition-colors cursor-pointer" onClick={() => setSelectedItem(item)}>
                            {item.name}
                          </h4>
                          <span className="font-sans font-bold text-brand-gold text-sm ml-2">
                            ৳{item.price.toFixed(0)}
                          </span>
                        </div>

                        {/* Description */}
                        <p className="text-xs text-brand-cream/60 leading-relaxed mb-4 line-clamp-3">
                          {item.description}
                        </p>
                      </div>

                      {/* Action Block */}
                      <div className="flex items-center justify-between border-t border-brand-gold/5 pt-4 mt-auto">
                        <div className="flex items-center space-x-1">
                          <Flame className="w-3.5 h-3.5 text-brand-gold fill-brand-gold" />
                          <span className="text-[10px] text-brand-cream/50">Spice: {item.spiceLevel}/3</span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => setSelectedItem(item)}
                            className="p-2 border border-brand-gold/20 hover:border-brand-gold text-brand-gold rounded-full transition-all cursor-pointer flex items-center justify-center"
                            title="Customize spices & add-ons"
                          >
                            <SlidersHorizontal className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleQuickAdd(item)}
                            className="px-4 py-1.5 bg-brand-crimson hover:bg-brand-crimson-hover text-brand-cream text-xs font-serif font-bold tracking-widest uppercase rounded-full transition-all cursor-pointer flex items-center space-x-1.5"
                          >
                            <span>Add</span>
                            <ShoppingCart className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Catering Note */}
              <div className="bg-brand-card/30 border border-brand-gold/10 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 mt-auto shadow-lg">
                <div className="space-y-1">
                  <h4 className="font-serif text-sm font-bold text-brand-cream uppercase tracking-wider">
                    Need Corporate Catering?
                  </h4>
                  <p className="text-xs text-brand-cream/50 max-w-md">
                    Host board meetings or company feasts with customized Mughlai banquet layouts. Reach out to our stewards directly.
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="px-6 py-2.5 bg-brand-gold hover:bg-brand-gold-hover text-brand-dark text-xs font-serif font-bold tracking-widest uppercase rounded-full transition-all flex items-center space-x-1"
                >
                  <span>Inquire Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Full Width Operational Hours Banner */}
          <div className="glass border border-brand-gold/15 rounded-2xl p-6 md:p-8 mt-12 shadow-2xl flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-2 flex-1">
              <h3 className="font-serif text-sm font-bold text-brand-gold uppercase tracking-wider flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>Lunch Operational Hours</span>
              </h3>
              <p className="text-xs sm:text-sm text-brand-cream/70 leading-relaxed">
                Lunch sets are fresh-baked and dispatched daily between **12:00 PM and 4:00 PM**. Pre-orders for corporate gatherings can be scheduled up to 7 days in advance.
              </p>
            </div>
            <div className="flex-shrink-0 bg-brand-dark/50 border border-brand-gold/10 rounded-xl px-6 py-4 flex flex-col justify-center text-center">
              <span className="text-[10px] text-brand-cream/50 uppercase tracking-widest font-semibold">Banani Office Hotline</span>
              <span className="text-sm font-mono text-brand-gold font-bold mt-1">+880 1678-222087</span>
            </div>
          </div>
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
