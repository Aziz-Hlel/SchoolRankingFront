import { create, } from 'zustand';
import { PAGES } from '@/data/pages';
import type { Page } from '@/types/page';





export const ordredPages = [PAGES.admins, PAGES.schools, PAGES.personalSchool, PAGES.addSchool];


type PageStoreProps = {
    currentPage: Page,
    setCurrentPage: (page: Page) => void;
    setCurrentPageId: (id: string) => void;
    PAGES: Record<string, Page>;
    ordredPages: Page[];
    addAminOrdredPages: (pages: Page[]) => void
}


export const usePageStore = create<PageStoreProps>()((set) => ({
    currentPage: PAGES.profile,
    setCurrentPage: (page: Page) => set({ currentPage: page }),
    setCurrentPageId: (id: string) => set((prev) => ({
        currentPage: ordredPages.find((page) => page.id === id) ?? prev.currentPage
    })),
    PAGES: PAGES,
    ordredPages: ordredPages,
    addAminOrdredPages: (pages: Page[]) => set({ ordredPages: [...pages, PAGES.addSchool] }),
}));





export const usePage = () => usePageStore;




export const useOrdredPages = () => usePageStore((state) => state.ordredPages);


export const useChangePageById = () => usePageStore((state) => state.setCurrentPageId);
