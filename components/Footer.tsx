import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-brand-dark/95 border-t border-brand-gold/10 text-brand-cream/70 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        {/* About Section */}
        <div>
          <div className="flex items-center mb-4">
            <div className="relative w-[130px] h-[52px]">
              <Image
                src="/images/kareems_logo_transparent.webp"
                alt="Kareem's Logo"
                fill
                className="object-contain"
                sizes="130px"
              />
            </div>
          </div>
          <p className="text-sm leading-relaxed mb-6">
            Preserving the legacy of Royal Mughal cuisine with rich flavors, authentic recipes, and a luxurious dining experience.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="p-2 bg-brand-card hover:bg-brand-gold/20 hover:text-brand-gold rounded-full border border-brand-gold/10 transition-colors" aria-label="Facebook">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M9 8H7v3h2v9h3v-9h3l.5-3H12V6c0-.9.2-1.2 1.1-1.2H15V2h-3c-3.1 0-5 1.6-5 4.8V8z" />
              </svg>
            </a>
            <a href="#" className="p-2 bg-brand-card hover:bg-brand-gold/20 hover:text-brand-gold rounded-full border border-brand-gold/10 transition-colors" aria-label="Instagram">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a href="#" className="p-2 bg-brand-card hover:bg-brand-gold/20 hover:text-brand-gold rounded-full border border-brand-gold/10 transition-colors" aria-label="Twitter">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-serif text-md font-bold tracking-wider text-brand-gold mb-4 uppercase">
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-brand-gold transition-colors">Home</Link>
            </li>
            <li>
              <Link href="/menu" className="hover:text-brand-gold transition-colors">Our Menu</Link>
            </li>
            <li>
              <Link href="/checkout" className="hover:text-brand-gold transition-colors">Checkout</Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-brand-gold transition-colors">Contact Us</Link>
            </li>
            <li>
              <Link href="/privacy-policy" className="hover:text-brand-gold transition-colors">Privacy Policy</Link>
            </li>
          </ul>
        </div>

        {/* Contact info */}
        <div>
          <h4 className="font-serif text-md font-bold tracking-wider text-brand-gold mb-4 uppercase">
            Visit Us
          </h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start space-x-2">
              <MapPin className="w-4 h-4 text-brand-gold flex-shrink-0 mt-1" />
              <span>Banani 11, Plot 1, 5th Floor, Dhaka 1212</span>
            </li>
            <li className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-brand-gold flex-shrink-0" />
              <a href="tel:+8801678222087" className="hover:text-brand-gold transition-colors">+880 1678-222087</a>
            </li>
            <li className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-brand-gold flex-shrink-0" />
              <a href="mailto:info@kareemsbd.com" className="hover:text-brand-gold transition-colors">info@kareemsbd.com</a>
            </li>
          </ul>
        </div>

        {/* Opening Hours */}
        <div>
          <h4 className="font-serif text-md font-bold tracking-wider text-brand-gold mb-4 uppercase">
            Hours of Royalty
          </h4>
          <ul className="space-y-2 text-sm">
            <li className="flex justify-between">
              <span>Monday - Friday</span>
              <span>12:00 PM - 12:00 AM</span>
            </li>
            <li className="flex justify-between">
              <span>Saturday - Sunday</span>
              <span>11:00 AM - 01:00 AM</span>
            </li>
            <li className="text-xs text-brand-gold mt-4">
              * Kitchen closes 30 mins before closing time.
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-brand-gold/10 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-brand-cream/40">
        <p>&copy; {new Date().getFullYear()} Kareem's. All rights reserved.</p>
        <p>Developed by <a href="https://synexdigital.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold transition-colors font-medium text-brand-gold">Synex Digital</a>.</p>
      </div>
    </footer>
  );
};
