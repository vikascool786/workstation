// src/hooks/useBoards.ts
import { useState, useEffect } from 'react';
import { getBoards, createBoard } from '../services/boardService';
import { Board } from '../types/board';

export const useBoards = () => {
  const [boards, setBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBoards = async () => {
    setLoading(true);
    try {
      const data = await getBoards();
      setBoards(data);
    } catch (err: any) {
      setError('Failed to fetch boards');
    } finally {
      setLoading(false);
    }
  };

  const addBoard = async (name: string) => {
    try {
      await createBoard(name);
      await fetchBoards(); // refresh after adding
    } catch {
      setError('Could not create board');
    }
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  return { boards, loading, error, fetchBoards, addBoard };
};
