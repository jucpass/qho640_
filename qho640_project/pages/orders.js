import React from 'react';
import useOrders from '../app/database/orders';
import { UserAuth } from '../app/auth/AuthContext';
import { Timestamp } from "firebase/firestore";




const OrdersPage = () => {
    const { user, role } = UserAuth();
    const { orders, refreshOrders } = useOrders(user, role);

    const convertTimestampToDate = (timestamp) => {
        console.log("Timestamp received:", timestamp); // Check the actual received data
        if (timestamp && typeof timestamp.toDate === 'function') {
            return timestamp.toDate();
        } else {
            console.error("Provided data is not a Firestore Timestamp:", timestamp);
            return null; // Handle as appropriate
        }
    };

    const formatDate = (date) => {
        if (!date) {
            return "No date provided";
        }
        return `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
    };

    return (
        <section className="section">
        <div className="container">
            <div className="columns is-centered">
                <div className="column is-one-quarter"></div>
                <div className="column">
                    <h1 className='title'>Orders</h1>
                        {orders.length > 0 ? (
                            orders.map(order => (
                                <div key={order.id} className='box'>
                                    <p>Order ID: {order.id}</p>
                                    <p>User Email: {order.userEmail}</p>
                                    <p>Total: £{order.total}</p>
                                    <p>Date: {order.date ? formatDate(convertTimestampToDate(order.date)) : "Date not available"}</p>
                                </div>

                            ))
                        ) : (
                            <p>No orders found.</p>
                        )}
                        </div>
                        <div className="column is-one-quarter"></div>

        </div>
        </div>
        </section>
    );
};

export default OrdersPage;
