import { useState, useEffect } from "react";
import { db } from "../firebaseConfig"; // Ensure this path is correct
import { collection, getDocs } from "firebase/firestore";

// Fetch products from Firestore and handle potential errors
async function fetchProductsFromFirebase() {
	const querySnapShot = await getDocs(collection(db, 'productsCategories'));

	const productsList = [];
	querySnapShot.forEach((doc) => {
		productsList.push({id: doc.id,...doc.data()});
	})
	
return productsList;
}
/*
export default function useProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            try {
                const productsList = await fetchProductsFromFirebase();
                setProducts(productsList);
                setLoading(false);
            } catch (error) {
                setError(error.message); // Store the error message
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return { products, loading, error };
}
*/
export default function useProducts() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const productsList = await fetchProductsFromFirebase();
            setProducts(productsList);
        }
        fetchData();
    } , []);
    return products;
}



