
import { useState, useEffect, useCallback } from "react";
import { UserAuth } from "../auth/AuthContext";
import { fetchOrdersFromAPI } from "../utils/fetchOrdersFromAPI";


function useOrders() {
    const { user, role, fetchIdToken } = UserAuth(); // Get the current user and role
    const [orders, setOrders] = useState([]); // State to store orders
    const [loading, setLoading] = useState(false); // State to store loading status
    const [error, setError] = useState(null); // State to store error message

    // Function to fetch orders from the API
    const fetchData = useCallback(async () => {
        if (!user) return;

        setLoading(true);
        setError(null);
        try {
            const token = await fetchIdToken(); // Get the ID token
            const ordersList = await fetchOrdersFromAPI(user, role, token); // Fetch orders from the API
            setOrders(ordersList); // Set the orders state
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, [user, role, fetchIdToken]); // Update when user, role or fetchIdToken changes

    // Fetch orders on component mount
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { orders, refreshOrders: fetchData, loading, error };
}

export default useOrders;

