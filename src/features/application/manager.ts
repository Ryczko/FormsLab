import { User } from 'firebase/auth';
import { useState, useEffect, useCallback } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from 'src/firebase';

export interface ApplicationManager {
  user: User | null | undefined;
  displayName: string;
  loading: boolean;
  error: Error | undefined;
  changeDisplayName: (userName: string) => void;
}

export const useApplicationManager = (): ApplicationManager => {
  const [displayName, setDisplayName] = useState('');
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (user?.displayName) {
      setDisplayName(user.displayName);
    }
  }, [user]);

  const changeDisplayName = useCallback((userName: string) => {
    setDisplayName(userName);
  }, []);

  return {
    user,
    loading,
    displayName,
    error,
    changeDisplayName,
  };
};
