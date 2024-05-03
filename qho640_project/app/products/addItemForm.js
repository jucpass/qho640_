import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig'; // Ensure you have this Firebase config file
import { collection, addDoc } from "firebase/firestore"; 
import { UserAuth } from '../auth/AuthContext'; 

export default function AddItemPage() {
    const [Features, setFeatures] = useState('');
    const [Image, setImage] = useState('');
    const [Make, setMake] = useState('');
    const [Model, setModel] = useState('');
    const [Price, setPrice] = useState('');
    const { user, role } = UserAuth(); // Context to access user and role

    // Redirect or hide form if not admin
    useEffect(() => {
        if (role !== 'admin') {
            alert('You are not authorized to view this page.');
            // need to implement a redirect here
        }
    }, [role]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (role === 'admin') {
            try {
                const docRef = await addDoc(collection(db, "productsCategories"), {
                    Features,
                    Image,
                    Make,
                    Model,
                    Price: Number(Price) 
                });
                console.log("Document written with ID: ", docRef.id);
                // Reset form or show a success message
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        } else {
            alert('You are not authorized to perform this action.');
        }
    };

    return (
        <section className="section">
        <div className="columns">
        <div className="column"></div>
        <div className="column">
            
        <h1 className="title has-text-centered">Add Item</h1>
        <div className="cards-container">
            <div className="card">
                    <div className="card-image">

                            <form onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    placeholder="Features"
                                    value={Features}
                                    onChange={e => setFeatures(e.target.value)}
                                    className="input"
                                />
                                <div className="block"></div>
                                <input
                                    type="text"
                                    placeholder="Image URL"
                                    value={Image}
                                    onChange={e => setImage(e.target.value)}
                                    className="input"
                                />
                                <div className="block"></div>
                                <input
                                    type="text"
                                    placeholder="Make"
                                    value={Make}
                                    onChange={e => setMake(e.target.value)}
                                    className="input"
                                />
                                <div className="block"></div>
                                <input
                                    type="text"
                                    placeholder="Model"
                                    value={Model}
                                    onChange={e => setModel(e.target.value)}
                                    className="input"
                                />
                                <div className="block"></div>
                                <input
                                    type="number"
                                    placeholder="Price"
                                    value={Price}
                                    onChange={e => setPrice(e.target.value)}
                                    className="input"
                                />
                                <div className="block"></div>
                                <button type="submit" className="w-full py-2 px-4 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md focus:outline-none focus:shadow-outline">Add Item</button>
                            </form>
                            </div>
                            </div>
            </div>
            </div> 
            <div className="column"></div>
            </div>
        </section>
    );
}
