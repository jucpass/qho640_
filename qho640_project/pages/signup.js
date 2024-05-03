'use client'
import React, { useEffect, useState, useContext } from "react";
import { UserAuth } from "../app/auth/AuthContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faApple } from '@fortawesome/free-brands-svg-icons';

const Page = () => {
    const { user, logOut, googleSignIn, signUp } = UserAuth();
    const [loading, setLoading] = useState(true);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await signUp(firstName, email, password);
            console.log("User signed up successfully");
            // Redirect to dashboard
        } catch (error) {
            console.error("Signup failed:", error);
        }
    };

    useEffect(() => {
        const checkAuthentication = async () => {
            await new Promise((resolve) => setTimeout(resolve, 50));
            setLoading(false);
        };
        checkAuthentication();
    }, [user]);

    const handleSignIn = async () => {
        try {
            await googleSignIn();
        } catch (error) {
            console.log(error)
        }
    };

    const handleSignOut = async () => {
        try {
            await logOut()
        } catch (error) {
            console.log(error)
        }
    };

    return (
      <section className="section is-medium">
            <div className="p-4 max-w-md mx-auto bg-gray-100 rounded-lg shadow-md">
                {loading ? (
                    <p>Loading...</p>
                ) : user ? (
                    <div className="flex items-center justify-center space-x-4">
                        <p className="text-gray-800 font-semibold">You have signed up successfully</p>
                        <button
                            onClick={handleSignOut}
                            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-300"
                        >
                            Sign Out
                        </button>
                    </div>
                ) : (
                    <div>
                        <h1 className="mb-6 text-2xl font-bold text-center text-gray-800">Sign Up</h1>
                        <div className="flex justify-center mb-6">
                            <button onClick={handleSignIn} className="px-4 py-2 mr-4 text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors duration-300">
                            <FontAwesomeIcon icon={ faGoogle } />
                                Connect with Google
                            </button>
                            <button className="px-4 py-2 text-white bg-black rounded-md hover:bg-gray-800 transition-colors duration-300">
                                <FontAwesomeIcon icon={ faApple } />&nbsp;
                                Connect with Apple
                            </button>
                        </div>
                        <p className="text-center text-gray-600 mb-6">or</p>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-700">
                                    First Name:
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="w-full px-3 py-2 leading-tight text-gray-700 border rounded-md shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                                    required="required"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
                                    Email:
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-3 py-2 leading-tight text-gray-700 border rounded-md shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                                    required="required"
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">
                                    Password:
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-3 py-2 leading-tight text-gray-700 border rounded-md shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                                    required="required"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full py-2 px-4 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md focus:outline-none focus:shadow-outline"
                            >
                                Sign Up
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </section>
    )
}

export default Page;