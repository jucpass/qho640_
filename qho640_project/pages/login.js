
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { UserAuth } from "../app/auth/AuthContext";
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faApple } from '@fortawesome/free-brands-svg-icons';

function LoginPage() {
  const { user, googleSignIn, logOut, signInWithEmail } = UserAuth(); // Get the current user
  const [loading, setLoading] = useState(true); // State to store loading status
  const [email, setEmail] = useState(''); // State to store email
  const [password, setPassword] = useState(''); // State to store password
  const router = useRouter(); // Get the router

  // Function to handle sign in with Google
  const handleSignIn = async () => {
    setLoading(true); // Set loading to true
    try {
      await googleSignIn(); 
      if (user) // prevents the premature redirect
        router.push('/'); // Redirect to home page
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  // Function to handle email sign in
  const handleEmailSignIn = async (event) => {
    event.preventDefault(); // Prevent form from refreshing the page
    setLoading(true); // Set loading to true
    try {
      await signInWithEmail(email, password); // Sign in with email and password
      router.push('/'); // Redirect to home page
    } catch (error) {
      console.error(error);
    } finally { // Set loading to false
      setLoading(false);
    }
  };

  // Effect to check authentication
  useEffect(() => {
    const checkAuthentication = async () => { // Function to check authentication
      await new Promise((resolve) => setTimeout(resolve, 50)); // Wait for 50ms
      setLoading(false);
    };
    checkAuthentication(); // Call the function
  }, [user]);

  // Effect to redirect to home page if user is logged in
  useEffect(() => {
    if (user && !loading) { // If user is logged in and loading is false
      router.push('/'); // Redirect to home page
    }
  }, [user, loading, router]); // Dependency array

  return (
    <section className="section is-medium">
      <div className="p-4 max-w-md mx-auto bg-gray-100 rounded-lg shadow-md">
        <h2 className="mb-4 text-xl font-semibold text-center text-gray-800">Login</h2>
        {loading ? (
          <p>Loading...</p>
        ) : user ? (
          <div className="flex items-center justify-center space-x-4">
            <p className="text-gray-800 font-semibold">Welcome, {user.displayName}</p>
          </div>

        ) : (
          <div>
            <div className="flex justify-center mb-4">
              <button onClick={handleSignIn} className="px-4 py-2 mr-2 text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors duration-300">
                <FontAwesomeIcon icon={faGoogle}/>&nbsp;
                Sign in with Google
              </button>
            </div>
            <p className="text-center text-gray-600 mb-4">or</p>
            <form onSubmit={handleEmailSignIn}>
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
                  required
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
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md focus:outline-none focus:shadow-outline"
              >
                Login
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}

export default LoginPage;

