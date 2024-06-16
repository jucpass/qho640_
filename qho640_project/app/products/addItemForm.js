import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig'; 
import { collection, addDoc } from "firebase/firestore"; 
import { UserAuth } from '../auth/AuthContext'; 

// Function to add a new item to the database
export default function AddItemPage( { refreshProducts } ) {
    const [Features, setFeatures] = useState(''); // State to store features
    const [Image, setImage] = useState(''); // State to store image URL
    const [Make, setMake] = useState(''); // State to store make
    const [Model, setModel] = useState(''); // State to store model
    const [Price, setPrice] = useState(''); // State to store price
    const [Stock, setStock] = useState(''); // State to store stock
    const { user, role } = UserAuth(); // Context to access user and role

    // Check if the user is an admin
    useEffect(() => {
        if (role !== 'admin') {
            alert('You are not authorized to view this page.');
        }
    }, [role]);

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        
        if (role === 'admin' && Features && Image && Make && Model && Price && Stock) { // Check if all fields are filled

            if (Number(Price) <= 0 || Number(Stock) <= 0){ // Check if price or stock is less than zero
                alert('Price and Stock could not be less than zero.');
                return;
            }
    
            try {
                const docRef = await addDoc(collection(db, "productsCategories"), { // Add a new document to the collection
                    Features,
                    Image,
                    Make,
                    Model,
                    Price: Number(Price),
                    Stock: Number(Stock),
                });
                console.log("Document written with ID: ", docRef.id);
                alert('Product added successfully!');
                refreshProducts();  // Refresh the product list after adding a new product
                setFeatures(''); // Clear the form fields
                setImage('');   // Clear the form fields
                setMake('');
                setModel('');
                setPrice('');
                setStock('');

                 // Refresh the product list after adding a new product
            } catch (e) {
                console.error("Error adding document: ", e);
                alert('Failed to add product. Please try again.');
            }
        } else {
            if (role !== 'admin') {
                alert('You are not authorized to perform this action.');
            } else {
                alert('Please fill in all the fields.');
            }
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
                                <input
                                    type="number"
                                    placeholder="Stock"
                                    value={Stock}
                                    onChange={e => setStock(e.target.value)}
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
