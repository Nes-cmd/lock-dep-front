// Shared auth/session helpers.
// Currently the backend's login response only reliably gives us a token + role
// (see Login.jsx). If the backend later returns a full user object with an id,
// switch getUserId() to read from that instead of this placeholder.

export function getToken() {
  return localStorage.getItem('token');
}

export function getUserRole() {
  return localStorage.getItem('role') || 'customer';
}

export function isAuthenticated() {
  return Boolean(getToken());
}

export function getUserId() {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    return user?.id || user?.user_id || 1; // fallback used during dev/testing only
  } catch {
    return 1;
  }
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  localStorage.removeItem('user');
}
