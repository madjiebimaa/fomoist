import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

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

const layoutStore = create<LayoutState & LayoutActions>()(
  persist(
    (set) => ({
      ...initialState,
      actions: {
        toggleSidebarOpen: () =>
          set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      },
    }),
    {
      name: 'layout-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        sidebarOpen: state.sidebarOpen,
      }),
    }
  )
);

export const useSidebarOpen = () => layoutStore((state) => state.sidebarOpen);
export const useLayoutActions = () => layoutStore((state) => state.actions);
