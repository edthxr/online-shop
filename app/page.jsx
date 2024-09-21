"use client";
import "./globals.css";
import { useCart } from "../components/CartContext";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const products = [
  { id: 1, name: "Strap Top Set", price: 89, imageUrl: "/photo/image1.jpg", description: "Single strap top made from high-quality fabric." },
  { id: 2, name: "Assorted Set", price: 69, imageUrl: "/photo/image2.jpg", description: "White single strap & fabric work." },
  { id: 3, name: "Season Sets", price: 69, imageUrl: "/photo/image3.jpg", description: "Products available in 3 styles: Rainy, Summer, Winter." },
  { id: 4, name: "Chic White Set", price: 89, imageUrl: "/photo/image4.jpg", description: "White shirt, single strap & short fabric skirt." },
  { id: 5, name: "Cute Black Set", price: 89, imageUrl: "/photo/image5.jpg", description: "Single strap top & black skirt." },
  { id: 6, name: "Stylish Black Set", price: 95, imageUrl: "/photo/image6.jpg", description: "Top and short black skirt in 3 styles." },
];

const bannerImages = [
  { url: "//cdn.media.amplience.net/i/pandora/Q324_Like_A_Charm_Model_Sarah_05_Extended?fmt=auto&qlt=80&crop={1.2%},{10.06%},{79.19%},{60.05%}", caption: "Discover the Latest Fashion Trends" },
  { url: "https://media.gucci.com/dynamic/b3c8/muVYcoNt+VQCRWLKccGlxln43Fj3ez_lUpZuoNtM6SQDdj6j3EnOtAAi3Xx_T8CRTL5+PB2Y4k97Qes7IDVdc5HzMFP06J+0oDT1U8gaLUJT8V4U2XurdIewWtFylwvIKclm07h2OQlc_W3sx8Y_QomrZNxDbaREvd2g4Hdji26rmb3+nX0bBriO5A+TeeICMzAhTLOHV9juPxaEjpRbmZjpheWajVgHz6mLcQUhn6E+oUBIT5xSoAlIk67MO2ZnveOnu3bU6QJPAhBRR8rOpXUqbYqUM2Xq5+sU2pgWBAF+3Y5F6yrV2pSU1aRfn6HWl7HhVXFf7I+NTZfxSq3mKBTsHSX5gmf6H9+pjxDUsrkK7sYoeN0m9Sqpx43O8xZ0/HP_CinamaticLandscape_Gucci-Women-FW24-July24-1623-GUC-022O-0152-v5_001_Default.png", caption: "New Arrivals are Here" },
  { url: "https://th.louisvuitton.com/images/is/image//content/dam/lv/editorial-content/brand-content-coremedia/men/2024/collection/lv-fall-24/M_BC_LVFall_Aug24_08_DI3.jpg?wid=2400", caption: "Shop Your Favorite Styles" },
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
    const bannerInterval = setInterval(() => {
      setCurrentBanner(prev => (prev + 1) % bannerImages.length);
    }, 4000); // Change this to 4000 milliseconds (4 seconds)
    return () => clearInterval(bannerInterval);
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

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const distance = startX - currentX;

    if (distance > 50) {
      setCurrentBanner((prev) => (prev + 1) % bannerImages.length);
    } else if (distance < -50) {
      setCurrentBanner((prev) => (prev === 0 ? bannerImages.length - 1 : (prev - 1 + bannerImages.length) % bannerImages.length));
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
            onMouseUp={handleMouseUp}
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
                    <button
                      onClick={() =>
                        document
                          .getElementById("featured-products")
                          .scrollIntoView({ behavior: "smooth" })
                      }
                      className="font-bold px-8 py-4 text-lg bg-white text-black border-2 border-[#FFFFFF] rounded-full transition-transform duration-300 hover:bg-[#ffffff] hover:text-black transform hover:scale-105"
                    >
                      Shop Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Products Section */}
        <main id="featured-products" className="container mx-auto px-4 pt-20">
          <h1 className={`text-center tracking-wide my-12 font-bold text-black/70 text-3xl transition-opacity duration-500 ${showFeaturedTitle ? "opacity-100" : "opacity-0"}`}>
            Featured Products
          </h1>
          <div className={`grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-opacity duration-500 ${showProducts ? "opacity-100" : "opacity-0"}`}>
            {products.map((product) => (
              <div key={product.id} className="border border-gray-200 rounded-lg shadow-lg p-6 bg-white transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                <div className="flex justify-center mb-4">
                  <Image src={product.imageUrl} alt={product.name} width={300} height={300} className="rounded-lg object-cover" />
                </div>
                <h2 className="text-black text-center text-lg font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-600 text-center mb-4">{product.description}</p>
                <p className="text-black text-center font-bold mb-4">Price: {product.price} Baht</p>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-[#000000] text-white py-2 px-4 rounded-lg hover:bg-[#27251f] focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 active:bg-black transition-colors duration-300 w-full flex justify-center"
                >
                  Order Now
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
