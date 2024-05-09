
'use client'
import React from "react";
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGear, faShopLock, faAddressCard, faBoxOpen } from '@fortawesome/free-solid-svg-icons';
//import useProtectRoute from "../app/utils/useProtectRoute";
import { UserAuth } from "../app/auth/AuthContext";

const Page = () => {
    const { role } = UserAuth();

    return (
        <section className="section">
            <div className="container">
                <div className="columns is-centered">
                    <div className="column is-one-quarter"></div>
                    <div className="column is-flex is-flex-direction-row">
                        {role === 'admin' ? (
                            <>
                                {/* User Management Card */}
                                <Link href="/userManagement" aria-label="Manage Users" className="card" style={{ flex: 1, margin: '0 10px', textDecoration: 'none' }}>
                                    <div className="card-content has-text-centered">
                                        <div className="content is-size-1">
                                            <div className="block"></div>
                                            <FontAwesomeIcon icon={faUserGear} />
                                            <p className="subtitle">User Management</p>
                                        </div>
                                    </div>
                                </Link>

                                {/* Product Management Card */}
                                <Link href="/addItem" aria-label="Manage Products" className="card" style={{ flex: 1, margin: '0 10px', textDecoration: 'none' }}>
                                    <div className="card-content has-text-centered">
                                        <div className="content is-size-1">
                                            <div className="block"></div>
                                            <FontAwesomeIcon icon={faShopLock} />
                                            <p className="subtitle">Product Management</p>
                                        </div>
                                    </div>
                                </Link>
                                <Link href="/orders" aria-label="Orders" className="card" style={{ flex: 1, margin: '0 10px', textDecoration: 'none' }}>
                                    <div className="card-content has-text-centered">
                                        <div className="content is-size-1">
                                            <div className="block"></div>
                                            <FontAwesomeIcon icon={faBoxOpen} />
                                            <p className="subtitle">Orders</p>
                                        </div>
                                    </div>
                                </Link>
                            </>
                        ) : role === 'user' ? (
                            <>
                                {/* My Details Card */}
                                <Link href="/myDetails" aria-label="My Details" className="card" style={{ flex: 1, margin: '0 10px', textDecoration: 'none' }}>
                                    <div className="card-content has-text-centered">
                                        <div className="content is-size-1">
                                            <div className="block"></div>
                                            <FontAwesomeIcon icon={faAddressCard} />
                                            <p className="subtitle">My Details</p>
                                        </div>
                                    </div>
                                </Link>

                                {/* Orders Card */}
                                <Link href="/orders" aria-label="My Orders" className="card" style={{ flex: 1, margin: '0 10px', textDecoration: 'none' }}>
                                    <div className="card-content has-text-centered">
                                        <div className="content is-size-1">
                                            <div className="block"></div>
                                            <FontAwesomeIcon icon={faBoxOpen} />
                                            <p className="subtitle">My Orders</p>
                                        </div>
                                    </div>
                                </Link>
                            </>
                        ) : (
                            <div className="column is-full">
                                <h1 className="title has-text-centered">Access Denied</h1>
                            </div>
                        )}
                    </div>
                    <div className="column is-one-quarter"></div>
                </div>
            </div>
        </section>
    );
};

export default Page;
