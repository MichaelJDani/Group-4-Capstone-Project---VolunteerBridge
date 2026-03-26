// read Project ID from URL
const params = new URLSearchParams(window.location.search);
const projectId = params.get("id");
// If no ID exists in URL
if (!projectId) {
    alert("No project selected");
    throw new Error("Project ID missing in URL");
}

//Fetch Project From Backend
async function fetchProjectDetails() {
    try {
        const response = await fetch(
            `http://localhost:5000/api/projects/${projectId}`
        );

        if (!response.ok) {
            throw new Error("Failed to fetch project");
        }
        const project = await response.json();

        displayProject(project);

    } catch (error) {
        console.error(error);
        showErrorMessage();
    }
}


//Display Project Data

function displayProject(project) {

    document.getElementById("project-name").textContent =
        project.name;

    document.getElementById("project-description").textContent =
        project.description;
}


//Error Message
function showErrorMessage() {
    document.getElementById("project-name").textContent =
        "Error loading project";

    document.getElementById("project-description").textContent =
        "Please try again later.";
}
fetchProjectDetails();






// testing
// document.addEventListener("DOMContentLoaded", () => {
//     const testProject = {
//         id: 1,
//         name: "Community Outreach",
//         description: "Helping local communities."
//     };

//     function displayProject(project) {
//         document.getElementById("project-name").textContent = project.name;
//         document.getElementById("project-description").textContent = project.description;
//     }

//     function showErrorMessage() {
//         document.getElementById("project-name").textContent = "Error loading project";
//         document.getElementById("project-description").textContent = "Please try again later.";
//     }

//     displayProject(testProject);
// });