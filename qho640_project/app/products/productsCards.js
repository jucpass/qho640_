
import React, { useState } from 'react';
import useProducts from '../database/products';
import Image from 'next/image';
import { UserAuth } from '../auth/AuthContext'; 
import { useCart } from '../checkout/cartContext';
import { db } from '../firebaseConfig';
import { updateDoc, deleteDoc, doc } from "firebase/firestore";

function ProductCards({ products = [], refreshProducts }) {
    const { addToCart } = useCart();
    const { role } = UserAuth();
    const [editingStates, setEditingStates] = useState({});


    const handleDelete = async (productId) => {
        if (role === 'admin') {
            console.log('Deleting product with ID: ', productId);
            if (window.confirm('Are you sure you want to delete this product?')) {
                try {
                    const docRef = doc(db, 'productsCategories', productId);
                    await deleteDoc(docRef);
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
        console.log('Saving changes for product: ', editedProduct);
        try {
            const docRef = doc(db, 'productsCategories', productId);
            await updateDoc(docRef, editedProduct);
            console.log('Product updated successfully');
            refreshProducts(); // Refresh the product list after updating
            setEditingStates(prev => {
                const newState = { ...prev };
                delete newState[productId];
                return newState;
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
                                <button className="button is-success" onClick={() => addToCart(product)}>Add to Cart</button>
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
