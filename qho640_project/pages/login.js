
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { UserAuth } from "../app/auth/AuthContext";
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faApple } from '@fortawesome/free-brands-svg-icons';

function LoginPage() {
  const { user, googleSignIn, logOut, signInWithEmail } = UserAuth();
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignIn = async () => {
    setLoading(true);
    try {
      await googleSignIn();
      if (user) // prevents the premature redirect to dashboard
        router.push('/dashboard');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignIn = async (event) => {
    event.preventDefault(); // Prevent form from refreshing the page
    setLoading(true);
    try {
      await signInWithEmail(email, password);
      router.push('/dashboard');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };
    checkAuthentication();
  }, [user]);

  useEffect(() => {
    if (user && !loading) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  return (
    <section className="section is-medium">
      <div className="p-4 max-w-md mx-auto bg-gray-100 rounded-lg shadow-md">
        <h2 className="mb-4 text-xl font-semibold text-center text-gray-800">Login</h2>
        {loading ? (
          <p>Loading...</p>
        ) : user ? (
          <div className="flex items-center justify-center space-x-4">
            <p className="text-gray-800 font-semibold">Welcome, {user.displayName}</p>
            <p onClick={handleSignOut} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-300 cursor-pointer">
              Sign Out
            </p>
          </div>
        ) : (
          <div>
            <div className="flex justify-center mb-4">
              <button onClick={handleSignIn} className="px-4 py-2 mr-2 text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors duration-300">
                <FontAwesomeIcon icon={faGoogle}/>&nbsp;
                Sign in with Google
              </button>
              <button className="px-4 py-2 text-white bg-black rounded-md hover:bg-gray-800 transition-colors duration-300">
                <FontAwesomeIcon icon={faApple}/>&nbsp;
                Sign in with Apple
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

