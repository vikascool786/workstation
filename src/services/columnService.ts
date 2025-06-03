// src/services/boardService.ts
import { Column } from '../types/kanban';
const REACT_APP_API_KEY = process.env.REACT_APP_API_KEY;

const getAuthHeaders = () => {
  const user = localStorage.getItem('user');
  const token = user ? JSON.parse(user).token : '';
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
};

export const getColumnsByBoardId = async (boardId:number): Promise<Column[]> => {
  const res = await fetch(`${REACT_APP_API_KEY}/boards/${boardId}/columns`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Failed to fetch boards');
  return res.json();
};

export const createBoard = async (name: string) => {
  const res = await fetch(`${REACT_APP_API_KEY}/boards`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ name }),
  });
  if (!res.ok) throw new Error('Failed to create board');
  return res.json();
};
