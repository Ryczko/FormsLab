import { useRouter } from 'next/router';
import { ComponentType } from 'react';
import { useApplicationContext } from 'features/application/context';

const withProtectedRoute = (WrappedComponent: ComponentType) => {
  const HocComponent = ({ ...props }) => {
    const { user, loading, error } = useApplicationContext();
    const isLoggedIn = user && !error;
    const location = useRouter();

    if (!loading && !isLoggedIn && location.pathname !== '/login') {
      location.push('/login');
    }

    if (isLoggedIn) {
      return <WrappedComponent {...props} />;
    }
    return null;
  };

  return HocComponent;
};

export default withProtectedRoute;
