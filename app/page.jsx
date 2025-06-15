"use client";
import "./globals.css";
import dynamic from 'next/dynamic';
import { useCart } from "../components/CartContext";
import Image from "next/image";
import React, { useState, useEffect } from "react";
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
  <div className="flex items-center justify-center h-screen bg-gray-100"> {/* เพิ่ม bg-gray-100 เพื่อให้เห็นวงกลมชัดเจน */}
    <div className="h-16 w-16 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
  </div>
  );


  useEffect(() => {
    const timer = setTimeout(() => setShowBanner(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
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
  transition={{ duration: 0.6, ease: "easeOut" }}
  className="bg-white py-10 px-4 mt-4 max-w-[1320px] mx-auto"
>
  {/* Category Circle Section */}
<section className="py-10  px-4 max-w-[1320px] text-end mx-auto">
           <h1 className=" text-[18px] mb-10  md:text-[33px] font-semibold">Shop. <span className="text-black/60">The best way to buy the categories you love.</span></h1>
           <h2 className="text-xl font-semibold mb-4 text-black">{selectedCategory === "All" ? "All Products" : selectedCategory}</h2>

  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 text-white gap-6 place-items-center">
 {[
  { name: "All", image: "/photo/all.png" },
  { name: "T-Shirt", image: "/photo/3323.png" },
  { name: "Hoodie", image: "/photo/jek.png" },
  { name: "Sweater", image: "/photo/112.png" },
  { name: "Jacket", image: "/photo/jek.png" },
  { name: "Pants", image: "/photo/pant.png" },
].map((cat, index) => (
  <div key={index} className="flex flex-col items-center space-y-2 cursor-pointer" onClick={() => setSelectedCategory(cat.name)}>
    <div className={`w-36 h-36 rounded-full border border-gray-300 flex items-center justify-center overflow-hidden shadow-sm hover:scale-105 transition ${selectedCategory === cat.name ? 'ring-1 ring-black/80' : ''}`}>
      <Image src={cat.image} alt={cat.name} width={80} height={80} className="object-contain" />
    </div>
    <p className="text-sm font-medium text-black">{cat.name}</p>
  </div>
))}
  </div>
</section>


  <section className="w-full flex justify-start">
    <div className="flex flex-col gap-5 max-w-[1300px] p-5">
      <h1 className="text-start md:text-end font-semibold text-[18px] md:text-[33px] text-black/60">
        Discover <span className="text-black">New products to select</span>
      </h1>
    </div>
  </section>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-[1320px]  mx-auto p-4">
{filteredProducts.length === 0 ? 
(  <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.10 }}
  className="col-span-full text-center text-gray-500 text-lg py-10"
>
  No products found
</motion.div>
  ) : null}
{filteredProducts.map((product, index) => (
    <motion.div
      key={`${selectedCategory}-${product.id}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white transition-shadow duration-300 overflow-hidden group"
    >
      {/* Product Image Container */}
      <div className="relative bg-[#f5f5f7] pb-5  aspect-square">
       <Link href={`/preview/${product.id}`}> 
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={300}
          height={300}
          className="w-full h-full object-contain p-4 "
        />
        </Link>
        
        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex flex-col gap-3">
          <button className="w-10 h-10  border-gray-200 rounded-sm  text-black font-bold flex items-center justify-center  shadow-sm">
            <svg className="w-5 h-5 text-black font-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        <button
  onClick={() => handleAddToCart(product)}
  className="w-10 h-10 border-gray-200 rounded-sm flex items-center justify-center shadow-sm bg-transparent hover:bg-gray-100 active:scale-90 transition-all duration-150"
>
  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
  </svg>
</button>

        </div>

        {/* Buy Now Overlay */}
        <div className="absolute inset-x-0 bottom-0 bg-black backdrop-blur-sm text-white text-center py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
       <button
  onClick={() => handleAddToCart(product)}
  className="text-sm font-medium bg-black  text-white px-4 py-2 rounded-sm  active:scale-95 transition-all duration-200 ease-out"
>
  Buy Now
</button>

        </div>
      </div>

      {/* Product Details */}
      <div className="p-4 space-y-2">
        <h3 className="text-black line-clamp-2 text-sm font-medium leading-5">
          {product.name}
        </h3>
        
        <p className=" text-sm text-black">
          ฿ {product.price.toLocaleString()} THB
        </p>

        {/* Rating */}
        <div className="flex items-center justify-start gap-1 pt-1">
          <div className="flex text-gray-300">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-lg">☆</span>
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-1">(0)</span>
        </div>
      </div>
    </motion.div>
  ))}
</div>

</motion.main>






);

}
