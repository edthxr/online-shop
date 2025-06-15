"use client";
import "./globals.css";
import { useCart } from "../components/CartContext";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const products = [
  { id: 1, name: "NO RICH", price: 399, imageUrl: "/photo/photo1 (1).png", description: "" },
  { id: 2, name: "P9D COLLECTION - White", price: 699, imageUrl: "/photo/photo2.png", description: "" },
  { id: 3, name: "FREE", price: 69, imageUrl: "/photo/photo3.png", description: "" },
  { id: 4, name: "FREE", price: 89, imageUrl: "/photo/1.png", description: "" },
  { id: 7, name: "FREE", price: 95, imageUrl: "/photo/photo1 (1).png", description: "" },
  { id: 8, name: "FREE", price: 95, imageUrl: "/photo/photo1 (1).png", description: "" },
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
<main className="bg-white py-10 px-4 max-w-[1320px] mx-auto">
  <section className="w-full flex justify-end">
    <div className="flex flex-col gap-5 max-w-[1300px] p-5">
      <h1 className="text-start md:text-end font-semibold text-[18px] md:text-[33px] text-black/60">
        Discover <span className="text-black">New products to select</span>
      </h1>
    </div>
  </section>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1320px]  mx-auto p-4">
  {products.map((product) => (
    <div
      key={product.id}
      className="bg-white   transition-shadow duration-300 overflow-hidden group"
    >
      {/* Product Image Container */}
      <div className="relative bg-[#f5f5f7] pb-5 aspect-square">
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
          className="w-10 h-10  border-gray-200 rounded-sm flex items-center justify-center  shadow-sm">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </button>
        </div>

        {/* Buy Now Overlay */}
        <div className="absolute inset-x-0 bottom-0 bg-black backdrop-blur-sm text-white text-center py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="text-sm font-medium hover:text-gray-200 transition-colors"
            onClick={() => handleAddToCart(product)}>
            Buy Now
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4 space-y-2">
        <h3 className="text-black line-clamp-2 text-sm font-medium leading-5">
          {product.name}
        </h3>
        
        <p className=" text-xs text-gray-600">
          ฿{product.price.toLocaleString()}
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
    </div>
  ))}
</div>
</main>


);

}
