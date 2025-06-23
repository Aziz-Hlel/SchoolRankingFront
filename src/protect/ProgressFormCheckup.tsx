import { useAuth } from "@/contexts/AuthContext";
import { useFormProgress } from "@/contexts/FormProgress"
import { ROLES } from "@/enums/roles";
import useFormRedirect from "@/hooks/useFormRedirect";
import LoadingSpinner from "@/LoadingSpinner";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";


const ProgressFormCheckup = () => {

    // Note: user is guaranteed to exist here due to AuthenticatedRoutes guard
    const { user: currentUser } = useAuth();
    const user = currentUser!

    const { formProgress, fetchProgress, isLoading } = useFormProgress();

    // Fetch progress when component mounts for ADMIN users
    useEffect(() => {
        if (user.role && user.role === ROLES.ADMIN) fetchProgress();

    }, [user.role]);


    // Handle form-based redirects
    useFormRedirect(user, formProgress);


    // Loading state (user is guaranteed to exist due to parent guard)
    if (isLoading || (user.role === ROLES.ADMIN && !formProgress)) return <LoadingSpinner />



    // Allow SUPER_ADMIN through without checks
    if (user.role === ROLES.SUPER_ADMIN) return <Outlet />;


    // Allow ADMIN with completed forms
    if (user.role === ROLES.ADMIN && formProgress?.formsCompleted) return <Outlet />;


    // For ADMIN with incomplete forms, the redirect is handled by useFormRedirect
    // We still render Outlet to allow the form routes to render
    return <Outlet />;


}

export default ProgressFormCheckup;