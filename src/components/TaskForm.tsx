import { zodResolver } from '@hookform/resolvers/zod';
import { SendHorizonal, Trash, X } from 'lucide-react';
import React, { forwardRef } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import TaskEstimationButton from './TaskEstimationButton';
import TaskPriorityPopover from './TaskPriorityPopover';
import { Button } from './ui/button';
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
                        <TaskEstimationButton form={form} />
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
                        <TaskPriorityPopover form={form} />
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
