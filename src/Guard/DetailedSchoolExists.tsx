


import { useDetailedSchool } from '@/contexts/DetailedSchoolProvider'
import LoadingSpinner from '@/LoadingSpinner';

import { Outlet } from 'react-router-dom';

const DetailedSchoolExists = () => {

    const { detailedSchool } = useDetailedSchool();

    if (!detailedSchool) return <LoadingSpinner />;

    return <Outlet />

}

export default DetailedSchoolExists