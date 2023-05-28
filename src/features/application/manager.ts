import { useState, useEffect } from 'react';
import { getFetch } from '../../../lib/axiosConfig';
import { User } from '@prisma/client';

export interface ApplicationManager {
  user: User | undefined;
  loading: boolean;
  error: boolean;
}

export const useApplicationManager = (): ApplicationManager => {
  const [loading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    try {
      const user = await getFetch<User>('/api/current');
      setUser(user);
    } catch (error) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    user,
    loading,
    error,
  };
};
