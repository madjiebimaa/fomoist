import AddTaskButton from './components/AddTaskButton';
import CountDown from './components/CountDown';
import Navbar from './components/Navbar';
import PomodoroProgress from './components/PomodoroProgress';
import PomodoroStats from './components/PomodoroStats';
import TaskCardList from './components/TaskCardList';
import { Separator } from './components/ui/separator';
import { Toaster as Sonner } from './components/ui/sonner';

import { useTasks } from './store/task';

export default function App() {
  const tasks = useTasks();

  return (
    <main className="flex flex-col gap-4">
      <Navbar />
      <section className="flex flex-col gap-4 px-10">
        <PomodoroProgress />
        <CountDown />
      </section>
      <section className="flex flex-col gap-4 px-10 pb-10">
        <h2 className="font-bold text-xl text-slate-900">Inbox</h2>
        <Separator />
        <TaskCardList />
        <AddTaskButton />
        {tasks.length !== 0 && <PomodoroStats />}
      </section>
      <Sonner />
    </main>
  );
}
