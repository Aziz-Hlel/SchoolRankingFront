import { ordredPages, PAGES } from "@/data/pages";
import type { Page } from "@/types/page";
import { createContext, useContext, useState } from "react";
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

    const userFirstRendredPage = !user ? PAGES.profile
        : user.role === ROLES.SUPER_ADMIN ? PAGES.admins : PAGES.personalSchool;

    const [currentPage, setCurrentPage] = useState<Page>(userFirstRendredPage);


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