import Navbar from '@/components/Navbar';
import Overlay from '@/components/Overlay';
import Sidebar from '@/components/Sidebar';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { Outlet } from 'react-router-dom';

import { cn } from '@/lib/utils';
import { useSidebarOpen } from '@/store/layout';

export default function RootPage() {
  const sidebarOpen = useSidebarOpen();

  return (
    <div
      className={cn(
        'flex h-screen overflow-x-hidden',
        sidebarOpen && 'max-h-screen'
      )}
    >
      <Sidebar />
      <main className="flex flex-1 flex-col gap-4 overflow-y-scroll">
        <Navbar />
        <section className="flex flex-1 flex-col gap-4 px-10 py-2 pb-10">
          <Outlet />
        </section>

        <Overlay />
      </main>

      <Sonner />
    </div>
  );
}
