import React, { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig'; 

const UserCard = ({ user, onDelete, showAdminControls = false }) => {
    const [role, setRole] = useState(user.role);
    const [pendingRole, setPendingRole] = useState(user.role); 

    console.log('UserCard:', user);

    function handleFirstName(user) {
        let fName; 
    
        if (!user.firstName || user.firstName.trim() === '') {
            fName = user.displayName; 
        } else {
            fName = user.firstName; 
        }
    
        return fName; 
    }

    const handleRoleChange = async (newRole) => {
        if (newRole === role) return; 
        const confirmChange = window.confirm(`Are you sure you want to change ${user.firstName}'s role? This could grant or revoke privileges for this user.`);
        if (confirmChange) {
            try {
                const userRef = doc(db, 'users', user.id);
                await updateDoc(userRef, { role: newRole });
                setRole(newRole); 
                console.log('Role updated successfully');
            } catch (error) {
                console.error('Failed to update role:', error);
                alert('Failed to update the role. Please try again.');
                setPendingRole(role); // Revert pendingRole on error
            }
        } else {
            setPendingRole(role); // Revert to original role on cancel
        }
    };

    return (
        <div className="card">
            <div className="user-card">
                <div><strong>Name:</strong> {handleFirstName(user)} </div>
                <div className="block"></div>
                <div><strong>Email:</strong> {user.email}</div>
                <div className="block"></div>
                <div><strong>My Balance:</strong> {user.balance}</div>
                <div className="block"></div>
                {showAdminControls && (
                    <>
                        <div><strong>Role:</strong>
                            <div className="select">
                                <select 
                                    value={role}
                                    onChange={(e) => handleRoleChange(e.target.value)}
                                    className="select">
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                        </div>
                        <div className="block"></div>
                        <button className='button is-danger' onClick={onDelete}>Delete</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default UserCard;
