import { Progress } from './ui/progress';

import { POMODORO_STEPS } from '@/lib/constants';
import { useDuration, useSelectedStep } from '@/store/pomodoro';

export default function PomodoroProgress() {
  const selectedStep = useSelectedStep();
  const duration = useDuration();
  const progress =
    100 - (duration / POMODORO_STEPS[selectedStep].duration) * 100;

  return <Progress value={progress} className="h-2" />;
}
