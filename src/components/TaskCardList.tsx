import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { useMemo, useState } from 'react';
import { createPortal } from 'react-dom';

import TaskCard from './TaskCard';

import { Task } from '@/lib/types';
import { useTaskActions, useTasks } from '@/store/task';

export default function TaskCardList() {
  const [activeTaskCard, setActiveTaskCard] = useState<Task | null>(null);
  const tasks = useTasks();
  const taskActions = useTaskActions();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        distance: 10,
        delay: 1000,
      },
    })
  );

  const taskIds = useMemo(() => tasks.map((task) => task.id), [tasks]);

  const handleDragStart = (event: DragStartEvent) => {
    if (
      event.active.data.current &&
      event.active.data.current.type === 'Task Card'
    ) {
      setActiveTaskCard(event.active.data.current.task);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      taskActions.moveTasks(active.id, over.id);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <section className="flex flex-col">
        <SortableContext items={taskIds}>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </SortableContext>
      </section>

      {createPortal(
        <DragOverlay>
          {activeTaskCard && <TaskCard task={activeTaskCard} />}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  );
}