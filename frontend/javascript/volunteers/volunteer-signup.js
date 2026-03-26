const BASE_URL = "https://volunteer-bridge-3.onrender.com/api";

const form = document.getElementById("volunteer-signup-form");
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


function showToast(message, type = "success", duration = 3000) {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.classList.add("toast", type);
  toast.innerHTML = `<span>${message}</span><span class="close-btn">&times;</span>`;
  container.appendChild(toast);

  // Show
  setTimeout(() => toast.classList.add("show"), 50);

  // Auto-hide
  const hideTimeout = setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 400);
  }, duration);

  // Close button
  toast.querySelector(".close-btn").addEventListener("click", () => {
    clearTimeout(hideTimeout);
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 400);
  });
}

// 📝 Handle form submission
form.addEventListener("submit", async (e) => {
  e.preventDefault(); // prevent page refresh

  // Gather form data
  const formData = {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    password: passwordInput.value,
    phone_number: document.getElementById("phone_number").value.trim(),
    skills: document.getElementById("skills")?.value.trim() || "",
    role: "volunteer"
  };

  // Debug: log what we're sending
  console.log("Form data being sent:", formData);

  // Basic validation
  if (!formData.name || !formData.email || !formData.password) {
    showToast("Please fill in all required fields", "error", 4000);
    return;
  }

  try {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    const data = await res.json();
    console.log("Signup response:", data);

    if (res.ok) {
      showToast("Account created! Redirecting to login...", "success", 3000);

      // Delay redirect so user sees the toast
      setTimeout(() => {
        window.location.href = "./volunteer-login.html";
      }, 2000);

    } else {
      showToast(data.message || "Failed to create account", "error", 5000);
    }

  } catch (err) {
    console.error("Network error:", err);
    showToast("Cannot connect to backend", "error", 5000);
  }
});