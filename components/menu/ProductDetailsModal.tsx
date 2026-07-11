"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Flame, Sparkles } from "lucide-react";
import { MenuItem } from "@/data/menu";
import { useCart } from "@/context/CartContext";

interface ProductDetailsModalProps {
  item: MenuItem | null;
  onClose: () => void;
}

export const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({ item, onClose }) => {
  const { addToCart, setIsCartOpen } = useCart();
  const router = useRouter();

  const [quantity, setQuantity] = useState(1);
  const [spiceLevel, setSpiceLevel] = useState("Medium");
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState("");

  if (!item) return null;

  const addonsList = [
    { name: "Extra Garlic Naan", price: 120 },
    { name: "Traditional Raita", price: 80 },
    { name: "Extra Mint Chutney", price: 40 },
    { name: "Butter Tandoori Roti", price: 60 },
  ];

  const handleAddonChange = (addonName: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addonName) ? prev.filter((a) => a !== addonName) : [...prev, addonName]
    );
  };

  // Calculate total price based on item base price + additions
  const calculateItemPrice = () => {
    let addonPrice = 0;
    selectedAddons.forEach((addonName) => {
      const match = addonsList.find((a) => a.name === addonName);
      if (match) addonPrice += match.price;
    });
    return item.price + addonPrice;
  };

  const currentPrice = calculateItemPrice();

  const handleAddToCart = () => {
    addToCart({
      menuItemId: item.id,
      name: item.name,
      price: currentPrice,
      image: item.image,
      quantity,
      spiceLevel,
      addons: selectedAddons,
      specialInstructions,
    });
    onClose();
  };

  const handleBuyNow = () => {
    addToCart({
      menuItemId: item.id,
      name: item.name,
      price: currentPrice,
      image: item.image,
      quantity,
      spiceLevel,
      addons: selectedAddons,
      specialInstructions,
    });
    onClose();
    setIsCartOpen(false);
    router.push("/checkout");
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Box */}
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{ type: "spring", duration: 0.5 }}
      className="relative w-full max-w-4xl bg-brand-card border border-brand-gold/15 rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-2xl z-50 max-h-[95vh] md:max-h-[85vh]"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-20 p-2 bg-brand-dark/60 backdrop-blur-md rounded-full text-brand-cream/80 hover:text-brand-gold border border-brand-gold/10 hover:border-brand-gold/30 transition-all cursor-pointer"
        aria-label="Close modal"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Left Column: Image */}
      <div className="relative w-full md:w-1/2 h-56 md:h-auto min-h-[200px] bg-brand-dark">
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            {/* Spice indicator overlay */}
            {item.spiceLevel > 0 && (
              <div className="absolute top-4 left-4 bg-brand-dark/70 backdrop-blur-sm border border-brand-gold/20 text-brand-gold px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
                <Flame className="w-3.5 h-3.5 fill-brand-gold" />
                <span>Spice: {item.spiceLevel}/3</span>
              </div>
            )}
          </div>

      {/* Right Column: Customization Details */}
      <div className="w-full md:w-1/2 p-6 flex flex-col justify-between overflow-hidden">
        {/* Product Title & Info (Fixed Header) */}
        <div className="flex-shrink-0">
          <span className="text-[10px] tracking-widest text-brand-gold uppercase font-serif font-bold">
            {item.category}
          </span>
          <h2 className="font-serif text-2xl font-bold text-brand-cream mt-0.5">{item.name}</h2>
          <p className="text-xs text-brand-cream/60 mt-1 leading-relaxed">{item.description}</p>
          <div className="flex items-center space-x-3 mt-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-bold bg-brand-gold/5 border border-brand-gold/25 text-brand-gold px-2 py-0.5 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Scrollable Customization Options */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden pr-1.5 my-3 py-3 space-y-4 border-t border-brand-gold/10">
                {/* Spice Level selection */}
                {item.spiceLevel > 0 && (
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-brand-gold/80 block">
                      Choose Spice Level
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {["Mild", "Medium", "Spicy"].map((level) => (
                        <button
                          key={level}
                          onClick={() => setSpiceLevel(level)}
                          className={`py-2 text-xs font-bold border rounded-lg transition-all cursor-pointer ${
                            spiceLevel === level
                              ? "bg-brand-gold/10 border-brand-gold text-brand-gold"
                              : "border-brand-gold/15 text-brand-cream/60 hover:border-brand-gold/30 hover:text-brand-cream"
                          }`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Add-ons selection */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-brand-gold/80 block">
                    Select Royal Add-ons (Optional)
                  </label>
                  <div className="space-y-2 max-h-[120px] overflow-y-auto pr-1">
                    {addonsList.map((addon) => (
                      <label
                        key={addon.name}
                        className={`flex items-center justify-between p-2.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                          selectedAddons.includes(addon.name)
                            ? "bg-brand-gold/5 border-brand-gold/40 text-brand-gold"
                            : "border-brand-gold/5 hover:border-brand-gold/15 text-brand-cream/70"
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={selectedAddons.includes(addon.name)}
                            onChange={() => handleAddonChange(addon.name)}
                            className="rounded border-brand-gold/30 text-brand-gold focus:ring-brand-gold bg-brand-dark cursor-pointer"
                          />
                          <span>{addon.name}</span>
                        </div>
                        <span className="text-brand-gold/90">+৳{addon.price.toFixed(0)}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Special Instructions */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-brand-gold/80 block">
                    Special Instructions
                  </label>
                  <textarea
                    placeholder="E.g., No onions, extra lime, well cooked..."
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    rows={2}
                    className="w-full bg-brand-dark/60 border border-brand-gold/10 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold rounded-lg p-2.5 text-xs text-brand-cream placeholder-brand-cream/30 focus:outline-none transition-colors"
                  />
                </div>
          </div>

      {/* Action Footer (Fixed Footer) */}
      <div className="flex-shrink-0 pt-3 border-t border-brand-gold/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              {/* Quantity Select */}
              <div className="flex items-center justify-between sm:justify-start sm:space-x-4">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-cream/60">
                  Quantity
                </span>
                <div className="flex items-center space-x-3 bg-brand-dark border border-brand-gold/10 rounded-lg p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1 rounded text-brand-cream/70 hover:text-brand-gold transition-colors cursor-pointer"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-sm font-bold w-6 text-center text-brand-cream">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1 rounded text-brand-cream/70 hover:text-brand-gold transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Total & CTA */}
              <div className="flex items-center space-x-2 flex-1 sm:justify-end">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 sm:flex-initial px-6 py-3 border border-brand-gold text-brand-gold hover:bg-brand-gold/10 text-xs font-serif font-bold tracking-widest uppercase rounded-full transition-all cursor-pointer"
                >
                  Add: ৳{(currentPrice * quantity).toFixed(0)}
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 sm:flex-initial px-6 py-3 bg-brand-crimson hover:bg-brand-crimson-hover text-brand-cream text-xs font-serif font-bold tracking-widest uppercase rounded-full transition-all duration-300 cursor-pointer shadow-md hover:shadow-brand-crimson/25"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
