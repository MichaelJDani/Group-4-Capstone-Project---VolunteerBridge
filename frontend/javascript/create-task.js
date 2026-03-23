document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("createTaskForm");
    const assignBtn = document.querySelector(".assign-btn");
    const volunteerCount = document.querySelector(".volunteer-count");

    const BASE_URL = "https://volunteer-bridge-3.onrender.com";

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    let projectId =
        new URLSearchParams(window.location.search).get("projectId") ||
        localStorage.getItem("currentProjectId");

    let lastCreatedTaskId = null;
    let assignedVolunteers = [];

    if (!projectId) {
        alert("Project not selected");
        return;
    }

    // -------------------------
    // CREATE TASK
    // -------------------------
    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const title = document.getElementById("taskTitle").value.trim();
        const description = document.getElementById("description").value.trim();
        const dueDate = document.getElementById("dueDate").value;
        const hours = document.getElementById("hours").value;

        if (!title) {
            alert("Task title required");
            return;
        }

        try {

            const response = await fetch(
                `${BASE_URL}/api/tasks/projects/${projectId}/tasks`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": token ? `Bearer ${token}` : ""
                    },
                    body: JSON.stringify({
                        title,
                        description,
                        dueDate: dueDate || null,
                        estimatedHours: hours ? Number(hours) : null,
                        createdBy: userId ? Number(userId) : null,
                        status: "pending"
                    })
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Task creation failed");
            }

            lastCreatedTaskId =
                result?.data?.id ||
                result?.task?.id ||
                result?.id;

            if (!lastCreatedTaskId) {
                console.log("FULL RESPONSE:", result);
                throw new Error("Task ID missing from backend response");
            }

            alert("Task created successfully");

            form.reset();
            assignedVolunteers = [];
            volunteerCount.textContent = "0 assigned";

        } catch (error) {
            console.error("CREATE TASK ERROR:", error);
            alert(error.message);
        }
    });

    // -------------------------
    // LOAD VOLUNTEERS
    // -------------------------
    async function loadVolunteers() {
        try {
            const response = await fetch(`${BASE_URL}/api/volunteers`, {
                headers: {
                    "Authorization": token ? `Bearer ${token}` : ""
                }
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to load volunteers");
            }

            return Array.isArray(data) ? data : data.data || [];

        } catch (error) {
            console.error("VOLUNTEERS ERROR:", error);
            alert("Failed to load volunteers");
            return [];
        }
    }

    // -------------------------
    // MODAL
    // -------------------------
    function showVolunteerModal(volunteers) {

        if (!volunteers.length) {
            alert("No volunteers available");
            return;
        }

        let modal = document.createElement("div");
        modal.className = "volunteer-modal";

        modal.innerHTML = `
            <div class="modal-content">
                <h3>Select Volunteer</h3>
                <div id="volunteerList"></div>
                <button id="closeModal">Close</button>
            </div>
        `;

        document.body.appendChild(modal);

        const list = modal.querySelector("#volunteerList");

        volunteers.forEach(v => {

            const item = document.createElement("div");
            item.className = "volunteer-item";

            const name = v.user?.name || v.name || "Unknown";
            const id = v.userId || v.id;

            item.innerHTML = `
                <p><strong>${name}</strong></p>
                <small>ID: ${id}</small>
            `;

            item.addEventListener("click", async () => {
                await assignVolunteer(id);
                modal.remove();
            });

            list.appendChild(item);
        });

        modal.querySelector("#closeModal").addEventListener("click", () => {
            modal.remove();
        });
    }

    // -------------------------
    // ASSIGN VOLUNTEER
    // -------------------------
    async function assignVolunteer(userId) {

        if (!lastCreatedTaskId) {
            alert("Create a task first");
            return;
        }

        try {
            const response = await fetch(
                `${BASE_URL}/api/tasks/${lastCreatedTaskId}/assign`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": token ? `Bearer ${token}` : ""
                    },
                    body: JSON.stringify({ userId })
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Assignment failed");
            }

            assignedVolunteers.push(userId);

            volunteerCount.textContent =
                `${assignedVolunteers.length} assigned`;

            alert("Volunteer assigned successfully");

        } catch (error) {
            console.error("ASSIGN ERROR:", error);
            alert(error.message);
        }
    }

    // -------------------------
    // BUTTON
    // -------------------------
    assignBtn.addEventListener("click", async () => {

        const volunteers = await loadVolunteers();
        showVolunteerModal(volunteers);

    });

});