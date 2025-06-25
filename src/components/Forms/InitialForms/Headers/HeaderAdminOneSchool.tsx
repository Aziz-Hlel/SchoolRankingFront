import { useDetailedSchool } from "@/contexts/DetailedSchoolProvider";
import { PAGES } from "@/data/pages";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { usePageContext } from "@/contexts/PageContext";




export const HeaderAdminViewSchool = () => {

    const page = PAGES.admins_school_view;

    const { detailedSchool } = useDetailedSchool();

    const { changePage } = usePageContext();


    return (
        <header className="h-28 bg-white border-b border-border flex items-center justify-between px-6 ">
            {/* <div className="flex justify-between items-center"> */}
            <div>
                <h2 className="text-3xl font-bold tracking-tight">{`${page.mainPageTitle} (${detailedSchool?.schoolGeneral?.name ?? "N/A" })`}</h2>
                <p className="text-muted-foreground">{page.mainPageDescription}</p>
            </div>
            <Link to={"/dashboard/schools"} onClick={() => changePage(PAGES.schools)}>
                <Button>Go Back</Button>
            </Link>
            {/* </div> */}
        </header>
    );
};
