
async function fetchOrdersFromAPI(user, role, token) {
    console.log('Fetching orders from API...');
    console.log('user:', user);
    console.log('role:', role);
    console.log('token:', token);

    try {
        const response = await fetch(`/api/orders?userId=${user.uid}&role=${role}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'cache-control': 'no-cache',
            },
        });
        if (!response.ok) {
            console.error(`HTTP error! Status: ${response.status}`);
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Orders fetched from API:", data.orders);
        return data.orders ?? [];
    } catch (error) {
        console.error("Error fetching orders from API:", error);
        return [];  // Empty array in case of error
    }
}

export { fetchOrdersFromAPI };
