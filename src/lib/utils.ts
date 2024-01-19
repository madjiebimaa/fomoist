import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { Task } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createTask(
  name: Task['name'],
  estimation: Task['estimation'],
  description?: Task['description']
): Task {
  return {
    id: crypto.randomUUID(),
    name,
    estimation,
    description,
    isFinished: false,
  };
}
