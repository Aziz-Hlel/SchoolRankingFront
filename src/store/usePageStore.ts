import { ROLES } from '@/enums/roles';
import useApi from '@/hooks/useApi';
import apiGateway from '@/service/Api/apiGateway';
import type { ComponentType, SVGProps } from 'react';
import { create } from 'zustand';
import { Users, User, School } from 'lucide-react';



export const sidebarButton = {
    Schools: "Schools",
    Admins: "Admins",
    Profile: "Profile",
    MySchool: "MySchool",
} as const;

export type SidebarButton = typeof sidebarButton[keyof typeof sidebarButton];

type HeaderType = "MySchoolHeader" | "AdminsHeader" | "SchoolsHeader"

export type Page = {
    id: string;
    sidebarTitle: string;
    sidebarButton: SidebarButton;
    mainPageTitle: string;
    mainPageDescription: string;
    allowedRoles: ROLES[];
    icon: ComponentType<SVGProps<SVGSVGElement>>;
    sidebarLabel: string;
    path: string;
    headerType: HeaderType;
}








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

const PAGES: Record<string, Page> = {
    schools,
    admins,
    profile,
    personalSchool,
    admins_school_view
};


export const ordredPages = [PAGES.admins, PAGES.schools, PAGES.personalSchool];


type PageStoreProps = {
    currentPage: Page,
    setCurrentPage: (page: Page) => void;
    PAGES: Record<string, Page>;
    ordredPages: Page[];
    addOrdredPages: (pages: Page[]) => void
}


export const usePageStore = create<PageStoreProps>()((set) => ({
    currentPage: PAGES.profile,
    setCurrentPage: (page: Page) => set({ currentPage: page }),
    PAGES: PAGES,
    ordredPages: ordredPages,
    addOrdredPages: (pages: Page[]) => set({ ordredPages: [...ordredPages, ...pages] }),
}));



export const usePage = () => usePageStore;




export const useOrdredPages = () => usePageStore((state) => state.ordredPages);


