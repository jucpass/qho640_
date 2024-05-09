
"use client";
import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig'; 
import { collection, addDoc } from 'firebase/firestore';
import { useCart } from '../checkout/cartContext';
import { Timestamp } from "firebase/firestore";

function CheckoutModal({ isOpen, onClose, total, cart, user }) {

    const [cardNumber, setCardNumber] = useState('');
    const [expDate, setExpDate] = useState('');
    const [cvv, setCvv] = useState('');
    const { clearCart } = useCart();

    useEffect(() => {
        console.log("Current user in CheckoutModal:", user);
    }, [user]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!user) {
            console.error("No user is signed in.");
            return; 
        }

        try {

            const docRef = await addDoc(collection(db, "orders"), {
                userId: user.uid,
                userEmail: user.email,
                items: cart,
                total: total,
                //cardNumber: cardNumber,
                //expDate: expDate,
                //cvv: cvv,
                date: Timestamp.now(), //timestamp
            });
            console.log("Document written with ID: ", docRef.id);
            alert('Order added successfully!');
            clearCart(); // Clear the cart after order is placed
            onClose(); 
        } catch (error) {
            console.error('Error saving order: ', error);
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
