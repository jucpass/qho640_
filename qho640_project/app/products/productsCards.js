
import React, { useState } from 'react';
import useProducts from '../database/products';
import Image from 'next/image';
import { UserAuth } from '../auth/AuthContext'; 
import { db } from '../firebaseConfig';

function ProductCards() {
    const products = useProducts();
    const { role } = UserAuth();
    const [editingStates, setEditingStates] = useState({});

    const handleDelete = async (productId) => {
        if (role === 'admin') {
            // Confirmation dialog
            if (window.confirm('Are you sure you want to delete this product?')) {
                try {
                    await db.collection('productsCategories').doc(productId).delete();
                    console.log('Product successfully deleted!');
                    alert('Product has been successfully deleted.'); 
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

    const handleEditChange = (product, key, value) => {
        setEditingStates(prev => ({
            ...prev,
            [product.id]: {
                ...prev[product.id],
                [key]: value
            }
        }));
    };

    const toggleEdit = (productId) => {
        setEditingStates(prev => ({
            ...prev,
            [productId]: {
                isEditing: !prev[productId]?.isEditing,
                ...products.find(p => p.id === productId)
            }
        }));
    };

    const saveChanges = async (productId) => {
        const editedProduct = editingStates[productId];
        try {
            await db.collection('productsCategories').doc(productId).update(editedProduct);
            console.log('Product updated successfully');
            setEditingStates(prev => {
                const newState = { ...prev };
                delete newState[productId];
                return newState;
            });
        } catch (error) {
            console.error('Error updating product: ', error);
        }
    };


    return (
        <div className="cards-container">
            {products.map((product, index) => (
                <div key={product.id || index} className="card"> {/* Ensure unique key, prefer product.id if available */}
                    <div className="card-image">
                        <figure className="image is-2by3">
                            <Image 
                                src={product.Image}
                                alt={product.Model}
                                width={50}
                                height={80}
                                unoptimized={true}  // Add this if you face issues with image optimization
                            />
                        </figure>
                    </div>
                    <div className="card-content">
                        <div className="media">
                            <div className="media-content">
                                {editingStates[product.id]?.isEditing ? (
                                    <React.Fragment> {/* Use React.Fragment for grouping */}
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
                                        <button className="button is-success" onClick={() => saveChanges(product.id)}>Save</button>
                                    </React.Fragment>
                                ) : (
                                    <React.Fragment>
                                        <p className="title is-4">{product.Model}</p>
                                        <p className="subtitle is-6">{product.Make}</p>
                                        <p>Features: {product.Features}</p>
                                        <p>Price: ${product.Price}</p>
                                    </React.Fragment>
                                )}
                            </div>
                        </div>
                        <div className="content">
                            {role === 'admin' && (
                                <div className="buttons">
                                    <button className="button is-warning" onClick={() => toggleEdit(product.id)}>Edit</button>
                                    <button className="button is-danger" onClick={() => handleDelete(product.id)}>Delete</button>
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



/*
    return (
        <div className="cards-container"> 
        {products.map((product, index) => (
            
            <div key={index} className="card">
                <div className="card-image">
                    <figure className="image is-2by3">
                        <Image 
                            src={product.Image}
                            alt={product.Model}
                            width={50}
                            height={80}
                        />
                    </figure>
                </div>

                <div className="card-content">
                    <div className="media">
                        <div className="media-content">
                            <p className="title is-4">{product.Model}</p>
                            <p className="subtitle is-6">{product.Make}</p>
                        </div>
                    </div>
                    <div className="content">
                        <p>Features: {product.Features}</p>
                        <br />
                        <p>Price: ${product.Price}</p>
                        {role === 'admin' && (

                            <div className="buttons">
                                <button className="button is-warning" onClick={() => handleEdit(product.id)}>Edit</button>
                                <button className="button is-danger" onClick={() => handleDelete(product.id)}>Delete</button>
                            </div>
                        )}
                        {role !== 'admin' && (
                            <button className="button is-success">Add to Cart</button>
                        )}
                    </div>
                </div>
            </div>
        ))}
    </div>
);
}


export default ProductCards;
*/