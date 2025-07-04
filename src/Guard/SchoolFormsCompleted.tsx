


import { useDetailedSchool } from '@/contexts/DetailedSchoolProvider'
import LoadingSpinner from '@/LoadingSpinner';
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const SchoolFormsCompleted = () => {


    const { detailedSchool } = useDetailedSchool();



    if (!detailedSchool) return <LoadingSpinner />



    if (!detailedSchool.schoolAcademics) return <Navigate to={`/dashboard/add-school/${detailedSchool.schoolGeneral.id}/form/academics`} />
    if (!detailedSchool.schoolFacilities) return <Navigate to={`/dashboard/add-school/${detailedSchool.schoolGeneral.id}/form/facilities`} />
    if (!detailedSchool.schoolStaff) return <Navigate to={`/dashboard/add-school/${detailedSchool.schoolGeneral.id}/form/staff`} />
    if (!detailedSchool.schoolMedia) return <Navigate to={`/dashboard/add-school/${detailedSchool.schoolGeneral.id}/form/media`} />

    return <Outlet />
}

export default SchoolFormsCompleted