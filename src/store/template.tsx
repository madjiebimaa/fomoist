import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { Template } from '@/lib/types';
import { createTask } from '@/lib/utils';

type TemplateState = {
  templates: Template[];
};

type TemplateActions = {
  actions: {
    addTemplate: (name: Template['name'], tasks: Template['tasks']) => void;
  };
};

const initialState: TemplateState = {
  templates: [],
};

const templateStore = create<TemplateState & TemplateActions>()(
  persist(
    (set) => ({
      ...initialState,
      actions: {
        addTemplate: (name, tasks) =>
          set((state) => ({
            templates: [
              ...state.templates,
              {
                id: crypto.randomUUID(),
                name,
                tasks: tasks
                  .filter((task) => !task.isFinished)
                  .map((task) =>
                    createTask(task.name, task.estimation, task.description)
                  ),
              },
            ],
          })),
      },
    }),
    {
      name: 'template-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        templates: state.templates,
      }),
    }
  )
);

export const useTemplates = () => templateStore((state) => state.templates);
export const useTemplateActions = () => templateStore((state) => state.actions);
