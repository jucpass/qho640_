
"use client";
import React, { useContext, useEffect, createContext, useState } from "react";
import { signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, getDoc, setDoc, getFirestore } from "firebase/firestore";
import { auth } from "../firebaseConfig"; 

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);

    const firestore = getFirestore();

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);
    };

    const logOut = () => {
        signOut(auth);
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

    return (
        <AuthContext.Provider value={{ user, role, googleSignIn, logOut, signUp, signInWithEmail }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const UserAuth = () => {
    return useContext(AuthContext);
};
