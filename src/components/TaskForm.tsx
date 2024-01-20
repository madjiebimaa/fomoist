import { zodResolver } from '@hookform/resolvers/zod';
import {
  ChevronDown,
  ChevronUp,
  Flag,
  Hourglass,
  SendHorizonal,
  Trash,
  X,
} from 'lucide-react';
import React, { forwardRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button, ButtonProps, buttonVariants } from './ui/button';
import { Card, CardContent, CardFooter } from './ui/card';
import { Form, FormControl, FormField, FormItem } from './ui/form';
import { Input } from './ui/input';
import { Separator } from './ui/separator';
import { Textarea } from './ui/textarea';

import {
  DEFAULT_TASK_ESTIMATION,
  DEFAULT_TASK_PRIORITY,
} from '@/lib/constants';
import { Task, TaskPriority } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useTaskActions } from '@/store/task';
import { PopoverTrigger } from '@radix-ui/react-popover';
import { Popover, PopoverContent } from './ui/popover';

const formSchema = z.object({
  name: z.string().min(1),
  estimation: z.number().min(1).default(DEFAULT_TASK_ESTIMATION),
  priority: z.number().default(DEFAULT_TASK_PRIORITY),
  description: z.string().optional(),
});

interface TaskFormProps extends React.HTMLAttributes<HTMLDivElement> {
  task?: Task;
  onClose: () => void;
}

export const TaskForm = forwardRef<HTMLDivElement, TaskFormProps>(
  ({ task, onClose, className, ...props }, ref) => {
    const [open, setOpen] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        name: task ? task.name : '',
        estimation: task ? task.estimation : DEFAULT_TASK_ESTIMATION,
        priority: task ? task.priority : DEFAULT_TASK_PRIORITY,
        description: task && task.description ? task.description : '',
      },
    });

    const taskActions = useTaskActions();

    const handleIncreaseEstimationClick = () => {
      form.setValue('estimation', form.getValues('estimation') + 1);
    };

    const handleDecreaseEstimationClick = () => {
      const estimation = form.getValues('estimation');
      if (estimation > 1) {
        form.setValue('estimation', form.getValues('estimation') - 1);
      }
    };

    const handleKeyDown = (
      event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const onSubmit = (values: z.infer<typeof formSchema>) => {
      const { name, estimation, description, priority } = values;
      if (task) {
        taskActions.editTask({
          id: task.id,
          name,
          estimation,
          isFinished: task.isFinished,
          description,
          priority: priority as TaskPriority,
        });

        onClose();
      } else {
        taskActions.addTask({
          name,
          estimation,
          description,
          priority: priority as TaskPriority,
        });
      }

      form.reset();
    };

    const fieldStyle = {
      className:
        'p-0 border-none rounded-none font-medium focus-visible:ring-0 focus-visible:ring-offset-0',
    };

    const estimationButtonStyle: Pick<
      ButtonProps,
      'variant' | 'size' | 'className'
    > = {
      variant: 'ghost',
      size: 'icon',
      className: 'shrink-0 h-fit w-fit',
    };

    const priorities: {
      label: string;
      value: TaskPriority;
      textColor: string;
      fillColor: string;
    }[] = [
      {
        label: 'P1',
        value: 1,
        textColor: 'text-red-400',
        fillColor: 'fill-red-400',
      },
      {
        label: 'P2',
        value: 2,
        textColor: 'text-yellow-400',
        fillColor: 'fill-yellow-400',
      },
      {
        label: 'P3',
        value: 3,
        textColor: 'text-blue-400',
        fillColor: 'fill-blue-400',
      },
      {
        label: 'Priority',
        value: 4,
        textColor: 'text-slate-400',
        fillColor: 'fill-transparent',
      },
    ];

    const selectedPriority = priorities.find(
      (priority) => priority.value === form.watch('priority')
    )!;

    return (
      <Card
        ref={ref}
        className={cn('shadow-md overflow-hidden', className)}
        {...props}
      >
        <CardContent className="p-2">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-2"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        autoFocus
                        autoComplete="off"
                        placeholder="Task name"
                        className={cn(fieldStyle.className)}
                        onKeyDown={handleKeyDown}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Description"
                        className={cn(
                          fieldStyle.className,
                          'h-fit min-h-fit font-light'
                        )}
                        onKeyDown={handleKeyDown}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="flex flex-col md:flex-row md:items-center gap-2">
                <FormField
                  control={form.control}
                  name="estimation"
                  render={() => (
                    <FormItem>
                      <FormControl>
                        <div
                          className={cn(
                            buttonVariants({ variant: 'outline', size: 'sm' }),
                            'shrink-0 h-8 w-fit gap-3 font-normal text-slate-400'
                          )}
                        >
                          <div className="flex items-center">
                            <Hourglass className="shrink-0 h-4 w-4 mr-1" />
                            <span className="flex items-center text-slate-400">
                              <span className="grid place-content-center min-h-4 min-w-4 mr-1">
                                {form.getValues('estimation')}
                              </span>
                              Pomodoro Est
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              type="button"
                              variant={estimationButtonStyle.variant}
                              size={estimationButtonStyle.size}
                              className={cn(estimationButtonStyle.className)}
                            >
                              <ChevronUp
                                className="shrink-0 h-4 w-4 text-slate-400 hover:text-slate-900"
                                onClick={handleIncreaseEstimationClick}
                              />
                            </Button>
                            <Button
                              type="button"
                              variant={estimationButtonStyle.variant}
                              size={estimationButtonStyle.size}
                              className={cn(estimationButtonStyle.className)}
                            >
                              <ChevronDown
                                className="shrink-0 h-4 w-4 text-slate-400 hover:text-slate-900"
                                onClick={handleDecreaseEstimationClick}
                              />
                            </Button>
                          </div>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="priority"
                  render={() => (
                    <FormItem>
                      <FormControl>
                        <Popover open={open} onOpenChange={setOpen}>
                          <PopoverTrigger
                            asChild
                            onClick={(event) => event.preventDefault()}
                          >
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
                              <span className="text-slate-400">
                                {selectedPriority.label}
                              </span>
                              {selectedPriority.value !==
                                DEFAULT_TASK_PRIORITY && (
                                <Button
                                  type="button"
                                  variant={estimationButtonStyle.variant}
                                  size={estimationButtonStyle.size}
                                  className={cn(
                                    estimationButtonStyle.className,
                                    'ml-1'
                                  )}
                                >
                                  <X
                                    className="shrink-0 h-4 w-4 text-slate-400 hover:text-slate-900"
                                    onClick={(event) => {
                                      event.stopPropagation();
                                      form.setValue(
                                        'priority',
                                        DEFAULT_TASK_PRIORITY
                                      );
                                      setOpen(false);
                                    }}
                                  />
                                </Button>
                              )}
                            </div>
                          </PopoverTrigger>
                          <PopoverContent className="flex flex-col gap-2 w-fit">
                            {priorities.map((priority) => (
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
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </CardContent>
        <Separator />
        <CardFooter className="flex justify-between items-center p-2">
          {task && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="shrink-0 h-8 w-8"
              onClick={() => taskActions.deleteTask(task.id)}
            >
              <Trash className="shrink-0 h-4 w-4 text-rose-500" />
            </Button>
          )}
          <div className="flex items-center gap-2 ml-auto">
            <Button
              type="button"
              variant="secondary"
              size="icon"
              className="shrink-0 h-8 w-8"
              onClick={onClose}
            >
              <X className="shrink-0 h-4 w-4" />
            </Button>
            <Button
              type="submit"
              size="icon"
              className="shrink-0 h-8 w-8"
              disabled={!form.formState.isValid}
              onClick={form.handleSubmit(onSubmit)}
            >
              <SendHorizonal className="shrink-0 h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    );
  }
);

export default TaskForm;
