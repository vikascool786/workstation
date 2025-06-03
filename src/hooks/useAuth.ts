import { useEffect, useState } from 'react';
import { User } from '../interfaces/User';
import { getUser, saveUser, clearUser } from '../utils/storage';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = getUser();
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  const loginUser = (userData: User) => {
    saveUser(userData);
    setUser(userData);
  };

  const logout = () => {
    clearUser();
    setUser(null);
  };

  return { user, loginUser, logout, loading};
};
