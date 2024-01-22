import { Check, MoreVertical, Trash, Trash2 } from 'lucide-react';

import AddTasksFromTemplateDialog from './AddTasksFromTemplateDialog';
import TemplateFormDialog from './TemplateFormDialog';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
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
          <TemplateFormDialog />
          <AddTasksFromTemplateDialog />

          <DropdownMenuItem
            className="text-slate-600 cursor-pointer hover:bg-slate-200"
            onSelect={() => taskActions.clearActuals()}
          >
            <Check className="shrink-0 h-4 w-4 mr-2" />
            <span>Clear actual Pomodoros</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="text-rose-500 cursor-pointer focus:text-rose-600 hover:bg-slate-200"
            onClick={() => taskActions.deleteFinishedTasks()}
          >
            <Trash2 className="shrink-0 h-4 w-4 mr-2" />
            <span>Delete finished tasks</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-rose-500 cursor-pointer focus:text-rose-600 hover:bg-slate-200"
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
