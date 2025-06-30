import { usePageContext } from '@/contexts/PageContext';
import { useEffect } from 'react'
import { SchoolView } from './SchoolView';
import { ROLES } from '@/enums/roles';
import { PAGES } from '@/data/pages';
import { useChangePage } from '@/hooks/useChangePage';

const AdminSchoolView = () => {

    useChangePage(PAGES.admins_school_view);


    return (

        <>

            <SchoolView />

        </>
    )
}

export default AdminSchoolView