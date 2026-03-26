
const BASE_URL = "https://volunteer-bridge-3.onrender.com";


export function getToken() {
  return localStorage.getItem("token");
}


export function setToken(token) {
  localStorage.setItem("token", token);
}


export function logout() {
  localStorage.removeItem("token");
  window.location.href = "./volunteer-login.html";
}


export async function verifyUser() {
  const token = getToken();
  if (!token) return null;

  try {
    const res = await fetch(`${BASE_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error();
    const data = await res.json();
    return data.user;
  } catch {
    logout();
    return null;
  }
}

// Protect route by role
export async function protectRoute(roleRequired) {
  const user = await verifyUser();
  if (!user || user.role !== roleRequired) logout();
  return user;
}