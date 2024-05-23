import React, {useState} from 'react';
import useOrders from '../app/database/orders';
import Image from 'next/image';

// https://bulma.io/documentation/components/modal/

    const OrdersPage = () => {
        //const { user, role } = UserAuth();
        //const { orders, refreshOrders } = useOrders(user, role);
        //const { orders, refreshOrders, loading, error } = useOrders(user, role);
        const { orders, refreshOrders, loading, error } = useOrders();
        const [isModalOpen, setIsModalOpen] = useState(false);
        const [selectedOrder, setSelectedOrder] = useState(null);
        
    
        const handleOrderClick = (order) => {
            setSelectedOrder(order);
            setIsModalOpen(true);
        };
    
        const closeModal = () => {
            setIsModalOpen(false);
        };

        if (loading) return <div>Loading orders...</div>;
        if (error) return <div>Error loading orders: {error}</div>;

        return (
            <section className="section">
                <div className="container">
                    <h1 className='title'>Orders</h1>
                    <div className="columns">
                        <div className="column"></div>
                        <div className="column">
                            {orders.length > 0 ? orders.map(order => (
                                <div key={order.id} className="box" onClick={() => handleOrderClick(order)} style={{ cursor: 'pointer', marginBottom: '10px' }}>
                                    <p className="subtitle">Order ID: {order.id}</p>
                                    <p><strong>Date:</strong> {new Date(order.date).toLocaleString()}</p>
                                </div>
                            )) : <p>No orders found.</p>}
                        </div>
                        <div className="column"></div>
                    </div>
                    {selectedOrder && (
                        <div className={`modal ${isModalOpen ? 'is-active' : ''}`}>
                            <div className="modal-background" onClick={closeModal}></div>
                            <div className="modal-card">
                                <header className="modal-card-head">
                                    <p className="modal-card-title">Order Details</p>
                                    <button className="delete" aria-label="close" onClick={closeModal}></button>
                                </header>
                                <section className="modal-card-body">
                                    <p><strong>User Email:</strong> {selectedOrder.userEmail}</p>
                                    <p><strong>Total:</strong> £{selectedOrder.total}</p>
                                    <p><strong>Date:</strong> {new Date(selectedOrder.date).toLocaleString()}</p>
                                    <div>
                                        <h2 className="title is-5">Items Purchased:</h2>
                                        {selectedOrder.items.map((item, index) => (
                                            <div key={index} className="box">
                                                <div className="columns">
                                                    <div className="column is-one-quarter">
                                                        <figure className="image is-64x64">
                                                            <Image src={item.Image} alt={item.Model} width={30} height={60} unoptimized={true} />
                                                        </figure>
                                                    </div>
                                                    <div className="column">
                                                        <p><strong>Model:</strong> {item.Model}</p>
                                                        <p><strong>Make:</strong> {item.Make}</p>
                                                        <p><strong>Features:</strong> {item.Features}</p>
                                                        <p><strong>Price:</strong> £{item.Price}</p>
                                                        <p><strong>Quantity:</strong> {item.quantity}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                                <footer className="modal-card-foot">
                                    <button className="button is-success" onClick={closeModal}>Close</button>
                                </footer>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        );
    };
    
    export default OrdersPage;
