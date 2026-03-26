// create-projects.js

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
    
    // Dummy volunteer data
    const dummyVolunteers = [
        { id: 1, name: "Emeka Okafor", role: "Graphic Designer" },
        { id: 2, name: "Victory Clement", role: "Content Creator" },
        { id: 3, name: "Ngozi Emeka", role: "Human Right Activist" },
        { id: 4, name: "Hassan Daniel", role: "Computer Engineer" },
        { id: 5, name: "Bosede Akinola", role: "Teacher & Child growth enthusiast" }
    ];
    
    // Data storage
    let allVolunteers = [];
    let selectedVolunteers = [];
    
    // -------------------------
    // LOAD VOLUNTEERS (DUMMY DATA)
    // -------------------------
    function loadVolunteers() {
        allVolunteers = [...dummyVolunteers];
        renderVolunteerList();
        updateVolunteerCountDisplay();
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
        if (searchInput) {
            searchInput.value = "";
        }
    }
    
    // -------------------------
    // SAVE VOLUNTEERS (close modal, keep selections)
    // -------------------------
    function saveVolunteersAndClose() {
        updateVolunteerCountDisplay();
        closeModal();
    }
    
    // -------------------------
    // CREATE PROJECT - USING DUMMY DATA
    // -------------------------
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        
        // Get form values
        const name = document.getElementById("projectTitle").value.trim();
        const description = document.getElementById("description").value.trim();
        const dueDate = document.getElementById("dueDate").value;
        const estimatedHours = document.getElementById("estimatedHours").value;
        
        // Validation
        if (!name) {
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
        
        // Format date for display
        let formattedDate = "Not set";
        if (dueDate) {
            const date = new Date(dueDate);
            formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        }
        
        // Create project object
        const newProject = {
            id: Date.now().toString(),
            name: name,
            description: description || "No description provided",
            dueDate: formattedDate,
            estimatedHours: estimatedHours || "0",
            status: "Pending",
            tasks: [],
            taskHistory: [],
            assignedVolunteers: selectedVolunteers
        };
        
        // Save to localStorage
        localStorage.setItem('newlyCreatedProject', JSON.stringify(newProject));
        
        alert("Project created successfully!");
        
        // Reset form
        form.reset();
        selectedVolunteers = [];
        updateVolunteerCountDisplay();
        
        // Redirect to Project Details page
        window.location.href = "/frontend/admin/project-details.html";
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
    function init() {
        loadVolunteers();
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
