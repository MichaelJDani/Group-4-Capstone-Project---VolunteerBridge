// --- Choose backend ---
const LOCAL_BASE_URL = "http://localhost:5000/api";
const HOSTED_BASE_URL = "https://volunteer-bridge.com.ng/api";

// Change this depending on environment
const BASE_URL = window.location.hostname.includes("localhost")
  ? LOCAL_BASE_URL
  : HOSTED_BASE_URL;

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

  // --- FORM SUBMISSION ---
  const form = document.getElementById("admin-signup-form");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // prevent page refresh

    // Collect form data
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone_number = document.getElementById("phone_number").value.trim();
    const address = document.getElementById("address").value.trim();
    const password = passwordInput.value;

    if (!name || !email || !password) {
      showToast("Please fill in all required fields", "error", 4000);
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/auth/signup`, {
        method: "POST", // ✅ must be POST
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone_number, address, password }),
      });

      const data = await res.json();

      if (res.ok) {
        if (data.token) localStorage.setItem("token", data.token);
        showToast("Signup successful!", "success", 3000);

        setTimeout(() => {
          window.location.href = "./admin-dashboard.html";
        }, 1200);
      } else {
        showToast(data.message || "Signup failed", "error", 5000);
      }
    } catch (err) {
      console.error(err);
      showToast("Cannot connect to backend", "error", 5000);
    }
  });
});