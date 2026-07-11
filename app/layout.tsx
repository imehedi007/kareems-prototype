import type { Metadata } from "next";
import { Cinzel, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Kareem's - Royal Mughal Fine Dining & Ordering",
  description: "Experience the premium taste of traditional Mughlai cuisine with Kareem's elegant online ordering prototype.",
  metadataBase: new URL("https://kareemsdhaka.com"),
  openGraph: {
    title: "Kareem's - Royal Mughal Fine Dining & Ordering",
    description: "Experience the premium taste of traditional Mughlai cuisine with Kareem's elegant online ordering prototype.",
    url: "https://kareemsdhaka.com",
    siteName: "Kareem's Dhaka",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased dark">
      <body
        className={`${cinzel.variable} ${plusJakarta.variable} min-h-full flex flex-col bg-brand-dark text-brand-cream font-sans selection:bg-brand-gold selection:text-brand-dark`}
      >
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
