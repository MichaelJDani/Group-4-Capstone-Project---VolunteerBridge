const BASE_URL = "https://volunteer-bridge-3.onrender.com";

const volunteerContainer = document.getElementById("volunteerProjects");

// 👥 LOAD PROJECTS FOR VOLUNTEERS
async function loadVolunteerProjects() {
  try {
    const res = await fetch(`${BASE_URL}/api/projects`, {
      credentials: "include"
    });

    const data = await res.json();

    console.log("Volunteer view:", data);

    volunteerContainer.innerHTML = "";

    if (!data.data || data.data.length === 0) {
      volunteerContainer.innerHTML = "<p>No available projects</p>";
      return;
    }

    data.data.forEach(project => {
      const card = document.createElement("div");
      card.classList.add("project-card");

      card.innerHTML = `
        <h3>${project.name}</h3>
        <p>${project.description || "No description"}</p>
        <small>Status: ${project.status}</small>
        <button onclick="joinProject(${project.id})">Join</button>
      `;

      volunteerContainer.appendChild(card);
    });

  } catch (err) {
    console.error("Error:", err);
  }
}

// 🚧 TEMP JOIN FUNCTION
function joinProject(id) {
  alert("Joining project ID: " + id);
}

// 🚀 RUN
loadVolunteerProjects();