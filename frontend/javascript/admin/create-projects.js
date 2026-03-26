// create-project.js

document.addEventListener("DOMContentLoaded", function () {

    // DOM Elements
    const form = document.getElementById("createProjectForm");
    const assignBtn = document.getElementById("openVolunteerModalBtn");
    const volunteerCountBtn = document.getElementById("volunteerCountBtn");
    const volunteerCountSpan = document.getElementById("volunteerCount");
    
    // Modal Elements
    const modal = document.getElementById("volunteerModal");
    const closeModalBtn = document.querySelector(".close-modal");
    const saveVolunteersBtn = document.getElementById("saveVolunteersBtn");
    const searchInput = document.getElementById("searchVolunteer");
    const volunteerListContainer = document.getElementById("volunteerListContainer");
    
    // API Configuration
    const BASE_URL = "https://volunteer-bridge-3.onrender.com";
    const token = localStorage.getItem("token");
    
    // Data storage
    let allVolunteers = [];           // All volunteers from API
    let selectedVolunteers = [];      // IDs of selected volunteers
    
    // -------------------------
    // LOAD VOLUNTEERS (API-ready with dummy fallback)
    // -------------------------
    async function loadVolunteers() {
        try {
            // Try to fetch from API
            const response = await fetch(`${BASE_URL}/api/volunteers`, {
                headers: {
                    "Authorization": token ? `Bearer ${token}` : ""
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                // Handle different response structures
                let volunteers = Array.isArray(data) ? data : (data.data || data.volunteers || []);
                
                if (volunteers.length > 0) {
                    return volunteers;
                }
            }
            
            // Fallback to dummy data if API fails or returns empty
            console.log("Using dummy volunteer data");
            return [
                { id: 1, name: "Emeka Okafor", role: "Graphic Designer" },
                { id: 2, name: "Victory Clement", role: "Content Creator" },
                { id: 3, name: "Ngozi Emeka", role: "Human Right Activist" },
                { id: 4, name: "Hassan Daniel", role: "Computer Engineer" },
                // cspell: disable-next-line
                { id: 5, name: "Bosede Akinola", role: "Teacher & Child growth enthusiast" }
            ];
            
        } catch (error) {
            console.error("Error loading volunteers:", error);
            // Return dummy data on error
            return [
                { id: 1, name: "Emeka Okafor", role: "Graphic Designer" },
                { id: 2, name: "Victory Clement", role: "Content Creator" },
                { id: 3, name: "Ngozi Emeka", role: "Human Right Activist" },
                { id: 4, name: "Hassan Daniel", role: "Computer Engineer" },
                // cspell: disable-next-line
                { id: 5, name: "Bosede Akinola", role: "Teacher & Child growth enthusiast" }
            ];
        }
    }
    
    // -------------------------
    // RENDER VOLUNTEER LIST IN MODAL
    // -------------------------
    function renderVolunteerList(filterText = "") {
        const filter = filterText.toLowerCase();
        const filteredVolunteers = allVolunteers.filter(v => 
            v.name.toLowerCase().includes(filter) || 
            v.role.toLowerCase().includes(filter)
        );
        
        if (filteredVolunteers.length === 0) {
            volunteerListContainer.innerHTML = '<div class="empty-state">No volunteers found</div>';
            return;
        }
        
        let html = '';
        filteredVolunteers.forEach(volunteer => {
            const isChecked = selectedVolunteers.includes(volunteer.id);
            html += `
                <div class="volunteer-item">
                    <input type="checkbox" id="vol_${volunteer.id}" value="${volunteer.id}" ${isChecked ? 'checked' : ''}>
                    <label for="vol_${volunteer.id}">
                        ${escapeHtml(volunteer.name)}
                        <span class="volunteer-role">- ${escapeHtml(volunteer.role)}</span>
                    </label>
                </div>
            `;
        });
        
        volunteerListContainer.innerHTML = html;
        
        // Attach event listeners to checkboxes
        document.querySelectorAll('#volunteerListContainer input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const volunteerId = parseInt(this.value);
                if (this.checked) {
                    if (!selectedVolunteers.includes(volunteerId)) {
                        selectedVolunteers.push(volunteerId);
                    }
                } else {
                    selectedVolunteers = selectedVolunteers.filter(id => id !== volunteerId);
                }
                updateVolunteerCountDisplay();
            });
        });
    }
    
    // -------------------------
    // UPDATE VOLUNTEER COUNT DISPLAY
    // -------------------------
    function updateVolunteerCountDisplay() {
        const count = selectedVolunteers.length;
        volunteerCountSpan.textContent = count;
        // Optional: Update button text if needed
    }
    
    // -------------------------
    // OPEN MODAL
    // -------------------------
    function openModal() {
        renderVolunteerList();
        modal.style.display = "flex";
    }
    
    // -------------------------
    // CLOSE MODAL
    // -------------------------
    function closeModal() {
        modal.style.display = "none";
        // Clear search input
        if (searchInput) {
            searchInput.value = "";
        }
    }
    
    // -------------------------
    // SAVE VOLUNTEERS (close modal, keep selections)
    // -------------------------
    function saveVolunteersAndClose() {
        // Selections are already stored in selectedVolunteers array
        updateVolunteerCountDisplay();
        closeModal();
    }
    
    // -------------------------
    // CREATE PROJECT SUBMIT
    // -------------------------
    form.addEventListener("submit", async function (event) {
        event.preventDefault();
        
        // Get form values
        const title = document.getElementById("projectTitle").value.trim();
        const description = document.getElementById("description").value.trim();
        const dueDate = document.getElementById("dueDate").value;
        const estimatedHours = document.getElementById("estimatedHours").value;
        
        // Validation
        if (!title) {
            alert("Project title is required");
            return;
        }
        
        if (dueDate) {
            const selectedDate = new Date(dueDate);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (selectedDate < today) {
                alert("Due date cannot be in the past");
                return;
            }
        }
        
        if (estimatedHours && parseFloat(estimatedHours) <= 0) {
            alert("Estimated hours must be a positive number");
            return;
        }
        
        // Create project object
        const newProject = {
            id: Date.now().toString(),  // Temporary ID for now
            name: title,
            description: description || "",
            dueDate: dueDate || "",
            estimatedHours: estimatedHours || "0",
            status: "Pending",
            tasks: [],
            taskHistory: [],
            assignedVolunteers: selectedVolunteers  // Store selected volunteer IDs
        };
        
        try {
            // Try to send to real API if available
            // Uncomment this when API is ready
            /*
            const response = await fetch(`${BASE_URL}/api/projects`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token ? `Bearer ${token}` : ""
                },
                body: JSON.stringify({
                    name: title,
                    description: description,
                    dueDate: dueDate,
                    estimatedHours: parseFloat(estimatedHours) || 0,
                    volunteerIds: selectedVolunteers
                })
            });
            
            if (!response.ok) {
                throw new Error("Failed to create project");
            }
            
            const result = await response.json();
            const projectId = result.data?.id || result.id;
            newProject.id = projectId;
            */
            
            // Save to localStorage for now (since no real API)
            localStorage.setItem('newlyCreatedProject', JSON.stringify(newProject));
            
            alert("Project created successfully!");
            
            // Reset form
            form.reset();
            selectedVolunteers = [];
            updateVolunteerCountDisplay();
            
            // Redirect to Project Details page
            window.location.href = "/frontend/admin/project-details.html";
            
        } catch (error) {
            console.error("CREATE PROJECT ERROR:", error);
            alert(error.message || "Failed to create project");
        }
    });
    
    // -------------------------
    // SEARCH FUNCTIONALITY
    // -------------------------
    if (searchInput) {
        searchInput.addEventListener("input", function(e) {
            renderVolunteerList(e.target.value);
        });
    }
    
    // -------------------------
    // MODAL EVENT LISTENERS
    // -------------------------
    if (assignBtn) {
        assignBtn.addEventListener("click", openModal);
    }
    
    if (volunteerCountBtn) {
        volunteerCountBtn.addEventListener("click", openModal);
    }
    
    if (closeModalBtn) {
        closeModalBtn.addEventListener("click", closeModal);
    }
    
    if (saveVolunteersBtn) {
        saveVolunteersBtn.addEventListener("click", saveVolunteersAndClose);
    }
    
    // Close modal when clicking outside
    window.addEventListener("click", function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // -------------------------
    // INITIALIZE
    // -------------------------
    async function init() {
        allVolunteers = await loadVolunteers();
        updateVolunteerCountDisplay();
    }
    
    init();
});

// Helper function to escape HTML
function escapeHtml(str) {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}