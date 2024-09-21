"use client";
import { useState } from "react";
import Link from "next/link";
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from "../components/CartContext";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { getTotalQuantity } = useCart();
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
            <nav className="container mx-auto fixed top-0 left-0 right-0 bg-white shadow-lg z-20 p-5 flex justify-between items-center">
                <div className="text-black/80 text-3xl font-bold font-sans">
                    <Link href="/" className="hover:text-gray-300 transition duration-300">ROSE.</Link>
                </div>

                {/* Hamburger Icon for Mobile */}
                <div className="md:hidden" onClick={toggleMenu}>
                    <div className="space-y-2 cursor-pointer relative">
                        <span className="block w-8 h-0.5 bg-black"></span>
                        <span className="block w-8 h-0.5 bg-black"></span>
                        <span className="block w-8 h-0.5 bg-black"></span>
                        {getTotalQuantity() > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                {getTotalQuantity()}
                            </span>
                        )}
                    </div>
                </div>

                {/* Desktop Menu */}
                <ul className={`hidden md:flex md:space-x-8 text-black font-sans text-lg font-thin`}>
                    <li className="my-2">
                        <Link href="/" className="hover:text-gray-300 transition duration-300">Home</Link>
                    </li>
                    <li className="my-2">
                        <Link href="/" onClick={handleScrollToProducts} className="hover:text-gray-300 transition duration-300">Products</Link>
                    </li>
                    <li className="my-2 flex items-center">
                        <Link href="/Cart" className="hover:text-gray-300 transition duration-300 relative">
                            <FaShoppingCart className="text-2xl" />
                            {getTotalQuantity() > 0 && (
                                <span className="absolute -top-1 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                    {getTotalQuantity()}
                                </span>
                            )}
                        </Link>
                    </li>
                    <li className="my-2">
                        <Link href="/contact" className="hover:text-gray-700 transition duration-300">Contact</Link>
                    </li>
                </ul>
            </nav>

            {isOpen && (
                <div className="fixed inset-x-0 top-0 bg-white z-30 p-5 flex flex-col items-center shadow-lg h-1/2">
                    <div className="w-full flex justify-between items-center mb-5">
                        <h2 className="text-xl font-bold text-black">Menu</h2>
                        <button onClick={toggleMenu} className="text-black text-2xl">×</button>
                    </div>
                    <ul className="space-y-4 w-full">
                        <li>
                            <Link href="/" className="block py-2 text-center text-lg text-black hover:text-gray-800 transition" onClick={toggleMenu}>Home</Link>
                        </li>
                        <li>
                            <Link href="/" onClick={(e) => {
                                handleScrollToProducts(e);
                                toggleMenu();
                            }} className="block py-2 text-center text-lg text-black hover:text-gray-800 transition duration-300">Products</Link>
                        </li>
                        <li>
                            <Link href="/Cart" className="block py-2 text-center text-lg text-black hover:text-gray-800 transition flex justify-center items-center" onClick={toggleMenu}>
                                <FaShoppingCart className="mr-2 text-2xl" />
                                Cart {getTotalQuantity() > 0 && (
                                    <span className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                        {getTotalQuantity()}
                                    </span>
                                )}
                            </Link>
                        </li>
                        <li>
                            <Link href="/contact" className="block py-2 text-center text-lg text-black hover:text-gray-800 transition duration-300" onClick={toggleMenu}>Contact</Link>
                        </li>
                    </ul>
                </div>
            )}

        </>
    );
}
