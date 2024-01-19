import AddTaskButton from './components/AddTaskButton';
import TaskCardList from './components/TaskCardList';
import { Toaster as Sonner } from './components/ui/sonner';

export default function App() {
  return (
    <main className="flex flex-col gap-4 p-2 px-10">
      <TaskCardList />
      <AddTaskButton />
      <Sonner />
    </main>
  );
}
