"use client";
import { useCart } from "../../components/CartContext"; 
import { MdDeleteOutline } from "react-icons/md";
import Link from "next/link"; 
import { useEffect, useState } from "react";

const Cart = () => {
    const { cart, removeFromCart, updateQuantity } = useCart();
    const [showCart, setShowCart] = useState(false);

    const handleRemoveFromCart = (id) => {
        removeFromCart(id);
    };

    useEffect(() => {
        const timer = setTimeout(() => setShowCart(true), 1500);
        return () => clearTimeout(timer);
    }, []);

    const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div className={`container mx-auto py-12 pt-[100px] bg-white shadow-md rounded-lg p-6 transition-opacity duration-500 ${showCart ? "opacity-100" : "opacity-0"}`}>
            <h2 className="text-3xl mb-6 text-center tracking-wide text-gray-800">Shopping Cart</h2>
            {cart.length === 0 ? (
                <div className="text-center text-gray-600">
                    <p className="mb-10">Your cart is empty.</p>
                    <Link href="/" className="text-black/70 font-extrabold hover:underline">Go back to shopping</Link>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {cart.map((item, index) => (
                            <div key={index} className="border border-gray-300 p-4 rounded-lg shadow hover:shadow-md transition-shadow duration-200">
                                <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                                <p className="text-gray-700">Price: {item.price * item.quantity} Baht</p>
                                <div className="flex items-center justify-between mt-2">
                                    <div className="flex items-center">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            disabled={item.quantity <= 1}
                                            className={`text-gray-600 py-1 px-2 bg-white rounded-lg hover:text-gray-800 transition-colors duration-200 ${item.quantity <= 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        >
                                            -
                                        </button>
                                        <span className="mx-2 text-black">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="text-gray-600 py-1 px-2 bg-white rounded-lg hover:text-gray-800 transition-colors duration-200"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => handleRemoveFromCart(item.id)}
                                        className="text-red-600 hover:text-red-800 transition-colors duration-200 flex items-center"
                                    >
                                        <MdDeleteOutline className="mr-2" />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 text-right">
                        <h3 className="text-xl text-gray-800">Total Amount: {totalAmount} Baht</h3>
                        <button className="mt-4 inline-block bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors duration-200">
                         สั่งซื้อ
                            </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;
