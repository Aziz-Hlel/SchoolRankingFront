
import { ROLES } from '@/enums/roles';
import { sidebarButton, type Page } from '@/types/page';
import { Users, User, School, Plus } from 'lucide-react';






const admins: Page = {
    id: "admins-superadmin",
    sidebarTitle: 'Admins',
    sidebarButton: sidebarButton.Admins,
    mainPageTitle: 'Admin Management',
    mainPageDescription: 'Manage all admins in the system',
    allowedRoles: [ROLES.SUPER_ADMIN],
    icon: Users,
    sidebarLabel: 'Admins',

    headerType: "AdminsHeader",

    path: '/dashboard/admins',

}


const schools: Page = {
    id: "schools-superadmin",
    sidebarTitle: 'Schools',
    sidebarButton: sidebarButton.Schools,
    mainPageTitle: 'Schools Management',
    mainPageDescription: 'Manage all schools in the system',
    allowedRoles: [ROLES.SUPER_ADMIN],
    icon: School,
    sidebarLabel: 'Schools',


    path: '/dashboard/schools',
    headerType: "SchoolsHeader",

}




const admins_school_view: Page = {
    id: "admins-superadmin-school-view",
    sidebarTitle: 'Schools/ school overview',
    sidebarButton: sidebarButton.Schools,
    mainPageTitle: 'School Management',
    mainPageDescription: 'Overview of a school information',
    allowedRoles: [ROLES.SUPER_ADMIN],
    icon: School,
    sidebarLabel: 'School Overview',

    headerType: "MySchoolHeader",

    path: '/dashboard/admins',

}


const personalSchool: Page = {
    id: "personal-school",
    sidebarTitle: 'My School',
    sidebarButton: sidebarButton.MySchool,
    mainPageTitle: 'School Management', // or School Profile
    mainPageDescription: 'Overview of your school information',
    allowedRoles: [ROLES.ADMIN],
    icon: School,
    sidebarLabel: 'My School',

    headerType: "MySchoolHeader",
    path: '/dashboard/my-school',

}


const profile: Page = {
    id: "profile",
    sidebarTitle: 'Profile',
    sidebarButton: sidebarButton.Profile,
    mainPageTitle: 'Profile Information',
    mainPageDescription: 'Manage your profile information',
    allowedRoles: [ROLES.ADMIN, ROLES.SUPER_ADMIN],
    icon: User,
    sidebarLabel: 'Profile',

    headerType: "MySchoolHeader",

    path: '/dashboard/profile',


}

const addSchool: Page = {
    id: "add-school",
    sidebarTitle: 'Add school',
    sidebarButton: sidebarButton.Schools,
    mainPageTitle: 'Add School',
    mainPageDescription: 'Add new school to the system',
    allowedRoles: [ROLES.ADMIN,],
    icon: Plus,
    sidebarLabel: 'Add School',
    headerType: "SchoolsHeader",
    path: '/dashboard/add-school/form/general',
}

export const PAGES: Record<string, Page> = {
    // SUPER ADMIN
    schools,
    admins,
    admins_school_view,

    // ADMIN
    personalSchool,
    addSchool,

    // COMMON
    profile,
};



export const ordredPages = [PAGES.admins, PAGES.schools, PAGES.personalSchool];