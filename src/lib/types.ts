export interface Task {
  id: string;
  name: string;
  description?: string;
  estimation: number;
  isFinished: boolean;
}

export interface Template {
  id: string;
  name: string;
  tasks: Task[];
}
