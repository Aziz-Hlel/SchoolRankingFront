
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { User, LogOut } from 'lucide-react';
import { ROLES } from '@/enums/roles';
import type { Page } from '@/types/page';
import { PAGES } from '@/data/pages';
import { Link } from 'react-router-dom';
import type { FC } from 'react';
import { usePageContext } from '@/contexts/PageContext';
import { useOrdredPages } from '@/store/usePageStore';
import { CircleAlert } from 'lucide-react';

interface SidebarProps {
  currentPage: Page;
  onPageChange: (page: Page) => void;
  ordredPages: Page[];
}

export const Sidebar: FC<SidebarProps> = ({ }) => {
  const { user, logout } = useAuth();

  if (!user) return null;

  const userRole = user.role;

  const { currentPage, changePage } = usePageContext();

  const ordredPages = useOrdredPages();


  console.log("ordredPages : : ", ordredPages);

  return (
    <div className="w-64 bg-white border-r border-border h-screen flex flex-col">

      <div className="p-4 lg:p-6 border-b border-border h-28">
        <h2 className="text-lg lg:text-xl font-bold text-primary">Admin Dashboard</h2>
        <p className="text-xs lg:text-sm text-muted-foreground mt-1">
          {user?.role === ROLES.SUPER_ADMIN ? 'Super Admin' : 'School Admin'}
        </p>
      </div>

      <nav className="flex-1 p-3 lg:p-4 overflow-y-auto">
        <div className="flex flex-col  space-y-1 lg:space-y-2 ">
          {ordredPages.map((page, index) => {

            if (!page.allowedRoles.includes(userRole))
              return null;

            const Icon = page.icon;
            return (
              <Link to={page.path} key={index}>
                <Button
                  key={page.id}
                  variant={page === currentPage ? 'default' : 'ghost'}
                  className={cn(
                    'w-full justify-start text-sm lg:text-base h-10 lg:h-11 hover:cursor-pointer  ',
                    currentPage.id === page.id && 'bg-primary text-primary-foreground',
                    page.additionalInfo?.formsCompleted === false && 'bg-yellow-100 hover:bg-yellow-400 ',
                    currentPage.id === page.id && page.additionalInfo?.formsCompleted === false && 'text-black'
                  )}
                  // onClick={() => onPageChange(page)}
                  onClick={() => changePage(page)}
                >
                  <Icon className="w-4 h-4 mr-2 flex-shrink-0 " />
                  <span className="truncate">{page.sidebarTitle}</span>
                  {page.additionalInfo?.formsCompleted === false &&
                    <>
                      <span className='text-yellow-600 text-xs font-medium ml-2'>{page.additionalInfo?.lastFormStep }/5</span>
                      <CircleAlert className="text-yellow-600" />

                    </>

                  }
                </Button>
              </Link>
            );
          })}

        </div>
      </nav >

      <div className="p-3 lg:p-4 border-t border-border">

        <Link to={PAGES.profile.path}>
          <Button
            variant={currentPage.sidebarButton === PAGES.profile.sidebarButton ? 'default' : 'ghost'}
            className={cn(
              'w-full justify-start mb-2 text-sm lg:text-base h-10 lg:h-11',
              currentPage.sidebarButton === PAGES.profile.sidebarButton && 'bg-primary text-primary-foreground'
            )}
            onClick={() => changePage(PAGES.profile)}
          >
            <User className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="truncate">Profile</span>
          </Button>
        </Link>

        <Button
          variant="ghost"
          onClick={logout}
          className="w-full justify-start mb-3 text-sm lg:text-base h-10 lg:h-11 text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <LogOut className="w-4 h-4 mr-2 flex-shrink-0" />
          <span className="truncate">Sign Out</span>
        </Button>

        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
            <User className="w-4 h-4 text-primary-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user?.username}</p>
            <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
          </div>
        </div>
      </div>
    </div >
  );
};
