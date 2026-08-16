import { useLocation } from 'react-router-dom';

// Shown briefly at the top of a dashboard when the user just got redirected
// here because they tried to access a route their role doesn't permit.
export default function AccessDeniedBanner() {
  const location = useLocation();
  const deniedFrom = location.state?.accessDenied ? location.state.attemptedPath : null;

  if (!deniedFrom) return null;

  return (
    <div className="mb-4 p-3 text-sm bg-amber-50 text-amber-800 border border-amber-200 rounded-lg">
      You don't have access to <span className="font-semibold">{deniedFrom}</span> — redirected here instead.
    </div>
  );
}
