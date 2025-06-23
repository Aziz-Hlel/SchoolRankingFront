


import { useAuth } from '@/contexts/AuthContext';
import type { ROLES } from '@/enums/roles'
import { type FC } from 'react'
import { Outlet } from 'react-router-dom'

const AuthorizedRoutes: FC<{ roles: ROLES[] }> = ({ roles }) => {


    const { user: currentUser } = useAuth();

    const user = currentUser!;

    if (!roles.includes(user.role))
        return <div>Permission Denied, User with this role cannot access this path</div>


    return <Outlet />

}

export default AuthorizedRoutes