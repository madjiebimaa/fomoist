import { MoreVertical, Trash } from 'lucide-react';

import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

import { useTaskActions } from '@/store/task';

export default function TaskDropDown() {
  const taskActions = useTaskActions();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="shrink-0 h-8 w-8">
          <MoreVertical className="shrink-0 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="text-rose-500 cursor-pointer hover:bg-slate-200"
            onClick={() => taskActions.deleteFinishedTasks()}
          >
            <Trash className="shrink-0 h-4 w-4 mr-2" />
            <span>Delete finished tasks</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-rose-500 cursor-pointer hover:bg-slate-200"
            onClick={() => taskActions.deleteAllTasks()}
          >
            <Trash className="shrink-0 h-4 w-4 mr-2" />
            <span>Delete all tasks</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
