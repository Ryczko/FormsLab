import { User } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from 'src/firebase';

export interface ApplicationManager {
  user: User;
  loading: boolean;
  error: Error;
}

export const useApplicationManager = (): ApplicationManager => {
  const [user, loading, error] = useAuthState(auth);

  return {
    user,
    loading,
    error,
  };
};
