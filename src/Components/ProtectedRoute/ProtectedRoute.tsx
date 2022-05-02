import { Navigate, useLocation } from 'react-router-dom';
import { auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

type ProtectedRouteProps = {
  children: JSX.Element;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [user, loading, error] = useAuthState(auth);
  const isLoggedIn = user && !error;
  const location = useLocation();

  if (loading) return null;
  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  } else {
    return children;
  }
};

export default ProtectedRoute;
