"use client"; 
import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [isCartBumping, setIsCartBumping] = useState(false); 
    const [totalQuantity, setTotalQuantity] = useState(0);

    const addToCart = (item) => {
        const existingItem = cart.find(cartItem => cartItem.id === item.id);
        if (existingItem) {
            setCart((prev) =>
                prev.map(cartItem =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                )
            );
        } else {
            setCart((prev) => [...prev, { ...item, quantity: 1 }]);
        }
        setIsCartBumping(true);
        setTimeout(() => setIsCartBumping(false), 300); // animation duration
    };

    const removeFromCart = (id) => {
        setCart((prev) => prev.filter(item => item.id !== id));
    };

    const updateQuantity = (id, quantity) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === id ? { ...item, quantity: quantity < 1 ? 1 : quantity } : item
            )
        );
    };

    const getTotalQuantity = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, getTotalQuantity,totalQuantity, isCartBumping  }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
