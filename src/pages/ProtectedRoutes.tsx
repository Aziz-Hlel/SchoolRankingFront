import { useAuth } from '../contexts/AuthContext'
import { Outlet, useNavigate } from 'react-router-dom';

const ProtectedRoutes = () => {


    const { user } = useAuth();

    const navigate = useNavigate();

    if (user === undefined)
        return <> <div className=' pr-5'>Loading...</div> <div className=' underline hover:cursor-pointer' onClick={() => navigate("/")}>go Home</div> </>;

    if (user === null)
        return <> <div className=' pr-5'>Not logged in</div> <div className=' underline hover:cursor-pointer' onClick={() => navigate("/")}>go Home</div> </>;

    return <Outlet />;
}

export default ProtectedRoutes