import AddTaskButton from '@/components/AddTaskButton';
import FinishedTasksCollapsible from '@/components/FinishedTasksCollapsible';
import PomodoroStats from '@/components/PomodoroStats';
import TaskCardList from '@/components/TaskCardList';

import { useTasks } from '@/store/task';

export default function IndexPage() {
  const tasks = useTasks();

  return (
    <>
      <h2 className="font-bold text-3xl text-slate-900">Inbox</h2>
      <TaskCardList />
      <div className="flex flex-col gap-4 mt-auto">
        <FinishedTasksCollapsible />
        <AddTaskButton />
        {tasks.length !== 0 && <PomodoroStats />}
      </div>
    </>
  );
}
