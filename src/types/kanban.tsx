export interface Task {
  id: string;
  assignedUserId: number | null; 
  title: string;
  description: string;
  columnId: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Column {
  id: string;
  name: string;
  order: number;
  boardId: number;
  createdAt: string;
  updatedAt: string;
  Tasks: Task[];
}
