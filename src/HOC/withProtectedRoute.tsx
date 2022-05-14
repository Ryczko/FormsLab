import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const withProtectedRoute = (WrappedComponent) => {
  const hocComponent = ({ ...props }) => {
    const [user, loading, error] = useAuthState(auth);
    const isLoggedIn = user && !error;
    const location = useRouter();

    const redirectToHome = () => {
      location.replace('/login');
    };

    useEffect(() => {
      if (!isLoggedIn && !loading) {
        redirectToHome();
      }
    }, [isLoggedIn, loading]);

    if (loading) return null;
    if (isLoggedIn) {
      return <WrappedComponent {...props} />;
    }
    return null;
  };

  return hocComponent;
};

export default withProtectedRoute;
