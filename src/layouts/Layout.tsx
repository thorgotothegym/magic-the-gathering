import { ReactNode } from 'react';

type Layout = {
  children: ReactNode;
};

export const Layout = ({ children }: Layout) => {
  return (
    <div className="relative flex min-h-svh flex-col bg-current text-foreground">
      <header>Header</header>
      <main className="flex-1 p-6 bg-gray-100">{children}</main>
    </div>
  );
};
