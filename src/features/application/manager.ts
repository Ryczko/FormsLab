import { useState, useEffect } from 'react';
import fetcher from '../../../lib/fetcher';

export const useApplicationManager = () => {
  const [loading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState<any>(undefined);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    try {
      const user = await fetcher('/api/current');

      setUser(user.currentUser);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    user,
    setUser,
    loading,
    error,
  };
};
