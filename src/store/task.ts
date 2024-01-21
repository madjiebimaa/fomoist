import { UniqueIdentifier } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { AddTaskParams, Task, TaskFilterSort, Template } from '@/lib/types';
import { alphabetComparison, createTask } from '@/lib/utils';

type TaskState = {
  tasks: Task[];
  selectedTask: Task | null;
  templates: Template[];
  filters: {
    sort: {
      value: TaskFilterSort;
    };
  };
};

type TaskActions = {
  actions: {
    addTask: (task: AddTaskParams) => void;
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
    addTemplate: (name: Template['name'], tasks: Task[]) => void;
    addTasksFromTemplate: (id: Template['id']) => void;
    deleteTemplate: (id: Template['id']) => void;
    sortTasks: (value: TaskFilterSort) => void;
  };
};

const initialState: TaskState = {
  tasks: [],
  selectedTask: null,
  templates: [],
  filters: {
    sort: {
      value: 'DATE_ADDED',
    },
  },
};

const taskStore = create<TaskState & TaskActions>()(
  persist(
    (set) => ({
      ...initialState,
      actions: {
        addTask: (task) =>
          set((state) => ({
            tasks: [...state.tasks, createTask(task)],
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
                selectedTaskIndex !== null
                  ? nextTasks[selectedTaskIndex]
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
        deleteFinishedTasks: () =>
          set((state) => ({
            tasks: state.tasks.filter((task) => !task.isFinished),
          })),
        deleteAllTasks: () => set({ tasks: initialState.tasks }),
        deleteTask: (id) =>
          set((state) => ({
            tasks: state.tasks.filter((task) => task.id !== id),
          })),
        editTask: (taskToEdit) =>
          set((state) => ({
            tasks: state.tasks.map((task) => {
              if (task.id === taskToEdit.id) {
                return taskToEdit;
              }

              return task;
            }),
          })),
        addTemplate: (name, tasks) =>
          set((state) => ({
            templates: [
              ...state.templates,
              {
                id: crypto.randomUUID(),
                name,
                tasks: tasks
                  .filter((task) => !task.isFinished)
                  .map((task) => createTask(task)),
                createdAt: new Date(),
              },
            ],
          })),
        addTasksFromTemplate: (id) =>
          set((state) => {
            const template = state.templates.find(
              (template) => template.id === id
            )!;

            return {
              tasks: [
                ...state.tasks,
                ...template.tasks.map((task) => createTask(task)),
              ],
            };
          }),
        deleteTemplate: (id) =>
          set((state) => ({
            templates: state.templates.filter((template) => template.id !== id),
          })),
        sortTasks: (value) =>
          set((state) => {
            let sortedTasks = state.tasks;
            switch (value) {
              case 'DATE_ADDED':
                sortedTasks = sortedTasks.sort(
                  (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
                );
                break;
              case 'NAME':
                sortedTasks = sortedTasks.sort((a, b) =>
                  alphabetComparison(a, b)
                );
                break;
              case 'PRIORITY':
                sortedTasks = sortedTasks.sort(
                  (a, b) => a.priority - b.priority
                );
                break;
            }

            return {
              filters: {
                sort: {
                  value,
                },
              },
              tasks: [...sortedTasks],
            };
          }),
      },
    }),
    {
      name: 'task-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        tasks: state.tasks,
        selectedTask: state.selectedTask,
        templates: state.templates,
      }),
    }
  )
);

export const useTasks = () => taskStore((state) => state.tasks);
export const useSelectedTask = () => taskStore((state) => state.selectedTask);
export const useTemplates = () => taskStore((state) => state.templates);
export const useTaskFilters = () => taskStore((state) => state.filters);
export const useTaskActions = () => taskStore((state) => state.actions);
