import { ordredPages, PAGES } from "@/data/pages";
import type { Page } from "@/types/page";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { ROLES } from "@/enums/roles";


interface PageContextProps {
    currentPage: Page;
    changePage: (page: Page) => void;
    ordredPages: Page[]; // TODO : do you even need this one here 
}


const PageContext = createContext<PageContextProps | undefined>(undefined);




export const PageProvider = ({ children }: { children: React.ReactNode }) => {


    const { user } = useAuth();

    const userFirstRendredPage = PAGES.profile;

    const [currentPage, setCurrentPage] = useState<Page>(userFirstRendredPage);

    useEffect(() => {
        user && user.role === ROLES.SUPER_ADMIN && setCurrentPage(PAGES.admins);
        user && user.role === ROLES.ADMIN && setCurrentPage(PAGES.personalSchool);

    }, [user?.role]);

    const changePage = (page: Page) => {
        setCurrentPage(page);
    }

    const contextValue: PageContextProps = {
        currentPage,
        changePage,
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