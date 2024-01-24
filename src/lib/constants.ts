import { Apple, LucideIcon, Sprout, TreeDeciduous } from 'lucide-react';

import {
  PomodoroSession,
  PomodoroStep,
  ProjectColor,
  Task,
  TaskPriority,
} from './types';

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
    duration: 25 * 60 * 1000,
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

export const DEFAULT_POMODORO_SESSION: PomodoroSession = new Map([
  ['FOCUS', 4],
  ['SHORT_BREAK', 3],
  ['LONG_BREAK', 1],
]);

export const PROJECT_COLORS: ProjectColor[] = [
  {
    name: 'Hyper',
    code: 'bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500',
  },
  {
    name: 'Oceanic',
    code: 'bg-gradient-to-r from-green-300 via-blue-500 to-purple-600',
  },
  {
    name: 'Cotton Candy',
    code: 'bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400',
  },
  {
    name: 'Gotham',
    code: 'bg-gradient-to-r from-gray-700 via-gray-900 to-black',
  },
  {
    name: 'Sunset',
    code: 'bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100',
  },
  {
    name: 'Mojave',
    code: 'bg-gradient-to-r from-yellow-100 via-yellow-300 to-yellow-500',
  },
  {
    name: 'Beachside',
    code: 'bg-gradient-to-r from-yellow-200 via-green-200 to-green-500',
  },
  {
    name: 'Gunmetal',
    code: 'bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600',
  },
  {
    name: 'Peachy',
    code: 'bg-gradient-to-r from-red-200 via-red-300 to-yellow-200',
  },
  {
    name: 'Seaform',
    code: 'bg-gradient-to-r from-green-200 via-green-300 to-blue-500',
  },
];
