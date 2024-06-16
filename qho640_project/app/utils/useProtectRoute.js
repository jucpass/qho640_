
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { UserAuth } from '../auth/AuthContext';

// Function to protect routes based on user role
const useProtectRoute = (roleRequired) => {
    const { user, role } = UserAuth(); // Get the current user and role
    const router = useRouter(); // Get the router

    // Effect to check user role
    useEffect(() => {

        if (!user || role !== roleRequired) { // If user is not logged in or role does not match
            alert("You are not authorized to view this page, You will be redirected to the home page");
            router.push('/'); // Redirect to home page
        }
    }, [user, role, roleRequired, router]); // Dependency array

    return { user, role }; // Return the user and role
};

export default useProtectRoute;
