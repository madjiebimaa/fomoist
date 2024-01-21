import { CopyPlus, Trash } from 'lucide-react';

import { Button, buttonVariants } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { DropdownMenuItem } from './ui/dropdown-menu';

import { cn } from '@/lib/utils';
import { useTaskActions, useTaskFilters, useTemplates } from '@/store/task';

export default function AddTasksFromTemplateDialog() {
  const taskFilters = useTaskFilters();
  const templates = useTemplates();
  const taskActions = useTaskActions();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <DropdownMenuItem
          className="text-slate-600 cursor-pointer hover:bg-slate-200"
          onSelect={(event) => event.preventDefault()}
        >
          <CopyPlus className="shrink-0 h-4 w-4 mr-2" />
          <span>Add tasks from template</span>
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select a template</DialogTitle>
          <DialogDescription>
            Quickly populate your tasks by choosing from a variety of your
            defined templates.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col">
          {templates.length === 0 ? (
            <p className="text-sm text-slate-400 text-center">
              No template has been saved yet.
            </p>
          ) : (
            templates.map((template) => (
              <div
                key={template.id}
                className={cn(
                  buttonVariants({ variant: 'ghost' }),
                  'flex justify-between cursor-pointer'
                )}
                onClick={() => {
                  taskActions.addTasksFromTemplate(template.id);
                  taskActions.sortTasks(taskFilters.sort.value);
                }}
              >
                <span>{template.name}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="group/button shrink-0 h-8 w-8"
                  onClick={(event) => {
                    event.stopPropagation();
                    taskActions.deleteTemplate(template.id);
                  }}
                >
                  <Trash className="shrink-0 h-4 w-4 text-slate-400 group-hover/button:text-slate-900" />
                </Button>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
