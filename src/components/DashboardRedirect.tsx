import { useAuth } from "@/contexts/AuthContext";
import { PAGES } from "@/data/pages";
import { ROLES } from "@/enums/roles";
import { Navigate, Outlet } from "react-router-dom";




const DashboardRedirect = () => {
    const { user } = useAuth();

    if (!user) return null;


    if (user.role === ROLES.SUPER_ADMIN) return <Navigate to={PAGES.admins.path} replace />;


    if (user.role === ROLES.ADMIN) return <Outlet />;

    // Optional: fallback route
    return <Navigate to="/unauthorized" replace />;
};

export default DashboardRedirect;
