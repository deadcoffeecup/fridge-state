import { useLocation, Navigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';

export function RequireAuth({ children }) {
  const { currentUser } = useAuth();
  const location = useLocation();

  if (!currentUser) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  } else {
    return children;
  }
}
