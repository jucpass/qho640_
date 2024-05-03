import React, { useState } from 'react';
import UserCard from '../app/users/usersCards';
import useUsers from '../app/database/users';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../app/firebaseConfig';

const UserList = () => {
    const { users, refreshUsers } = useUsers();
    const [editingUserId, setEditingUserId] = useState(null);

    const handleEditUser = (user) => {
        setEditingUserId(user ? user.id : null);
    };

    const saveUserChanges = async (userId, updatedDetails) => {
        const userRef = doc(db, 'users', userId);
        await updateDoc(userRef, updatedDetails);
        setEditingUserId(null);
        refreshUsers();
    };

    return (
        <div>
            {users.map(user => (
                <UserCard
                    key={user.id}
                    user={user}
                    onDelete={() => handleDelete(user.id)}
                    onEdit={handleEditUser}
                    onSave={saveUserChanges}
                    isEditing={editingUserId === user.id}
                />
            ))}
        </div>
    );
};

export default UserList;
