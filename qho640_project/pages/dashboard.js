// pages/index.js
'use client'
import React, {useEffect, useState} from "react";
import { UserAuth } from "../app/auth/AuthContext";

const Page = () => {
    const {user} =UserAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuthentication = async () =>{
            await new Promise((resolve) => setTimeout(resolve, 50));
            setLoading(false);
        };
        checkAuthentication();
    }, [user]);

    return(
        <div className="p-4">
            {loading ? (
                <p>Loading...</p>
            ) : user ? (
                <p>Welcome, {user.displayName} this is the dashboard!</p>
            ) : (
                <p>{"Without login you can't access this page"}</p>
            )}
        </div>
    )
}

export default Page;
