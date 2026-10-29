import type { Metadata } from "next";
import { Josefin_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const JosefinSans = Josefin_Sans({
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});


export const metadata: Metadata = {
  title: "Wanderlast",
  description:
    "Explore breathtaking destinations and create unforgettable memories with our curated travel experiences.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${JosefinSans.className} ${playfair.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">

        <Navbar/>
        {children}
        <Footer/>
      </body>

    </html>
  );
}
