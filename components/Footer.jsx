"use client";
import { Mail, MapPin, Phone, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { useState } from "react";

export default function Footer() {
    const [isExploreOpen, setIsExploreOpen] = useState(false);
    const [isCustomerServiceOpen, setIsCustomerServiceOpen] = useState(false);
    const [isAccountOpen, setIsAccountOpen] = useState(false);
    const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);

    return (
        <footer className="bg-[#f5f5f5] text-black py-10 px-5 md:px-20">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-2">
                {/* Explore Section */}
                <div className="border-b  border-y py-2 md:border-none">
                    <button
                        className="w-full text-left font-light text-lg flex justify-between items-center md:mb-4"
                        onClick={() => setIsExploreOpen(!isExploreOpen)}
                    >
                        Explore
                        <span className={`md:hidden`}>{isExploreOpen ? "-" : "+"}</span>
                    </button>
                    <ul className={` ${isExploreOpen ? "block" : "hidden"} text-[#71706c] md:block`}>
                        <li><a href="#" className="hover:text-[#71706c]">New Products</a></li>
                        <li><a href="#" className="hover:text-[#71706c]">Hoodies</a></li>
                        <li><a href="#" className="hover:text-[#71706c]">shirts</a></li>
                        <li><a href="#" className="hover:text-[#71706c]">Clothes</a></li>
                    </ul>
                </div>

                {/* Customer Service Section */}
                <div className="border-b border-y py-2  md:border-none">
                    <button
                        className="w-full text-left font-light text-lg flex justify-between items-center md:mb-4"
                        onClick={() => setIsCustomerServiceOpen(!isCustomerServiceOpen)}
                    >
                        Customer Service
                        <span className={`md:hidden`}>{isCustomerServiceOpen ? "-" : "+"}</span>
                    </button>
                    <ul className={`text-[#71706c] ${isCustomerServiceOpen ? "block" : "hidden"} md:block`}>
                        <li><a href="#" className="hover:text-gray-500">Product & Care</a></li>
                        <li><a href="#" className="hover:text-gray-500">Size Guide</a></li>
                    </ul>
                </div>

                {/* My Account Section */}
                <div className="border-b border-y py-2 md:border-none">
                    <button
                        className="w-full text-left font-light text-lg flex justify-between items-center md:mb-4"
                        onClick={() => setIsAccountOpen(!isAccountOpen)}
                    >
                        My Account
                        <span className={`md:hidden`}>{isAccountOpen ? "-" : "+"}</span>
                    </button>
                    <ul className={`text-[#71706c] ${isAccountOpen ? "block" : "hidden"} md:block`}>
                        <li><a href="/login" className="hover:text-gray-500">Login</a></li>
                        <li><a href="/sign-up" className="hover:text-gray-500">Sign Up</a></li>
                    </ul>
                </div>

                {/* Newsletter Section */}
                <div className="border-b border-y py-2 md:border-none">
                    <button
                        className="w-full text-left font-light text-lg flex justify-between items-center md:mb-4"
                        onClick={() => setIsNewsletterOpen(!isNewsletterOpen)}
                    >
                        Get The Latest!
                        <span className={`md:hidden`}>{isNewsletterOpen ? "-" : "+"}</span>
                    </button>
                    <div className={`text-sm text-gray-600 ${isNewsletterOpen ? "block" : "hidden"} md:block`}>
                        <p className="mb-4">Sign up to be the first to hear about new arrivals, promotions, and exclusive offers.</p>
                        <form className="flex">
                            <input
                                type="email"
                                className="w-full p-2 rounded-l-md bg-gray-200 text-black placeholder-gray-600"
                                placeholder="Enter email address"
                                required
                            />
                            <button className="bg-black text-white p-2 rounded-r-md">Sign Up</button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Footer Bottom Section */}
            <div className="border-t border-gray-300 mt-10 md:container md:mx-auto pt-6 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
                {/* Contact Info */}
                <div className="text-sm text-start w-full text-gray-700">
                    <div>© ALL RIGHTS RESERVED. 2024 EDTHXR
                    </div>
                </div>

                {/* Social Media Icons */}
                <div className="mt-6 md:mt-0 flex w-full text-start md:justify-end space-x-4">
                    <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-gray-500">
                        <Facebook size={18} />
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-gray-500">
                        <Instagram size={18} />
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-gray-500">
                        <Twitter size={18} />
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-gray-500">
                        <Youtube size={18} />
                    </a>
                </div>
            </div>
        </footer>
    );
}
