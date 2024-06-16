import { useState, useEffect, useCallback } from "react";
import { db } from "../firebaseConfig"; 
import { collection, getDocs, doc, getDoc, updateDoc } from "firebase/firestore";

// Function to fetch products from Firebase
async function fetchProductsFromFirebase() {
    const querySnapShot = await getDocs(collection(db, 'productsCategories')); // Get all products
    const productsList = []; // Array to store products
    querySnapShot.forEach((doc) => {  // Loop through each document
        productsList.push({ id: doc.id, ...doc.data() }); // Add the product to the array
    });
    return productsList; // Return the array
}

// Function to check the current stock of a product
async function checkCurrentStock(productId) {
    const docRef = doc(db, 'productsCategories', productId);  // Get the product document
    const docSnap = await getDoc(docRef); // Get the document snapshot
    if (docSnap.exists()) { // If the document exists
        return docSnap.data().Stock; // Return the stock
    } else {
        console.error("No such product found!");
        return 0;
    }
}

// Function to update the stock of a product
async function updateStock(productId, newStock) {
    const docRef = doc(db, 'productsCategories', productId); // Get the product document
    await updateDoc(docRef, {
        Stock: newStock
    }); // Update the stock
}

// Hook to fetch products from Firebase
function useProducts() {
    const [products, setProducts] = useState([]); // State to store products

    const fetchData = useCallback(async () => {
        const productsList = await fetchProductsFromFirebase();
        setProducts(productsList);
    }, []); // Update when products change

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { products, refreshProducts: fetchData };
}

export { useProducts, checkCurrentStock, updateStock };



