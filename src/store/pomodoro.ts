import { create } from 'zustand';

import { DEFAULT_POMODORO_SESSION, POMODORO_STEPS } from '@/lib/constants';
import { PomodoroStep } from '@/lib/types';

type PomodoroState = {
  selectedStep: PomodoroStep;
  duration: number;
  isRunning: boolean;
  session: PomodoroStep[];
};

type PomodoroActions = {
  actions: {
    decreaseDuration: () => void;
    startCountDown: () => void;
    stopCountDown: () => void;
    selectStep: (step: PomodoroStep) => void;
    nextStep: () => void;
  };
};

const initialState: PomodoroState = {
  selectedStep: 'FOCUS',
  duration: POMODORO_STEPS['FOCUS'].duration,
  isRunning: false,
  session: DEFAULT_POMODORO_SESSION,
};

const pomodoroStore = create<PomodoroState & PomodoroActions>()((set) => ({
  ...initialState,
  actions: {
    decreaseDuration: () =>
      set((state) => ({ duration: state.duration - 1000 })),
    startCountDown: () => set({ isRunning: true }),
    stopCountDown: () => set({ isRunning: false }),
    selectStep: (step) =>
      set({ selectedStep: step, duration: POMODORO_STEPS[step].duration }),
    nextStep: () =>
      set((state) => {
        let [, ...nextSession] = state.session;
        if (nextSession.length === 0) {
          nextSession = DEFAULT_POMODORO_SESSION;
        }

        const nextPomodoroStep = nextSession[0];

        return {
          selectedStep: nextPomodoroStep,
          duration: POMODORO_STEPS[nextPomodoroStep].duration,
          session: nextSession,
        };
      }),
  },
}));

export const useSelectedStep = () =>
  pomodoroStore((state) => state.selectedStep);
export const useDuration = () => pomodoroStore((state) => state.duration);
export const useIsRunning = () => pomodoroStore((state) => state.isRunning);
export const useSession = () => pomodoroStore((state) => state.session);
export const usePomodoroActions = () => pomodoroStore((state) => state.actions);
