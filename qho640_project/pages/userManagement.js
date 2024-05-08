import React from 'react';
import UserCard from '../app/users/usersCards';
import useUsers from '../app/database/users';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../app/firebaseConfig';
import useProtectRoute from "../app/utils/useProtectRoute";


// CLEAN THE CODE MOVE LOGIC TO HOOKS
const UserList = () => {
    const { users, refreshUsers } = useUsers();
    const { role } = useProtectRoute('admin');

    const handleDelete = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                const userRef = doc(db, 'users', userId);
                await deleteDoc(userRef);
                refreshUsers();  
            } catch (error) {
                console.error('Error deleting user:', error);
                alert('Failed to delete user. Please try again.');
            }
        }
    };

    return (
        role === 'admin' ? (
        <div>
            {users.map(user => (
                <UserCard
                    key={user.id}
                    user={user}
                    onDelete={() => handleDelete(user.id)}
                />
            ))}
        </div>
        ) : (
            <div>
                <h1>Access Denied</h1>
            </div>
        )
    );
};

export default UserList;

