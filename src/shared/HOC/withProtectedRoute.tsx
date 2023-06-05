import { useRouter } from 'next/router';
import { FunctionComponent } from 'react';
import { useApplicationContext } from 'features/application/context';

const withProtectedRoute = <T extends object>(
  WrappedComponent: FunctionComponent<T>
) => {
  const HocComponent: FunctionComponent<T> = ({ ...props }) => {
    const { user, loading, error } = useApplicationContext();
    const isLoggedIn = user && !error;
    const location = useRouter();

    if (!loading && !isLoggedIn && location.pathname !== '/login') {
      location.push('/login', undefined, { scroll: false });
    }

    if (isLoggedIn) {
      return <WrappedComponent {...props} />;
    }
    return null;
  };

  return HocComponent;
};

export default withProtectedRoute;
