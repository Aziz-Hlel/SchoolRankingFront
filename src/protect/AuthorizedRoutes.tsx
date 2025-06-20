


import { useAuth } from '@/contexts/AuthContext';
import type { ROLES } from '@/enums/roles'
import { type FC } from 'react'
import { Outlet } from 'react-router-dom'

const AuthorizedRoutes: FC<{ roles: ROLES[] }> = ({ roles }) => {


    const { user: currentUser } = useAuth();

    const user = currentUser!;
    console.log("ousil auhtroze routes")
    if (!roles.includes(user.role)) {
        console.log("t5l l exception")
        return <div>Permission Denied, User with this role cannot access this path</div>
    }

   else  return <Outlet />

}

export default AuthorizedRoutes