const form = document.getElementById('admin-signup-form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Use getElementById to read values correctly
  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    password: document.getElementById('password').value,
    phone_number: document.getElementById('phone_number').value,
    address: document.getElementById('address').value,
    role: 'admin'
  };

  try {
    const res = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem('token', data.token);
      alert('Admin account created successfully!');

      // Redirect based on role
      if (data.user.role === 'admin') {
        window.location.href = '/frontend/admin/admin-dashboard.html';
      } else {
        window.location.href = '/frontend/volunteer/volunteer-dashboard.html';
      }

    } else {
      alert(data.message || 'Failed to create account!');
    }

  } catch (err) {
    console.error(err);
    alert('Cannot connect to backend!');
  }
});