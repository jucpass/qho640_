import { useState, useEffect, useCallback } from 'react';
import { collection, getDocs, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const useUsers = () => {
    const [users, setUsers] = useState([]);

    // Function to fetch users from the database
    const fetchUsers = useCallback(async () => {
        const userCollectionRef = collection(db, 'users'); // Get the users collection
        const userDocs = await getDocs(userCollectionRef); // Get all documents
        const userList = userDocs.docs.map(doc => {
            console.log(doc.data());  // Log to see all data retrieved
            return { id: doc.id, ...doc.data() };
        });
        setUsers(userList); // Set the users state
    }, []);

    // Fetch users on component mount
    useEffect(() => {
        fetchUsers(); 
    }, [fetchUsers]);

    return { users, refreshUsers: fetchUsers };
};

const checkBalance = async (userId) => {
    try {
        const userRef = doc(db, 'users', userId); // Get the user document
        const userDoc = await getDoc(userRef); // Get the document snapshot
        if (userDoc.exists()) { // If the document exists
            return userDoc.data().balance; // Return the balance
        } else {
            console.log("User not found");
            return null; 
        }
    } catch (error) {
        console.error("Failed to fetch user balance:", error);
        throw error; 
    }
};

// Function to update the balance of a user
const updateBalance = async (userId, newBalance) => {
    try {
        const userRef = doc(db, 'users', userId); // Get the user document
        await updateDoc(userRef, { // Update the balance
            balance: newBalance // Set the new balance
        });
    } catch (error) {
        console.error("Failed to update user balance:", error);
        throw error; 
    }
};

export { useUsers, checkBalance, updateBalance };

