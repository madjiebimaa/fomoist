import { PlayCircle, StopCircle } from 'lucide-react';
import { useEffect } from 'react';

import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

import { POMODORO_STEPS } from '@/lib/constants';
import { PomodoroStep } from '@/lib/types';
import { getTimeUnits, toTwoDigits } from '@/lib/utils';
import {
  useDuration,
  useIsRunning,
  usePomodoroActions,
  useSelectedStep,
} from '@/store/pomodoro';
import { useTaskActions } from '@/store/task';

export default function CountDown() {
  const selectedStep = useSelectedStep();
  const duration = useDuration();
  const isRunning = useIsRunning();
  const pomodoroActions = usePomodoroActions();
  const taskActions = useTaskActions();

  const { minutes, seconds } = getTimeUnits(duration);
  const formattedDuration = `${toTwoDigits(minutes)}:${toTwoDigits(seconds)}`;
  const Icon = isRunning ? StopCircle : PlayCircle;

  useEffect(() => {
    const countDown = setInterval(() => {
      if (isRunning && duration > 0) {
        pomodoroActions.decreaseDuration();
      }

      if (duration === 0) {
        if (selectedStep === 'FOCUS') {
          taskActions.increaseTaskActual();
        }

        pomodoroActions.nextStep();
      }
    }, 1000);

    return () => clearInterval(countDown);
  }, [selectedStep, duration, isRunning, pomodoroActions, taskActions]);

  const handleCountDownClick = () => {
    isRunning
      ? pomodoroActions.stopCountDown()
      : pomodoroActions.startCountDown();
  };

  const pomodoroSteps = Object.entries(POMODORO_STEPS).map(([key, value]) => ({
    id: key,
    Icon: value.Icon,
  }));

  return (
    <Card className="rounded-none border-2 border-slate-400 bg-slate-200 shadow-md">
      <CardContent className="flex flex-col justify-center items-center gap-4 p-2 md:p-4">
        <div className="flex flex-row justify-center items-center gap-2">
          {pomodoroSteps.map(({ id, Icon }) => (
            <Button
              key={id}
              variant="secondary"
              size="sm"
              className="text-xs text-slate-400"
              onClick={() => pomodoroActions.selectStep(id as PomodoroStep)}
            >
              <Icon className="shrink-0 h-4 w-4" />
            </Button>
          ))}
        </div>
        <div className="flex flex-col justify-center items-center gap-2 md:order-1">
          <p className="font-bold text-7xl md:text-9xl text-slate-400 text-center">
            {formattedDuration}
          </p>
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 h-fit w-fit hover:bg-transparent"
            onClick={handleCountDownClick}
          >
            <Icon className="shrink-0 h-16 md:h-20 w-16 md:w-20 text-slate-400" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
