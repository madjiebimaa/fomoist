import { zodResolver } from '@hookform/resolvers/zod';
import {
  ChevronDown,
  ChevronUp,
  Hourglass,
  SendHorizonal,
  X,
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from './ui/button';
import { Card, CardContent, CardFooter } from './ui/card';
import { Form, FormControl, FormField, FormItem } from './ui/form';
import { Input } from './ui/input';
import { Separator } from './ui/separator';
import { Textarea } from './ui/textarea';

import { useTaskActions } from '@/store/task';

const formSchema = z.object({
  name: z.string().min(1),
  estimation: z.number().min(1),
  description: z.string().optional(),
});

interface TaskFormProps {
  onClose: () => void;
}

export default function TaskForm({ onClose }: TaskFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      estimation: 1,
      description: '',
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

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const { name, estimation, description } = values;
    taskActions.addTask(name, estimation, description);
  };

  return (
    <Card className="shadow-md overflow-hidden">
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
                      className="p-0 border-none rounded-none font-medium focus-visible:ring-0 focus-visible:ring-offset-0"
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
                      className="h-fit min-h-fit p-0 border-none rounded-none font-light focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              variant="outline"
              size="sm"
              className="shrink-0 h-8 w-fit gap-2 font-normal text-slate-400"
            >
              <div className="flex items-center">
                <Hourglass className="shrink-0 h-4 w-4 mr-1" />
                <span className="text-slate-400">
                  {form.getValues('estimation')} Pomodoro Est
                </span>
              </div>
              <div className="flex items-center gap-1">
                <ChevronUp
                  className="shrink-0 h-4 w-4 text-slate-400 hover:text-slate-900"
                  onClick={handleIncreaseEstimationClick}
                />
                <ChevronDown
                  className="shrink-0 h-4 w-4 text-slate-400 hover:text-slate-900"
                  onClick={handleDecreaseEstimationClick}
                />
              </div>
            </Button>
          </form>
        </Form>
      </CardContent>
      <Separator />
      <CardFooter className="flex justify-end items-center gap-2 p-2">
        <Button
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
      </CardFooter>
    </Card>
  );
}
