"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  id: string; // unique id (menuItemId + spiceLevel + sorted_addons.join)
  menuItemId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  spiceLevel: string;
  addons: string[];
  specialInstructions?: string;
}

interface CartContextType {
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (item: Omit<CartItem, "id">) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  promoCode: string;
  applyPromo: (code: string) => boolean;
  discountPercent: number;
  cartCount: number;
  subtotal: number;
  deliveryFee: number;
  tax: number;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("kareems_cart");
    const savedPromo = localStorage.getItem("kareems_promo");
    const savedDiscount = localStorage.getItem("kareems_discount");

    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error(e);
      }
    }
    if (savedPromo) setPromoCode(savedPromo);
    if (savedDiscount) setDiscountPercent(Number(savedDiscount));
  }, []);

  // Save cart to localStorage when changed
  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem("kareems_cart", JSON.stringify(newCart));
  };

  const addToCart = (item: Omit<CartItem, "id">) => {
    // Generate unique id based on item + customizations
    const sortedAddons = [...item.addons].sort();
    const id = `${item.menuItemId}-${item.spiceLevel}-${sortedAddons.join("-")}`;

    const existingIndex = cart.findIndex((cartItem) => cartItem.id === id);

    if (existingIndex > -1) {
      const newCart = [...cart];
      newCart[existingIndex].quantity += item.quantity;
      saveCart(newCart);
    } else {
      saveCart([...cart, { ...item, id }]);
    }
    setIsCartOpen(true); // Auto-open cart on add
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    const newCart = cart.map((item) => (item.id === id ? { ...item, quantity } : item));
    saveCart(newCart);
  };

  const removeFromCart = (id: string) => {
    const newCart = cart.filter((item) => item.id !== id);
    saveCart(newCart);
  };

  const clearCart = () => {
    saveCart([]);
    setPromoCode("");
    setDiscountPercent(0);
    localStorage.removeItem("kareems_promo");
    localStorage.removeItem("kareems_discount");
  };

  const applyPromo = (code: string): boolean => {
    if (code.trim().toUpperCase() === "ROYAL15") {
      setPromoCode("ROYAL15");
      setDiscountPercent(15);
      localStorage.setItem("kareems_promo", "ROYAL15");
      localStorage.setItem("kareems_discount", "15");
      return true;
    }
    return false;
  };

  // Calculations
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const discountAmount = subtotal * (discountPercent / 100);
  
  // Free delivery for orders over ৳3000
  const deliveryFee = subtotal > 0 && subtotal < 3000 ? 100.00 : 0.00;
  const tax = (subtotal - discountAmount) * 0.08; // 8% tax
  const total = subtotal > 0 ? subtotal - discountAmount + deliveryFee + tax : 0;

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        promoCode,
        applyPromo,
        discountPercent,
        cartCount,
        subtotal,
        deliveryFee,
        tax,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
