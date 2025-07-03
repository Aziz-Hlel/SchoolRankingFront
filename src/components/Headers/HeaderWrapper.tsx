import { usePageContext } from '@/contexts/PageContext';
import React from 'react'
import AdminsHeader from './AdminsHeader';
import MySchoolHeader from './MySchoolHeader';

const HeaderWrapper = () => {


    const { currentPage } = usePageContext();

    const currentHeader = currentPage.headerType;


    if (currentHeader === "AdminsHeader") return <AdminsHeader />
    if (currentHeader === "MySchoolHeader") return <MySchoolHeader />
    if (currentHeader === "SchoolsHeader") return <MySchoolHeader />

}

export default HeaderWrapper