document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("createTaskForm");
    const assignBtn = document.querySelector(".assign-btn");
    const volunteerCount = document.querySelector(".volunteer-count");

    // Get projectId from URL
    const params = new URLSearchParams(window.location.search);
    const projectId = params.get("projectId");

    if (!projectId) {
        alert("Project ID not found");
        return;
    }

    const currentUserId = 1; 

    let lastCreatedTaskId = null;
    let assignedVolunteers = [];

    form.addEventListener("submit", async function(event) {
        event.preventDefault();

        const title = document.getElementById("taskTitle").value.trim();
        const description = document.getElementById("description").value.trim();
        const dueDate = document.getElementById("dueDate").value;
        const hours = document.getElementById("hours").value;

        if (!title) {
            alert("Task title is required");
            return;
        }

        const today = new Date().toISOString().split("T")[0];
        if (dueDate && dueDate < today) {
            alert("Due date cannot be in the past");
            return;
        }

        if (hours && Number(hours) <= 0) {
            alert("Estimated hours must be greater than zero");
            return;
        }

        const taskData = {
            title,
            description,
            dueDate: dueDate || null,
            estimatedHours: hours ? Number(hours) : null,
            projectId: Number(projectId),
            createdBy: currentUserId
        };

        try {
            const response = await fetch(`/api/projects/${projectId}/tasks`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(taskData)
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.message || "Failed to create task");
            }

            const data = await response.json();
            lastCreatedTaskId = data.id; // store newly created task ID

            alert("Task created successfully");
            form.reset();
            assignedVolunteers = [];
            volunteerCount.textContent = "0 Volunteers";

        } catch(error) {
            console.error(error);
            alert("Error creating task: " + error.message);
        }
    });

    // ASSIGN VOLUNTEERS BUTTON
    assignBtn.addEventListener("click", async () => {
        if (!lastCreatedTaskId) {
            alert("Please create a task first");
            return;
        }

        const userId = prompt("Enter Volunteer ID to assign:");
        if (!userId) return;

        try {
            const response = await fetch(`/api/tasks/${lastCreatedTaskId}/assign`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ userId: Number(userId) })
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.message || "Failed to assign volunteer");
            }

            assignedVolunteers.push(Number(userId));
            volunteerCount.textContent = `${assignedVolunteers.length} Volunteers assigned`;
            alert("Volunteer assigned successfully");

        } catch (error) {
            console.error(error);
            alert("Error assigning volunteer: " + error.message);
        }
    });

});