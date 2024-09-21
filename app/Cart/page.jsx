"use client";
import { useCart } from "../../components/CartContext";
import { MdDeleteOutline } from "react-icons/md";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

const Cart = () => {
    const { cart, removeFromCart, updateQuantity } = useCart();
    const [showCart, setShowCart] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleRemoveFromCart = (id) => {
        removeFromCart(id);
        setCopied(false);
    };

    const handleUpdateQuantity = (id, newQuantity) => {
        updateQuantity(id, newQuantity);
        setCopied(false);
    };

    useEffect(() => {
        const timer = setTimeout(() => setShowCart(true), 500);
        return () => clearTimeout(timer);
    }, []);

    const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    const orderDetails = cart
        .map(item => `- ${item.name} (จำนวน: ${item.quantity}, ราคา: ${item.price * item.quantity} บาท)`)
        .join("\n");

    const orderSummary = `ต้องการสั่งซื้อ:\n\n${orderDetails}\n\nรวมทั้งหมด: ${totalAmount} บาท`;

    const handleOrder = () => {
        setShowModal(true);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(orderSummary)
            .then(() => setCopied(true))
            .catch(err => console.error("Failed to copy text: ", err));
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setCopied(false);
    };

    const lineShareURL = `https://line.me/ti/p/@373uupuu`;

    return (
        <div className={`container mx-auto py-12 pt-[100px] bg-white shadow-md rounded-lg p-6 transition-opacity duration-500 ${showCart ? "opacity-100" : "opacity-0"}`}>
            <h2 className="text-3xl mb-6 text-center tracking-wide text-gray-800">Shopping Cart</h2>
            {cart.length === 0 ? (
                <div className="text-center text-gray-600">
                    <p className="mb-8 ">Your cart is empty.</p>
                    <Link href="/" className="text-black/70 font-extrabold hover:underline">Go back to shopping</Link>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {cart.map((item, index) => (
                            <div key={index} className="border border-gray-300 p-4 rounded-lg shadow hover:shadow-md transition-shadow duration-200 flex items-center">
                                <div className="flex-grow">
                                    <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                                    <p className="text-gray-700">Price: {item.price * item.quantity} Baht</p>
                                    <div className="flex items-center justify-between mt-2">
                                        <div className="flex items-center">
                                            <button
                                                onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                                disabled={item.quantity <= 1}
                                                className={`text-gray-600 py-1 px-2 bg-white rounded-lg hover:text-gray-800 transition-colors duration-200 ${item.quantity <= 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            >
                                                -
                                            </button>
                                            <span className="mx-2 text-black">{item.quantity}</span>
                                            <button
                                                onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                                className="text-gray-600 py-1 px-2 bg-white rounded-lg hover:text-gray-800 transition-colors duration-200"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => handleRemoveFromCart(item.id)}
                                            className="text-[#ff0000a1] border-[1px] text-[14px] border-[#ff000077] px-[2px] rounded-[5px] hover:text-red-800 transition-colors duration-200 flex items-center ml-4"
                                        >
                                            <MdDeleteOutline />
                                            Remove
                                        </button>
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <Image
                                        src={item.imageUrl}
                                        alt={item.name}
                                        width={100}
                                        height={100}
                                        className="rounded"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 text-right">
                        <h3 className="text-xl text-gray-800">Total Amount: {totalAmount} Baht</h3>
                        <button
                            className="mt-4 inline-block bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors duration-200"
                            onClick={handleOrder}
                        >
                            สั่งซื้อ
                        </button>
                    </div>

                    {showModal && (
                        <div
                            className={`fixed inset-0 flex items-center justify-center z-20 bg-black bg-opacity-50 transition-opacity duration-300 ${showModal ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                            onClick={handleCloseModal}
                        >
                            <div
                                className={`bg-white p-6 rounded-lg shadow-lg max-w-md w-full transition-transform duration-300 ${showModal ? 'translate-y-0' : 'translate-y-full'}`}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <h3 className="text-2xl text-black font-semibold text-center mb-4">สั่งซื้อสินค้า</h3>
                                <p className="text-gray-600 font-medium text-center mb-4">กดคัดลอก แล้วนำไปวางที่แชทในไลน์ด้านล่างนี้ได้เลยค่ะ</p>

                                <button
                                    onClick={handleCopy}
                                    className={`mx-auto flex w-full text-center justify-center py-2 px-4 rounded-lg transition-all duration-300 mb-4 shadow-lg ${copied ? "bg-white text-black border border-black" : "bg-black text-white hover:bg-opacity-80 border border-transparent"}`}
                                >
                                    {copied ? "คัดลอกแล้ว!" : "คัดลอก"}
                                </button>

                                <a
                                    href={lineShareURL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors duration-200 text-center"
                                >
                                    ติดต่อ LINE
                                </a>

                                <button
                                    onClick={handleCloseModal}
                                    className="mt-4 text-gray-600 hover:underline text-center block w-full"
                                >
                                    ปิดหน้าต่าง
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Cart;
