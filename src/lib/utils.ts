import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import {
  DEFAULT_POMODORO_SESSION,
  DEFAULT_TASK_ACTUAL,
  DEFAULT_TASK_IS_FINISHED,
  DEFAULT_TASK_PRIORITY,
  POMODORO_STEPS,
} from './constants';
import {
  CreateTaskParams,
  PomodoroSession,
  PomodoroStep,
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
    actual: DEFAULT_TASK_ACTUAL,
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

export function millisecondsToTime(milliseconds: number) {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  return {
    seconds: seconds % 60,
    minutes: minutes % 60,
    hours: hours % 24,
  };
}

export function toTwoDigits(num: number) {
  return num.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
}

export function applyPomodoroStepRules(
  selectedStep: PomodoroStep,
  session: PomodoroSession
) {
  let nextPomodoroStep = selectedStep;
  let nextPomodoroSession = session;

  if (selectedStep === 'FOCUS') {
    if (session.get('FOCUS') === 0) {
      nextPomodoroStep = 'LONG_BREAK';
    } else {
      nextPomodoroStep = 'SHORT_BREAK';
    }
  }

  if (selectedStep === 'SHORT_BREAK') {
    nextPomodoroStep = 'FOCUS';
  }

  if (selectedStep === 'LONG_BREAK' && session.get('LONG_BREAK') === 0) {
    nextPomodoroStep = 'FOCUS';
    nextPomodoroSession = new Map(DEFAULT_POMODORO_SESSION);
  }

  return { nextPomodoroStep, nextPomodoroSession };
}

export function getTotalActual(tasks: Task[]) {
  return tasks.reduce((total, task) => total + task.actual, 0);
}

export function getTotalEstimation(tasks: Task[]) {
  return tasks.reduce((total, task) => total + task.estimation, 0);
}

export function getTotalDuration(tasks: Task[]) {
  const totalEstimation = getTotalEstimation(tasks);

  const [focusDuration, shortBreakDuration, longBreakDuration] = Object.entries(
    POMODORO_STEPS
  ).map(([, step]) => step.duration);

  const focusTotal = Math.floor(totalEstimation) * focusDuration;
  const shortBreakTotal =
    (totalEstimation - Math.floor(totalEstimation / 4)) * shortBreakDuration;
  const longBreakTotal = Math.floor(totalEstimation / 4) * longBreakDuration;

  return focusTotal + shortBreakTotal + longBreakTotal;
}
