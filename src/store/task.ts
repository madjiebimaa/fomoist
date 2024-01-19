import { Task } from '@/lib/types';
import { create } from 'zustand';

type TaskState = {
  tasks: Task[];
};

type TaskActions = {
  actions: {
    addTask: (
      name: Task['name'],
      estimation: Task['estimation'],
      decription?: Task['description']
    ) => void;
  };
};

const initialState: TaskState = {
  tasks: [],
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
  },
}));

export const useTasks = () => taskStore((state) => state.tasks);
export const useTaskActions = () => taskStore((state) => state.actions);
