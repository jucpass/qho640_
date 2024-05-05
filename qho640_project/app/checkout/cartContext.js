import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0); // Total cost of the cart
    const [itemCount, setItemCount] = useState(0); // Total number of items

    useEffect(() => {
        const newTotal = cart.reduce((acc, item) => acc + item.Price * (item.quantity || 1), 0);
        const newCount = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
        setTotal(newTotal);
        setItemCount(newCount);
    }, [cart]); // Recalculate when cart changes

    const addToCart = (product) => {
        setCart(currentCart => {
            const index = currentCart.findIndex(item => item.id === product.id);
            if (index >= 0) {
                const updatedCart = [...currentCart];
                const existingItem = updatedCart[index];
                existingItem.quantity = (existingItem.quantity || 1) + 1;
                return updatedCart;
            } else {
                // New product added to the cart
                return [...currentCart, { ...product, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (productId) => {
        setCart(currentCart => currentCart.filter(item => item.id !== productId));
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, total, itemCount }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);