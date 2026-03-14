const form = document.getElementById('admin-login-form');
const errorMessage = document.getElementById('error-message');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  errorMessage.textContent = ''; // clear previous errors

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  if (!email || !password) {
    errorMessage.textContent = 'Please fill in both fields';
    return;
  }

  try {
    const res = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem('token', data.token); // save JWT
      alert('Login successful!');

      // after successful login
if (data.user.role === 'admin') {
  window.location.href = 'http://localhost:3000/frontend/pages/admin/admin-dashboard.html';
} else {
  window.location.href = 'http://localhost:3000/frontend/pages/volunteer/volunteer-dashboard.html';
}

      // Redirect based on role
      const role = data.user.role;
      if (role === 'admin') {
        window.location.href = '/frontend/admin/admin-dashboard.html';
      } else if (role === 'volunteer') {
        window.location.href = '/frontend/volunteer/volunteer-dashboard.html';
      } else {
        window.location.href = '/frontend/index.html';
      }

    } else {
      errorMessage.textContent = data.message || 'Login failed';
    }

  } catch (err) {
    console.error(err);
    errorMessage.textContent = 'Cannot connect to backend';
  }
});