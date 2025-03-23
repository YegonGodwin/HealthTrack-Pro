
import { ReactNode } from 'react';
import Navbar from './Navbar';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-health-blue/10 via-health-purple/5 to-transparent pointer-events-none"></div>
      <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-32 bg-health-blue/5 blur-[100px] pointer-events-none"></div>
      <Navbar />
      <main className="container mx-auto px-4 py-8 animate-fade-in-up relative z-10">
        {children}
      </main>
    </div>
  );
};

export default Layout;
