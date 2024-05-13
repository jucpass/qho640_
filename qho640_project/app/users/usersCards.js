import React, { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig'; 

const UserCard = ({ user, onDelete, showAdminControls = false }) => {
    const [role, setRole] = useState(user.role);
    const [pendingRole, setPendingRole] = useState(user.role); 
    const [balance, setBalance] = useState(user.balance);

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

    const handleBalanceChange = async (newBalance) => {
        if (isNaN(newBalance) || newBalance === user.balance) return;
        const confirmChange = window.confirm(`Are you sure you want to update the balance for ${user.firstName}?`);
        if (confirmChange) {
            try {
                const userRef = doc(db, 'users', user.id);
                await updateDoc(userRef, { balance: parseFloat(newBalance) });
                setBalance(newBalance);
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
