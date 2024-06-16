// This API endpoint returns all orders from the Firestore database
import {dbAdmin} from '../../app/firebaseConfigAdmin'; 


// Function to fetch orders from the Firestore database
export default async function handler(req, res) {
    const { userId, role } = req.query;  // Get the userId and role from the query parameters

    try {
        // Create a query based on user role; if admin, fetch all orders; if user, fetch specific user orders
        let query = dbAdmin.collection('orders'); // Get the orders collection
        if (role !== 'admin') { // If user is not an admin
            query = query.where('userId', '==', userId); // Fetch orders for the user
        }

        const snapshot = await query.get(); // Get the orders collection
        const orders = [];  // Array to store orders

        if (snapshot.empty) { // If no orders are found
            console.log('No matching documents.');
            res.status(200).json({ orders: [] }); // Return an empty array
            return;
        }

        // Loop through each document and add it to the orders array
        snapshot.forEach(doc => { 
            const order = { // Order object
                id: doc.id, // Order ID
                ...doc.data(), // Order data
                date: doc.data().date.toDate().toISOString() // Convert Firestore Timestamp readable date
            };
            orders.push(order); // Add the order to the orders array
        });

        res.status(200).json({ orders: orders }); // Return the orders array

    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
}
