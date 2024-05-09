import { useState, useEffect, useCallback } from "react";
import { db } from "../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";


// Function to fetch orders based on user role
async function fetchOrdersFromFirebase(user, role) {
    let q;
    if (role === 'admin') {
        q = query(collection(db, 'orders')); // Fetch all orders for admins
    } else if (role === 'user' && user) {
        q = query(collection(db, 'orders'), where("userId", "==", user.uid)); // Fetch orders for the signed-in user
    } else {
        return []; 
    }

    const querySnapShot = await getDocs(q);
    const ordersList = [];
    querySnapShot.forEach((doc) => {
        ordersList.push({ id: doc.id, ...doc.data() });
    });
    return ordersList;
}

export default function useOrders(user, role) {
    const [orders, setOrders] = useState([]);

    const fetchData = useCallback(async () => {
        const ordersList = await fetchOrdersFromFirebase(user, role);
        setOrders(ordersList);
    }, [user, role]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { orders, refreshOrders: fetchData };
}