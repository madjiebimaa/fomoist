import { create } from 'zustand';

type PomodoroState = {
  duration: number;
  isRunning: boolean;
};

type PomodoroActions = {
  actions: {
    decreaseDuration: () => void;
    startCountDown: () => void;
    stopCountDown: () => void;
  };
};

const initialState: PomodoroState = {
  duration: 25 * 60 * 1000,
  isRunning: false,
};

const pomodoroStore = create<PomodoroState & PomodoroActions>()((set) => ({
  ...initialState,
  actions: {
    decreaseDuration: () =>
      set((state) => ({ duration: state.duration - 1000 })),
    startCountDown: () => set({ isRunning: true }),
    stopCountDown: () => set({ isRunning: false }),
  },
}));

export const useDuration = () => pomodoroStore((state) => state.duration);
export const useIsRunning = () => pomodoroStore((state) => state.isRunning);
export const usePomodoroActions = () => pomodoroStore((state) => state.actions);
