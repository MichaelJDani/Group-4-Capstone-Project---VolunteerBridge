// --- PASSWORD TOGGLE ---
const passwordInput = document.getElementById("password");
const togglePassword = document.querySelector(".toggle-password");
const eyeIcon = togglePassword.querySelector("img");

togglePassword.addEventListener("click", () => {
  const type = passwordInput.type === "password" ? "text" : "password";
  passwordInput.type = type;

  
  eyeIcon.src =
    type === "password"
      ? "/frontend/assets/icons/eye.svg"      
      : "/frontend/assets/icons/eye-slash.svg"; 
});

// --- TOAST FUNCTION ---
function showToast(message, type = 'success', duration = 3000) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.classList.add('toast', type);
  toast.innerHTML = `
    <span>${message}</span>
    <span class="close-btn">&times;</span>
  `;

  container.appendChild(toast);

  // Show the toast
  setTimeout(() => toast.classList.add('show'), 50);

  // Auto remove
  const hideTimeout = setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, duration);

  // Close button
  toast.querySelector('.close-btn').addEventListener('click', () => {
    clearTimeout(hideTimeout);
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  });
}

// --- SIGNUP FORM SUBMISSION ---
const form = document.getElementById('admin-signup-form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = {
    name: document.getElementById('name').value.trim(),
    email: document.getElementById('email').value.trim(),
    password: passwordInput.value,
    phone_number: document.getElementById('phone_number').value.trim(),
    address: document.getElementById('address').value.trim(),
    role: 'admin'
  };


  if (!formData.name || !formData.email || !formData.password) {
    showToast('Please fill in all required fields', 'error', 4000);
    return;
  }

  try {
    const res = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem('token', data.token);

      showToast('Admin account created successfully!', 'success', 3000);

      // Redirect after short delay to show toast
      setTimeout(() => {
        if (data.user.role === 'admin') {
          window.location.href = './admin-dashboard.html';
        } else {
          window.location.href = '../volunteers/volunteer-dashboard.html';
        }
      }, 1200);

    } else {
      showToast(data.message || 'Failed to create account', 'error', 5000);
    }

  } catch (err) {
    console.error(err);
    showToast('Cannot connect to backend', 'error', 5000);
  }
});
