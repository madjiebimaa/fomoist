import { useMediaQuery } from '@uidotdev/usehooks';
import { Focus, Inbox, LayoutPanelLeft, LucideIcon } from 'lucide-react';
import { NavLink } from 'react-router-dom';

import { Button, buttonVariants } from './ui/button';

import { cn } from '../lib/utils';
import { useLayoutActions, useSidebarOpen } from '../store/layout';

export default function Sidebar() {
  const sidebarOpen = useSidebarOpen();
  const layoutActions = useLayoutActions();
  const isMobileDevice = useMediaQuery('only screen and (max-width : 767px)');

  const iconLinks: { Icon: LucideIcon; label: string; to: string }[] = [
    {
      Icon: Inbox,
      label: 'Inbox',
      to: '/',
    },
    {
      Icon: Focus,
      label: 'Focus',
      to: '/focus',
    },
  ];

  return (
    <aside
      className={cn(
        'fixed md:static z-50 shrink-0 flex flex-col gap-4 h-screen w-64 p-3 bg-slate-200 shadow-md transition-all duration-300',
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
      <div className="flex flex-col pt-6">
        {iconLinks.map(({ Icon, label, to }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                buttonVariants({
                  variant: 'link',
                  size: 'sm',
                  className:
                    'justify-between hover:bg-slate-300 hover:no-underline',
                }),
                isActive &&
                  'bg-rose-200 hover:bg-rose-300 text-rose-900 fill-rose-900'
              )
            }
            onClick={() => isMobileDevice && layoutActions.toggleSidebarOpen()}
          >
            <div className="flex items-center gap-2">
              <Icon className="shrink-0 h-4 w-4" />
              <span className="font-normal">{label}</span>
            </div>
          </NavLink>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <NavLink
          to={'/projects'}
          className={({ isActive }) =>
            cn(
              buttonVariants({
                variant: 'link',
                size: 'sm',
                className:
                  'justify-between hover:bg-slate-300 hover:no-underline',
              }),
              isActive && 'bg-rose-200 hover:bg-rose-300 '
            )
          }
          onClick={() => isMobileDevice && layoutActions.toggleSidebarOpen()}
        >
          <div className="flex items-center gap-2">
            <span className="font-semibold">My Projects</span>
          </div>
        </NavLink>
      </div>
    </aside>
  );
}
