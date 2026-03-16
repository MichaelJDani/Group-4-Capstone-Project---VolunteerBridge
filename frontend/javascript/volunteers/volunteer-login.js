document.addEventListener("DOMContentLoaded", () => {
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
  function showToast(message, type = "success", duration = 3000) {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.classList.add("toast", type);
    toast.innerHTML = `
      <span>${message}</span>
      <span class="close-btn">&times;</span>
    `;
    container.appendChild(toast);

    setTimeout(() => toast.classList.add("show"), 50);

    const hideTimeout = setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 400);
    }, duration);

    toast.querySelector(".close-btn").addEventListener("click", () => {
      clearTimeout(hideTimeout);
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 400);
    });
  }

  // --- LOGIN FORM SUBMISSION ---
  const form = document.getElementById("volunteer-login-form");
  if (!form) return; // prevent errors if form is missing

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // prevent page refresh

    const email = document.getElementById("email").value.trim();
    const password = passwordInput.value;

    if (!email || !password) {
      showToast("Please fill in both fields", "error", 4000);
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        showToast("Login successful!", "success", 3000);

        // Redirect based on role after toast shows
        setTimeout(() => {
          const role = data.user.role;
          if (role === "volunteer") {
            window.location.href = "./volunteer-dashboard.html";
          } else if (role === "admin") {
            window.location.href = "./admin-dashboard.html";
          } else {
            window.location.href = "./index.html";
          }
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
