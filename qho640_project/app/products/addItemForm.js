import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig'; 
import { collection, addDoc } from "firebase/firestore"; 
import { UserAuth } from '../auth/AuthContext'; 

export default function AddItemPage( { refreshProducts } ) {
    const [Features, setFeatures] = useState('');
    const [Image, setImage] = useState('');
    const [Make, setMake] = useState('');
    const [Model, setModel] = useState('');
    const [Price, setPrice] = useState('');
    const { user, role } = UserAuth(); // Context to access user and role

    useEffect(() => {
        if (role !== 'admin') {
            alert('You are not authorized to view this page.');
        }
    }, [role]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (role === 'admin' && Features && Image && Make && Model && Price) {

            if (Number(Price) <= 0) {
                alert('Please enter a valid price.');
                return;
            }
    
            try {
                const docRef = await addDoc(collection(db, "productsCategories"), {
                    Features,
                    Image,
                    Make,
                    Model,
                    Price: Number(Price)
                });
                console.log("Document written with ID: ", docRef.id);
                alert('Product added successfully!');
                refreshProducts(); 
                setFeatures('');
                setImage('');
                setMake('');
                setModel('');
                setPrice('');

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
