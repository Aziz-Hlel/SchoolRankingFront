import { usePageContext } from '@/contexts/PageContext';
import { useEffect } from 'react'
import { MySchool } from './MySchool';
import { ROLES } from '@/enums/roles';
import { PAGES } from '@/data/pages';
import { useChangePage } from '@/hooks/useChangePage';

const AdminSchoolView = () => {

    useChangePage(PAGES.admins_school_view);
    return (

        <>

            <MySchool userRole={ROLES.SUPER_ADMIN} />

        </>
    )
}

export default AdminSchoolView