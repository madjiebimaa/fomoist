import { LayoutPanelLeft } from 'lucide-react';

import { Button } from './ui/button';

import { cn } from '../lib/utils';
import { useLayoutActions, useSidebarOpen } from '../store/layout';

export default function Sidebar() {
  const sidebarOpen = useSidebarOpen();
  const layoutActions = useLayoutActions();

  return (
    <aside
      className={cn(
        'fixed md:static z-50 shrink-0 flex flex-col h-screen w-64 p-3 bg-slate-200 shadow-md transition-all duration-300',
        !sidebarOpen && '-ml-64'
      )}
    >
      <div className="flex justify-between items-center">
        <Button
          variant="ghost"
          size="icon"
          className="shrink-0 h-8 w-8 ml-auto"
          onClick={() => layoutActions.toggleSidebarOpen()}
        >
          <LayoutPanelLeft className="shrink-0 h-4 w-4" />
        </Button>
      </div>
    </aside>
  );
}
