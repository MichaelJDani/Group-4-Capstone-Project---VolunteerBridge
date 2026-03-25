// --- BASE URL (auto-switch localhost vs hosted backend) ---
const BASE_URL = "https://volunteer-bridge-3.onrender.com/api";

document.addEventListener("DOMContentLoaded", () => {
  // --- PASSWORD TOGGLE ---
  const passwordInput = document.getElementById("password");
  const togglePassword = document.querySelector(".toggle-password");
  const eyeIcon = togglePassword?.querySelector("img");

  togglePassword?.addEventListener("click", () => {
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

  // --- FORM SUBMISSION ---
  const form = document.getElementById("volunteer-signup-form");
  if (!form) return;

  const submitBtn = form.querySelector('button[type="submit"]');

  function setLoading(isLoading) {
    submitBtn.disabled = isLoading;
    submitBtn.textContent = isLoading
      ? "Creating account..."
      : "Create Account";
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent page refresh

    const formData = {
      name: document.getElementById("name").value.trim(),
      email: document.getElementById("email").value.trim(),
      password: passwordInput.value,
      // phone_number: document.getElementById("phone_number").value.trim(),
      // skills: document.getElementById("skills").value.trim(),
      // role: "volunteer",
    };

    if (!formData.name || !formData.email || !formData.password) {
      showToast("Please fill in all required fields", "error", 4000);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        showToast("Volunteer account created successfully!", "success", 3000);

        setTimeout(() => {
          window.location.href = "./volunteer-login.html";
        }, 1200);
      } else {
        showToast(data.message || "Failed to create account!", "error", 5000);
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      showToast("Cannot connect to backend!", "error", 5000);
      setLoading(false);
    }
  });
});
