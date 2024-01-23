import { LayoutPanelLeft } from 'lucide-react';

import TaskDropDown from './TaskDropDown';
import TaskSortDropDown from './TaskSortDropDown';
import { Button } from './ui/button';

import { cn } from '@/lib/utils';
import { useLayoutActions, useSidebarOpen } from '@/store/layout';

export default function Navbar() {
  const sidebarOpen = useSidebarOpen();
  const layoutActions = useLayoutActions();

  return (
    <nav
      className={cn(
        'z-10 sticky top-0 flex justify-between items-center p-3 bg-white'
      )}
    >
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          'shrink-0 h-8 w-8 opacity-100 visible transition-opacity duration-300',
          sidebarOpen && 'opacity-0 invisible'
        )}
        onClick={() => layoutActions.toggleSidebarOpen()}
      >
        <LayoutPanelLeft className="shrink-0 h-4 w-4" />
      </Button>
      <div className="flex items-center gap-2 ml-auto">
        <TaskSortDropDown />
        <TaskDropDown />
      </div>
    </nav>
  );
}
