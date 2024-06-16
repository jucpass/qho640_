
"use client";
import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig'; 
import { collection, addDoc } from 'firebase/firestore';
import { useCart } from '../checkout/cartContext';
import { Timestamp } from "firebase/firestore";
import { checkBalance, updateBalance } from '../database/users';
import { checkCurrentStock, updateStock } from '../database/products';

function CheckoutModal({ isOpen, onClose, total, cart, user }) {

    const [cardNumber, setCardNumber] = useState(''); // State to store card number
    const [expDate, setExpDate] = useState(''); // State to store expiration date
    const [cvv, setCvv] = useState(''); // State to store CVV
    const { clearCart } = useCart(); // Function to clear the cart

    useEffect(() => {
        console.log("Current user in CheckoutModal:", user); 
    }, [user]); 

    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission
        if (!user) { 
            console.error("No user is signed in.");
            alert('Please log in to proceed.');
            return; // Return if no user is signed in
        }
    
        // Check if user has enough balance
        const currentBalance = await checkBalance(user.uid);
        if (total > currentBalance) { 
            alert('Insufficient balance to complete this order.');
            return;
        }
    
        // Check if all items are in stock
        for (const item of cart) {
            const stock = await checkCurrentStock(item.id);
            if (item.quantity > stock) { // If quantity is more than stock
                alert(`Insufficient stock for ${item.name}.`);
                return;
            }
        }
    
        // Deduct the total from the user's balance and update the stock
        await updateBalance(user.uid, currentBalance - total);
        for (const item of cart) {
            const stock = await checkCurrentStock(item.id); // Get current stock
            await updateStock(item.id, stock - item.quantity); // Update stock
        }
        
        // Save the order to the database
        try {
            const docRef = await addDoc(collection(db, "orders"), {
                userId: user.uid,
                userEmail: user.email,
                items: cart,
                total: total,
                date: Timestamp.now(), 
            });
            console.log("Document written with ID: ", docRef.id);
            alert('Order added successfully!');
            clearCart(); // Clear the cart after order is placed
            onClose(); // Close the modal
        } catch (error) {
            console.error('Error saving order: ', error);
            alert('Failed to save order. Please try again.');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal is-active">
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Payment Information</p>
                    <button className="delete" aria-label="close" onClick={onClose}></button>
                </header>
                <section className="modal-card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="field">
                            <label className="label">Card Number</label>
                            <div className="control">
                                <input className="input" type="text" placeholder="Card Number" value={cardNumber} onChange={e => setCardNumber(e.target.value)} />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Expiration Date</label>
                            <div className="control">
                                <input className="input" type="text" placeholder="MM/YY" value={expDate} onChange={e => setExpDate(e.target.value)} />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">CVV</label>
                            <div className="control">
                                <input className="input" type="text" placeholder="CVV" value={cvv} onChange={e => setCvv(e.target.value)} />
                            </div>
                        </div>
                        <div className="field">
                            <div className="control">
                                <button className="button is-success">Submit Payment</button>
                            </div>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    );
}

export default CheckoutModal;
