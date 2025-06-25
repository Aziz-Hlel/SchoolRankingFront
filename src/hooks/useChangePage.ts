import { usePageContext } from "@/contexts/PageContext";
import type { Page } from "@/types/page";
import { useEffect } from "react";



export const useChangePage = (page: Page) => {

    const { changePage } = usePageContext();
    useEffect(() => {
        changePage(page);
    }, [])
}