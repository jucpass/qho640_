import React from 'react';
import UserCard from '../app/users/usersCards';
import useUsers from '../app/database/users';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../app/firebaseConfig';

const UserList = () => {
    const { users, refreshUsers } = useUsers();

    // Function to handle the deletion of a user
    const handleDelete = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                const userRef = doc(db, 'users', userId);
                await deleteDoc(userRef);
                refreshUsers();  // Refresh the user list after deletion
            } catch (error) {
                console.error('Error deleting user:', error);
                alert('Failed to delete user. Please try again.');
            }
        }
    };

    return (
        <div>
            {users.map(user => (
                <UserCard
                    key={user.id}
                    user={user}
                    onDelete={() => handleDelete(user.id)}
                />
            ))}
        </div>
    );
};

export default UserList;

