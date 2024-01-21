import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { DEFAULT_TASK_IS_FINISHED, DEFAULT_TASK_PRIORITY } from './constants';
import { CreateTaskParams, Task, TaskPriority } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createTask({
  name,
  estimation,
  description,
  priority,
}: CreateTaskParams): Task {
  return {
    id: crypto.randomUUID(),
    name,
    estimation,
    isFinished: DEFAULT_TASK_IS_FINISHED,
    description,
    priority: priority ?? DEFAULT_TASK_PRIORITY,
    createdAt: new Date(),
  };
}

export function getTaskColor(priority: TaskPriority) {
  switch (priority) {
    case 1:
      return 'red-400';
    case 2:
      return 'yellow-400';
    case 3:
      return 'blue-400';
    case 4:
      return 'slate-400';
  }
}

export function alphabetComparison(a: Task, b: Task) {
  return a.name.localeCompare(b.name, 'en', {
    ignorePunctuation: true,
  });
}
