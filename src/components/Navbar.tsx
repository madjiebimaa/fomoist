import { useEffect, useState } from 'react';

import TaskDropDown from './TaskDropDown';
import TaskSortDropDown from './TaskSortDropDown';

import { cn } from '@/lib/utils';

export default function Navbar() {
  const [navbarScroll, setNavbarScroll] = useState(false);
  const [titleScroll, setTitleScroll] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setNavbarScroll(window.scrollY > 10);
      setTitleScroll(window.scrollY > 310);
    });
  }, []);

  return (
    <nav
      className={cn(
        'sticky top-0 z-50 flex justify-between items-center p-3 bg-white border-b border-b-transparent shadow-none duration-300 ease-out',
        navbarScroll && 'border-b-slate-200 shadow-md'
      )}
    >
      <div className="absolute top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2 font-medium text-slate-900">
        {titleScroll && 'Inbox'}
      </div>
      <div className="flex items-center gap-2 ml-auto">
        <TaskSortDropDown />
        <TaskDropDown />
      </div>
    </nav>
  );
}
