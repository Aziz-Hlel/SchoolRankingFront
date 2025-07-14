import LoadingSpinner from '@/LoadingSpinner';
import { useAuth } from '../contexts/AuthContext'
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

const AuthenticatedRoutes = () => {

    console.log("ousll protected routes");

    const { user } = useAuth();
    console.log('user === ', user);
    // const navigate = useNavigate();

    if (user === undefined)
        return <LoadingSpinner />

    if (user === null)
        return <Navigate to="/login" replace />;
    //  <div className=' underline hover:cursor-pointer' onClick={() => navigate("/login")}>go Login</div>
    return <Outlet />;
}

export default AuthenticatedRoutes