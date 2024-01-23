import { create } from 'zustand';

type LayoutState = {
  sidebarOpen: boolean;
};

type LayoutActions = {
  actions: {
    toggleSidebarOpen: () => void;
  };
};

const initialState: LayoutState = {
  sidebarOpen: false,
};

const layoutStore = create<LayoutState & LayoutActions>()((set) => ({
  ...initialState,
  actions: {
    toggleSidebarOpen: () =>
      set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  },
}));

export const useSidebarOpen = () => layoutStore((state) => state.sidebarOpen);
export const useLayoutActions = () => layoutStore((state) => state.actions);
