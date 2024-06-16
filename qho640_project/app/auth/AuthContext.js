
"use client";
import React, { useContext, useEffect, createContext, useState } from "react";
import { signInWithPopup, signOut, onAuthStateChanged, 
    GoogleAuthProvider, createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, getDoc, setDoc, getFirestore } from "firebase/firestore";
import { auth } from "../firebaseConfig"; 
import Cookies from 'js-cookie';

const AuthContext = createContext(); // Create a new React context for authentication

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null); // State to store user data
    const [role, setRole] = useState(null); // State to store user role
    const [loading, setLoading] = useState(true); // State to handle loading state
    const firestore = getFirestore(); // Initialize Firestore database

    // Function to sign in using Google
    const googleSignIn = async () => { 
        const provider = new GoogleAuthProvider();
        try {
            const userCredential = await signInWithPopup(auth, provider); // Use Google provider to login
            const user = userCredential.user;
            setUser(user); // Set user data in state

            const userRef = doc(firestore, "users", user.uid); // Reference to user's Firestore document
            const userDoc = await getDoc(userRef);
    
            if (!userDoc.exists()) { // Check if the user document exists in Firestore
                await setDoc(userRef, {
                    email: user.email,
                    firstName: user.displayName,
                    role: "user",  // Default role
                    balance: 10000 // Default balance
                });
                setRole("user");
            } else {
                setRole(userDoc.data().role); // Set user role from Firestore data
            }
    
            return userCredential;
        } catch (error) {
            console.error("Error signing in with Google:", error);
            throw error;
        }
    };

    // Function to log out the current user
    const logOut = async () => {
        try {
            if (auth.currentUser) {
                Cookies.remove(`cart_${auth.currentUser.uid}`, { path: '/' }); // Remove user cart cookie
            }
            await signOut(auth); // Firebase sign out
        } catch (error) {
            console.error("Failed to log out:", error);
        }
    };

    // Function to sign in using email and password
    const signInWithEmail = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setUser(userCredential.user);
            const userRef = doc(firestore, "users", userCredential.user.uid);
            const userDoc = await getDoc(userRef);
            if (userDoc.exists()) {
                setRole(userDoc.data().role);
            } else {
                setRole("user");  
            }
            return userCredential;
        } catch (error) {
            console.error("Error signing in with email and password:", error);
            throw error;
        }
    };

    // Function to register a new user
    const signUp = async (firstName, email, password) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, {
                displayName: firstName  // Set the display name to firstName
            });

            await setDoc(doc(firestore, "users", userCredential.user.uid), {
                email: email,
                firstName: firstName,
                role: "user",
                balance: 10000
            });

            setUser(userCredential.user);
        } catch (error) {
            console.error("Error signing up and adding to Firestore:", error);
            throw error;
        }
    };

    // Listener for authentication state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                const userRef = doc(firestore, "users", currentUser.uid);
                const userDoc = await getDoc(userRef); 
                if (userDoc.exists()) {
                    setRole(userDoc.data().role);
                } else {
                    setRole("user");
                }
            } else {
                setUser(null);
                setRole(null);
            }
            setLoading(false); 
        });
        return () => unsubscribe();
    }, [firestore]);

    // Show loading screen while checking auth state
    if (loading) {
        return <div>Loading...</div>;
    }

    // Function to fetch ID token for the logged-in user
    const fetchIdToken = async () => { 
        if (!user) return null;
        try {
            const token = await user.getIdToken(); // Retrieves the Firebase ID token
            return token;
        } catch (error) {
            console.error("Failed to get ID token:", error);
            return null;
        }
    };

    // Provide context values to the component tree
    return (
        <AuthContext.Provider value={{ user, role, googleSignIn, logOut, signUp, signInWithEmail, fetchIdToken }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

// Custom hook to use AuthContext
export const UserAuth = () => {
    return useContext(AuthContext);
};

