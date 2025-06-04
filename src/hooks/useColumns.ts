// src/hooks/useColumns.ts
import { useState, useEffect } from 'react';
import { getColumnsByBoardId } from '../services/columnService';
import { Column } from '../types/kanban';
import { moveTaskToColumn } from '../services/taskService';

export interface Board {
  id: string;
  name: string;
}

export const useColumns = () => {
  const [columns, setColumns] = useState<Column[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchColumns = async () => {
    setLoading(true);
    try {
      const data: Column[] = await getColumnsByBoardId(5);
      setColumns(data);
    } catch (err: any) {
      setError('Failed to fetch boards');
    } finally {
      setLoading(false);
    }
  };

  const updateTaskByColumn = async (columnId: number, taskId: number) => {
    try {
      const data = await moveTaskToColumn(columnId, taskId);
      if (data) {
        await fetchColumns(); // refresh columns after moving task
      }
    } catch (error) {
      console.error('Error moving task:', error);
      setError('Could not move task to the selected column');
    }
  };

  useEffect(() => {
    fetchColumns();
  }, []);

  return { columns, loading, error, fetchColumns, updateTaskByColumn };
};
