
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { AddAdminDialog } from './AddAdminDialog';

interface HeaderProps {
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  const { logout } = useAuth();

  function handleAddAdmin(adminData: { email: string; password: string; firstName: string; lastName: string; }): void {
    throw new Error('Function not implemented.');
  }

  return (
    <header className="h-28 bg-white border-b border-border flex items-center justify-between px-6 ">
      {/* <div className="flex justify-between items-center"> */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Admin Management</h2>
        <p className="text-muted-foreground">Manage all school administrators</p>
      </div>
      <AddAdminDialog onAddAdmin={handleAddAdmin} />
      {/* </div> */}
    </header>
  );
};
