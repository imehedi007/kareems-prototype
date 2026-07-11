"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { AIChatbot } from "@/components/chatbot/AIChatbot";
import { Phone, Mail, MapPin, Clock, Send, ShieldCheck, HelpCircle } from "lucide-react";
import confetti from "canvas-confetti";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Reservation Enquiry",
    message: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic Validation
    const errors = { name: "", email: "", message: "" };
    let hasError = false;

    if (!formData.name.trim()) {
      errors.name = "Full name is required";
      hasError = true;
    }

    if (!formData.email.trim()) {
      errors.email = "Email address is required";
      hasError = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Invalid email format";
      hasError = true;
    }

    if (!formData.message.trim()) {
      errors.message = "Message content is required";
      hasError = true;
    }

    if (hasError) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);

    // Simulate database submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Delighted confetti effect
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#c5a059", "#722f37", "#faf7f2"],
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "Reservation Enquiry",
        message: "",
      });
    }, 1200);
  };

  return (
    <>
      <Navbar />
      <CartDrawer />
      <AIChatbot />

      <main className="flex-grow pt-32 pb-24 bg-brand-dark relative overflow-hidden">
        {/* Background Decorative Rings */}
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#c5a059_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <span className="text-xs font-bold tracking-widest text-brand-gold uppercase block">
              Contact Chambers
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-brand-cream mt-2 tracking-wide">
              Connect With Our Stewards
            </h1>
            <div className="w-12 h-0.5 bg-brand-gold mx-auto mt-4" />
            <p className="text-sm text-brand-cream/60 mt-3 leading-relaxed">
              Reserve tables, request banquets, or share your feedback with our royal managers. We aim to respond before the next twilight.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Column: Contact details (5 cols) */}
            <div className="lg:col-span-5 flex flex-col space-y-6">
              {/* Image Banner */}
              <div className="relative h-48 rounded-2xl overflow-hidden border border-brand-gold/15 shadow-lg">
                <Image
                  src="/images/banner_002.webp"
                  alt="Kareem's Dining Hall"
                  fill
                  className="object-cover object-left opacity-70"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <span className="text-[10px] tracking-widest text-brand-gold uppercase font-serif font-bold">
                    Banani Chambers
                  </span>
                  <h3 className="font-serif text-lg font-bold text-brand-cream mt-1">
                    Dhaka, Bangladesh
                  </h3>
                </div>
              </div>

              {/* Details card */}
              <div className="glass border border-brand-gold/15 rounded-2xl p-8 flex-grow space-y-6">
                <h3 className="font-serif text-lg font-bold text-brand-gold uppercase tracking-wide">
                  Chamber Coordinates
                </h3>

                <ul className="space-y-4 text-xs sm:text-sm text-brand-cream/70">
                  <li className="flex items-start space-x-3.5">
                    <MapPin className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-brand-cream block font-semibold mb-0.5">Physical Address</strong>
                      <span>Plot 1, Road 11 (5th Floor), Banani, Dhaka 1212</span>
                    </div>
                  </li>

                  <li className="flex items-start space-x-3.5">
                    <Phone className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-brand-cream block font-semibold mb-0.5">General Line</strong>
                      <a href="tel:+8801678222087" className="hover:text-brand-gold transition-colors font-mono">
                        +880 1678-222087
                      </a>
                    </div>
                  </li>

                  <li className="flex items-start space-x-3.5">
                    <Mail className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-brand-cream block font-semibold mb-0.5">Correspondence Email</strong>
                      <a href="mailto:info@kareemsbd.com" className="hover:text-brand-gold transition-colors">
                        info@kareemsbd.com
                      </a>
                    </div>
                  </li>

                  <li className="flex items-start space-x-3.5">
                    <Clock className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-brand-cream block font-semibold mb-0.5">Kitchen Hours</strong>
                      <span className="block text-xs">Mon - Fri: 12:00 PM - 12:00 AM</span>
                      <span className="block text-xs mt-0.5">Sat - Sun: 11:00 AM - 01:00 AM</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Column: Contact form (7 cols) */}
            <div className="lg:col-span-7 flex">
              <div className="glass border border-brand-gold/15 rounded-2xl p-8 md:p-10 w-full flex flex-col shadow-2xl">
                {submitSuccess ? (
                  <div className="text-center py-16 space-y-4 my-auto">
                    <div className="w-16 h-16 bg-brand-gold/10 text-brand-gold rounded-full flex items-center justify-center mx-auto border border-brand-gold/20 shadow-md">
                      <ShieldCheck className="w-8 h-8" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-serif text-2xl font-bold text-brand-cream">
                        Message Dispatched
                      </h3>
                      <p className="text-xs sm:text-sm text-brand-cream/60 max-w-sm mx-auto leading-relaxed">
                        Your message has been delivered to our stewards. We will get in touch with you shortly.
                      </p>
                    </div>
                    <button
                      onClick={() => setSubmitSuccess(false)}
                      className="px-6 py-2 bg-brand-gold hover:bg-brand-gold-hover text-brand-dark text-xs font-serif font-bold tracking-widest uppercase rounded-full transition-all cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="flex-grow flex flex-col justify-between">
                    <div className="flex-grow flex flex-col mb-6">
                      <h3 className="font-serif text-lg font-bold text-brand-gold uppercase tracking-wide mb-4">
                        Send An Inquiry
                      </h3>

                      <div className="space-y-4 flex-grow flex flex-col">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Name Input */}
                          <div className="space-y-1">
                            <label className="text-xs text-brand-cream/70 font-semibold">Your Name</label>
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              className={`w-full bg-brand-dark/60 border rounded-lg p-2.5 text-xs text-brand-cream focus:outline-none transition-colors ${
                                formErrors.name ? "border-brand-crimson" : "border-brand-gold/10 focus:border-brand-gold"
                              }`}
                              placeholder="Emperor Elon Musk"
                            />
                            {formErrors.name && (
                              <p className="text-[10px] text-brand-crimson">{formErrors.name}</p>
                            )}
                          </div>

                          {/* Email Input */}
                          <div className="space-y-1">
                            <label className="text-xs text-brand-cream/70 font-semibold">Email Address</label>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              className={`w-full bg-brand-dark/60 border rounded-lg p-2.5 text-xs text-brand-cream focus:outline-none transition-colors ${
                                formErrors.email ? "border-brand-crimson" : "border-brand-gold/10 focus:border-brand-gold"
                              }`}
                              placeholder="elon@kareemsdhaka.com"
                            />
                            {formErrors.email && (
                              <p className="text-[10px] text-brand-crimson">{formErrors.email}</p>
                            )}
                          </div>
                        </div>

                        {/* Subject Select */}
                        <div className="space-y-1">
                          <label className="text-xs text-brand-cream/70 font-semibold">Enquiry Subject</label>
                          <div className="relative">
                            <select
                              name="subject"
                              value={formData.subject}
                              onChange={handleInputChange}
                              className="w-full bg-brand-dark/60 border border-brand-gold/10 rounded-lg p-2.5 text-xs text-brand-cream focus:outline-none appearance-none cursor-pointer focus:border-brand-gold"
                            >
                              <option value="Reservation Enquiry">Reservation Enquiry</option>
                              <option value="Catering & Banquets">Catering & Banquets</option>
                              <option value="Feedback & Commendations">Feedback & Commendations</option>
                              <option value="General Query">General Query</option>
                            </select>
                            <HelpCircle className="w-4 h-4 text-brand-gold/50 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                          </div>
                        </div>

                        {/* Message Input */}
                        <div className="space-y-1 flex-grow flex flex-col">
                          <label className="text-xs text-brand-cream/70 font-semibold">Your Message</label>
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            className={`w-full flex-grow min-h-[150px] resize-none bg-brand-dark/60 border rounded-lg p-2.5 text-xs text-brand-cream focus:outline-none transition-colors ${
                              formErrors.message ? "border-brand-crimson" : "border-brand-gold/10 focus:border-brand-gold"
                            }`}
                            placeholder="Write your culinary queries here..."
                          />
                          {formErrors.message && (
                            <p className="text-[10px] text-brand-crimson">{formErrors.message}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Submit CTA */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-brand-crimson hover:bg-brand-crimson-hover text-brand-cream font-serif font-bold text-xs tracking-widest uppercase py-3 rounded-full flex items-center justify-center space-x-2 transition-all duration-300 shadow-lg hover:shadow-brand-crimson/25 disabled:opacity-50 cursor-pointer mt-2"
                    >
                      <span>{isSubmitting ? "Dispatching..." : "Send Message"}</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
