import { Flag, X } from 'lucide-react';
import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { Button, ButtonProps, buttonVariants } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

import { DEFAULT_TASK_PRIORITY, PRIORITIES } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface TaskPriorityPopoverProps {
  form: UseFormReturn<{
    priority: number;
    name: string;
    estimation: number;
    description?: string | undefined;
  }>;
}

export default function TaskPriorityPopover({
  form,
}: TaskPriorityPopoverProps) {
  const [open, setOpen] = useState(false);

  const selectedPriority = PRIORITIES.find(
    (priority) => priority.value === form.watch('priority')
  )!;

  const estimationButtonStyle: Pick<
    ButtonProps,
    'variant' | 'size' | 'className'
  > = {
    variant: 'ghost',
    size: 'icon',
    className: 'shrink-0 h-fit w-fit',
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild onClick={(event) => event.preventDefault()}>
        <div
          className={cn(
            buttonVariants({
              variant: 'outline',
              size: 'sm',
            }),
            'shrink-0 h-8 w-fit font-normal text-slate-400 cursor-pointer'
          )}
          onClick={() => setOpen(true)}
        >
          <Flag
            className={cn(
              'shrink-0 h-4 w-4 mr-1',
              selectedPriority.textColor,
              selectedPriority.fillColor
            )}
          />
          <span className="text-slate-400">{selectedPriority.label}</span>
          {selectedPriority.value !== DEFAULT_TASK_PRIORITY && (
            <Button
              type="button"
              variant={estimationButtonStyle.variant}
              size={estimationButtonStyle.size}
              className={cn(estimationButtonStyle.className, 'ml-1')}
              onClick={(event) => {
                event.stopPropagation();
                form.setValue('priority', DEFAULT_TASK_PRIORITY);
                setOpen(false);
              }}
            >
              <X className="shrink-0 h-4 w-4 text-slate-400 hover:text-slate-900" />
            </Button>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-2 w-fit">
        {PRIORITIES.map((priority) => (
          <Button
            key={priority.value}
            type="button"
            variant="ghost"
            size="sm"
            className={cn('shrink-0')}
            onClick={() => {
              form.setValue('priority', priority.value);
              setOpen(false);
            }}
          >
            <Flag
              className={cn(
                'shrink-0 h-4 w-4 mr-1',
                priority.textColor,
                priority.fillColor
              )}
            />
            <span className="font-normal text-sm text-slate-900">
              Priority {priority.value}
            </span>
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  );
}
