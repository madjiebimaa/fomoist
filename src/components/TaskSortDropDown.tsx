import { ArrowDownUp, Check } from 'lucide-react';

import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

import { TaskFilterSort } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useTaskActions, useTaskFilters } from '@/store/task';

export default function TaskSortDropDown() {
  const taskFilters = useTaskFilters();
  const taskActions = useTaskActions();

  const taskSorts: { label: string; value: TaskFilterSort }[] = [
    {
      label: 'Date added',
      value: 'DATE_ADDED',
    },
    {
      label: 'Name',
      value: 'NAME',
    },
    {
      label: 'Priority',
      value: 'PRIORITY',
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="shrink-0 h-8 w-8">
          <ArrowDownUp className="shrink-0 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          {taskSorts.map((taskSort) => (
            <DropdownMenuItem
              key={taskSort.value}
              className="cursor-pointer hover:bg-slate-200"
              onClick={() => taskActions.sortTasks(taskSort.value)}
            >
              <Check
                className={cn(
                  'shrink-0 h-4 w-4 mr-2 text-rose-700 opacity-0',
                  taskFilters.sort.value === taskSort.value && 'opacity-100'
                )}
              />
              <span>{taskSort.label}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
