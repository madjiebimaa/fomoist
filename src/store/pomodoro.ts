import { create } from 'zustand';

import { POMODORO_STEPS } from '@/lib/constants';
import { PomodoroStep } from '@/lib/types';

type PomodoroState = {
  selectedStep: PomodoroStep;
  duration: number;
  isRunning: boolean;
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
        let nextPomodoroStep = state.selectedStep;
        switch (state.selectedStep) {
          case 'FOCUS':
            nextPomodoroStep = 'SHORT_BREAK';
            break;
          case 'SHORT_BREAK':
            nextPomodoroStep = 'LONG_BREAK';
            break;
          case 'LONG_BREAK':
            nextPomodoroStep = 'FOCUS';
            break;
        }

        return {
          selectedStep: nextPomodoroStep,
          duration: POMODORO_STEPS[nextPomodoroStep].duration,
        };
      }),
  },
}));

export const useSelectedStep = () =>
  pomodoroStore((state) => state.selectedStep);
export const useDuration = () => pomodoroStore((state) => state.duration);
export const useIsRunning = () => pomodoroStore((state) => state.isRunning);
export const usePomodoroActions = () => pomodoroStore((state) => state.actions);
