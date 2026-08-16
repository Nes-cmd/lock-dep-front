import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated, getUserRole } from '../../utils/auth';

/**
 * Wrap a route tree with this to enforce login + role requirements.
 *
 * Usage:
 *   <Route path="/admin" element={<ProtectedRoute requiredRole="admin"><AdminLayout /></ProtectedRoute>}>
 *
 * - Not logged in at all -> redirect to /login
 * - Logged in but wrong role -> redirect to their own dashboard with a message
 */
export default function ProtectedRoute({ children, requiredRole }) {
  const location = useLocation();

  if (!isAuthenticated()) {
    // Send them to login, remembering where they were trying to go
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  const role = getUserRole();

  if (requiredRole && role !== requiredRole) {
    const fallbackPath = role === 'admin' ? '/admin/inventory' : '/customer/shop';
    return (
      <Navigate
        to={fallbackPath}
        state={{ accessDenied: true, attemptedPath: location.pathname }}
        replace
      />
    );
  }

  return children;
}
