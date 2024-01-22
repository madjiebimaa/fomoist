import { Apple, LucideIcon, Sprout, TreeDeciduous } from 'lucide-react';

import { PomodoroStep, Task, TaskPriority } from './types';

export const DEFAULT_TASK_ESTIMATION = 1;
export const DEFAULT_TASK_PRIORITY: Task['priority'] = 4;
export const DEFAULT_TASK_IS_FINISHED = false;
export const DEFAULT_TASK_ACTUAL = 0;

export const PRIORITIES: {
  label: string;
  value: TaskPriority;
  textColor: string;
  fillColor: string;
  borderColor: string;
}[] = [
  {
    label: 'P1',
    value: 1,
    textColor: 'text-red-400',
    fillColor: 'fill-red-400',
    borderColor: 'border-red-400',
  },
  {
    label: 'P2',
    value: 2,
    textColor: 'text-yellow-400',
    fillColor: 'fill-yellow-400',
    borderColor: 'border-yellow-400',
  },
  {
    label: 'P3',
    value: 3,
    textColor: 'text-blue-400',
    fillColor: 'fill-blue-400',
    borderColor: 'border-blue-400',
  },
  {
    label: 'Priority',
    value: 4,
    textColor: 'text-slate-400',
    fillColor: 'fill-transparent',
    borderColor: 'border-slate-400',
  },
];

export const POMODORO_STEPS: Record<
  PomodoroStep,
  { Icon: LucideIcon; duration: number }
> = {
  FOCUS: {
    Icon: Apple,
    duration: 1 * 60 * 1000,
  },
  SHORT_BREAK: {
    Icon: Sprout,
    duration: 5 * 60 * 1000,
  },
  LONG_BREAK: {
    Icon: TreeDeciduous,
    duration: 15 * 60 * 1000,
  },
};
