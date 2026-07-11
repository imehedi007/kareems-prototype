"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

export const Navbar = () => {
  const { setIsCartOpen, cartCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "py-3 bg-brand-dark/80 backdrop-blur-md border-b border-brand-gold/10"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative w-[120px] h-[48px]">
              <Image
                src="/images/kareems_logo_transparent.webp"
                alt="Kareem's Logo"
                fill
                className="object-contain"
                sizes="120px"
                priority
              />
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`font-serif text-sm tracking-widest uppercase transition-colors hover:text-brand-gold ${
                isActive("/") ? "text-brand-gold border-b border-brand-gold/40" : "text-brand-cream/80"
              }`}
            >
              Home
            </Link>
            <Link
              href="/menu"
              className={`font-serif text-sm tracking-widest uppercase transition-colors hover:text-brand-gold ${
                isActive("/menu") ? "text-brand-gold border-b border-brand-gold/40" : "text-brand-cream/80"
              }`}
            >
              Menu
            </Link>
            <Link
              href="/contact"
              className={`font-serif text-sm tracking-widest uppercase transition-colors hover:text-brand-gold ${
                isActive("/contact") ? "text-brand-gold border-b border-brand-gold/40" : "text-brand-cream/80"
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full border border-brand-gold/20 hover:border-brand-gold/50 bg-brand-card/50 transition-all duration-300 group hover:scale-105 cursor-pointer"
              aria-label="Open cart"
            >
              <ShoppingBag className="w-5 h-5 text-brand-cream group-hover:text-brand-gold transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-crimson text-brand-cream font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center border border-brand-dark animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 md:hidden text-brand-cream hover:text-brand-gold transition-colors cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-0 z-40 bg-brand-dark transition-all duration-300 md:hidden flex flex-col justify-center items-center ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none translate-y-4"
        }`}
      >
        <nav className="flex flex-col items-center space-y-8 text-center">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`font-serif text-xl tracking-widest uppercase ${
              isActive("/") ? "text-brand-gold" : "text-brand-cream/80"
            }`}
          >
            Home
          </Link>
          <Link
            href="/menu"
            onClick={() => setMobileMenuOpen(false)}
            className={`font-serif text-xl tracking-widest uppercase ${
              isActive("/menu") ? "text-brand-gold" : "text-brand-cream/80"
            }`}
          >
            Menu
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className={`font-serif text-xl tracking-widest uppercase ${
              isActive("/contact") ? "text-brand-gold" : "text-brand-cream/80"
            }`}
          >
            Contact
          </Link>
        </nav>
      </div>
    </>
  );
};
