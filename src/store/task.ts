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
  },
}));

export const useTasks = () => taskStore((state) => state.tasks);
export const useSelectedTask = () => taskStore((state) => state.selectedTask);
export const useTaskActions = () => taskStore((state) => state.actions);
