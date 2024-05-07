import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const CartContext = createContext();

export const CartProvider = ({ children, initialCart }) => {
    const [cart, setCart] = useState(() => {
        // Try to get cart from initialCart if available
        return initialCart || JSON.parse(Cookies.get('cart') || '[]');
    });

    const [total, setTotal] = useState(0); // Total cost of the cart
    const [itemCount, setItemCount] = useState(0); // Total number of items

    useEffect(() => {
        // Calculate total and item count
        const newTotal = cart.reduce((acc, item) => acc + item.Price * (item.quantity || 1), 0);
        const newCount = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
        setTotal(newTotal);
        setItemCount(newCount);

        // Save cart to cookies
        Cookies.set('cart', JSON.stringify(cart), { expires: 7, path: '/' });
    }, [cart]);

    const addToCart = (product) => {
        setCart(currentCart => {
            const index = currentCart.findIndex(item => item.id === product.id);
            if (index >= 0) {
                // If the product exists, increase quantity
                const updatedCart = [...currentCart];
                updatedCart[index].quantity = (updatedCart[index].quantity || 1) + 1;
                return updatedCart;
            }
            // Add new product to the cart
            return [...currentCart, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId) => {
        setCart(currentCart => currentCart.filter(item => item.id !== productId));
    };

    const increaseQuantity = (productId) => {
        setCart(currentCart => {
            return currentCart.map(item => {
                if (item.id === productId) {
                    return { ...item, quantity: item.quantity + 1 };
                }
                return item;
            });
        });
    };
    
    const decreaseQuantity = (productId) => {
        setCart(currentCart => {
            return currentCart.map(item => {
                if (item.id === productId && item.quantity > 1) {
                    return { ...item, quantity: item.quantity - 1 };
                }
                return item;
            }).filter(item => item.quantity > 0); // if zero removes the item
        });
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, total, itemCount }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
