export type TaskPriority = 1 | 2 | 3 | 4;

export interface Task {
  id: string;
  name: string;
  estimation: number;
  isFinished: boolean;
  priority: TaskPriority;
  description?: string;
  createdAt: Date;
}

export interface Template {
  id: string;
  name: string;
  tasks: Omit<Task, 'id' | 'isFinished'>[];
  createdAt: Date;
}

export type TaskFilterSort = 'DATE_ADDED' | 'NAME' | 'PRIORITY';

export type AddTaskParams = Pick<
  Task,
  'name' | 'description' | 'estimation' | 'priority'
>;
export type CreateTaskParams = AddTaskParams;
