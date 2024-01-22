import AddTaskButton from './components/AddTaskButton';
import CountDown from './components/CountDown';
import PomodoroProgress from './components/PomodoroProgress';
import PomodoroStats from './components/PomodoroStats';
import TaskCardList from './components/TaskCardList';
import TaskDropDown from './components/TaskDropDown';
import TaskSortDropDown from './components/TaskSortDropDown';
import { Separator } from './components/ui/separator';
import { Toaster as Sonner } from './components/ui/sonner';

import { useTasks } from './store/task';

export default function App() {
  const tasks = useTasks();

  return (
    <main className="flex flex-col py-4 px-10">
      <section className="flex flex-col gap-4">
        <PomodoroProgress />
        <CountDown />
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-xl text-slate-900">Tasks</h2>
          <div className="flex items-center gap-2">
            <TaskSortDropDown />
            <TaskDropDown />
          </div>
        </div>
        <Separator />
        <TaskCardList />
        <AddTaskButton />
        {tasks.length !== 0 && <PomodoroStats />}
      </section>
      <Sonner />
    </main>
  );
}
