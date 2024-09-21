// components/Cart.js
"use client";
import React from "react";

const Cart = () => {
  const cartItems = [
    // ตัวอย่างข้อมูลสินค้าในตระกร้า
    { id: 1, name: "Product 1", price: 100, quantity: 1 },
    { id: 2, name: "Product 2", price: 150, quantity: 2 },
  ];

  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto py-12">
      <h2 className="text-3xl mb-6 text-center">Shopping Cart</h2>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Product</th>
            <th className="border border-gray-300 px-4 py-2">Price</th>
            <th className="border border-gray-300 px-4 py-2">Quantity</th>
            <th className="border border-gray-300 px-4 py-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map(item => (
            <tr key={item.id}>
              <td className="border border-gray-300 px-4 py-2">{item.name}</td>
              <td className="border border-gray-300 px-4 py-2">${item.price}</td>
              <td className="border border-gray-300 px-4 py-2">{item.quantity}</td>
              <td className="border border-gray-300 px-4 py-2">${item.price * item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-6 text-right">
        <h3 className="text-xl">Total Amount: ${totalAmount}</h3>
      </div>
    </div>
  );
};

export default Cart;
