const BASE_URL = "https://volunteer-bridge-3.onrender.com";

const form = document.getElementById("projectForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;
  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;

  try {
    const res = await fetch(`${BASE_URL}/api/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
        name,
        description,
        startDate,
        endDate
      })
    });

    const data = await res.json();

    console.log("Create response:", data);

    if (data.success) {
      alert("✅ Project created successfully!");

      // 🔁 Redirect back to projects page
      window.location.href = "/frontend/pages/admin/admin-project-menu.html";
    } else {
      alert("❌ " + data.message);
    }

  } catch (err) {
    console.error(err);
    alert("Something went wrong");
  }
});