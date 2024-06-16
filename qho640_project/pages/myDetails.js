import React, { useEffect, useState } from "react";
import UserCard from '../app/users/usersCards';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../app/firebaseConfig';
import { UserAuth } from '../app/auth/AuthContext'; 

function MyDetails() {
    const { user: authUser, role } = UserAuth(); // Get the current user and role
    const [userDetails, setUserDetails] = useState(null);  // State to store user details


    // Function to fetch user details
    useEffect(() => {
        if (authUser) { // If user is logged in
            const fetchUserDetails = async () => { // Fetch user details
                const userRef = doc(db, "users", authUser.uid); // Get the user document
                const docSnap = await getDoc(userRef); // Get the document snapshot
                if (docSnap.exists()) { // If the document exists
                    setUserDetails(docSnap.data()); // Set the user details
                } else {
                    console.log("No such document!");
                }
            };

            fetchUserDetails(); // Call the fetchUserDetails function
        }
    }, [authUser]);

    return (
        userDetails ? (
            <section className="section is-medium">
                <div className="container">
                    <h1 className="title">My Details</h1>
                    <div className = 'columns'>
                        <div className = 'column'></div>
                        <div className = 'column'>
                    <UserCard
                        key={userDetails.id}
                        user={userDetails}
                        showAdminControls={role === "admin"}
                    />
                    </div>
                    <div className = 'column'></div>    
                    </div>
                </div>
            </section>
        ) : (
            <section className="section is-medium">
                <div className="container">
                    <h1 className="title">My Details</h1>
                    <p>Please log in to view your details.</p>
                </div>
            </section>
        )
    );
}

export default MyDetails;
