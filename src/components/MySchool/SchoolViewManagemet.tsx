import { usePageContext } from '@/contexts/PageContext';
import { useEffect, type FC } from 'react'
import { SchoolView } from './SchoolView';
import { ROLES } from '@/enums/roles';
import { PAGES } from '@/data/pages';
import { useDetailedSchool } from '@/contexts/DetailedSchoolProvider';
import { Outlet, useParams } from 'react-router-dom';
import LoadingSpinner from '@/LoadingSpinner';

const SchoolViewManagemet = () => {


    // const { changePage } = usePageContext();

    // useEffect(() => {
    //     userRole === ROLES.SUPER_ADMIN && changePage(PAGES.admins_school_view);
    //     userRole === ROLES.ADMIN && changePage(PAGES.personalSchool);
    // }, [userRole]);


    const { detailedSchool, fetchDetailedSchool } = useDetailedSchool();
    const school = detailedSchool!;

    const { schoolId: schoolIdParam } = useParams();

    useEffect(() => {
        console.log("schoolIdParam", schoolIdParam)
        if (schoolIdParam) {
            fetchDetailedSchool(schoolIdParam);
        }

    }, [schoolIdParam])



    console.log('ousil houni nyk w scholId : ', schoolIdParam, '\n w school = ', school);
    if (!school || schoolIdParam !== school.schoolGeneral.id) return <LoadingSpinner />;


    return <Outlet />;
}

export default SchoolViewManagemet;