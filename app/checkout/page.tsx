"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import confetti from "canvas-confetti";
import { CreditCard, ShoppingBag, Truck, MapPin, CheckCircle, ArrowLeft, Loader2, Tag, ShieldCheck } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { AIChatbot } from "@/components/chatbot/AIChatbot";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const {
    cart,
    clearCart,
    subtotal,
    deliveryFee,
    tax,
    total,
    promoCode,
    applyPromo,
    discountPercent,
  } = useCart();

  // Form Fields
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    method: "delivery", // delivery | pickup
    address: "",
    apartment: "",
    city: "Dhaka",
    paymentMethod: "card", // card | cod
    cardName: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvv: "",
  });

  // Flow states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [orderItems, setOrderItems] = useState<any[]>([]);
  const [orderTotal, setOrderTotal] = useState(0);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [promoInput, setPromoInput] = useState("");
  const [promoSuccess, setPromoSuccess] = useState(false);
  const [promoError, setPromoError] = useState(false);

  // Delivery tracker step (1: Received, 2: Preparing, 3: Out for delivery, 4: Delivered)
  const [trackerStep, setTrackerStep] = useState(1);

  // Auto increment tracker step for demo purposes
  useEffect(() => {
    if (isOrderPlaced) {
      const interval = setInterval(() => {
        setTrackerStep((prev) => (prev < 4 ? prev + 1 : prev));
      }, 7000); // changes step every 7 seconds in prototype demo
      return () => clearInterval(interval);
    }
  }, [isOrderPlaced]);

  // Force scroll to top on page mount and when order is placed
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  useEffect(() => {
    if (isOrderPlaced) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [isOrderPlaced]);


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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.fullName.trim()) errors.fullName = "Full name is required";
    if (!formData.email.trim()) {
      errors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!formData.phone.trim()) errors.phone = "Phone number is required";

    if (formData.method === "delivery" && !formData.address.trim()) {
      errors.address = "Delivery address is required";
    }

    if (formData.paymentMethod === "card") {
      if (!formData.cardNumber.trim()) {
        errors.cardNumber = "Card number is required";
      } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s+/g, ""))) {
        errors.cardNumber = "Card number must be 16 digits";
      }
      if (!formData.cardExpiry.trim()) {
        errors.cardExpiry = "Expiry date is required";
      } else if (!/^\d{2}\/\d{2}$/.test(formData.cardExpiry)) {
        errors.cardExpiry = "Format must be MM/YY";
      }
      if (!formData.cardCvv.trim()) {
        errors.cardCvv = "CVV is required";
      } else if (!/^\d{3,4}$/.test(formData.cardCvv)) {
        errors.cardCvv = "Must be 3 or 4 digits";
      }
      if (!formData.cardName.trim()) errors.cardName = "Cardholder name is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Capture items and total before clearing cart
    const finalItems = [...cart];
    const finalTotal = total;

    // Simulate order placement delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsOrderPlaced(true);
      setOrderId(`KM-${Math.floor(100000 + Math.random() * 900000)}`);
      setOrderItems(finalItems);
      setOrderTotal(finalTotal);

      // Trigger Confetti Celebration!
      try {
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#c5a059", "#722f37", "#faf7f2"],
        });
      } catch (err) {
        console.error(err);
      }

      // Clear Context Cart
      clearCart();
    }, 2000);
  };

  return (
    <>
      <Navbar />
      <CartDrawer />
      <AIChatbot />

      <main className="flex-grow pt-32 pb-24 bg-brand-dark min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Order Placed Screen */}
          {isOrderPlaced ? (
            <div className="max-w-2xl mx-auto bg-brand-card border border-brand-gold/15 p-8 md:p-12 rounded-3xl text-center space-y-8 shadow-2xl relative">
              <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#c5a059_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

              <div className="w-20 h-20 rounded-full bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center mx-auto text-brand-gold animate-bounce">
                <CheckCircle className="w-12 h-12" />
              </div>

              <div className="space-y-2">
                <h1 className="font-serif text-3xl font-bold text-brand-cream">Feast Ordered Successfully!</h1>
                <p className="text-sm text-brand-cream/60">
                  Order ID: <span className="font-mono text-brand-gold font-bold">{orderId}</span>
                </p>
                <p className="text-xs text-brand-crimson font-bold uppercase tracking-widest">
                  * Prototype Demonstration Only - No Real Charges Made *
                </p>
              </div>

              {/* Order Tracking Progress Bar */}
              <div className="bg-brand-dark/50 border border-brand-gold/10 p-6 rounded-2xl space-y-6">
                <h3 className="font-serif text-xs font-bold text-brand-gold uppercase tracking-wider text-left">
                  Preparation Timeline
                </h3>
                <div className="relative flex justify-between items-center w-full">
                  {/* Line backdrop */}
                  <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[3px] bg-brand-border z-0" />
                  {/* Active line filler */}
                  <div
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-[3px] bg-brand-gold z-0 transition-all duration-1000"
                    style={{ width: `${((trackerStep - 1) / 3) * 100}%` }}
                  />

                  {[
                    { label: "Received", step: 1 },
                    { label: "Preparing", step: 2 },
                    { label: "On The Way", step: 3 },
                    { label: "Delivered", step: 4 },
                  ].map((s) => (
                    <div key={s.step} className="flex flex-col items-center z-10 relative">
                      <div
                        className={`w-7 h-7 rounded-full border flex items-center justify-center text-xs font-bold transition-all ${
                          trackerStep >= s.step
                            ? "bg-brand-gold text-brand-dark border-brand-cream scale-110 shadow-lg"
                            : "bg-brand-dark border-brand-gold/15 text-brand-cream/40"
                        }`}
                      >
                        {s.step}
                      </div>
                      <span
                        className={`text-[9px] font-bold uppercase tracking-wider mt-2 transition-colors ${
                          trackerStep >= s.step ? "text-brand-gold" : "text-brand-cream/35"
                        }`}
                      >
                        {s.label}
                      </span>
                    </div>
                  ))}
                </div>

                <p className="text-xs text-brand-cream/70 text-left bg-brand-card p-3 rounded-lg border border-brand-gold/5 leading-relaxed">
                  {trackerStep === 1 && "🎉 We have received your order. Chef is checking ingredient fresh inventory."}
                  {trackerStep === 2 && "🔥 Spices are roasting! Chef is slow cooking the Nihari and skewering kebabs."}
                  {trackerStep === 3 && "🛵 Your feast is packed in thermal containers. The royal courier is on the road!"}
                  {trackerStep === 4 && "🍽️ Arrived! Bon Appétit! Enjoy your royal dining experience."}
                </p>
              </div>

              {/* Summary details */}
              <div className="border-t border-brand-gold/15 pt-6 text-left space-y-4">
                <h4 className="font-serif text-sm font-bold text-brand-cream">Receipt Details</h4>
                <div className="max-h-40 overflow-y-auto space-y-2 pr-2">
                  {orderItems.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs text-brand-cream/80">
                      <span>
                        {item.name} <span className="text-brand-gold">x{item.quantity}</span>
                      </span>
                      <span>৳{(item.price * item.quantity).toFixed(0)}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center text-sm font-bold text-brand-gold border-t border-brand-gold/10 pt-3">
                  <span>Grand Total Paid</span>
                  <span>৳{orderTotal.toFixed(0)}</span>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/"
                  className="w-full sm:w-auto px-8 py-3 bg-brand-gold text-brand-dark hover:bg-brand-gold-hover font-serif font-bold text-sm tracking-widest uppercase rounded-full transition-all cursor-pointer"
                >
                  Return to Home
                </Link>
                <Link
                  href="/menu"
                  className="w-full sm:w-auto px-8 py-3 border border-brand-gold text-brand-gold hover:bg-brand-gold/10 font-serif font-bold text-sm tracking-widest uppercase rounded-full transition-all cursor-pointer"
                >
                  Order More
                </Link>
              </div>
            </div>
          ) : cart.length === 0 ? (
            /* Empty Cart Checkout state */
            <div className="max-w-md mx-auto bg-brand-card border border-brand-gold/15 p-8 rounded-2xl text-center space-y-6 shadow-xl">
              <div className="w-16 h-16 rounded-full bg-brand-gold/5 border border-brand-gold/15 flex items-center justify-center mx-auto text-brand-gold">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-brand-cream">No Feast to Checkout</h2>
              <p className="text-xs text-brand-cream/60 leading-relaxed">
                Your shopping cart is currently empty. You must select some of Kareem's delicious meals to proceed to the checkout.
              </p>
              <Link
                href="/menu"
                className="inline-block px-8 py-3.5 bg-brand-gold text-brand-dark hover:bg-brand-gold-hover font-serif font-bold text-sm tracking-widest uppercase rounded-full transition-all shadow-md cursor-pointer"
              >
                Go to Menu
              </Link>
            </div>
          ) : (
            /* Checkout Form */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Form columns */}
              <form onSubmit={handlePlaceOrder} className="lg:col-span-7 space-y-6">
                {/* Step 1: Customer Details */}
                <div className="bg-brand-card border border-brand-gold/10 p-6 rounded-2xl space-y-4 shadow-lg">
                  <h2 className="font-serif text-lg font-bold text-brand-gold uppercase tracking-wider border-b border-brand-gold/10 pb-2">
                    1. Royal Customer Details
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs text-brand-cream/70 font-semibold">Full Name</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className={`w-full bg-brand-dark/60 border rounded-lg p-2.5 text-xs text-brand-cream focus:outline-none transition-colors ${
                          formErrors.fullName ? "border-brand-crimson" : "border-brand-gold/15 focus:border-brand-gold"
                        }`}
                        placeholder="Emperor Elon Musk"
                      />
                      {formErrors.fullName && (
                        <p className="text-[10px] text-brand-crimson">{formErrors.fullName}</p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-brand-cream/70 font-semibold">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full bg-brand-dark/60 border rounded-lg p-2.5 text-xs text-brand-cream focus:outline-none transition-colors ${
                          formErrors.phone ? "border-brand-crimson" : "border-brand-gold/15 focus:border-brand-gold"
                        }`}
                        placeholder="+880 17-SPACEX"
                      />
                      {formErrors.phone && (
                        <p className="text-[10px] text-brand-crimson">{formErrors.phone}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-brand-cream/70 font-semibold">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full bg-brand-dark/60 border rounded-lg p-2.5 text-xs text-brand-cream focus:outline-none transition-colors ${
                        formErrors.email ? "border-brand-crimson" : "border-brand-gold/15 focus:border-brand-gold"
                      }`}
                      placeholder="elon@kareemsdhaka.com"
                    />
                    {formErrors.email && (
                      <p className="text-[10px] text-brand-crimson">{formErrors.email}</p>
                    )}
                  </div>
                </div>

                {/* Step 2: Fulfillment Details */}
                <div className="bg-brand-card border border-brand-gold/10 p-6 rounded-2xl space-y-4 shadow-lg">
                  <h2 className="font-serif text-lg font-bold text-brand-gold uppercase tracking-wider border-b border-brand-gold/10 pb-2 flex justify-between items-center">
                    <span>2. Order Fulfilment</span>
                    <span className="flex space-x-1 border border-brand-gold/20 rounded-full p-0.5 bg-brand-dark/50">
                      <button
                        type="button"
                        onClick={() => setFormData((p) => ({ ...p, method: "delivery" }))}
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase transition-all cursor-pointer ${
                          formData.method === "delivery"
                            ? "bg-brand-gold text-brand-dark"
                            : "text-brand-cream/60 hover:text-brand-cream"
                        }`}
                      >
                        Delivery
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData((p) => ({ ...p, method: "pickup" }))}
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase transition-all cursor-pointer ${
                          formData.method === "pickup"
                            ? "bg-brand-gold text-brand-dark"
                            : "text-brand-cream/60 hover:text-brand-cream"
                        }`}
                      >
                        Pickup
                      </button>
                    </span>
                  </h2>

                  {formData.method === "delivery" ? (
                    /* Delivery form fields */
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-xs text-brand-cream/70 font-semibold">Street Address</label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className={`w-full bg-brand-dark/60 border rounded-lg p-2.5 text-xs text-brand-cream focus:outline-none transition-colors ${
                            formErrors.address ? "border-brand-crimson" : "border-brand-gold/15 focus:border-brand-gold"
                          }`}
                          placeholder="Road 11, Banani"
                        />
                        {formErrors.address && (
                          <p className="text-[10px] text-brand-crimson">{formErrors.address}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs text-brand-cream/70 font-semibold">Apartment / Suite</label>
                          <input
                            type="text"
                            name="apartment"
                            value={formData.apartment}
                            onChange={handleInputChange}
                            className="w-full bg-brand-dark/60 border border-brand-gold/15 focus:border-brand-gold rounded-lg p-2.5 text-xs text-brand-cream focus:outline-none"
                            placeholder="Flat 5B"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs text-brand-cream/70 font-semibold">City</label>
                          <select
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            className="w-full bg-brand-dark/60 border border-brand-gold/15 focus:border-brand-gold rounded-lg p-2.5 text-xs text-brand-cream focus:outline-none"
                          >
                            <option value="Dhaka">Dhaka</option>
                            <option value="Chittagong">Chittagong</option>
                            <option value="Sylhet">Sylhet</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Pickup Info */
                    <div className="p-4 bg-brand-dark/60 border border-brand-gold/15 rounded-xl flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
                      <div className="text-xs space-y-1">
                        <h4 className="font-bold text-brand-cream uppercase tracking-wide">
                          Pickup Address:
                        </h4>
                        <p className="text-brand-cream/60">Banani 11, Plot 1, 5th Floor, Dhaka 1212</p>
                        <p className="text-brand-gold/80 mt-2 font-semibold">
                          ⏱️ Est. Ready Time: 25 - 35 minutes
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Step 3: Payment Details */}
                <div className="bg-brand-card border border-brand-gold/10 p-6 rounded-2xl space-y-4 shadow-lg relative">
                  <h2 className="font-serif text-lg font-bold text-brand-gold uppercase tracking-wider border-b border-brand-gold/10 pb-2 flex justify-between items-center">
                    <span>3. Payment Method</span>
                    <span className="flex space-x-1 border border-brand-gold/20 rounded-full p-0.5 bg-brand-dark/50">
                      <button
                        type="button"
                        onClick={() => setFormData((p) => ({ ...p, paymentMethod: "card" }))}
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase transition-all cursor-pointer ${
                          formData.paymentMethod === "card"
                            ? "bg-brand-gold text-brand-dark"
                            : "text-brand-cream/60 hover:text-brand-cream"
                        }`}
                      >
                        Card
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData((p) => ({ ...p, paymentMethod: "cod" }))}
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase transition-all cursor-pointer ${
                          formData.paymentMethod === "cod"
                            ? "bg-brand-gold text-brand-dark"
                            : "text-brand-cream/60 hover:text-brand-cream"
                        }`}
                      >
                        Cash on Delivery
                      </button>
                    </span>
                  </h2>

                  {formData.paymentMethod === "card" ? (
                    <div className="space-y-4">
                      {/* Warning notice */}
                      <div className="p-3 bg-brand-crimson/10 border border-brand-crimson/30 text-brand-cream/80 text-[11px] rounded-lg leading-relaxed flex items-center space-x-2">
                        <span>⚠️ **Prototype Alert**: This checkout is a demo. Please enter mock test numbers only. Do not input actual credit cards.</span>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs text-brand-cream/70 font-semibold">Cardholder Name</label>
                        <input
                          type="text"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleInputChange}
                          className={`w-full bg-brand-dark/60 border rounded-lg p-2.5 text-xs text-brand-cream focus:outline-none transition-colors ${
                            formErrors.cardName ? "border-brand-crimson" : "border-brand-gold/15 focus:border-brand-gold"
                          }`}
                          placeholder="Akbar"
                        />
                        {formErrors.cardName && (
                          <p className="text-[10px] text-brand-crimson">{formErrors.cardName}</p>
                        )}
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs text-brand-cream/70 font-semibold">Card Number</label>
                        <div className="relative">
                          <CreditCard className="w-4 h-4 text-brand-cream/40 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            className={`w-full bg-brand-dark/60 border rounded-lg pl-9 pr-4 p-2.5 text-xs text-brand-cream focus:outline-none transition-colors ${
                              formErrors.cardNumber ? "border-brand-crimson" : "border-brand-gold/15 focus:border-brand-gold"
                            }`}
                            placeholder="4111 2222 3333 4444"
                            maxLength={19}
                          />
                        </div>
                        {formErrors.cardNumber && (
                          <p className="text-[10px] text-brand-crimson">{formErrors.cardNumber}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs text-brand-cream/70 font-semibold">Expiry Date</label>
                          <input
                            type="text"
                            name="cardExpiry"
                            value={formData.cardExpiry}
                            onChange={handleInputChange}
                            className={`w-full bg-brand-dark/60 border rounded-lg p-2.5 text-xs text-brand-cream focus:outline-none transition-colors ${
                              formErrors.cardExpiry ? "border-brand-crimson" : "border-brand-gold/15 focus:border-brand-gold"
                            }`}
                            placeholder="MM/YY"
                            maxLength={5}
                          />
                          {formErrors.cardExpiry && (
                            <p className="text-[10px] text-brand-crimson">{formErrors.cardExpiry}</p>
                          )}
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs text-brand-cream/70 font-semibold">CVV</label>
                          <input
                            type="password"
                            name="cardCvv"
                            value={formData.cardCvv}
                            onChange={handleInputChange}
                            className={`w-full bg-brand-dark/60 border rounded-lg p-2.5 text-xs text-brand-cream focus:outline-none transition-colors ${
                              formErrors.cardCvv ? "border-brand-crimson" : "border-brand-gold/15 focus:border-brand-gold"
                            }`}
                            placeholder="***"
                            maxLength={4}
                          />
                          {formErrors.cardCvv && (
                            <p className="text-[10px] text-brand-crimson">{formErrors.cardCvv}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* COD details */
                    <div className="p-4 bg-brand-dark/60 border border-brand-gold/15 rounded-xl flex items-start space-x-3">
                      <Truck className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
                      <div className="text-xs space-y-1">
                        <h4 className="font-bold text-brand-cream uppercase tracking-wide">
                          Cash / Cashless On Delivery
                        </h4>
                        <p className="text-brand-cream/60">
                          Prepare the exact tribute in cash, or pay via mobile banking (bKash/Nagad) once the royal courier delivers your feast.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </form>

              {/* Right Column: Order Summary */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-brand-card border border-brand-gold/10 p-6 rounded-2xl space-y-6 shadow-lg sticky top-32">
                  <h2 className="font-serif text-lg font-bold text-brand-gold uppercase tracking-wider border-b border-brand-gold/10 pb-2">
                    Order Summary
                  </h2>

                  {/* Cart Items list */}
                  <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
                    {cart.map((item) => (
                      <div key={item.id} className="flex justify-between items-start text-xs border-b border-brand-gold/5 pb-3">
                        <div className="space-y-1">
                          <h4 className="font-semibold text-brand-cream">{item.name}</h4>
                          <div className="flex text-[10px] text-brand-cream/40 space-x-2">
                            <span>Qty: {item.quantity}</span>
                            <span>•</span>
                            <span>Spice: {item.spiceLevel}</span>
                          </div>
                        </div>
                        <span className="font-semibold text-brand-gold">
                            ৳{(item.price * item.quantity).toFixed(0)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Promo Form inside checkout */}
                  <form onSubmit={handleApplyPromo} className="flex space-x-2">
                    <div className="relative flex-1">
                      <Tag className="w-4.5 h-4.5 text-brand-cream/30 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Promo Code (ROYAL15)"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        className="w-full bg-brand-dark border border-brand-gold/10 focus:border-brand-gold rounded-full pl-9 pr-4 py-2 text-xs text-brand-cream placeholder-brand-cream/35 focus:outline-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-brand-dark hover:bg-brand-gold/10 border border-brand-gold/25 text-brand-cream text-xs font-semibold rounded-full cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>

                  {promoSuccess && (
                    <p className="text-xs text-green-400 flex items-center space-x-1 mt-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Promo ROYAL15 applied! (15% discount)</span>
                    </p>
                  )}
                  {promoError && (
                    <p className="text-xs text-brand-crimson mt-1">Invalid code. Try ROYAL15.</p>
                  )}

                  {/* Totals panel */}
                  <div className="space-y-2.5 text-xs border-t border-brand-gold/10 pt-4">
                    <div className="flex justify-between text-brand-cream/70">
                      <span>Subtotal</span>
                      <span>৳{subtotal.toFixed(0)}</span>
                    </div>
                    {discountPercent > 0 && (
                      <div className="flex justify-between text-green-400 font-semibold">
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
                    <div className="flex justify-between text-base font-bold text-brand-gold border-t border-brand-gold/10 pt-2.5">
                      <span>Total Amount</span>
                      <span>৳{total.toFixed(0)}</span>
                    </div>
                  </div>

                  {/* Submit CTA */}
                  <button
                    onClick={handlePlaceOrder}
                    disabled={isSubmitting}
                    className="w-full bg-brand-crimson hover:bg-brand-crimson-hover text-brand-cream font-serif font-bold text-sm tracking-widest uppercase py-3 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-brand-crimson/25 disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        <span>Sending Order...</span>
                      </>
                    ) : (
                      <span>Place Royal Order</span>
                    )}
                  </button>

                  <Link
                    href="/menu"
                    className="text-xs text-brand-cream/40 hover:text-brand-gold flex items-center justify-center space-x-1 cursor-pointer pt-2 hover:underline"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to Menu</span>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
