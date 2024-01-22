import { PlayCircle, SkipForward, StopCircle } from 'lucide-react';
import { useEffect } from 'react';

import { Button, ButtonProps } from './ui/button';
import { Card, CardContent } from './ui/card';

import { POMODORO_STEPS } from '@/lib/constants';
import { PomodoroStep } from '@/lib/types';
import { cn, millisecondsToTime, toTwoDigits } from '@/lib/utils';
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

  const { minutes, seconds } = millisecondsToTime(duration);
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

  const handleStepClick = (id: PomodoroStep) => {
    pomodoroActions.stopCountDown();
    setTimeout(() => {
      pomodoroActions.selectStep(id);
      pomodoroActions.startCountDown();
    }, 500);
  };

  const handleCountDownClick = () => {
    isRunning
      ? pomodoroActions.stopCountDown()
      : pomodoroActions.startCountDown();
  };

  const handleSkipStepClick = () => {
    pomodoroActions.stopCountDown();
    setTimeout(() => {
      pomodoroActions.nextStep();
      pomodoroActions.startCountDown();
    }, 500);
  };

  const pomodoroSteps = Object.entries(POMODORO_STEPS).map(([key, value]) => ({
    id: key,
    Icon: value.Icon,
  }));

  const countDownButtonStyle: ButtonProps = {
    variant: 'ghost',
    size: 'icon',
    className: 'shrink-0 h-20 md:h-30 w-20 md:w-30 hover:bg-transparent',
  };

  const countDownButtonIconStyle = {
    className: 'shrink-0 h-16 md:h-20 w-16 md:w-20 text-slate-400',
  };

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
              onClick={() => handleStepClick(id as PomodoroStep)}
            >
              <Icon className="shrink-0 h-4 w-4" />
            </Button>
          ))}
        </div>
        <div className="flex flex-col justify-center items-center gap-2 md:order-1">
          <p className="font-bold text-7xl md:text-9xl text-slate-400 text-center">
            {formattedDuration}
          </p>
          <div className="relative flex justify-center items-center">
            <Button
              variant={countDownButtonStyle.variant}
              size={countDownButtonStyle.size}
              className={cn(countDownButtonStyle.className)}
              onClick={handleCountDownClick}
            >
              <Icon className={cn(countDownButtonIconStyle.className)} />
            </Button>
            <Button
              variant={countDownButtonStyle.variant}
              size={countDownButtonStyle.size}
              className={cn(
                countDownButtonStyle.className,
                'absolute left-[70px] md:left-28 opacity-0 transition-opacity duration-300',
                isRunning && 'opacity-100'
              )}
              onClick={handleSkipStepClick}
            >
              <SkipForward className={cn(countDownButtonIconStyle.className)} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
