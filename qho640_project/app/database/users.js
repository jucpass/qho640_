import { useState, useEffect, useCallback } from 'react';
import { collection, getDocs, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const useUsers = () => {
    const [users, setUsers] = useState([]);

    const fetchUsers = useCallback(async () => {
        const userCollectionRef = collection(db, 'users');
        const userDocs = await getDocs(userCollectionRef);
        const userList = userDocs.docs.map(doc => {
            console.log(doc.data());  // Log to see all data retrieved
            return { id: doc.id, ...doc.data() };
        });
        setUsers(userList);
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    return { users, refreshUsers: fetchUsers };
};

const checkBalance = async (userId) => {
    try {
        const userRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
            return userDoc.data().balance;
        } else {
            console.log("User not found");
            return null; 
        }
    } catch (error) {
        console.error("Failed to fetch user balance:", error);
        throw error; 
    }
};

const updateBalance = async (userId, newBalance) => {
    try {
        const userRef = doc(db, 'users', userId);
        await updateDoc(userRef, {
            balance: newBalance
        });
    } catch (error) {
        console.error("Failed to update user balance:", error);
        throw error; 
    }
};

export { useUsers, checkBalance, updateBalance };

