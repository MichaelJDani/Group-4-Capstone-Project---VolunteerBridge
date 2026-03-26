const BASE_URL = "https://volunteer-bridge-3.onrender.com";

const createBtn = document.querySelector(".clearBtn");
const container = document.getElementById("projectsContainer");
const searchInput = document.getElementById("projectSearch");

let allProjects = [];

// ================= LOAD PROJECTS =================
async function loadProjects() {
  try {
    const res = await fetch(`${BASE_URL}/api/projects`, {
      method: "GET",
      credentials: "include"
    });

    const data = await res.json();

    console.log("Projects:", data);

    allProjects = data.data || [];

    displayProjects(allProjects);

  } catch (err) {
    console.error("Error loading projects:", err);
    container.innerHTML = "<p>Error loading projects</p>";
  }
}

// ================= DISPLAY PROJECTS =================
function displayProjects(projects) {
  container.innerHTML = "";

  if (projects.length === 0) {
    container.innerHTML = "<p>No projects yet</p>";
    return;
  }

  projects.forEach(project => {
    const card = document.createElement("div");
    card.classList.add("project-card");

    card.innerHTML = `
      <h3>${project.name}</h3>
      <p>${project.description || "No description"}</p>
      <small>Status: ${project.status}</small>
    `;

    container.appendChild(card);
  });
}

// ================= CREATE PROJECT =================
createBtn.addEventListener("click", async () => {
  const name = prompt("Enter project name:");
  const description = prompt("Enter description:");

  if (!name) return alert("Project name is required");

  try {
    const res = await fetch(`${BASE_URL}/api/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({ name, description })
    });

    const data = await res.json();

    console.log("Create:", data);

    if (data.success) {
      alert("✅ Project created successfully!");
      loadProjects(); // refresh immediately
    } else {
      alert("❌ " + data.message);
    }

  } catch (err) {
    console.error("Error creating project:", err);
    alert("Something went wrong");
  }
});

// ================= SEARCH FUNCTION =================
searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();

  const filtered = allProjects.filter(project =>
    project.name.toLowerCase().includes(value)
  );

  displayProjects(filtered);
});

// ================= INIT =================
loadProjects();