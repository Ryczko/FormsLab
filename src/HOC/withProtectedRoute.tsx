import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import { ComponentType, useEffect } from 'react';

const withProtectedRoute = (WrappedComponent: ComponentType) => {
  const HocComponent = ({ ...props }) => {
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

  return HocComponent;
};

export default withProtectedRoute;
