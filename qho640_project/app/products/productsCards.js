
import React, { useState } from 'react';
import Image from 'next/image';
import { UserAuth } from '../auth/AuthContext'; 
import { useCart } from '../checkout/cartContext';
import { db } from '../firebaseConfig';
import { updateDoc, deleteDoc, doc } from "firebase/firestore";

// Function to display product cards
function ProductCards({ products = [], refreshProducts }) {
    const { addToCart } = useCart();  // Function to add to cart
    const { role } = UserAuth(); // Get the current user role
    const [editingStates, setEditingStates] = useState({}); // State to store editing states


    // Function to handle product deletion
    const handleDelete = async (productId) => {
        if (role === 'admin') { // Check if user is an admin
            console.log('Deleting product with ID: ', productId); 
            if (window.confirm('Are you sure you want to delete this product?')) {
                try {
                    const docRef = doc(db, 'productsCategories', productId); // Get the product document
                    await deleteDoc(docRef); // Delete the document
                    console.log('Product successfully deleted!'); 
                    alert('Product has been successfully deleted.'); 
                    refreshProducts(); // Refresh the product list after deletion
                } catch (error) {
                    console.error('Error removing product: ', error);
                    alert('Failed to delete product.'); 
                }
            } else {
                console.log('Product deletion canceled.');
            }
        } else {
            alert('You are not authorized to perform this action.');
        }
    };

    // Function to handle changes in the edit form
    const handleEditChange = (product, key, value) => { // Handle changes in the edit form
        setEditingStates(prev => ({ // Update the editing state
            ...prev, // Keep the previous state
            [product.id]: { // Update the product with the new value
                ...prev[product.id], // Keep the previous product state
                [key]: value // Update the key with the new value
            }
        }));
    };
    // Function to toggle edit mode
    const toggleEdit = (productId) => { // Toggle edit mode
        setEditingStates(prev => ({ // Update the editing state
            ...prev, // Keep the previous state
            [productId]: { // Update the product with the new value
                isEditing: !prev[productId]?.isEditing, // Toggle the editing state
                ...products.find(p => p.id === productId) // Get the product by ID
            }
        }));
    };

    // Function to save changes
    const saveChanges = async (productId) => {
        const editedProduct = editingStates[productId]; // Get the edited product
        console.log('Saving changes for product: ', editedProduct); 
        try { // Try to update the product
            const docRef = doc(db, 'productsCategories', productId); // Get the product document
            await updateDoc(docRef, editedProduct); // Update the document
            console.log('Product updated successfully');
            refreshProducts(); // Refresh the product list after updating
            setEditingStates(prev => { // Update the editing state
                const newState = { ...prev }; // Create a new state
                delete newState[productId]; // Delete the product from the state
                return newState; // Return the new state
            }
        );
        } catch (error) {
            console.error('Error updating product: ', error);
        }
    };


    return (
        <div className="cards-container">
            {products.map((product) => (
                <div key={product.id} className="card"> 
                    <div className="card-image">
                        <figure className="image is-2by3">
                            <Image 
                                src={product.Image}
                                alt={product.Model}
                                width={30}
                                height={60}
                                unoptimized={true} 
                            />
                        </figure>
                    </div>
                    <div className="card-content">
                        <div className="media">
                            <div className="media-content">
                                {editingStates[product.id]?.isEditing ? (
                                    <React.Fragment>
                                        <input
                                            className="input"
                                            value={editingStates[product.id].Model}
                                            name="Model"
                                            onChange={(e) => handleEditChange(product, 'Model', e.target.value)}
                                        />
                                        <input
                                            className="input"
                                            value={editingStates[product.id].Make}
                                            name="Make"
                                            onChange={(e) => handleEditChange(product, 'Make', e.target.value)}
                                        />
                                        <textarea
                                            className="textarea"
                                            value={editingStates[product.id].Features}
                                            name="Features"
                                            onChange={(e) => handleEditChange(product, 'Features', e.target.value)}
                                        />
                                        <input
                                            type="number"
                                            className="input"
                                            value={editingStates[product.id].Price}
                                            name="Price"
                                            onChange={(e) => handleEditChange(product, 'Price', e.target.value)}
                                        />
                                        <input
                                            type="number"
                                            className="input"
                                            value={editingStates[product.id].Stock}
                                            name="Stock"
                                            onChange={(e) => handleEditChange(product, 'Stock', e.target.value)}
                                        />
                                        <button className="button is-success" onClick={() => saveChanges(product.id)}>Save</button>
                                    </React.Fragment>
                                ) : (
                                    <React.Fragment>
                                        <p className="title is-4">{product.Model}</p>
                                        <p className="subtitle is-6">{product.Make}</p>
                                        <p>Features: {product.Features}</p>
                                        <p>Price: £{product.Price}</p>
                                        <p>Stock: {product.Stock}</p>
                                    </React.Fragment>
                                )}
                            </div>
                        </div>
                        <div className="content">
                            {role === 'admin' ? (
                                <div className="buttons">
                                    <button className="button is-warning" onClick={() => toggleEdit(product.id)}>Edit</button>
                                    <button className="button is-danger" onClick={() => handleDelete(product.id)}>Delete</button>
                                </div>
                            ) : (
                                <div className="buttons">
                                    {product.Stock > 0 ? (
                                <button className="button is-success" onClick={() => addToCart(product)}>Add to Cart</button>
                            ) : (
                                <button className="button is-warning" disabled>Out of Stock</button>
                            )}
                            </div>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ProductCards;
