"use client";
import { useState } from "react";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../components/CartContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
    const { getTotalQuantity, isCartBumping } = useCart();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleScrollToProducts = () => {
    setTimeout(() => {
      const featuredProducts = document.getElementById("featured-products");
      if (featuredProducts) {
        featuredProducts.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <>
      <nav className="w-full fixed top-0 left-0 right-0 bg-white border-b z-50">
        <div className="max-w-[1320px] mx-auto flex justify-between items-center px-4 py-3">
          {/* Logo or Brand Name */}
          <div className="text-black/80 text-2xl font-bold font-sans">
            <Link href="/" className="hover:text-gray-400 transition duration-300">
            </Link>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-6 text-black font-sans text-base items-center">
            <li>
              <Link href="/" className="hover:text-gray-500 transition duration-300">Home</Link>
            </li>
            <li>
              <button onClick={handleScrollToProducts} className="hover:text-gray-500 transition duration-300">
                Products
              </button>
            </li>
            <li className="relative">
              <Link href="/Cart" className="hover:text-gray-500 transition duration-300 flex items-center gap-1">
                <FaShoppingCart className={`text-xl ${isCartBumping ? "cart-bump" : ""}`} />
           {getTotalQuantity() > 0 && (
  <span className="absolute -top-2 -right-3 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
    {getTotalQuantity()}
  </span>
                )}
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-gray-500 transition duration-300">Contact</Link>
            </li>
          </ul>

          {/* Hamburger Icon */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="relative flex flex-col space-y-1">
              <span className="w-6 h-0.5 bg-black" />
              <span className="w-6 h-0.5 bg-black" />
              <span className="w-6 h-0.5 bg-black" />
            {getTotalQuantity() > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {getTotalQuantity}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed top-0 left-0 right-0 bg-white z-40 shadow-md md:hidden">
          <div className="flex justify-between items-center px-4 py-3 border-b">
            <h2 className="text-xl font-semibold text-black">Menu</h2>
            <button onClick={toggleMenu} className="text-black text-2xl">×</button>
          </div>
          <ul className="flex flex-col gap-3 px-6 py-4 text-lg">
            <li>
              <Link href="/" onClick={toggleMenu} className="block py-2 text-black hover:text-gray-800">Home</Link>
            </li>
            <li>
              <button onClick={() => {
                handleScrollToProducts();
                toggleMenu();
              }} className="block py-2 text-black hover:text-gray-800 w-full text-left">
                Products
              </button>
            </li>
            <li>
              <Link href="/Cart" onClick={toggleMenu} className="flex items-center gap-2 py-2 text-black hover:text-gray-800">
                <FaShoppingCart className="text-xl" />
                Cart
                {totalQuantity > 0 && (
                  <span className="ml-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {totalQuantity}
                  </span>
                )}
              </Link>
            </li>
            <li>
              <Link href="/contact" onClick={toggleMenu} className="block py-2 text-black hover:text-gray-800">Contact</Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
