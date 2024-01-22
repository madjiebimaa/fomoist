import AddTaskButton from './components/AddTaskButton';
import CountDown from './components/CountDown';
import PomodoroProgress from './components/PomodoroProgress';
import TaskCardList from './components/TaskCardList';
import TaskDropDown from './components/TaskDropDown';
import TaskSortDropDown from './components/TaskSortDropDown';
import { Separator } from './components/ui/separator';
import { Toaster as Sonner } from './components/ui/sonner';

export default function App() {
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
      </section>
      <Sonner />
    </main>
  );
}
