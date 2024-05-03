import { useState, useEffect, useCallback } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const useUsers = () => {
    const [users, setUsers] = useState([]);

    const fetchUsers = useCallback(async () => {
        const userCollectionRef = collection(db, 'users');
        const userDocs = await getDocs(userCollectionRef);
        const userList = userDocs.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUsers(userList);
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    return { users, refreshUsers: fetchUsers };
};

export default useUsers;

