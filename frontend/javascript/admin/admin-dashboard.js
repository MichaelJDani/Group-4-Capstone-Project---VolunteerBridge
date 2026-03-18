const adminNameEl = document.getElementById('admin-name');
const logoutBtn = document.getElementById('logout-btn');

// Check JWT and role
const token = localStorage.getItem('token');

if (!token) {
  // Not logged in
  window.location.href = '/frontend/admin/admin-login.html';
} else {
  // Verify token with backend (optional, but recommended)
  fetch('http://localhost:5000/api/auth/me', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(res => res.json())
    .then(data => {
      if (!data.user || data.user.role !== 'admin') {
        // Not admin
        localStorage.removeItem('token');
        window.location.href = '/frontend/admin/admin-login.html';
      } else {
        // Show admin info
        adminNameEl.textContent = data.user.name || 'Admin';
      }
    })
    .catch(err => {
      console.error(err);
      localStorage.removeItem('token');
      window.location.href = '/frontend/admin/admin-login.html';
    });
}

// Logout functionality
logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('token');
  window.location.href = '/frontend/admin/admin-login.html';
});