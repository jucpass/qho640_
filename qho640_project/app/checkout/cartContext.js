
import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { UserAuth } from '../auth/AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const { user } = UserAuth();
    const userId = user ? user.uid : 'guest';

    // Initialize cart when component mounts or user changes
    const [cart, setCart] = useState([]);
    useEffect(() => {
        const loadCart = () => {
            const cartData = Cookies.get(`cart_${userId}`);
            return cartData ? JSON.parse(cartData) : [];
        };
        setCart(loadCart());
    }, [userId]);

    const [total, setTotal] = useState(0);
    const [itemCount, setItemCount] = useState(0);

    useEffect(() => {
        const newTotal = cart.reduce((acc, item) => acc + item.Price * (item.quantity || 1), 0);
        const newCount = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
        setTotal(newTotal);
        setItemCount(newCount);
        Cookies.set(`cart_${userId}`, JSON.stringify(cart), { expires: 1, path: '/' });
    }, [cart, userId]);

    const addToCart = (product) => {
        setCart(currentCart => {
            const index = currentCart.findIndex(item => item.id === product.id);
            if (index >= 0) {
                const updatedCart = [...currentCart];
                updatedCart[index].quantity += 1;
                return updatedCart;
            }
            return [...currentCart, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId) => {
        setCart(currentCart => currentCart.filter(item => item.id !== productId));
    };

    const increaseQuantity = (productId) => {
        setCart(currentCart => currentCart.map(item => item.id === productId ? { ...item, quantity: item.quantity + 1 } : item));
    };

    const decreaseQuantity = (productId) => {
        setCart(currentCart => currentCart.map(item => item.id === productId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item)
        .filter(item => item.quantity > 0)); // Remove items with quantity 0
    };

    const clearCart = () => {
        setCart([]);  
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, total, itemCount }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);


