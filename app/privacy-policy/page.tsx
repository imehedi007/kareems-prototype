"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { AIChatbot } from "@/components/chatbot/AIChatbot";
import { ShieldCheck, Lock, Eye, FileText, ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      <CartDrawer />
      <AIChatbot />

      <main className="flex-grow pt-32 pb-24 bg-brand-dark relative overflow-hidden">
        {/* Background Decorative Ripples */}
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#c5a059_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Back Button */}
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-xs font-serif font-bold tracking-widest text-brand-gold hover:text-brand-gold-hover uppercase mb-8 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Return to Court</span>
          </Link>

          {/* Heading block */}
          <div className="mb-12">
            <span className="text-xs font-bold tracking-widest text-brand-gold uppercase flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-brand-gold" />
              <span>Royal Data Protection</span>
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-brand-cream mt-2 tracking-wide">
              Privacy & Decorum Policy
            </h1>
            <div className="w-12 h-0.5 bg-brand-gold mt-4" />
            <p className="text-xs text-brand-cream/40 mt-3 font-mono">
              Last updated: July 11, 2026
            </p>
          </div>

          {/* Content Card */}
          <div className="glass border border-brand-gold/15 rounded-3xl p-8 md:p-12 space-y-8 shadow-2xl">
            {/* Intro */}
            <div className="space-y-3">
              <h2 className="font-serif text-lg font-bold text-brand-gold flex items-center space-x-2 uppercase tracking-wide">
                <Eye className="w-5 h-5" />
                <span>1. Royal Custodians of Privacy</span>
              </h2>
              <p className="text-xs sm:text-sm text-brand-cream/70 leading-relaxed">
                At Kareem's, your privacy is treated with the same meticulous care as our culinary recipes. This policy describes how we collect, store, and shield the information gathered when you visit our digital chambers or order our royal feasts.
              </p>
            </div>

            {/* Collected Information */}
            <div className="space-y-3">
              <h2 className="font-serif text-lg font-bold text-brand-gold flex items-center space-x-2 uppercase tracking-wide">
                <FileText className="w-5 h-5" />
                <span>2. Information We Collect</span>
              </h2>
              <p className="text-xs sm:text-sm text-brand-cream/70 leading-relaxed">
                To prepare and deliver your royal meals, we collect basic details. These are gathered solely when you perform checkouts or interact with our services:
              </p>
              <ul className="list-disc list-inside text-xs sm:text-sm text-brand-cream/60 space-y-1.5 pl-2 leading-relaxed">
                <li><strong className="text-brand-cream">Identity Data</strong>: Full Name (e.g., Emperor Elon Musk) used for orders.</li>
                <li><strong className="text-brand-cream">Contact Information</strong>: Telephone numbers (for delivery riders) and email addresses (for order receipts).</li>
                <li><strong className="text-brand-cream">Address Details</strong>: Physical streets and coordinates in Dhaka to direct our couriers.</li>
                <li><strong className="text-brand-cream">Cart & Promo Selection</strong>: Local storage lists to remember your custom spice preferences and active codes like <code className="text-brand-gold">ROYAL15</code>.</li>
              </ul>
            </div>

            {/* Data Usage */}
            <div className="space-y-3">
              <h2 className="font-serif text-lg font-bold text-brand-gold flex items-center space-x-2 uppercase tracking-wide">
                <Lock className="w-5 h-5" />
                <span>3. Data Protection and Mock Transactions</span>
              </h2>
              <p className="text-xs sm:text-sm text-brand-cream/70 leading-relaxed">
                As this website serves as an interactive e-commerce prototype, all transactions are strictly mock-ups:
              </p>
              <ul className="list-disc list-inside text-xs sm:text-sm text-brand-cream/60 space-y-1.5 pl-2 leading-relaxed">
                <li>We <strong className="text-brand-cream">never</strong> store or submit real financial details (credit card numbers, CVVs, pin codes) to databases.</li>
                <li>Inputs are checked client-side using deterministic regex models and immediately discarded.</li>
                <li>No user information is shared, sold, or distributed to third-party commercial syndicates.</li>
              </ul>
            </div>

            {/* Cookies */}
            <div className="space-y-3">
              <h2 className="font-serif text-lg font-bold text-brand-gold flex items-center space-x-2 uppercase tracking-wide">
                <Lock className="w-5 h-5" />
                <span>4. Local Storage and Cookies</span>
              </h2>
              <p className="text-xs sm:text-sm text-brand-cream/70 leading-relaxed">
                We employ local browser state data storage mechanisms to optimize your experience. This is restricted to:
              </p>
              <ul className="list-disc list-inside text-xs sm:text-sm text-brand-cream/60 space-y-1.5 pl-2 leading-relaxed">
                <li>Remembering items placed inside your cart drawer.</li>
                <li>Storing active discount status and promo inputs.</li>
                <li>Ensuring layout state remains consistent on page updates.</li>
              </ul>
            </div>

            {/* Contact */}
            <div className="space-y-3 pt-6 border-t border-brand-gold/10">
              <h3 className="font-serif text-sm font-bold text-brand-gold uppercase tracking-wider">
                Chamber Enquiries
              </h3>
              <p className="text-xs sm:text-sm text-brand-cream/70 leading-relaxed">
                If you have questions regarding this privacy statement or our digital prototype, please contact our grand hall directly:
              </p>
              <p className="text-xs font-mono text-brand-gold mt-1">
                Kareem's Dhaka, Plot 1, Road 11 (5th Floor), Banani, Dhaka. <br />
                Telephone: +880 1678-222087 | Email: elon@kareemsdhaka.com
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
