import { useRouter } from 'next/router';
import { ComponentType, useEffect } from 'react';
import { useApplicationContext } from 'src/features/application/context';

const withProtectedRoute = (WrappedComponent: ComponentType) => {
  const HocComponent = ({ ...props }) => {
    const { user, loading, error } = useApplicationContext();
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
