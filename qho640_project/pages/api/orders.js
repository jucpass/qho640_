// This API endpoint returns all orders from the Firestore database
import {dbAdmin} from '../../app/firebaseConfigAdmin'; 


export default async function handler(req, res) {
    const { userId, role } = req.query; 

    try {
        // Create a query based on user role; if admin, fetch all orders; if user, fetch specific user orders
        let query = dbAdmin.collection('orders');
        if (role !== 'admin') {
            query = query.where('userId', '==', userId);
        }

        const snapshot = await query.get();
        const orders = [];

        if (snapshot.empty) {
            console.log('No matching documents.');
            res.status(200).json({ orders: [] });
            return;
        }

        snapshot.forEach(doc => {
            const order = {
                id: doc.id,
                ...doc.data(),
                date: doc.data().date.toDate().toISOString() // Convert Firestore Timestamp readable date
            };
            orders.push(order);
        });

        res.status(200).json({ orders: orders });

    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
}
