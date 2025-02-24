import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/auth.context';
import Loading from '../components/loading'
import PropTypes from 'prop-types';

const ProtectedRoute = ({ roles, children }) => {
  const { user } = useAuth();
  const token = localStorage.getItem('accessToken');

  // If no token, redirect to login
  if (!token) {
    return <Navigate to="/login" />;
  }

  // If user is not loaded yet, show loading state
  if (!user) {
    return <Loading />;
  }

  // If user role is not allowed, redirect to home
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/home" />;
  }

  // Render children or nested routes
  return children ? children : <Outlet />;
};

ProtectedRoute.propTypes = {
  roles: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.node,

};

export default ProtectedRoute;