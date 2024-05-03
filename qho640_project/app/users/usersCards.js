
import React, { useState } from 'react';

const UserCard = ({ user, onDelete, onEdit, onSave, isEditing }) => {
    const [editDetails, setEditDetails] = useState({
        namefirstName: user.firstName,
        email: user.email,
        role: user.role
    });

    const handleChange = (e) => {
        setEditDetails({
            ...editDetails,
            [e.target.firstName]: e.target.value
        });
    };

    const handleSave = () => {
        onSave(user.id, editDetails);
    };

    if (isEditing) {
        return (
            <div className="user-card">
                <input
                    type="text"
                    name="name"
                    value={editDetails.firstName}
                    onChange={handleChange}
                />
                <input
                    type="email"
                    name="email"
                    value={editDetails.email}
                    onChange={handleChange}
                />
                <select name="role" value={editDetails.role} onChange={handleChange}>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
                <button onClick={handleSave}>Save</button>
                <button onClick={() => onEdit(null)}>Cancel</button>
            </div>
        );
    }

    return (
        
        <div className="user-card">
            <div><strong>Name:</strong> {user.firstName}</div>
            <div><strong>Email:</strong> {user.email}</div>
            <div><strong>Role:</strong> {user.role}</div>
            <button className='button is-warning' onClick={() => onEdit(user)}>Edit</button>
            <button className='button is-danger' onClick={onDelete}>Delete</button>
        </div>
    );
};

export default UserCard;
