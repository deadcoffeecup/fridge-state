import { useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function RequireAuth({ children }) {
  let { currentUser } = useAuth();
  let location = useLocation();

  if (!currentUser) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  } else {
    return children;
  }
}
