import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { AdminManagement } from './AdminManagement';
import { SchoolManagement } from './SchoolManagement';
import { SchoolProfile } from './SchoolProfile';
import { ProfileInformation } from './ProfileInformation';
import { MySchool } from './MySchool';
import { useAuth } from '@/contexts/AuthContext';
import { ROLES } from '@/enums/roles';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState(() => {
    return user?.role === ROLES.SUPER_ADMIN ? 'admins' : 'school';
  });

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
      <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
      <div className="flex-1 flex flex-col">
        <Header title={getPageTitle()} />
        <main className="flex-1 p-6">
          {renderPageContent()}
        </main>
      </div>
    </div>
  );
};
