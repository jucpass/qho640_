/* working but using direct Firestore fetch 

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
*/

import { useState, useEffect, useCallback } from "react";
import { UserAuth } from "../auth/AuthContext";
import { fetchOrdersFromAPI } from "../utils/fetchOrdersFromAPI";


function useOrders() {
    const { user, role, fetchIdToken } = UserAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        if (!user) return;

        setLoading(true);
        setError(null);
        try {
            const token = await fetchIdToken();
            const ordersList = await fetchOrdersFromAPI(user, role, token);
            setOrders(ordersList);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, [user, role, fetchIdToken]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { orders, refreshOrders: fetchData, loading, error };
}

export default useOrders;

