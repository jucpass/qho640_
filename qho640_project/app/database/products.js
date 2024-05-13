

import { useState, useEffect, useCallback } from "react";
import { db } from "../firebaseConfig"; 
import { collection, getDocs, doc, getDoc, updateDoc } from "firebase/firestore";

async function fetchProductsFromFirebase() {
    const querySnapShot = await getDocs(collection(db, 'productsCategories'));
    const productsList = [];
    querySnapShot.forEach((doc) => {
        productsList.push({ id: doc.id, ...doc.data() });
    });
    return productsList;
}

async function checkCurrentStock(productId) {
    const docRef = doc(db, 'productsCategories', productId); 
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data().Stock;
    } else {
        console.error("No such product found!");
        return 0;
    }
}

async function updateStock(productId, newStock) {
    const docRef = doc(db, 'productsCategories', productId);
    await updateDoc(docRef, {
        Stock: newStock
    });
}

function useProducts() {
    const [products, setProducts] = useState([]);

    const fetchData = useCallback(async () => {
        const productsList = await fetchProductsFromFirebase();
        setProducts(productsList);
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { products, refreshProducts: fetchData };
}

export { useProducts, checkCurrentStock, updateStock };



