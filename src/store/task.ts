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
    deleteFinishedTasks: () => void;
    deleteAllTasks: () => void;
    deleteTask: (id: Task['id']) => void;
    editTask: (taskToEdit: Task) => void;
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
        let nextTasks = state.tasks;
        nextTasks = nextTasks.map((task) => {
          if (task.id === id) {
            return {
              ...task,
              isFinished: !task.isFinished,
            };
          }

          return task;
        });

        const taskToPush = nextTasks.find((task) => task.id)!;
        if (taskToPush.isFinished) {
          nextTasks = [
            ...nextTasks.filter((task) => task.id !== taskToPush.id),
            taskToPush,
          ];
        }

        let selectedTaskIndex: number | null = null;
        nextTasks.every((task, index) => {
          if (!task.isFinished) {
            selectedTaskIndex = index;
            return false;
          }

          return true;
        });

        return {
          tasks: nextTasks,
          selectedTask:
            selectedTaskIndex !== null ? nextTasks[selectedTaskIndex] : null,
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
    deleteFinishedTasks: () =>
      set((state) => ({
        tasks: state.tasks.filter((task) => !task.isFinished),
      })),
    deleteAllTasks: () => set({ tasks: initialState.tasks }),
    deleteTask: (id) =>
      set((state) => ({ tasks: state.tasks.filter((task) => task.id !== id) })),
    editTask: (taskToEdit) =>
      set((state) => ({
        tasks: state.tasks.map((task) => {
          if (task.id === taskToEdit.id) {
            return taskToEdit;
          }

          return task;
        }),
      })),
  },
}));

export const useTasks = () => taskStore((state) => state.tasks);
export const useSelectedTask = () => taskStore((state) => state.selectedTask);
export const useTaskActions = () => taskStore((state) => state.actions);
