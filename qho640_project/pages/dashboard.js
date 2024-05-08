
'use client'
import React from "react";
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGear,faShopLock } from '@fortawesome/free-solid-svg-icons';
import useProtectRoute from "../app/utils/useProtectRoute";

const Page = () => {
    const { role } = useProtectRoute('admin');

    return (
        role === 'admin' ? (
            <section className="section">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column is-one-quarter"></div>
                        <div className="column is-flex is-flex-direction-row">

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
                        </div>
                        <div className="column is-one-quarter"></div>
                    </div>
                </div>
            </section>
        ) : (
            <div>
                <h1>Access Denied</h1>
            </div>
        )
    );
};


export default Page;
