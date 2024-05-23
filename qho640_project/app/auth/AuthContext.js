
"use client";
import React, { useContext, useEffect, createContext, useState } from "react";
import { signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, getDoc, setDoc, getFirestore } from "firebase/firestore";
import { auth } from "../firebaseConfig"; 
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);

    const firestore = getFirestore();
    const googleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const userCredential = await signInWithPopup(auth, provider);
            const user = userCredential.user;
            setUser(user);

            const userRef = doc(firestore, "users", user.uid);
            const userDoc = await getDoc(userRef);
    
            if (!userDoc.exists()) {

                await setDoc(userRef, {
                    //uid: user.uid, check if this is necessary
                    email: user.email,
                    firstName: user.displayName,
                    role: "user",  // default role
                    balance: 10000 // default balance
                });
                setRole("user");
            } else {
                setRole(userDoc.data().role);
            }
    
            return userCredential;
        } catch (error) {
            console.error("Error signing in with Google:", error);
            throw error;
        }
    };

    const logOut = async () => {
        try {
            if (auth.currentUser) {
                Cookies.remove(`cart_${auth.currentUser.uid}`, { path: '/' });
            }
            await signOut(auth);
        } catch (error) {
            console.error("Failed to log out:", error);
        }
    };

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

    const signUp = async (firstName, email, password) => {
        console.log("Signing up with email:", email);
        console.log("Signing up with password:", password);
        console.log("Signing up with firstName:", firstName);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, {
                displayName: firstName  // Set the displayName to firstName 
            });
            console.log("User created:", userCredential.user);

            await setDoc(doc(firestore, "users", userCredential.user.uid), {
                email: email,
                firstName: firstName, // Store the first name
                role: "user", // Set the default role
                balance: 10000 // Set the default balance
            });

            setUser(userCredential.user);
            console.log("Firestore document created");
        } catch (error) {
            console.error("Error signing up and adding to Firestore:", error);
            throw error;
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            console.log("Auth state changed. User: ", currentUser);
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

    if (loading) {
        return <div>Loading...</div>;
    }

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

    return (
        <AuthContext.Provider value={{ user, role, googleSignIn, logOut, signUp, signInWithEmail, fetchIdToken }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const UserAuth = () => {
    return useContext(AuthContext);
};
