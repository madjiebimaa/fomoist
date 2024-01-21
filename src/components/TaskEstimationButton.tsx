import { ChevronDown, ChevronUp, Hourglass } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';

import { Button, ButtonProps, buttonVariants } from './ui/button';

import { cn } from '@/lib/utils';

interface TaskEstimationButtonProps {
  form: UseFormReturn<{
    priority: number;
    name: string;
    estimation: number;
    description?: string | undefined;
  }>;
}

export default function TaskEstimationButton({
  form,
}: TaskEstimationButtonProps) {
  const handleIncreaseEstimationClick = () => {
    form.setValue('estimation', form.getValues('estimation') + 1);
  };

  const handleDecreaseEstimationClick = () => {
    const estimation = form.getValues('estimation');
    if (estimation > 1) {
      form.setValue('estimation', form.getValues('estimation') - 1);
    }
  };

  const estimationButtonStyle: Pick<
    ButtonProps,
    'variant' | 'size' | 'className'
  > = {
    variant: 'ghost',
    size: 'icon',
    className: 'shrink-0 h-fit w-fit',
  };
  return (
    <div
      className={cn(
        buttonVariants({ variant: 'outline', size: 'sm' }),
        'shrink-0 h-8 w-fit gap-3 font-normal text-slate-400'
      )}
    >
      <div className="flex items-center">
        <Hourglass className="shrink-0 h-4 w-4 mr-1" />
        <span className="flex items-center text-slate-400">
          <span className="grid place-content-center min-h-4 min-w-4 mr-1">
            {form.getValues('estimation')}
          </span>
          Pomodoro Est
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant={estimationButtonStyle.variant}
          size={estimationButtonStyle.size}
          className={cn(estimationButtonStyle.className)}
        >
          <ChevronUp
            className="shrink-0 h-4 w-4 text-slate-400 hover:text-slate-900"
            onClick={handleIncreaseEstimationClick}
          />
        </Button>
        <Button
          type="button"
          variant={estimationButtonStyle.variant}
          size={estimationButtonStyle.size}
          className={cn(estimationButtonStyle.className)}
        >
          <ChevronDown
            className="shrink-0 h-4 w-4 text-slate-400 hover:text-slate-900"
            onClick={handleDecreaseEstimationClick}
          />
        </Button>
      </div>
    </div>
  );
}
