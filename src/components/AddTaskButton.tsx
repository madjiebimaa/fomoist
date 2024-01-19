import { PlusCircle } from 'lucide-react';
import { useState } from 'react';

import TaskForm from './TaskForm';
import { Button } from './ui/button';

export default function AddTaskButton() {
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);

  return isTaskFormOpen ? (
    <TaskForm onClose={() => setIsTaskFormOpen(false)} />
  ) : (
    <Button
      className="group/add-task-button py-8 border-2 border-dashed border-slate-400 bg-slate-200 rounded-none shadow-md hover:bg-white hover:border-rose-700"
      onClick={() => setIsTaskFormOpen(true)}
    >
      <PlusCircle className="shrink-0 h-6 w-6 mr-2 fill-slate-400 text-slate-200 group-hover/add-task-button:fill-rose-700 group-hover/add-task-button:text-white" />
      <span className="font-bold text-lg text-slate-400 group-hover/add-task-button:text-rose-700">
        Add Task
      </span>
    </Button>
  );
}
