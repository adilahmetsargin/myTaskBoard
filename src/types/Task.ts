export interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
  category?: string;
  priority?: 'low' | 'medium' | 'high';
  dueDate?: number;
  userId?: string;
}

