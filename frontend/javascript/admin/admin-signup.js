// --- BASE URL (live backend) ---
const BASE_URL = "https://volunteer-bridge.com.ng/api";

// --- PASSWORD TOGGLE ---
const passwordInput = document.getElementById("password");
const togglePassword = document.querySelector(".toggle-password");
const eyeIcon = togglePassword.querySelector("img");

togglePassword.addEventListener("click", () => {
  const type = passwordInput.type === "password" ? "text" : "password";
  passwordInput.type = type;

  // Swap the icon
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

// --- HELPER FUNCTION FOR API CALLS WITH JWT ---
async function apiFetch(endpoint, options = {}) {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
  const res = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });
  return res.json();
}

// --- SIGNUP FORM SUBMISSION ---
const form = document.getElementById("admin-signup-form");
if (!form) return;

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Collect all form fields
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
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone_number, address, password }),
    });

    const data = await res.json();

    if (res.ok) {
      // Store JWT if backend sends one
      if (data.token) localStorage.setItem("token", data.token);

      showToast("Signup successful!", "success", 3000);

      // Redirect to dashboard
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