import { AdminManagement } from '@/components/AdminManagement';
import { ProfileInformation } from '@/components/Profile/ProfileInformation';
import { SchoolManagement } from '@/components/SchoolManagement';
import { SchoolProfile } from '@/components/SchoolProfile';
import { ROLES } from '@/enums/roles';
import type { Page } from '@/types/page';
import { Users, User, School } from 'lucide-react';




const admins: Page = {
    id: "admins-superadmin",
    sidebarTitle: 'Admins',
    mainPageTitle: 'Admin Management',
    mainPageDescription: 'Manage all admins in the system',
    allowedRoles: [ROLES.SUPER_ADMIN],
    icon: Users,
    sidebarLabel: 'Admins',

    component: AdminManagement,

    path: '/dashboard/admins',

}


const schools: Page = {
    id: "schools-superadmin",
    sidebarTitle: 'Schools',
    mainPageTitle: 'Schools Management',
    mainPageDescription: 'Manage all schools in the system',
    allowedRoles: [ROLES.SUPER_ADMIN],
    icon: School,
    sidebarLabel: 'Schools',

    path: '/dashboard/schools',

    component: SchoolManagement,

}


const personalSchool: Page = {
    id: "personal-school",
    sidebarTitle: 'My School',
    mainPageTitle: 'School Management', // or School Profile
    mainPageDescription: 'Overview of your school information',
    allowedRoles: [ROLES.ADMIN],
    icon: School,
    sidebarLabel: 'My School',

    path: '/dashboard/my-school',

    component: SchoolProfile // or this : MySchool
}


const profile: Page = {
    id: "profile",
    sidebarTitle: 'Profile',
    mainPageTitle: 'Profile Information',
    mainPageDescription: 'Manage your profile information',
    allowedRoles: [ROLES.ADMIN, ROLES.SUPER_ADMIN],
    icon: User,
    sidebarLabel: 'Profile',

    path: '/dashboard/profile',

    component: ProfileInformation,

}


export const PAGES = {
    schools,
    admins,
    profile,
    personalSchool
} as const;

export const ordredPages = [PAGES.admins, PAGES.schools, PAGES.personalSchool];