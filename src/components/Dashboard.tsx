
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Sidebar } from './Sidebar/Sidebar';
import { Header } from './Headers/Header';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ROLES } from '@/enums/roles';
import type { Page } from '@/types/page';
import { ordredPages, PAGES } from '@/data/pages';
import { Outlet, } from 'react-router-dom';
import { usePageContext } from '@/contexts/PageContext';
import HeaderWrapper from './Headers/HeaderWrapper';




export const Dashboard = () => {

  const { user } = useAuth();

  if (!user) return <>User is either null or undefined</>;


  const { currentPage } = usePageContext();

  const [sidebarOpen, setSidebarOpen] = useState(false);




  return (
    <div className="h-screen bg-gray-50 flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <Sidebar
          currentPage={currentPage}
          onPageChange={(page: Page) => {

            setSidebarOpen(false);
          }}
          ordredPages={ordredPages}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile header with menu button */}
        <div className="lg:hidden flex items-center justify-between p-4 bg-white border-b border-border">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2"
          >
            {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
          <h1 className="text-lg font-semibold text-foreground">{currentPage.mainPageTitle}</h1>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>

        {/* Desktop header */}
        <div className="hidden lg:block">
          {/* <Header currentPage={currentPage} /> */}
          <HeaderWrapper />
        </div>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
