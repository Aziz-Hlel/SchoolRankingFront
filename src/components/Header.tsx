
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

interface HeaderProps {
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  const { logout } = useAuth();

  return (
    <header className="h-16 bg-white border-b border-border flex items-center justify-between px-6">
      <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
      <Button variant="outline" onClick={logout}>
        Sign Out
      </Button>
    </header>
  );
};
