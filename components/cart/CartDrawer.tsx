"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, Trash2, Plus, Minus, Tag, ShieldCheck } from "lucide-react";
import { useCart } from "@/context/CartContext";

export const CartDrawer = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    deliveryFee,
    tax,
    total,
    promoCode,
    applyPromo,
    discountPercent,
  } = useCart();

  const [promoInput, setPromoInput] = useState("");
  const [promoError, setPromoError] = useState(false);
  const [promoSuccess, setPromoSuccess] = useState(false);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError(false);
    setPromoSuccess(false);

    if (applyPromo(promoInput)) {
      setPromoSuccess(true);
    } else {
      setPromoError(true);
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 z-[100] w-full max-w-md bg-brand-dark border-l border-brand-gold/10 flex flex-col shadow-2xl h-full"
          >
            {/* Header */}
            <div className="p-6 border-b border-brand-gold/10 flex items-center justify-between bg-brand-card/40">
              <div className="flex items-center space-x-2">
                <span className="font-serif text-lg font-bold text-brand-gold uppercase tracking-wider">
                  Your Royal Feast
                </span>
                <span className="text-xs bg-brand-gold/10 border border-brand-gold/20 text-brand-gold px-2 py-0.5 rounded-full font-bold">
                  {cart.length} item{cart.length !== 1 && "s"}
                </span>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1 rounded-full text-brand-cream/60 hover:text-brand-gold transition-colors hover:bg-brand-card cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4 py-12">
                  <div className="w-16 h-16 rounded-full bg-brand-gold/5 flex items-center justify-center border border-brand-gold/10">
                    <Trash2 className="w-8 h-8 text-brand-gold/40" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-brand-cream">Cart is Empty</h3>
                  <p className="text-sm text-brand-cream/50 max-w-xs">
                    You haven't added any of Kareem's royal dishes yet. Head over to our menu to start your feast.
                  </p>
                  <Link
                    href="/menu"
                    onClick={() => setIsCartOpen(false)}
                    className="mt-4 px-6 py-2.5 bg-brand-gold text-brand-dark hover:bg-brand-gold-hover text-sm font-semibold rounded-full tracking-wide transition-all shadow-md"
                  >
                    Browse Menu
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex space-x-4 p-3 bg-brand-card/30 border border-brand-gold/5 rounded-xl hover:border-brand-gold/10 transition-colors"
                    >
                      {/* Image */}
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border border-brand-gold/10">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h4 className="font-serif text-sm font-medium text-brand-cream line-clamp-1">
                              {item.name}
                            </h4>
                            <span className="text-sm font-semibold text-brand-gold ml-2">
                              ৳{(item.price * item.quantity).toFixed(0)}
                            </span>
                          </div>
                          <p className="text-xs text-brand-gold/70 mt-0.5">
                            Spice: {item.spiceLevel}
                          </p>
                          {item.addons.length > 0 && (
                            <p className="text-[10px] text-brand-cream/50 mt-0.5 line-clamp-1">
                              + {item.addons.join(", ")}
                            </p>
                          )}
                        </div>

                        {/* Controls */}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center space-x-1 bg-brand-card rounded-md border border-brand-gold/10 p-0.5">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 text-brand-cream/60 hover:text-brand-gold transition-colors cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-semibold px-2 text-brand-cream">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 text-brand-cream/60 hover:text-brand-gold transition-colors cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-1.5 rounded-full hover:bg-brand-crimson/10 text-brand-cream/40 hover:text-brand-crimson transition-all cursor-pointer"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Sticky Footer */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-brand-gold/10 bg-brand-card/60 space-y-4">
                {/* Promo Code Input */}
                <form onSubmit={handleApplyPromo} className="flex space-x-2">
                  <div className="relative flex-1">
                    <Tag className="w-4 h-4 text-brand-cream/40 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Promo Code (e.g. ROYAL15)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="w-full bg-brand-dark/50 border border-brand-gold/10 focus:border-brand-gold rounded-full pl-9 pr-4 py-2 text-xs text-brand-cream placeholder-brand-cream/30 focus:outline-none transition-colors"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-brand-card hover:bg-brand-gold/10 border border-brand-gold/20 hover:border-brand-gold text-brand-cream text-xs font-semibold rounded-full transition-all cursor-pointer"
                  >
                    Apply
                  </button>
                </form>

                {promoSuccess && (
                  <p className="text-xs text-green-400 flex items-center space-x-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Promo code ROYAL15 applied! (15% off)</span>
                  </p>
                )}
                {promoError && (
                  <p className="text-xs text-brand-crimson">Invalid promo code. Try ROYAL15.</p>
                )}

                {/* Subtotal, Tax, Delivery, Total */}
                <div className="space-y-2 text-sm border-t border-brand-gold/10 pt-4">
                  <div className="flex justify-between text-brand-cream/70">
                    <span>Subtotal</span>
                    <span>৳{subtotal.toFixed(0)}</span>
                  </div>
                  {discountPercent > 0 && (
                    <div className="flex justify-between text-green-400">
                      <span>Discount (15%)</span>
                      <span>-৳{(subtotal * 0.15).toFixed(0)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-brand-cream/70">
                    <span>Delivery Fee</span>
                    <span>{deliveryFee === 0 ? "FREE" : `৳${deliveryFee.toFixed(0)}`}</span>
                  </div>
                  <div className="flex justify-between text-brand-cream/70">
                    <span>Tax (8%)</span>
                    <span>৳{tax.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-brand-gold border-t border-brand-gold/10 pt-2">
                    <span>Total Amount</span>
                    <span>৳{total.toFixed(0)}</span>
                  </div>
                </div>

                {/* Checkout Link */}
                <Link
                  href="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full bg-brand-crimson hover:bg-brand-crimson-hover text-brand-cream font-serif font-bold text-sm tracking-widest uppercase py-3 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-brand-crimson/25 cursor-pointer mt-2"
                >
                  Proceed to Checkout
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
