
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { UserAuth } from '../auth/AuthContext';

const useProtectRoute = (roleRequired) => {
    const { user, role } = UserAuth();
    const router = useRouter();

    useEffect(() => {

        if (!user || role !== roleRequired) {
            alert("You are not authorized to view this page, You will be redirected to the home page");
            router.push('/'); // Redirect to home page
        }
    }, [user, role, roleRequired, router]);

    return { user, role };
};

export default useProtectRoute;
