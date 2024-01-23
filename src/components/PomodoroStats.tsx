import {
  getTotalActual,
  getTotalDuration,
  getTotalEstimation,
} from '@/lib/utils';
import { Card, CardContent } from './ui/card';

import { useTasks } from '@/store/task';
import { useMemo } from 'react';

export default function PomodoroStats() {
  const tasks = useTasks();

  const totalActual = useMemo(() => getTotalActual(tasks), [tasks]);
  const totalEstimation = useMemo(() => getTotalEstimation(tasks), [tasks]);
  const totalDuration = getTotalDuration(tasks);

  const finishAt = new Date(new Date().getTime() + totalDuration);
  const formattedFinishAt = `${finishAt.getHours()}:${finishAt.getMinutes()}`;

  return (
    <Card className="rounded-none border-2 border-slate-400 bg-slate-200 shadow-md">
      <CardContent className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-4k p-2">
        <p className="text-slate-400">
          Pomodoros: <span className="font-bold text-lg">{totalActual}</span>
          {' / '}
          <span className="font-bold text-lg">{totalEstimation}</span>
        </p>
        <p className="text-slate-400">
          Finish At:{' '}
          <span className="font-bold text-lg">{formattedFinishAt}</span>
        </p>
      </CardContent>
    </Card>
  );
}
