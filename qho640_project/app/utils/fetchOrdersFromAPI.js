
// Fetch orders from API
async function fetchOrdersFromAPI(user, role, token) { // Function to fetch orders from the API
    console.log('Fetching orders from API...');
    console.log('user:', user);
    console.log('role:', role);
    console.log('token:', token);

    try { // Fetch orders from API
        const response = await fetch(`/api/orders?userId=${user.uid}&role=${role}`, { // Fetch orders for the user
            method: 'GET', // GET request
            headers: {
                'Content-Type': 'application/json', // JSON content type
                'Authorization': `Bearer ${token}`, // JWT token in the header
                'cache-control': 'no-cache', // No cache
            },
        });
        if (!response.ok) {
            console.error(`HTTP error! Status: ${response.status}`); 
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json(); // Parse the JSON response
        console.log("Orders fetched from API:", data.orders); 
        return data.orders ?? []; // Return the orders or an empty array
    } catch (error) {
        console.error("Error fetching orders from API:", error);
        return [];  // Empty array in case of error
    }
}

export { fetchOrdersFromAPI };
