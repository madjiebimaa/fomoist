import { PlayCircle, StopCircle } from 'lucide-react';
import { useEffect } from 'react';

import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

import { getTimeUnits, toTwoDigits } from '@/lib/utils';
import {
  useDuration,
  useIsRunning,
  usePomodoroActions,
} from '@/store/pomodoro';

export default function CountDown() {
  const duration = useDuration();
  const isRunning = useIsRunning();
  const pomodoroActions = usePomodoroActions();

  const { minutes, seconds } = getTimeUnits(duration);
  const formattedDuration = `${toTwoDigits(minutes)}:${toTwoDigits(seconds)}`;
  const Icon = isRunning ? StopCircle : PlayCircle;

  useEffect(() => {
    const countDown = setInterval(() => {
      if (isRunning && duration > 0) {
        pomodoroActions.decreaseDuration();
      }
    }, 1000);

    return () => clearInterval(countDown);
  }, [duration, isRunning, pomodoroActions]);

  const handleCountDownClick = () => {
    isRunning
      ? pomodoroActions.stopCountDown()
      : pomodoroActions.startCountDown();
  };

  return (
    <Card className="rounded-none border-2 border-slate-400 bg-slate-200 shadow-md">
      <CardContent className="flex flex-col justify-center items-center gap-4 p-2 md:p-4">
        <div className="flex flex-col justify-center items-center gap-2 md:order-1">
          <p className="font-bold text-6xl md:text-9xl text-slate-400 text-center">
            {formattedDuration}
          </p>
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 h-fit w-fit hover:bg-transparent"
            onClick={handleCountDownClick}
          >
            <Icon className="shrink-0 h-12 md:h-20 w-12 md:w-20 text-slate-400" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
