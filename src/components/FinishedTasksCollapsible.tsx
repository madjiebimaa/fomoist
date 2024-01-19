import { ChevronDown, ChevronRight } from 'lucide-react';
import { forwardRef, useMemo, useState } from 'react';

import TaskCard from './TaskCard';
import { Button } from './ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './ui/collapsible';

import { useTasks } from '@/store/task';

interface FinishedTasksCollapsibleProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const FinishedTasksCollapsible = forwardRef<
  HTMLDivElement,
  FinishedTasksCollapsibleProps
>(({ className, ...props }, ref) => {
  const [open, setOpen] = useState(false);
  const tasks = useTasks();

  const finishedTasks = useMemo(
    () => tasks.filter((task) => task.isFinished),
    [tasks]
  );

  const Icon = open ? ChevronDown : ChevronRight;

  return (
    <Collapsible
      ref={ref}
      open={open}
      onOpenChange={setOpen}
      className={className}
      {...props}
    >
      <div className="relative flex justify-between items-center py-2 px-0 border-b border-b-slate-200">
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute -left-8 group/button shrink-0 h-8 w-8"
          >
            <Icon className="shrink-0 h-4 w-4 text-slate-400 group-hover/button:text-slate-900" />
          </Button>
        </CollapsibleTrigger>
        <div className="flex items-center gap-2">
          <h4 className="font-medium text-sm text-slate-900">Finished Tasks</h4>
          <span className="text-xs text-slate-600">{finishedTasks.length}</span>
        </div>
      </div>
      <CollapsibleContent>
        {finishedTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
});

export default FinishedTasksCollapsible;
