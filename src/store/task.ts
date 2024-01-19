import { UniqueIdentifier } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { create } from 'zustand';

import { Task } from '@/lib/types';

type TaskState = {
  tasks: Task[];
  selectedTask: Task | null;
};

type TaskActions = {
  actions: {
    addTask: (
      name: Task['name'],
      estimation: Task['estimation'],
      decription?: Task['description']
    ) => void;
    selectTask: (task: Task) => void;
    toggleFinishedTask: (id: Task['id']) => void;
    moveTasks: (
      id: Task['id'] | UniqueIdentifier,
      destinationID: Task['id'] | UniqueIdentifier
    ) => void;
  };
};

const initialState: TaskState = {
  tasks: [],
  selectedTask: null,
};

const taskStore = create<TaskState & TaskActions>()((set) => ({
  ...initialState,
  actions: {
    addTask: (name, estimation, description) =>
      set((state) => ({
        tasks: [
          ...state.tasks,
          {
            id: crypto.randomUUID(),
            name,
            estimation,
            description,
            isFinished: false,
          },
        ],
      })),
    selectTask: (task) =>
      set((state) => ({
        selectedTask: task.isFinished ? state.selectedTask : task,
      })),
    toggleFinishedTask: (id) =>
      set((state) => {
        const nextTasks = state.tasks.map((task) => {
          if (task.id === id) {
            return {
              ...task,
              isFinished: !task.isFinished,
            };
          }

          return task;
        });

        const nextSelectedTaskIndex = nextTasks.findIndex(
          (task) => !task.isFinished
        );

        return {
          tasks: nextTasks,
          selectedTask: state.selectedTask
            ? nextTasks[nextSelectedTaskIndex]
            : null,
        };
      }),
    moveTasks: (id, destinationID) =>
      set((state) => {
        const taskIndex = state.tasks.findIndex((task) => task.id === id);
        const destinationTaskIndex = state.tasks.findIndex(
          (task) => task.id === destinationID
        );

        return {
          tasks: arrayMove(state.tasks, taskIndex, destinationTaskIndex),
        };
      }),
  },
}));

export const useTasks = () => taskStore((state) => state.tasks);
export const useSelectedTask = () => taskStore((state) => state.selectedTask);
export const useTaskActions = () => taskStore((state) => state.actions);
