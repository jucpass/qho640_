
import Link from 'next/link';
import Image from 'next/image';
import React, { useState, useEffect } from "react";
import { UserAuth } from "../auth/AuthContext";
import { useCart } from '../checkout/cartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {

    const { user, role, logOut } = UserAuth();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const { itemCount, total } = useCart();

    const handleSignOut = async () => {
        try {
            await logOut();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const userLoggedIn = !!user;
        setIsLoggedIn(userLoggedIn);
    }, [user]);

    useEffect(() => {
        const checkAuthentication = async () => {
            await new Promise(resolve => setTimeout(resolve, 50));
            setLoading(false);
        };
        checkAuthentication();
    }, [user]);
    

    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <Link href="/" aria-label="Home" className="navbar-item">
                    <Image
                        src="/images/logo.png" 
                        alt="Company Logo"
                        width={112} 
                        height={28}
                    />
                </Link>
                <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navbarBasicExample" className="navbar-menu">
                <div className="navbar-start">
                    <Link href="/" className="navbar-item">Home</Link>
                    {role != 'admin' && (              
                    <Link href="/products" className="navbar-item">Products</Link>
                    )}
                    <div className="navbar-item has-dropdown is-hoverable">
                        <a className="navbar-link">More</a>
                        <div className="navbar-dropdown">
                            <Link href="/about" className="navbar-item">About</Link>
                            <Link href="/contact" className="navbar-item">Contact</Link>
                            <hr className="navbar-divider" />
                            <Link href="/report" className="navbar-item">Report an issue</Link>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <p>Loading...</p>
                ) : isLoggedIn ? (
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                {user && user.displayName && (
                                    <p className="text-gray-50 font-semibold">Welcome, {user.displayName}</p>
                                )}
                                &nbsp;
                                {role === 'admin' ? (
                                    <Link href="/dashboard" className="button is-primary">Dashboard</Link>
                                ) : (
                                    <Link href="/cart" className="button is-primary">
                                        <p><FontAwesomeIcon icon={faCartShopping} />&nbsp;({itemCount}) £{total}</p>
                                    </Link>
                                )}
                                <button onClick={handleSignOut} className="button is-warning">Sign Out</button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                <Link href="/signup" className="button is-primary"><strong>Sign up</strong></Link>
                                <Link href="/login" className="button is-light">Log in</Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
        };

export default Navbar;
