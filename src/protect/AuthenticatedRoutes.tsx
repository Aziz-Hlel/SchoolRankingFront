import { useAuth } from '../contexts/AuthContext'
import { Outlet, useNavigate } from 'react-router-dom';

const AuthenticatedRoutes = () => {

    console.log("ousll protected routes");

    const { user } = useAuth();

    const navigate = useNavigate();

    if (user === undefined)
        return <> <div className=' pr-5'>Loading...</div> <div className=' underline hover:cursor-pointer' onClick={() => navigate("/login")}>go Login</div> </>;

    if (user === null)
        return <> <div className=' pr-5'>Not logged in</div> <div className=' underline hover:cursor-pointer' onClick={() => navigate("/login")}>go Login</div> </>;

    return <Outlet />;
}

export default AuthenticatedRoutes