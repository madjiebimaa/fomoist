import { Check, Focus } from 'lucide-react';

import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

import { Task } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useSelectedTask, useTaskActions } from '@/store/task';

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  const selectedTask = useSelectedTask();
  const taskActions = useTaskActions();

  const isSelectedTask = selectedTask && selectedTask.id === task.id;

  const handleCheckClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    taskActions.toggleFinishedTask(task.id);
  };

  return (
    <Card
      className="border-none rounded-none shadow-none cursor-pointer"
      onClick={() => taskActions.selectTask(task)}
    >
      <CardContent className="relative flex flex-col p-0 py-2 border-b border-b-slate-200">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="group/check-button shrink-0 h-5 w-5 rounded-full hover:bg-transparent"
              onClick={handleCheckClick}
            >
              <Check
                className={cn(
                  'shrink-0 h-3 w-3 text-slate-400 opacity-0 group-hover/check-button:opacity-100 group-hover/check-button:transition-opacity group-hover/check-button:duration-300',
                  task.isFinished && 'opacity-100'
                )}
              />
            </Button>
            <span
              className={cn(
                'text-sm',
                task.isFinished && 'text-slate-400 line-through'
              )}
            >
              {task.name}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {isSelectedTask && (
              <Button
                variant="ghost"
                size="icon"
                className="group/button absolute -right-8 shrink-0 h-8 w-8"
              >
                <Focus className="shrink-0 h-4 w-4 text-slate-400 group-hover/button:text-slate-900" />
              </Button>
            )}
          </div>
        </div>
        <div className="flex items-center pl-7">
          <span className="text-xs text-slate-400">{task.estimation}</span>
        </div>
      </CardContent>
    </Card>
  );
}
