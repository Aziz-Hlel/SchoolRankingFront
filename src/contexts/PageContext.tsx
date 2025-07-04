import { ordredPages, PAGES } from "@/data/pages";
import { sidebarButton, type Page } from "@/types/page";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { ROLES } from "@/enums/roles";
import { usePage, usePageStore } from "@/store/usePageStore";
import useApiQuery from "@/hooks/useApiQuery";
import apiGateway from "@/service/Api/apiGateway";
import { School } from "lucide-react";


interface PageContextProps {
    currentPage: Page;
    changePage: (page: Page) => void;
    isLodadingSidebar: boolean;

    ordredPages: Page[]; // TODO : do you even need this one here 
}


const PageContext = createContext<PageContextProps | undefined>(undefined);


type ApiUserSchoolsRes = { id: string, name: string, formsCompleted: boolean, lastFormStep: number }


export const PageProvider = ({ children }: { children: React.ReactNode }) => {


    const { user } = useAuth();

    const { data, refetch, isLoading: isLodadingSidebar } = useApiQuery<ApiUserSchoolsRes[]>({
        url: apiGateway.userSchool.getUserSchools(),
        queryKey: ["user-schools"],
        options: { fetchOnMount: user?.role === ROLES.ADMIN ? true : false, }
    })

    const { currentPage, setCurrentPage, ordredPages, addAminOrdredPages } = usePageStore();


    useEffect(() => {
        user && user.role === ROLES.SUPER_ADMIN && setCurrentPage(PAGES.admins);
        user && user.role === ROLES.ADMIN && setCurrentPage(PAGES.personalSchool);

    }, [user?.role]);


    // useEffect(() => {
    //     if (user && user.role === ROLES.ADMIN) refetch();
    // }, [user?.role]);

    const createPage = (data: ApiUserSchoolsRes): Page => {
        return {
            id: data.id,
            sidebarTitle: data.name,
            sidebarButton: sidebarButton.MySchool,
            mainPageTitle: 'School Management', // or School Profile
            mainPageDescription: 'Overview of your school information',
            allowedRoles: [ROLES.ADMIN],
            icon: School,
            sidebarLabel: 'My School',

            headerType: "MySchoolHeader",
            path: `/dashboard/my-school/${data.id}`,
            additionalInfo: { formsCompleted: data.formsCompleted, lastFormStep: data.lastFormStep },

        }
    }
    useEffect(() => {
        if (data) addAminOrdredPages(data.data.map((item) => createPage(item)));
    }, [data])


    const changePage = (page: Page) => {
        setCurrentPage(page);
    }

    const contextValue: PageContextProps = {
        currentPage,
        changePage,
        isLodadingSidebar,
        ordredPages
    };

    return (
        <PageContext.Provider value={contextValue}>
            {children}
        </PageContext.Provider>
    )
}


export const usePageContext = () => {
    const context = useContext(PageContext);
    if (context === undefined) {
        throw new Error("usePage must be used within a PageProvider");
    }
    return context;
}