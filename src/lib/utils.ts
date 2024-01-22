import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { DEFAULT_TASK_IS_FINISHED, DEFAULT_TASK_PRIORITY } from './constants';
import {
  CreateTaskParams,
  Task,
  TaskFilterSort,
  TaskFilterSortDirection,
} from './types';

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

export function alphabetComparison(a: Task, b: Task) {
  return a.name.localeCompare(b.name, 'en', {
    ignorePunctuation: true,
  });
}

export function applySortToTasks({
  value,
  direction,
  tasks,
}: {
  value: TaskFilterSort;
  direction: TaskFilterSortDirection;
  tasks: Task[];
}) {
  const directionNumber = direction === 'ASCENDING' ? 1 : -1;

  switch (value) {
    case 'DATE_ADDED':
      tasks = tasks.sort(
        (a, b) =>
          (a.createdAt.getTime() - b.createdAt.getTime()) * directionNumber
      );
      break;
    case 'NAME':
      tasks = tasks.sort((a, b) => alphabetComparison(a, b) * directionNumber);
      break;
    case 'PRIORITY':
      tasks = tasks.sort((a, b) => (a.priority - b.priority) * directionNumber);
      break;
  }

  return tasks;
}

export function toggleFinishedTaskValue(id: Task['id'], tasks: Task[]) {
  return tasks.map((task) => {
    if (task.id === id) {
      return {
        ...task,
        isFinished: !task.isFinished,
      };
    }

    return task;
  });
}

export function pushTask(id: Task['id'], tasks: Task[]) {
  const taskToPush = tasks.find((task) => task.id === id)!;
  if (taskToPush.isFinished) {
    return [...tasks.filter((task) => task.id !== taskToPush.id), taskToPush];
  }

  return tasks;
}

export function getFirstUnfinishedTaskIndex(tasks: Task[]): number | null {
  let unfinishedTaskIndex: number | null = null;
  tasks.every((task, index) => {
    if (!task.isFinished) {
      unfinishedTaskIndex = index;
      return false;
    }

    return true;
  });

  return unfinishedTaskIndex;
}

export function getTimeUnits(duration: number) {
  const minutes = Math.floor((duration % (60 * 60 * 1000)) / (60 * 1000));
  const seconds = Math.floor((duration % (60 * 1000)) / 1000);
  return { minutes, seconds };
}

export function toTwoDigits(num: number) {
  return num.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
}
