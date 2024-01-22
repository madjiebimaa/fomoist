import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Check, Focus, GripVertical, PenLine, StickyNote } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import TaskForm from './TaskForm';
import { Button, ButtonProps } from './ui/button';
import { Card, CardContent } from './ui/card';

import { PRIORITIES } from '@/lib/constants';
import { Task } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useSelectedTask, useTaskActions } from '@/store/task';

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const selectedTask = useSelectedTask();
  const taskActions = useTaskActions();

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: 'Task Card',
      task,
    },
  });

  const isSelectedTask = selectedTask && selectedTask.id === task.id;
  const selectedPriority = PRIORITIES.find(
    (priority) => priority.value === task.priority
  )!;

  const handleCheckClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    taskActions.toggleFinishedTask(task.id);
  };

  const handleEditClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsTaskFormOpen(true);
  };

  const handleNoteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    toast(task.name, {
      description: task.description,
    });
  };

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="h-[65px] bg-white border-2 border-dashed border-slate-200"
      />
    );
  }

  const hiddenButtonStyle: Pick<ButtonProps, 'variant' | 'size' | 'className'> =
    {
      variant: 'ghost',
      size: 'icon',
      className:
        'group/button shrink-0 h-8 w-8 opacity-0 invisible group-hover/task-card:opacity-100 group-hover/task-card:visible group-hover/task-card:transition-opacity group-hover/task-card:duration-300',
    };

  const hiddenButtonIconStyle = {
    className:
      'shrink-0 h-4 w-4 text-slate-400 group-hover/button:text-slate-900',
  };

  return isTaskFormOpen ? (
    <TaskForm
      task={task}
      onClose={() => setIsTaskFormOpen(false)}
      className="my-2"
    />
  ) : (
    <Card
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="group/task-card border-none rounded-none shadow-none cursor-pointer touch-none select-none"
      onClick={() => taskActions.selectTask(task)}
    >
      <CardContent className="relative flex flex-col p-0 py-2 border-b border-b-slate-200">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Button
              variant={hiddenButtonStyle.variant}
              size={hiddenButtonStyle.size}
              className={cn(
                hiddenButtonStyle.className,
                'absolute -left-8 cursor-move'
              )}
            >
              <GripVertical className={cn(hiddenButtonIconStyle.className)} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className={cn(
                'group/check-button shrink-0 h-5 w-5 rounded-full hover:bg-transparent',
                selectedPriority.borderColor
              )}
              onClick={handleCheckClick}
            >
              <Check
                className={cn(
                  'shrink-0 h-3 w-3 text-slate-400 opacity-0 group-hover/check-button:opacity-100 group-hover/check-button:transition-opacity group-hover/check-button:duration-300',
                  task.isFinished && 'opacity-100',
                  selectedPriority.textColor
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
          <div className="flex items-center">
            {task.description && (
              <Button
                variant={hiddenButtonStyle.variant}
                size={hiddenButtonStyle.size}
                className={cn(hiddenButtonStyle.className)}
                onClick={handleNoteClick}
              >
                <StickyNote className={cn(hiddenButtonIconStyle.className)} />
              </Button>
            )}
            <Button
              variant={hiddenButtonStyle.variant}
              size={hiddenButtonStyle.size}
              className={cn(hiddenButtonStyle.className)}
              onClick={handleEditClick}
            >
              <PenLine className={cn(hiddenButtonIconStyle.className)} />
            </Button>
            {isSelectedTask && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute -right-8 shrink-0 h-8 w-8"
                disabled
              >
                <Focus className="shrink-0 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
        <div className="flex items-center pl-7">
          <div className="text-xs text-slate-400">
            <span className="text-sm font-medium">{task.actual}</span>
            {' / '}
            <span>{task.estimation}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
