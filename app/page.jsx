"use client";
import "./globals.css";
import dynamic from 'next/dynamic';
import { useCart } from "../components/CartContext";
import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const products = [
  { id: 1, name: "NO RICH", price: 399, category: "T-Shirt", imageUrl: "/photo/photo1 (1).png", description: "" },
  { id: 2, name: "P9D COLLECTION", price: 699, category: "T-Shirt", imageUrl: "/photo/photo2.png", description: "" },
  { id: 7, name: "NO RISK NO RICH - BLACK", price: 1390, category: "T-Shirt", imageUrl: "/photo/no2.png", description: "" },
  { id: 3, name: "NO RISK HOODIE SS20", price: 6900, category: "Hoodie", imageUrl: "/photo/ss2.png", description: "" },
  { id: 4, name: "NEVER LIE", price: 89, category: "T-Shirt", imageUrl: "/photo/1.png", description: "" },
  { id: 8, name: "HOODIE -REDBLACK SERIES", price: 9500, category: "Hoodie", imageUrl: "/photo/hoo.png", description: "" },
];

const categories = [
  { name: "All", image: "/photo/all.png" },
  { name: "T-Shirt", image: "/photo/3323.png" },
  { name: "Hoodie", image: "/photo/jek.png" },
  { name: "Sweater", image: "/photo/112.png" },
  { name: "Jacket", image: "/photo/jek.png" },
  { name: "Pants", image: "/photo/pant.png" },
];

const bannerImages = [
  { url: "/photo/main2.png", caption: "" },
];

export default function Home() {
  const { addToCart } = useCart();
  const [showProducts, setShowProducts] = useState(false);
  const [showFeaturedTitle, setShowFeaturedTitle] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [notification, setNotification] = useState("");
  const [currentBanner, setCurrentBanner] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const Footer = dynamic(() => import('../components/Footer'), { ssr: false, loading: () => <SkeletonLoader /> });

  const [selectedCategory, setSelectedCategory] = useState("All");
  const filteredProducts = selectedCategory === "All"
    ? products
    : products.filter(p => p.category === selectedCategory);

  const SkeletonLoader = () => (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="relative">
        <div className="h-20 w-20 border-4 border-t-transparent border-gray-300 rounded-full animate-spin"></div>
        <div className="absolute inset-0 h-20 w-20 border-4 border-t-transparent border-black/20 rounded-full animate-spin animate-reverse"></div>
      </div>
    </div>
  );

  const scrollRef = useRef(null);
  const [page, setPage] = useState(0);
  const itemPerPage = 3;

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onScroll = () => {
      const scrollLeft = el.scrollLeft;
      const pageWidth = el.offsetWidth;
      const totalPages = Math.ceil(el.scrollWidth / pageWidth);
      const currentPage = Math.round(scrollLeft / pageWidth);
      setPage(Math.min(currentPage, totalPages - 1));
    };

    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowProducts(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowFeaturedTitle(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    setNotification(`${product.name} added to cart!`);
    setTimeout(() => setNotification(""), 3000);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setCurrentX(e.clientX);
    }
  };

  return (
    <motion.main
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="bg-gradient-to-b from-gray-50/30 to-white py-16 px-4 mt-4 max-w-[1320px] mx-auto"
    >
      {/* Category Scroll Section */}
      <section className="py-16 px-4 max-w-[1320px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-16"
        >
          <h1 className="text-2xl md:text-4xl font-light  text-black/60 mb-4">
            Shop with <span className="font-medium text-black">style</span>
          </h1>

          <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Discover premium collections curated for the modern lifestyle
          </p>

        
        </motion.div>

        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-8 overflow-x-auto md:grid md:grid-cols-6 snap-x scroll-smooth scrollbar-hide pt-6 pb-6 items-start"
          >
            {categories.map((cat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex-shrink-0 snap-center flex flex-col items-center space-y-4 cursor-pointer group"
                onClick={() => setSelectedCategory(cat.name)}
              >
                <div className={`w-32 h-32 rounded-full bg-white border-2 transition-all duration-300 flex items-center justify-center overflow-hidden shadow-lg hover:shadow-xl hover:scale-105 ${
                  selectedCategory === cat.name 
                    ? 'border-black shadow-xl ring-4 ring-black/10' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <Image 
                    src={cat.image} 
                    alt={cat.name} 
                    width={90} 
                    height={90} 
                    className="object-contain transition-transform duration-300 group-hover:scale-110" 
                  />
                </div>
                <p className={`text-sm font-medium transition-colors duration-300 ${
                  selectedCategory === cat.name ? 'text-black' : 'text-gray-700'
                }`}>
                  {cat.name}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 pt-6 md:hidden">
            {Array.from({ length: Math.ceil(categories.length / itemPerPage) }).map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  page === i ? 'bg-black w-8' : 'bg-gray-300'
                }`}
              ></div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section Header */}
      <section className="w-full flex justify-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center max-w-4xl"
        >
             <h1 className=" text-start md:text-end font-semibold text-[18px] mb-5 md:text-[33px] text-black/60">
                    Discover <span className="text-black">New products to select</span>
                </h1>
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent flex-1 max-w-32"></div>
            <h3 className="text-sm text-black px-4">
              {selectedCategory === "All" ? "All Products" : selectedCategory}
            </h3>
            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent flex-1 max-w-32"></div>
          </div>
        </motion.div>
      </section>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 max-w-[1320px] mx-auto p-4">
        {filteredProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="col-span-full text-center py-20"
          >
            <p className="text-gray-500 text-lg font-light">No products found</p>
            <p className="text-gray-400 text-sm mt-2">Try selecting a different category</p>
          </motion.div>
        ) : null}

        {filteredProducts.map((product, index) => (
                 <motion.div
            key={`${selectedCategory}-${product.id}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: index * 0.1, 
              duration: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            className="bg-white   transition-all duration-500 overflow-hidden group"
          >
            <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 aspect-square overflow-hidden">
              <Link href={`/preview/${product.id}`}>
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="w-full h-full object-contain p-6 transition-transform duration-500 "
                />
              </Link>

              {/* Action Buttons */}
              <div className="absolute top-4 right-4 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                <button className="w-11 h-11  backdrop-blur-md rounded-full text-gray-700 flex items-center justify-center shadow-lg hover:shadow-xl hover:bg-white transition-all duration-300 hover:scale-110">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
                <button
                  onClick={() => addToCart(product)}
                  className="w-11 h-11  backdrop-blur-md rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:bg-white transition-all duration-300 hover:scale-110"
                >
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </button>
              </div>

              {/* Quick Buy Overlay */}
      <div className="absolute inset-x-0 bottom-0 bg-black backdrop-blur-sm text-white text-center py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={() => addToCart(product)}
                  className="text-sm font-medium bg-black text-white px-4 py-2 rounded-sm active:scale-95 transition-all duration-200 ease-out"
                >
                  Add to Cart
                </button>
              </div>
            </div>

            {/* Product Info */}
            <div className="p-6 space-y-3">
              <h3 className="text-gray-900 line-clamp-2 text-base font-sm leading-6 group-hover:text-black transition-colors duration-300">
                {product.name}
              </h3>
              <p className="text-sm text-black">
                ฿{product.price.toLocaleString()} 
                <span className="text-sm font-normal text-gray-500 ml-1">THB</span>
              </p>
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2">
                  <div className="flex text-gray-300">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-lg">☆</span>
                    ))}
                  </div>
                  <span className="text-xs text-gray-400">(0)</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Notification */}
      {notification && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          className="fixed bottom-6 right-6 bg-black text-white px-6 py-4 rounded-2xl shadow-2xl z-50 border border-gray-800"
        >
          <div className="flex items-center gap-3">
            <p className="font-medium">{notification}</p>
          </div>
        </motion.div>
      )}
    </motion.main>
  );
}