
import type { Page } from '@/types/page';
import React from 'react';

interface HeaderProps {
  currentPage: Page;
}

export const Header: React.FC<HeaderProps> = ({  currentPage }) => {


  return (
    <header className="h-28 bg-white border-b border-border flex items-center justify-between px-6 ">
      {/* <div className="flex justify-between items-center"> */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight">{currentPage.mainPageTitle}</h2>
        <p className="text-muted-foreground">{currentPage.mainPageDescription}</p>
      </div>
      {/* </div> */}
    </header>
  );
};
