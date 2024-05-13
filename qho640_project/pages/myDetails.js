import React, { useEffect, useState } from "react";
import UserCard from '../app/users/usersCards';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../app/firebaseConfig';
import { UserAuth } from '../app/auth/AuthContext'; 

function MyDetails() {
    const { user: authUser, role } = UserAuth();
    const [userDetails, setUserDetails] = useState(null);



    useEffect(() => {
        if (authUser) {
            const fetchUserDetails = async () => {
                const userRef = doc(db, "users", authUser.uid);
                const docSnap = await getDoc(userRef);
                if (docSnap.exists()) {
                    setUserDetails(docSnap.data());
                } else {
                    console.log("No such document!");
                }
            };

            fetchUserDetails();
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
