// import { Navigate } from 'react-router-dom';
// import { useAuth } from './AuthContext';

// const ProtectedRoute = ({ children }) => {
//   const { isAuthenticated, loading } = useAuth();
  
//   if (loading) return <div>Loading...</div>;
//   if (!isAuthenticated) return <Navigate to="/" replace />;
  
//   return children;
// };

// export default ProtectedRoute;


import { useAuth } from './AuthContext';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  return user ? children : <Navigate to="/login" replace />;
}