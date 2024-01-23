import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { DEFAULT_POMODORO_SESSION, POMODORO_STEPS } from '@/lib/constants';
import { PomodoroSession, PomodoroStep } from '@/lib/types';
import { applyPomodoroStepRules } from '@/lib/utils';

type PomodoroState = {
  selectedStep: PomodoroStep;
  duration: number;
  isRunning: boolean;
  session: PomodoroSession;
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
  session: new Map(DEFAULT_POMODORO_SESSION),
};

const pomodoroStore = create<PomodoroState & PomodoroActions>()(
  persist(
    (set) => ({
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
            state.session.set(
              state.selectedStep,
              state.session.get(state.selectedStep)! - 1
            );

            const { nextPomodoroStep, nextPomodoroSession } =
              applyPomodoroStepRules(state.selectedStep, state.session);

            return {
              selectedStep: nextPomodoroStep,
              duration: POMODORO_STEPS[nextPomodoroStep].duration,
              session: nextPomodoroSession,
            };
          }),
      },
    }),
    {
      name: 'pomodoro-storage',
      storage: createJSONStorage(() => localStorage, {
        reviver: (key, value) => {
          if (key === 'session' && typeof value === 'string') {
            return new Map(Object.entries(JSON.parse(value)));
          }

          return value;
        },
        replacer: (key, value) => {
          if (key === 'session' && value instanceof Map) {
            return JSON.stringify(Object.fromEntries(value.entries()));
          }

          return value;
        },
      }),
      partialize: (state) => ({
        selectedStep: state.selectedStep,
        duration: state.duration,
        isRunning: state.isRunning,
        session: state.session,
      }),
    }
  )
);

export const useSelectedStep = () =>
  pomodoroStore((state) => state.selectedStep);
export const useDuration = () => pomodoroStore((state) => state.duration);
export const useIsRunning = () => pomodoroStore((state) => state.isRunning);
export const usePomodoroActions = () => pomodoroStore((state) => state.actions);
