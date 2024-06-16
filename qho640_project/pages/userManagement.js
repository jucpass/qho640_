import React from 'react';
import UserCard from '../app/users/usersCards';
import {useUsers} from '../app/database/users';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../app/firebaseConfig';
import useProtectRoute from "../app/utils/useProtectRoute";


// CLEAN THE CODE MOVE LOGIC TO HOOKS
const UserList = () => {
    const { users, refreshUsers } = useUsers(); // Get users and refreshUsers function
    const { role } = useProtectRoute('admin'); // Get the current user role

    // Function to handle user deletion
    const handleDelete = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                const userRef = doc(db, 'users', userId); // Get the user document
                await deleteDoc(userRef); // Delete the user document
                refreshUsers();   // Refresh the user list
            } catch (error) {
                console.error('Error deleting user:', error);
                alert('Failed to delete user. Please try again.');
            }
        }
    };

    return (

        
        role === 'admin' ? (
            <section className="section is-small">
                <h1 className="title has-text-centered">User Management</h1>
        <div>
            {users.map(user => (
                <UserCard
                    key={user.id}
                    user={user}
                    onDelete={() => handleDelete(user.id)}
                    showAdminControls={role === "admin"}
                />
            ))}
        </div>
        </section>
        ) : (
            <div>
                <h1>Access Denied</h1>
            </div>
        )
    );
};

export default UserList;

