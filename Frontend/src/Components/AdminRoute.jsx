import { Navigate } from 'react-router-dom';

/**
 * AdminRoute — protects admin pages on the frontend.
 * 
 * Logic:
 *  1. No userInfo / no token  → redirect to /login
 *  2. role !== "admin"         → redirect to / (home)
 *  3. role === "admin"         → render children
 */
export default function AdminRoute({ children }) {
  let userInfo = {};

  try {
    userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  } catch {
    userInfo = {};
  }

  const token = userInfo?.token;
  const role = userInfo?.role;

  // Not logged in at all
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Logged in but not admin
  if (role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  // Admin — allow access
  return children;
}
