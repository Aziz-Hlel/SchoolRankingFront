
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { AdminManagement } from './AdminManagement';
import { SchoolManagement } from './SchoolManagement';
import { SchoolProfile } from './SchoolProfile';
import { ProfileInformation } from './ProfileInformation';
import { MySchool } from './MySchool';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ROLES } from '@/enums/roles';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState(() => {
    return user?.role === ROLES.SUPER_ADMIN ? 'admins' : 'school';
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const getPageTitle = () => {
    switch (currentPage) {
      case 'admins':
        return 'Admin Management';
      case 'schools':
        return 'School Management';
      case 'school':
        return 'School Profile';
      case 'my-school':
        return 'My School';
      case 'profile':
        return 'Profile Information';
      default:
        return 'Dashboard';
    }
  };

  const renderPageContent = () => {
    switch (currentPage) {
      case 'admins':
        return <AdminManagement />;
      case 'schools':
        return <SchoolManagement />;
      case 'school':
        return <SchoolProfile />;
      case 'my-school':
        return <MySchool />;
      case 'profile':
        return <ProfileInformation />;
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <Sidebar
          currentPage={currentPage}
          onPageChange={(page) => {
            setCurrentPage(page);
            setSidebarOpen(false);
          }}
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
          <h1 className="text-lg font-semibold text-foreground">{getPageTitle()}</h1>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>

        {/* Desktop header */}
        <div className="hidden lg:block">
          <Header title={getPageTitle()} />
        </div>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          {renderPageContent()}
        </main>
      </div>
    </div>
  );
};
