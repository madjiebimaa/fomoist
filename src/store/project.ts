import { create } from 'zustand';

import { Project } from '@/lib/types';

type ProjectState = {
  projects: Project[];
};

type ProjectActions = {
  actions: {
    addProject: (project: Omit<Project, 'id' | 'createdAt'>) => void;
  };
};

const initialState: ProjectState = {
  projects: [],
};

const projectStore = create<ProjectState & ProjectActions>()((set) => ({
  ...initialState,
  actions: {
    addProject: (project) =>
      set((state) => ({
        projects: [
          ...state.projects,
          {
            ...project,
            id: crypto.randomUUID(),
            createdAt: new Date(),
          },
        ],
      })),
  },
}));

export const useProjects = () => projectStore((state) => state.projects);
export const useProjectActions = () => projectStore((state) => state.actions);
