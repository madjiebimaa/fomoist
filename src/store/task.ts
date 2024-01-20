import { UniqueIdentifier } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { AddTaskParams, Task, Template } from '@/lib/types';
import { createTask } from '@/lib/utils';

type TaskState = {
  tasks: Task[];
  selectedTask: Task | null;
  templates: Template[];
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
  };
};

const initialState: TaskState = {
  tasks: [],
  selectedTask: null,
  templates: [],
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
export const useTaskActions = () => taskStore((state) => state.actions);
