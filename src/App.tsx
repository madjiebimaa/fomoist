import AddTaskButton from './components/AddTaskButton';
import TaskCardList from './components/TaskCardList';
import TaskDropDown from './components/TaskDropDown';
import { Separator } from './components/ui/separator';
import { Toaster as Sonner } from './components/ui/sonner';

export default function App() {
  return (
    <main className="flex flex-col py-4 px-10">
      <section className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-xl text-slate-900">Tasks</h2>
          <TaskDropDown />
        </div>
        <Separator />
        <TaskCardList />
        <AddTaskButton />
      </section>
      <Sonner />
    </main>
  );
}
