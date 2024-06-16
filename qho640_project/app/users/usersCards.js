import React, { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig'; 

// Function to display user cards
const UserCard = ({ user, onDelete, showAdminControls = false }) => {
    const [role, setRole] = useState(user.role); // State to store role
    const [pendingRole, setPendingRole] = useState(user.role);  // State to store pending role
    const [balance, setBalance] = useState(user.balance); // State to store balance

    // Function to handle role change
    const handleRoleChange = async (newRole) => {
        if (newRole === role) return; // Return if the role is the same
        const confirmChange = window.confirm(`Are you sure you want to change ${user.firstName}'s role? This could grant or revoke privileges for this user.`); // Confirm role change
        if (confirmChange) { // If confirmed
            try {
                const userRef = doc(db, 'users', user.id); // Get the user document
                await updateDoc(userRef, { role: newRole }); // Update the role
                setRole(newRole);  // Set the new role
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

    // Function to handle balance change
    const handleBalanceChange = async (newBalance) => {
        if (isNaN(newBalance) || newBalance === user.balance) return; // Return if balance is not a number or is the same
        const confirmChange = window.confirm(`Are you sure you want to update the balance for ${user.firstName}?`); // Confirm balance change
        if (confirmChange) { // If confirmed
            try {
                const userRef = doc(db, 'users', user.id); // Get the user document
                await updateDoc(userRef, { balance: parseFloat(newBalance) }); // Update the balance
                setBalance(newBalance); // Set the new balance
                console.log('Balance updated successfully');
            } catch (error) {
                console.error('Failed to update balance:', error);
                alert('Failed to update the balance. Please try again.');
            }
        }
    };

    return (
        <div className='columns'>
                <div className='column'></div>
                <div className='column'>
                    <div className="card">
                    <div className="user-card">
                        <div><strong>Name:</strong> {user.firstName} </div>
                        <div className="block"></div>
                        <div><strong>Email:</strong> {user.email}</div>
                        <div className="block"></div>
                        <div>
                            <strong>My Balance:</strong>
                        {showAdminControls ? (
                            <input 
                                type="number"
                                value={balance}
                                onChange={e => setBalance(e.target.value)}
                                onBlur={() => handleBalanceChange(balance)}
                                className="input is-small"
                                style={{ width: 'auto', marginLeft: '10px' }}
                            />
                        ) : (
                            `£ ${balance}`
                        )}
                    </div>
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
            </div>
            <div className='column'></div>
        </div>

    );
};

export default UserCard;
