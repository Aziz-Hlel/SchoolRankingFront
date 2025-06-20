import { usePageContext } from '@/contexts/PageContext';
import { useEffect } from 'react'
import { MySchool } from './MySchool';
import { ROLES } from '@/enums/roles';
import { PAGES } from '@/data/pages';

const AdminSchoolView = () => {

    const { changePage } = usePageContext();


    useEffect(() => {
        changePage(PAGES.admins_school_view)

    }, [])

    return (

        <>

            <MySchool userRole={ROLES.SUPER_ADMIN} />

        </>
    )
}

export default AdminSchoolView