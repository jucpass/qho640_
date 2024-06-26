
"use client";
import React, {useState, useEffect} from "react";
import { useCart } from "../checkout/cartContext";
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faMinus, faPlus, faCreditCard } from '@fortawesome/free-solid-svg-icons';
import CheckoutModal from './checkout';
import { checkCurrentStock } from '../database/products';



function CartDisplay({user}) {

    const { cart, total, removeFromCart, decreaseQuantity, increaseQuantity } = useCart(); // Access cart context
    const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

    // Effect to log the current user
    useEffect(() => {
        console.log("Current user in cartCards:", user);
    }, [user]);
    // Handle the checkout process
    const handleCheckout = () => {
        if (user) { // Check if user is logged in
            if (cart.length > 0) { // Check if the cart is not empty
                setIsModalOpen(true); // Open the checkout modal
            } else {
                console.error("The cart is empty");
                alert("Please add some items to your cart before checkout."); 
            }
        } else {
            console.error("No user logged in");
            alert("Please log in to proceed with checkout."); 
        }
    };

    // Function to close the checkout modal
    const closeModal = () => {
        setIsModalOpen(false);
    };

    // Function to remove an item from the cart
    const handleRemove = (id) => {
        removeFromCart(id);
    };

    // Function to increase the quantity of an item in the cart
    const handleIncrease = async (id) => {
        const currentStock = await checkCurrentStock(id); // Check the current stock of the item
        const currentItem = cart.find(item => item.id === id); // Find the item in the cart
    
        if (currentItem.quantity < currentStock) { // Check if the quantity is less than the stock
            increaseQuantity(id); // Increase the quantity of the item
        } else {
            alert("Cannot add more items. Stock limit reached.");
        }
    };

    // Function to decrease the quantity of an item in the cart
    const handleDecrease = (id) => {
        decreaseQuantity(id); // Decrease the quantity of the item
    }

    
    return (
        <div className="columns">
            <div className="column"></div>
            <div className="column"> 
            <h1 className="title">Your Cart</h1>
            <div>
                {cart.map((item) => (
                    <div key={item.id} className="box">
                        <article className="media">
                        <div className="media-left">
                        <figure className="image is-64x64">
                            <Image 
                                src={item.Image}
                                alt={item.Model}
                                width={10}
                                height={20}
                                unoptimized={true} 
                            />
                        </figure>
                        </div>
                        <div className="media-content">
                        <div className="content">
                        <p className="is-size-3">{item.Model}</p>
                        <p className="is-italic">{item.Make}</p>
                         <p>£{item.Price}</p>
                        </div>
                        <p className="buttons">
                        <button className="button" onClick={() => handleIncrease(item.id)}>
                        <span className="icon is-small">
                        <FontAwesomeIcon icon={faPlus} />
                        </span>
                        </button>
                        <button className="button is-static">
                        <span className="icon is-small">
                        {item.quantity}
                        </span>
                        </button>
                        <button className="button" onClick={() => handleDecrease(item.id)} disabled={item.quantity <= 1}>
                        <span className="icon is-small">
                        <FontAwesomeIcon icon={faMinus} />
                        </span>
                        </button>
                        <button className="button" onClick={() => handleRemove(item.id)}>
                        <span className="icon is-small">
                        <FontAwesomeIcon icon={faTrash} />
                        </span>
                        </button>
                        </p>
                        </div>
                        </article>
                    </div>
                ))}
                {cart.length === 0 && <p>Your cart is empty.</p>}
            </div>
            <p className="title">Total: £{total.toFixed(2)}</p>
            <button className="button is-success" onClick={handleCheckout}>
                Proceed to Payment &nbsp; <FontAwesomeIcon icon={faCreditCard} />
            </button>
            <CheckoutModal isOpen={isModalOpen} onClose={closeModal} total={total} cart={cart} user={user} />
            </div>
            <div className="column"></div>
        </div>
    );
}

export default CartDisplay;
