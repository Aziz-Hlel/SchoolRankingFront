import { PAGES } from '@/data/pages';

const SchoolsHeader = () => {

    const page = PAGES.schools;

    return (
        <header className="h-28 bg-white border-b border-border flex items-center justify-between px-6 ">
            {/* <div className="flex justify-between items-center"> */}
            <div>
                <h2 className="text-3xl font-bold tracking-tight">{page.mainPageTitle}</h2>
                <p className="text-muted-foreground">{page.mainPageDescription}</p>
            </div>
            
            {/* </div> */}
        </header>
    );
}

export default SchoolsHeader