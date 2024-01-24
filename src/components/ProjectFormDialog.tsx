import { zodResolver } from '@hookform/resolvers/zod';
import { PlusCircle, SendHorizonal } from 'lucide-react';
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
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

import { PROJECT_COLORS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useProjectActions } from '@/store/project';

const formSchema = z.object({
  name: z.string().min(1),
  colorName: z.string().min(1).default(PROJECT_COLORS[0].name),
});

export default function ProjectFormDialog() {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      colorName: PROJECT_COLORS[0].name,
    },
  });

  const projectActions = useProjectActions();

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const { name, colorName } = values;
    const color = PROJECT_COLORS.find(
      (projectColor) => projectColor.name === colorName
    )!;
    projectActions.addProject({
      name,
      color: {
        name: colorName,
        code: color.code,
      },
    });
    form.reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="group/add-task-button w-full py-8 border-2 border-dashed border-slate-400 bg-slate-200 rounded-none shadow-md hover:bg-white hover:border-rose-700">
          <PlusCircle className="shrink-0 h-6 w-6 mr-2 fill-slate-400 text-slate-200 group-hover/add-task-button:fill-rose-700 group-hover/add-task-button:text-white" />
          <span className="font-bold text-lg text-slate-400 group-hover/add-task-button:text-rose-700">
            Add Project
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Project</DialogTitle>
          <DialogDescription>
            Enter the details below to add a new project.
          </DialogDescription>
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
                        placeholder="Name this project"
                        className="p-0 border-none rounded-none font-medium focus-visible:ring-0 focus-visible:ring-offset-0"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="colorName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Color</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a color" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {PROJECT_COLORS.map((projectColor) => (
                          <SelectItem
                            key={projectColor.name}
                            value={projectColor.name}
                          >
                            <div className="flex items-center gap-2">
                              <div
                                className={cn(
                                  'h-4 w-4 rounded-full',
                                  projectColor.code
                                )}
                              />
                              <span>{projectColor.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </DialogHeader>
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
