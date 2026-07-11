"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ArrowRight, Flame, Clock, MapPin, Phone, Star, ShieldCheck, ShoppingCart, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { AIChatbot } from "@/components/chatbot/AIChatbot";
import { menuItems } from "@/data/menu";
import { ProductDetailsModal } from "@/components/menu/ProductDetailsModal";
import { useCart } from "@/context/CartContext";

export default function Home() {
  const { addToCart, setIsCartOpen } = useCart();
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [timeLeft, setTimeLeft] = useState(9912); // seconds remaining for mock countdown

  // Ref for hero animations
  const heroRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const descRef = useRef<HTMLParagraphElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);

  // Refs and states for Poster Gallery
  const gallerySectionRef = useRef<HTMLDivElement | null>(null);
  const galleryTrackRef = useRef<HTMLDivElement | null>(null);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [manualOffset, setManualOffset] = useState(0);

  const isDragging = useRef(false);
  const startX = useRef(0);
  const startManualOffset = useRef(0);

  const clampOffset = (offset: number) => {
    if (!galleryTrackRef.current) return offset;
    const trackWidth = galleryTrackRef.current.scrollWidth;
    const viewportWidth = window.innerWidth;
    const maxShift = trackWidth - viewportWidth + 64; // pad offset
    if (maxShift <= 0) return 0;
    return Math.max(-maxShift, Math.min(0, offset));
  };

  const handlePrev = () => {
    const currentCombined = scrollOffset + manualOffset;
    const targetCombined = clampOffset(currentCombined + 312);
    setManualOffset(targetCombined - scrollOffset);
  };

  const handleNext = () => {
    const currentCombined = scrollOffset + manualOffset;
    const targetCombined = clampOffset(currentCombined - 312);
    setManualOffset(targetCombined - scrollOffset);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.pageX;
    startManualOffset.current = manualOffset;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const deltaX = e.pageX - startX.current;
    const targetCombined = clampOffset(scrollOffset + startManualOffset.current + deltaX);
    setManualOffset(targetCombined - scrollOffset);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const posters = [
    { src: "/images/banner_001.webp", bgFrame: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)" },
    { src: "/images/banner_003.webp", bgFrame: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)" },
    { src: "/images/banner_004.webp", bgFrame: "linear-gradient(135deg, #fddb92 0%, #d1f9ff 100%)" },
    { src: "/images/banner_005.webp", bgFrame: "linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)" },
    { src: "/images/banner_007.webp", bgFrame: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)" },
    { src: "/images/banner_008.webp", bgFrame: "linear-gradient(135deg, #fddb92 0%, #d1f9ff 100%)" },
    { src: "/images/banner_009.webp", bgFrame: "linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)" },
  ];

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 9912));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${h.toString().padStart(2, "0")}h ${m.toString().padStart(2, "0")}m ${s.toString().padStart(2, "0")}s`;
  };

  // Poster gallery scroll slide effect
  useEffect(() => {
    const handleScroll = () => {
      if (!gallerySectionRef.current || !galleryTrackRef.current) return;

      const section = gallerySectionRef.current;
      const track = galleryTrackRef.current;

      const rect = section.getBoundingClientRect();
      const sectionHeight = rect.height;
      const viewportHeight = window.innerHeight;

      if (rect.top < viewportHeight && rect.bottom > 0) {
        const totalScrollableDistance = sectionHeight + viewportHeight;
        const scrolledPast = viewportHeight - rect.top;
        const progress = Math.max(0, Math.min(1, scrolledPast / totalScrollableDistance));

        const trackWidth = track.scrollWidth;
        const viewportWidth = window.innerWidth;
        const maxShift = trackWidth - viewportWidth + 64; // pad offset

        if (maxShift > 0) {
          const offset = -progress * maxShift;
          setScrollOffset(offset);
          setManualOffset((prev) => {
            const currentCombined = offset + prev;
            const clampedCombined = Math.max(-maxShift, Math.min(0, currentCombined));
            return clampedCombined - offset;
          });
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // GSAP entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        heroRef.current,
        { scale: 1.15, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.8 }
      );
      tl.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=1.2"
      );
      tl.fromTo(
        descRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.6"
      );
      tl.fromTo(
        ctaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        "-=0.4"
      );
    });
    return () => ctx.revert();
  }, []);

  // Simple scroll reveal handler
  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");
    const handleScroll = () => {
      reveals.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          el.classList.add("active");
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // run once on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Filter 3 popular dishes for featured section
  const featuredDishes = menuItems.filter((item) =>
    ["biryani_001", "kebab_001", "curry_001"].includes(item.id)
  );

  return (
    <>
      <Navbar />
      <CartDrawer />
      <AIChatbot />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
        {/* Background Image with Overlay */}
        <div ref={heroRef} className="absolute inset-0 z-0">
          <Image
            src="/images/banner_002.webp"
            alt="Kareem's interior"
            fill
            className="object-cover opacity-35"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-transparent to-brand-dark/20" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-brand-gold/10 border border-brand-gold/25 text-brand-gold rounded-full text-xs font-semibold tracking-wider uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Dhaka's Finest Mughlai Heritage</span>
          </div>
          <h1
            ref={titleRef}
            className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-wider leading-tight text-brand-cream"
          >
            Experience <br className="hidden sm:inline" />
            <span className="text-brand-gold">Mughlai Royalty</span>
          </h1>
          <p
            ref={descRef}
            className="text-base sm:text-lg text-brand-cream/80 max-w-2xl mx-auto leading-relaxed"
          >
            Indulge in authentic recipes crafted for kings. Experience our slow-cooked signature dishes, aromatic biryanis, and flame-grilled kebabs.
          </p>
          <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/menu"
              className="w-full sm:w-auto px-8 py-3.5 bg-brand-crimson hover:bg-brand-crimson-hover text-brand-cream font-serif font-bold text-sm tracking-widest uppercase rounded-full transition-all duration-300 shadow-lg hover:shadow-brand-crimson/25 flex items-center justify-center space-x-2 group cursor-pointer"
            >
              <span>Order Now</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/menu"
              className="w-full sm:w-auto px-8 py-3.5 border border-brand-gold text-brand-gold hover:bg-brand-gold/10 font-serif font-bold text-sm tracking-widest uppercase rounded-full transition-all flex items-center justify-center cursor-pointer"
            >
              Explore Menu
            </Link>
          </div>
        </div>
      </section>

      {/* Category Showcase Section */}
      <section className="py-16 bg-brand-dark border-t border-brand-gold/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold tracking-widest text-brand-gold uppercase">
              Explore Our Palace
            </span>
            <h2 className="font-serif text-3xl font-bold text-brand-cream mt-1">Culinary Categories</h2>
            <div className="w-12 h-0.5 bg-brand-gold mx-auto mt-3" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Kebabs", key: "kebab", img: "/images/kebab_001.webp", desc: "Flame-grilled delicacies" },
              { name: "Biryanis", key: "biryani", img: "/images/biryani_001.webp", desc: "Fragrant rice layers" },
              { name: "Curries", key: "curry", img: "/images/curry_001.webp", desc: "Rich spiced gravies" },
              { name: "Dessert", key: "dessert", img: "/images/dessert.webp", desc: "Royal sweet endings" },
            ].map((cat) => (
              <Link
                key={cat.key}
                href={`/menu?cat=${cat.key}`}
                className="group relative h-72 rounded-2xl overflow-hidden border border-brand-gold/10 hover:border-brand-gold/30 transition-all duration-300 shadow-md hover:scale-[1.02] cursor-pointer"
              >
                <Image
                  src={cat.img}
                  alt={cat.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-60"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="font-serif text-lg font-bold text-brand-cream group-hover:text-brand-gold transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-[10px] text-brand-cream/60 mt-1 uppercase tracking-wide">
                    {cat.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Dishes Section */}
      <section className="py-20 bg-brand-card/20 border-t border-brand-gold/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold tracking-widest text-brand-gold uppercase">
              Chef's Masterpieces
            </span>
            <h2 className="font-serif text-3xl font-bold text-brand-cream mt-1">Featured Royal Creations</h2>
            <div className="w-12 h-0.5 bg-brand-gold mx-auto mt-3" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredDishes.map((item) => (
              <div
                key={item.id}
                className="group bg-brand-card border border-brand-gold/10 hover:border-brand-gold/30 rounded-2xl overflow-hidden flex flex-col justify-between shadow-xl transition-all duration-300 hover:translate-y-[-4px]"
              >
                {/* Product Image */}
                <div
                  onClick={() => setSelectedItem(item)}
                  className="relative h-64 overflow-hidden cursor-pointer"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-brand-dark/10 group-hover:bg-transparent transition-colors" />
                  <div className="absolute top-4 left-4 flex space-x-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] font-bold bg-brand-gold text-brand-dark px-2 py-0.5 rounded shadow-sm uppercase tracking-wider"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {item.spiceLevel > 0 && (
                    <div className="absolute top-4 right-4 bg-brand-dark/60 backdrop-blur-sm border border-brand-gold/20 text-brand-gold px-2 py-0.5 rounded text-[10px] font-semibold flex items-center space-x-0.5">
                      <Flame className="w-3 h-3 fill-brand-gold" />
                      <span>{item.spiceLevel}🌶️</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3
                        onClick={() => setSelectedItem(item)}
                        className="font-serif text-lg font-bold text-brand-cream hover:text-brand-gold transition-colors cursor-pointer"
                      >
                        {item.name}
                      </h3>
                      <span className="text-md font-bold text-brand-gold">৳{item.price.toFixed(0)}</span>
                    </div>
                    <p className="text-xs text-brand-cream/60 leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2 mt-6">
                    <button
                      onClick={() => setSelectedItem(item)}
                      className="flex-1 px-4 py-2.5 border border-brand-gold/30 hover:border-brand-gold text-brand-gold text-xs font-semibold rounded-full transition-all cursor-pointer"
                    >
                      Quick View
                    </button>
                    <button
                      onClick={() =>
                        addToCart({
                          menuItemId: item.id,
                          name: item.name,
                          price: item.price,
                          image: item.image,
                          quantity: 1,
                          spiceLevel: "Medium",
                          addons: [],
                        })
                      }
                      className="bg-brand-crimson hover:bg-brand-crimson-hover p-2.5 rounded-full text-brand-cream transition-colors flex items-center justify-center cursor-pointer"
                      aria-label="Add to cart"
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promotional Countdown Banner */}
      <section className="py-16 bg-brand-dark relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <div className="relative glass border border-brand-gold/25 rounded-3xl overflow-hidden p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#c5a059_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

            <div className="space-y-4 text-center md:text-left z-10">
              <span className="text-[10px] font-bold bg-brand-crimson text-brand-cream px-3 py-1 rounded-full uppercase tracking-widest animate-pulse">
                Limited Time Tribute
              </span>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-brand-cream leading-tight">
                Royal Delivery Feast <br />
                Enjoy <span className="text-brand-gold">15% Off Your Order</span>
              </h2>
              <p className="text-xs text-brand-cream/60 max-w-sm">
                Get premium tandoori kebabs, rich butter chicken and aromatic biryani delivered to your doorstep. Use code **ROYAL15**.
              </p>
            </div>

            {/* Timer Panel */}
            <div className="bg-brand-dark/80 border border-brand-gold/15 p-6 rounded-2xl text-center min-w-[240px] z-10">
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-gold/70 block mb-2">
                Discount Expires In
              </span>
              <span className="text-2xl font-mono font-bold text-brand-cream tracking-wide">
                {formatTime(timeLeft)}
              </span>
              <div className="w-full h-[3px] bg-brand-card rounded-full mt-4 overflow-hidden">
                <div
                  className="h-full bg-brand-gold transition-all duration-1000"
                  style={{ width: `${(timeLeft / 9912) * 100}%` }}
                />
              </div>
              <Link
                href="/menu"
                className="mt-6 w-full inline-block text-center py-2 bg-brand-gold hover:bg-brand-gold-hover text-brand-dark text-xs font-serif font-bold tracking-widest uppercase rounded-full transition-all cursor-pointer"
              >
                Claim Offer
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Poster Gallery Section */}
      <section className="py-24 bg-brand-dark/40 overflow-hidden relative border-t border-brand-gold/5" ref={gallerySectionRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
          <span className="text-xs font-bold tracking-widest text-brand-gold uppercase">
            Campaign Highlights
          </span>
          <h2 className="font-serif text-3xl font-bold text-brand-cream mt-1">
            Royal Feast & Campaign Gallery
          </h2>
          <div className="w-12 h-0.5 bg-brand-gold mx-auto mt-3" />
        </div>

        {/* Horizontal Slider Viewport */}
        <div 
          className="w-full overflow-hidden select-none py-4 relative group/viewport cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* Navigation Arrows */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-brand-dark/80 hover:bg-brand-gold border border-brand-gold/30 hover:border-brand-gold text-brand-gold hover:text-brand-dark transition-all duration-300 shadow-lg opacity-0 group-hover/viewport:opacity-100 cursor-pointer"
            aria-label="Previous posters"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-brand-dark/80 hover:bg-brand-gold border border-brand-gold/30 hover:border-brand-gold text-brand-gold hover:text-brand-dark transition-all duration-300 shadow-lg opacity-0 group-hover/viewport:opacity-100 cursor-pointer"
            aria-label="Next posters"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div
            ref={galleryTrackRef}
            className="flex space-x-8 px-8 transition-transform duration-300 ease-out"
            style={{
              transform: `translateX(${scrollOffset + manualOffset}px)`,
              width: "max-content",
            }}
          >
            {posters.map((p, idx) => (
              <div
                key={idx}
                className="relative rounded-3xl p-4 flex-shrink-0 shadow-2xl transition-all duration-300 hover:scale-[1.03] border border-white/5"
                style={{
                  background: p.bgFrame,
                  width: "280px",
                  height: "400px",
                }}
              >
                <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-inner border border-black/10">
                  <Image
                    src={p.src}
                    alt={`Poster ${idx + 1}`}
                    fill
                    className="object-fill"
                    sizes="280px"
                    draggable={false}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Progress Indicator dots */}
        <div className="flex justify-center space-x-2 mt-8">
          {posters.map((_, idx) => {
            const currentCombined = scrollOffset + manualOffset;
            const maxShiftVal = galleryTrackRef.current ? galleryTrackRef.current.scrollWidth - window.innerWidth + 64 : 1;
            const calculatedActiveDot = maxShiftVal > 0 
              ? Math.max(0, Math.min(6, Math.round((Math.abs(currentCombined) / maxShiftVal) * 6)))
              : 0;

            return (
              <div
                key={idx}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  calculatedActiveDot === idx ? "bg-brand-gold w-6" : "bg-brand-cream/20"
                }`}
              />
            );
          })}
        </div>
      </section>

      {/* Story & Background Section */}
      <section className="py-20 bg-brand-card/10 relative overflow-hidden border-t border-brand-gold/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12">
          {/* Text Info */}
          <div className="flex-1 space-y-6 reveal">
            <span className="text-xs font-bold tracking-widest text-brand-gold uppercase">
              Our Legacy
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-cream">
              Catering to the Connoisseurs of Flavor
            </h2>
            <div className="w-12 h-0.5 bg-brand-gold" />
            <p className="text-sm text-brand-cream/70 leading-relaxed">
              At Kareem's, cooking is not just preparation—it is a royal art form. Inspired by the legacy of imperial Mughal kitchens, our master chefs employ slow-cooking techniques and home-milled spice mixtures to curate a sensory feast.
            </p>
            <p className="text-sm text-brand-cream/70 leading-relaxed">
              Our specialty, the slow-cooked *Nalli Nihari*, is simmered for over twelve hours to unlock the deep marrow richness, while our tandoors fire at blistering temperatures to give our kebabs the perfect charred crust.
            </p>
            <div className="pt-4 flex items-center space-x-6">
              <div className="text-center border-r border-brand-gold/10 pr-6">
                <span className="block font-serif text-3xl font-bold text-brand-gold">12+</span>
                <span className="text-[10px] text-brand-cream/50 uppercase tracking-widest">Hours Slow Cooked</span>
              </div>
              <div className="text-center border-r border-brand-gold/10 pr-6">
                <span className="block font-serif text-3xl font-bold text-brand-gold">100%</span>
                <span className="text-[10px] text-brand-cream/50 uppercase tracking-widest">Halal Sourcing</span>
              </div>
              <div className="text-center">
                <span className="block font-serif text-3xl font-bold text-brand-gold">25+</span>
                <span className="text-[10px] text-brand-cream/50 uppercase tracking-widest">Secret Spices</span>
              </div>
            </div>
          </div>

          {/* Image Collage */}
          <div className="flex-1 relative h-[450px] w-full max-w-lg rounded-3xl overflow-hidden border border-brand-gold/15 shadow-2xl reveal">
            <Image
              src="/images/curry_001.webp"
              alt="Mutton Nihari stew"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 bg-brand-dark/80 backdrop-blur-sm border border-brand-gold/20 p-4 rounded-xl flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-brand-cream">Guaranteed Authentic</h4>
                <p className="text-[10px] text-brand-cream/50">Mughlai recipe tradition</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials Section */}
      <section className="py-20 bg-brand-dark border-t border-brand-gold/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold tracking-widest text-brand-gold uppercase">
              Tributes of Guests
            </span>
            <h2 className="font-serif text-3xl font-bold text-brand-cream mt-1">What Connoisseurs Say</h2>
            <div className="w-12 h-0.5 bg-brand-gold mx-auto mt-3" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                text: "The Mutton Dum Biryani here is absolute art. The grains of basmati rice are perfectly separated, aromatic, and the mutton is extremely tender. Truly a royal feast!",
                author: "Sarah Kabir",
                role: "Dhaka Food Critic",
                stars: 5,
              },
              {
                text: "Their slow-cooked Nalli Nihari is a masterpiece. The thick spiced gravy and the soft mutton shank are perfect when dipped with hot garlic naans. Delivery was surprisingly fast too.",
                author: "Imran Mehedi",
                role: "Regular Guest",
                stars: 5,
              },
              {
                text: "The Kebab platter was incredible. Each kebab had distinct spicing—from the creamy Malai Tikka to the rich green Haryali. A polished ordering experience.",
                author: "Rakib Hasan",
                role: "Gastronomy Enthusiast",
                stars: 5,
              },
            ].map((t, idx) => (
              <div
                key={idx}
                className="bg-brand-card/30 border border-brand-gold/5 p-8 rounded-2xl flex flex-col justify-between hover:border-brand-gold/15 transition-all duration-300 relative group"
              >
                <span className="absolute top-6 right-8 text-6xl text-brand-gold/5 font-serif select-none pointer-events-none group-hover:text-brand-gold/10 transition-colors">
                  “
                </span>
                <div className="space-y-4">
                  <div className="flex space-x-1 text-brand-gold">
                    {Array.from({ length: t.stars }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-brand-gold" />
                    ))}
                  </div>
                  <p className="text-xs text-brand-cream/70 italic leading-relaxed">{t.text}</p>
                </div>
                <div className="mt-8 border-t border-brand-gold/10 pt-4 flex justify-between items-center">
                  <div>
                    <h4 className="font-serif text-xs font-bold text-brand-cream">{t.author}</h4>
                    <p className="text-[9px] text-brand-cream/40 uppercase tracking-widest mt-0.5">{t.role}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-brand-gold/5 border border-brand-gold/10 flex items-center justify-center font-bold text-xs text-brand-gold font-serif">
                    {t.author.charAt(0)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hours, Contact & Interactive Mock Map */}
      <section id="contact" className="py-20 bg-brand-card/10 border-t border-brand-gold/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Details */}
          <div className="space-y-8 reveal">
            <div>
              <span className="text-xs font-bold tracking-widest text-brand-gold uppercase">
                Reservations & Details
              </span>
              <h2 className="font-serif text-3xl font-bold text-brand-cream mt-1">Visit Our Chambers</h2>
              <div className="w-12 h-0.5 bg-brand-gold mt-3" />
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-brand-gold/5 border border-brand-gold/15 flex items-center justify-center text-brand-gold flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-semibold text-brand-cream uppercase tracking-wide">
                    Address
                  </h4>
                  <p className="text-xs text-brand-cream/60 mt-1 leading-relaxed">
                    Banani 11, Plot 1, 5th Floor, Dhaka 1212
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-brand-gold/5 border border-brand-gold/15 flex items-center justify-center text-brand-gold flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-semibold text-brand-cream uppercase tracking-wide">
                    Hours of Royalty
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-xs text-brand-cream/60 mt-1">
                    <div>
                      <span className="block font-semibold text-brand-cream/80">Weekdays</span>
                      <span>12:00 PM - 12:00 AM</span>
                    </div>
                    <div>
                      <span className="block font-semibold text-brand-cream/80">Weekends</span>
                      <span>11:00 AM - 01:00 AM</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-brand-gold/5 border border-brand-gold/15 flex items-center justify-center text-brand-gold flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-semibold text-brand-cream uppercase tracking-wide">
                    Direct Lines
                  </h4>
                  <p className="text-xs text-brand-cream/60 mt-1">
                    General: +880 1678-222087 <br />
                    Events/Catering: +880 1678-333099
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Google Map */}
          <div className="relative h-[350px] w-full rounded-3xl overflow-hidden border border-brand-gold/15 shadow-2xl reveal group">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.7722941895913!2d90.3990564111733!3d23.79112158712225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c70017f2752f%3A0x136a7630d14ea0ba!2sKareem&#39;s%20Dhaka!5e0!3m2!1sen!2sbd!4v1783751634984!5m2!1sen!2sbd"
              className="absolute inset-0 w-full h-full border-0 opacity-100"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title="Kareem's Dhaka Location"
            />
          </div>
        </div>
      </section>

      <Footer />

      {/* Selected Item Modal */}
      {selectedItem && (
        <ProductDetailsModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </>
  );
}
