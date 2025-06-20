import { AdminManagement } from '@/components/AdminManagement';
import AdminsHeader from '@/components/Headers/MySchoolHeader';
import { HeaderAdminViewSchool } from '@/components/Headers/HeaderAdminOneSchool';
import SchoolsHeader from '@/components/Headers/SchoolsHeader';
import { ProfileInformation } from '@/components/Profile/ProfileInformation';
import { SchoolManagement } from '@/components/SchoolManagement';
import { SchoolProfile } from '@/components/SchoolProfile';
import { ROLES } from '@/enums/roles';
import { sidebarButton, type Page } from '@/types/page';
import { Users, User, School } from 'lucide-react';
import MySchoolHeader from '@/components/Headers/MySchoolHeader';
import HeaderProfile from '@/components/Headers/HeaderProfile';





const admins: Page = {
    id: "admins-superadmin",
    sidebarTitle: 'Admins',
    sidebarButton: sidebarButton.Admins,
    mainPageTitle: 'Admin Management',
    mainPageDescription: 'Manage all admins in the system',
    allowedRoles: [ROLES.SUPER_ADMIN],
    icon: Users,
    sidebarLabel: 'Admins',

    component: AdminManagement,

    Header: AdminsHeader,

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


    Header: SchoolsHeader,
    path: '/dashboard/schools',

    component: SchoolManagement,

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

    Header: HeaderAdminViewSchool,

    component: AdminManagement,

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
    Header: MySchoolHeader,

    path: '/dashboard/my-school',

    component: SchoolProfile // or this : MySchool
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

    Header: HeaderProfile,
    path: '/dashboard/profile',

    component: ProfileInformation,

}


export const PAGES = {
    schools,
    admins,
    profile,
    personalSchool,
    admins_school_view
} as const;

export const ordredPages = [PAGES.admins, PAGES.schools, PAGES.personalSchool];