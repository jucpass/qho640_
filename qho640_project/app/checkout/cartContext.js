
import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { UserAuth } from '../auth/AuthContext';


const CartContext = createContext();

// Cart provider to manage cart state
export const CartProvider = ({ children }) => {
    const { user } = UserAuth(); // Get the current user
    const userId = user ? user.uid : 'guest'; // Get the user ID or set to 'guest'

    const [cart, setCart] = useState([]); // State to store cart items
    useEffect(() => {
        const loadCart = () => {
            const cartData = Cookies.get(`cart_${userId}`); // Get cart data from cookies
            return cartData ? JSON.parse(cartData) : []; // Parse the cart data
        };
        setCart(loadCart()); // Load cart data
    }, [userId]); // Update cart when user ID changes

    const [total, setTotal] = useState(0); // State to store total price
    const [itemCount, setItemCount] = useState(0);  // State to store total items

    useEffect(() => {
        const newTotal = cart.reduce((acc, item) => acc + item.Price * (item.quantity || 1), 0); // Calculate total price
        const newCount = cart.reduce((acc, item) => acc + (item.quantity || 1), 0); // Calculate total items
        setTotal(newTotal); // Update total price
        setItemCount(newCount);     // Update total items
        Cookies.set(`cart_${userId}`, JSON.stringify(cart), { expires: 1, path: '/' }); // Save cart data to cookies
    }, [cart, userId]); // Update total price and items when cart changes

    // Function to add an item to the cart
    const addToCart = (product) => {
        setCart(currentCart => {
            const index = currentCart.findIndex(item => item.id === product.id); // Check if item is already in cart
            if (index >= 0) { // If item is in cart, increase quantity
                const updatedCart = [...currentCart]; // Copy current cart
                updatedCart[index].quantity += 1; // Increase quantity
                return updatedCart; // Return updated cart
            }
            return [...currentCart, { ...product, quantity: 1 }]; // Add new item to cart
        });
    };

    // Function to remove an item from the cart
    const removeFromCart = (productId) => {
        setCart(currentCart => currentCart.filter(item => item.id !== productId)); // Remove item from cart
    };

    // Function to increase the quantity of an item in the cart
    const increaseQuantity = (productId) => {
        setCart(currentCart => currentCart.map(item => item.id === productId ? { ...item, quantity: item.quantity + 1 } : item)); // Increase quantity
    };

    // Function to decrease the quantity of an item in the cart
    const decreaseQuantity = (productId) => {
        setCart(currentCart => currentCart.map(item => item.id === productId &&  
            item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item) // Decrease quantity
        .filter(item => item.quantity > 0)); // Remove items with quantity 0
    };

    // Function to clear the cart
    const clearCart = () => {
        setCart([]);   // Clear cart
    };

    // Return cart context provider
    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, total, itemCount }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);


