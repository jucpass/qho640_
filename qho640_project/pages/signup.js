'use client'
import React, { useEffect, useState, useContext } from "react";
import { UserAuth } from "../app/auth/AuthContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faApple } from '@fortawesome/free-brands-svg-icons';
import { useRouter } from 'next/router';

const Page = () => { 
    const { user, logOut, googleSignIn, signUp } = UserAuth(); // Get the current user
    const [loading, setLoading] = useState(true); // State to store loading status

    const [email, setEmail] = useState(''); // State to store email
    const [password, setPassword] = useState(''); // State to store password
    const [firstName, setFirstName] = useState(''); // State to store first name

    
    const handleSubmit = async (event) => { // Function to handle sign up
        event.preventDefault(); // Prevent default form submission
        try {
            await signUp(firstName, email, password); // Sign up with email and password
            console.log("User signed up successfully");
            router.push('/');  // Redirect to home page
        } catch (error) {
            console.error("Signup failed:", error);
        }
    };

    // Effect to check authentication
    useEffect(() => {
        const checkAuthentication = async () => {
            await new Promise((resolve) => setTimeout(resolve, 50)); // Wait for 50ms
            setLoading(false); // Set loading to false
        };
        checkAuthentication(); // Call the function
    }, [user]);

    // Function to handle sign in with Google
    const handleSignIn = async () => {
        try {
            await googleSignIn(); // Sign in with Google
        } catch (error) {
            console.log(error)
        }
    };

    // Function to handle sign out
    const handleSignOut = async () => {
        try {
            await logOut() // Log out the user
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
                        <p className="text-gray-800 font-semibold">Welcome to Connect Shop</p>
                    </div>
                ) : (
                    <div>
                        <h1 className="mb-6 text-2xl font-bold text-center text-gray-800">Sign Up</h1>
                        <div className="flex justify-center mb-6">
                            <button onClick={handleSignIn} className="px-4 py-2 mr-4 text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors duration-300">
                            <FontAwesomeIcon icon={ faGoogle } />
                                Connect with Google
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