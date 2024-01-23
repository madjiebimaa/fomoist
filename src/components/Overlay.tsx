import { cn } from '@/lib/utils';
import { useSidebarOpen } from '@/store/layout';

export default function Overlay() {
  const sidebarOpen = useSidebarOpen();

  return (
    <div
      className={cn(
        'z-20 absolute top-0 left-0 h-full w-full bg-black/50 opacity-0 invisible transition-all duration-300',
        sidebarOpen && 'opacity-80 visible md:opacity-0 md:invisible'
      )}
    />
  );
}
