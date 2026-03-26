const BASE_URL = "https://volunteer-bridge-3.onrender.com/api";

document.addEventListener("DOMContentLoaded", () => {
  const passwordInput = document.getElementById("password");
  const togglePassword = document.querySelector(".toggle-password");
  const eyeIcon = togglePassword?.querySelector("img");

  togglePassword?.addEventListener("click", () => {
    const type = passwordInput.type === "password" ? "text" : "password";
    passwordInput.type = type;
    eyeIcon.src = type === "password"
      ? "/frontend/assets/icons/eye.svg"
      : "/frontend/assets/icons/eye-slash.svg";
  });

  function showToast(message, type = 'success', duration = 3000) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.classList.add('toast', type);
    toast.innerHTML = `<span>${message}</span><span class="close-btn">&times;</span>`;
    container.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 50);
    const hideTimeout = setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, duration);

    toast.querySelector('.close-btn').addEventListener('click', () => {
      clearTimeout(hideTimeout);
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    });
  }


  const form = document.getElementById("admin-login-form");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = passwordInput.value;

    if (!email || !password) {
      showToast("Please fill in both fields", "error", 4000);
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        showToast("Login successful!", "success", 3000);

       setTimeout(() => {
          if (data.user.role === "volunteer") window.location.href = "./volunteer-dashboard.html";
          else if (data.user.role === "admin") window.location.href = "./Dashboard.html";
        }, 1200);
      } else {
        showToast(data.message || "Login failed", "error", 5000);
      }
    } catch (err) {
      console.error(err);
      showToast("Cannot connect to backend", "error", 5000);
    }
  });
});