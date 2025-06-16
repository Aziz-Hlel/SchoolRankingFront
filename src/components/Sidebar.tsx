
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Users, Book, User, School, LogOut } from 'lucide-react';
import { ROLES } from '@/enums/roles';

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentPage, onPageChange }) => {
  const { user, logout } = useAuth();

  const superAdminItems = [
    { id: 'admins', label: 'Manage Admins', icon: Users },
    { id: 'schools', label: 'Manage Schools', icon: Book },
  ];

  const adminItems = [
    { id: 'school', label: 'School Profile', icon: Book },
    { id: 'my-school', label: 'My School', icon: School },
  ];

  const items = user?.role === ROLES.SUPER_ADMIN ? superAdminItems : adminItems;

  return (
    <div className="w-64 bg-white border-r border-border h-screen flex flex-col">
      <div className="p-4 lg:p-6 border-b border-border">
        <h2 className="text-lg lg:text-xl font-bold text-primary">Admin Dashboard</h2>
        <p className="text-xs lg:text-sm text-muted-foreground mt-1">
          {user?.role === ROLES.SUPER_ADMIN ? 'Super Admin' : 'School Admin'}
        </p>
      </div>

      <nav className="flex-1 p-3 lg:p-4">
        <div className="space-y-1 lg:space-y-2">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={currentPage === item.id ? 'default' : 'ghost'}
                className={cn(
                  'w-full justify-start text-sm lg:text-base h-10 lg:h-11',
                  currentPage === item.id && 'bg-primary text-primary-foreground'
                )}
                onClick={() => onPageChange(item.id)}
              >
                <Icon className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="truncate">{item.label}</span>
              </Button>
            );
          })}
        </div>
      </nav>

      <div className="p-3 lg:p-4 border-t border-border">
        <Button
          variant={currentPage === 'profile' ? 'default' : 'ghost'}
          className={cn(
            'w-full justify-start mb-2 text-sm lg:text-base h-10 lg:h-11',
            currentPage === 'profile' && 'bg-primary text-primary-foreground'
          )}
          onClick={() => onPageChange('profile')}
        >
          <User className="w-4 h-4 mr-2 flex-shrink-0" />
          <span className="truncate">Profile</span>
        </Button>

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
            <p className="text-sm font-medium truncate">{user?.name}</p>
            <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
