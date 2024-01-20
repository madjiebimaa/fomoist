import { zodResolver } from '@hookform/resolvers/zod';
import { SaveAll, SendHorizonal } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { DropdownMenuItem } from './ui/dropdown-menu';
import { Form, FormControl, FormField, FormItem } from './ui/form';
import { Input } from './ui/input';

import { useTaskActions, useTasks } from '@/store/task';

const formSchema = z.object({
  name: z.string().min(1),
});

export default function TemplateFormDialog() {
  const [open, setOpen] = useState(false);
  const tasks = useTasks();
  const taskActions = useTaskActions();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const { name } = values;
    taskActions.addTemplate(name, tasks);
    form.reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem
          className="text-slate-600 cursor-pointer hover:bg-slate-200"
          onSelect={(event) => event.preventDefault()}
        >
          <SaveAll className="shrink-0 h-4 w-4 mr-2" />
          <span>Save as template</span>
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Save template</DialogTitle>
          <DialogDescription>
            Create a custom template by saving the current tasks.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col"
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
                      placeholder="Name this template"
                      className="p-0 border-none rounded-none font-medium focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter className="flex flex-row justify-end items-center gap-2 sm:space-x-0">
          <Button
            type="submit"
            size="icon"
            className="shrink-0 h-8 w-8"
            disabled={!form.formState.isValid}
            onClick={form.handleSubmit(onSubmit)}
          >
            <SendHorizonal className="shrink-0 h-4 w-4" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
