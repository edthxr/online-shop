"use client";
import "./globals.css";
import { useCart } from "../components/CartContext";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const products = [
  { id: 1, name: "อเมริกาโน่", price: 60, imageUrl: "/photo/photo1.png", description: "" },
  { id: 2, name: "น้ำผลไม้", price: 69, imageUrl: "/photo/photo2.png", description: "" },
  { id: 3, name: "นม", price: 69, imageUrl: "/photo/photo3.png", description: "" },
  { id: 4, name: "เค้ก", price: 89, imageUrl: "/photo/photo4.png", description: "" },
  { id: 5, name: "ขนมปังปิ้ง", price: 89, imageUrl: "/photo/photo5.png", description: "" },
  { id: 6, name: "คุกกี้", price: 95, imageUrl: "/photo/photo6.png", description: "" },
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
    <div>
      <div className="container mx-auto ">
        {/* Notification Section */}
        {notification && (
          <div className="fixed top-[80px] left-1/2 transform -translate-x-1/2 max-w-sm w-full bg-[#979797] text-[#FFFFFF] p-4 rounded-lg shadow-md z-50 transition-opacity duration-300 text-center">
            {notification}
          </div>
        )}

        {/* Banner Section */}
        <section className={`relative w-full overflow-hidden h-[50vh] md:h-[80vh] transition-opacity duration-500 ${showBanner ? "opacity-100" : "opacity-0"}`}>
          <div
            className="relative w-full h-full flex transition-transform duration-1000 ease-in-out"
            style={{ transform: `translateX(-${(currentBanner * 100)}%)` }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
          >
            {bannerImages.map((banner, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${banner.url})` }}
              >
                <div className="relative container mx-auto h-full flex flex-col justify-center">
                  <div className="absolute inset-0 bg-black bg-opacity-20 rounded-xl shadow-2xl text-center p-8 flex flex-col justify-center items-center">
                    <h1 className="text-4xl md:text-6xl mb-2 font-orbitron tracking-wide font-bold text-white">
                      {banner.caption}
                    </h1>
                 
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Products Section */}
        <main id="featured-products" className="container mx-auto px-4 pt-20">
  <h1 className={`text-center tracking-wide my-12 font-bold text-black/70 text-3xl transition-opacity duration-500 ${showFeaturedTitle ? "opacity-100" : "opacity-0"}`}>
    รายการอาหาร
  </h1>
  <div className={`grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-opacity duration-500 ${showProducts ? "opacity-100" : "opacity-0"}`}>
    {products.map((product) => (
      <div key={product.id} className="border border-gray-200 rounded-lg shadow-lg p-6 bg-white transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl flex flex-col h-full">
        <div className="flex justify-center mb-4">
          <Image src={product.imageUrl} alt={product.name} width={300} height={300} className="rounded-lg object-cover" />
        </div>
        <div className="flex flex-col flex-grow">
          <h2 className="text-black text-center text-lg font-semibold mb-2">{product.name}</h2>
          <p className="text-gray-600 text-center mb-4">{product.description}</p>
          <p className="text-black text-center font-bold mb-4">ราคา: {product.price} บาท</p>
        </div>
        <button
          onClick={() => handleAddToCart(product)}
          className="bg-[#000000] text-white py-2 px-4 rounded-lg hover:bg-[#27251f] focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 active:bg-black transition-colors duration-300 w-full mt-auto"
        >
          สั่งซื้อ
        </button>
      </div>
    ))}
  </div>
</main>

      </div>
    </div>
  );
}
