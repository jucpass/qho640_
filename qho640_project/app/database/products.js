

import { useState, useEffect, useCallback } from "react";
import { db } from "../firebaseConfig"; 
import { collection, getDocs } from "firebase/firestore";

async function fetchProductsFromFirebase() {
    const querySnapShot = await getDocs(collection(db, 'productsCategories'));
    const productsList = [];
    querySnapShot.forEach((doc) => {
        productsList.push({ id: doc.id, ...doc.data() });
    });
    return productsList;
}

export default function useProducts() {
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



