// project-details.js

// Dummy data from screenshot
const dummyProject = {
    id: "dummy-001",
    name: "Community outreach",
    description: "NGOs that focus on education and youth empowerment. He supports activities like community outreach, event organization, and awareness campaigns. Dozens of volunteers across different activities, including field outreach, workshops, and advocacy programs.",
    dueDate: "16th June, 2026",
    estimatedHours: "20 hours",
    status: "Pending",
    tasks: [
        "Design ten fliers for Community",
        "Arrange chairs for Event organization",
        "Create Cartoon for Awareness",
        "Design Slides for Field outreach"
    ],
    taskHistory: [
        "Facilitate Workshops",
        "Send emails for Advocacy"
    ]
};

// Current project data (will be updated when tasks are removed)
let currentProject = null;

// DOM Elements
let container = null;

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    container = document.getElementById('projectDetailsContainer');
    
    // Check if we came from Create Project (localStorage)
    const savedProject = localStorage.getItem('newlyCreatedProject');
    
    if (savedProject) {
        try {
            currentProject = JSON.parse(savedProject);
            // Clear localStorage so it doesn't show again on refresh
            localStorage.removeItem('newlyCreatedProject');
        } catch (e) {
            console.error('Error parsing saved project:', e);
            currentProject = { ...dummyProject };
        }
    } else {
        // Use dummy data as fallback
        currentProject = { ...dummyProject };
    }
    
    // Render the page
    renderProjectDetails();
    
    // Setup search functionality (same as design-layout)
    setupSearch();
});

// Render the entire project details view
function renderProjectDetails() {
    if (!container) return;
    
    const html = `
        <!-- Project Name -->
        <div class="project-name-label">Project name</div>
        <div class="project-name">${escapeHtml(currentProject.name)}</div>
        
        <!-- Description -->
        <div class="project-description">
            ${escapeHtml(currentProject.description)}
        </div>
        
        <!-- Info Row -->
        <div class="project-info-row">
            <div class="info-item">
                <div class="info-label">Due date</div>
                <div class="info-value">${escapeHtml(currentProject.dueDate)}</div>
            </div>
            <div class="info-item">
                <div class="info-label">Estimated hours</div>
                <div class="info-value">${escapeHtml(currentProject.estimatedHours)}</div>
            </div>
            <div class="info-item">
                <div class="info-label">Status</div>
                <div class="info-value">${escapeHtml(currentProject.status)}</div>
            </div>
        </div>
        
        <!-- Task List Section -->
        <div class="task-section">
            <div class="section-title">Task list</div>
            ${renderTaskList()}
        </div>
        
        <!-- Action Buttons -->
        <div class="action-buttons">
            <button class="action-btn" id="createTaskBtn"><i class="fa-solid fa-plus"></i> Create Task</button>
            <button class="action-btn" id="editProjectBtn"><i class="fa-solid fa-pen"></i> Edit Project</button>
            <button class="action-btn" id="editTaskBtn"><i class="fa-solid fa-pen"></i> Edit Task</button>
            <button class="action-btn" id="viewVolunteersBtn"><i class="fa-solid fa-users"></i> View Volunteers</button>
        </div>
        
        <!-- Task History Section -->
        <div class="task-section">
            <div class="section-title">Task History</div>
            ${renderTaskHistory()}
        </div>
    `;
    
    container.innerHTML = html;
    
    // Attach event listeners
    attachButtonListeners();
    attachTaskRemoveListeners();
}

// Render task list with X icons
function renderTaskList() {
    if (!currentProject.tasks || currentProject.tasks.length === 0) {
        return '<div class="empty-state">No pending tasks. Create a new task to get started.</div>';
    }
    
    let html = '<ul class="task-list">';
    currentProject.tasks.forEach((task, index) => {
        html += `
            <li class="task-item" data-task-index="${index}">
                <span class="task-name">${escapeHtml(task)}</span>
                <span class="task-remove" data-task-index="${index}">
                    <i class="fa-solid fa-times"></i>
                </span>
            </li>
        `;
    });
    html += '</ul>';
    return html;
}

// Render task history with [Done] badges
function renderTaskHistory() {
    if (!currentProject.taskHistory || currentProject.taskHistory.length === 0) {
        return '<div class="empty-state">No completed tasks yet.</div>';
    }
    
    let html = '<ul class="history-list">';
    currentProject.taskHistory.forEach(task => {
        html += `
            <li class="history-item">
                ${escapeHtml(task)} <span class="done-badge">[Done]</span>
            </li>
        `;
    });
    html += '</ul>';
    return html;
}

// Attach listeners to action buttons
function attachButtonListeners() {
    const createTaskBtn = document.getElementById('createTaskBtn');
    const editProjectBtn = document.getElementById('editProjectBtn');
    const editTaskBtn = document.getElementById('editTaskBtn');
    const viewVolunteersBtn = document.getElementById('viewVolunteersBtn');
    
    if (createTaskBtn) {
        createTaskBtn.addEventListener('click', () => {
            console.log('Create Task clicked - opens create task modal/page');
            // TODO: Navigate to create task page or open modal
            // window.location.href = 'create-task.html?projectId=' + currentProject.id;
        });
    }
    
    if (editProjectBtn) {
        editProjectBtn.addEventListener('click', () => {
            console.log('Edit Project clicked - opens edit project form');
            // TODO: Open edit project modal or navigate to edit page
        });
    }
    
    if (editTaskBtn) {
        editTaskBtn.addEventListener('click', () => {
            console.log('Edit Task clicked - task selection not implemented yet');
            // TODO: Implement task selection logic first
        });
    }
    
    if (viewVolunteersBtn) {
        viewVolunteersBtn.addEventListener('click', () => {
            console.log('View Volunteers clicked - shows volunteers assigned to this project');
            // TODO: Fetch and display volunteers for this project
        });
    }
}

// Attach listeners to task remove (X) icons
function attachTaskRemoveListeners() {
    const removeIcons = document.querySelectorAll('.task-remove');
    
    removeIcons.forEach(icon => {
        icon.addEventListener('click', (event) => {
            event.stopPropagation();
            const taskIndex = icon.getAttribute('data-task-index');
            
            if (taskIndex !== null && currentProject.tasks[taskIndex]) {
                const removedTask = currentProject.tasks[taskIndex];
                console.log(`Removed task: "${removedTask}"`);
                
                // Option A: Delete the task completely
                currentProject.tasks.splice(taskIndex, 1);
                
                // Re-render the page to reflect changes
                renderProjectDetails();
            }
        });
    });
}

// Setup search functionality (matches design-layout)
function setupSearch() {
    const searchInput = document.getElementById('projectSearch');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            console.log('Search projects:', searchTerm);
            // TODO: Implement project search functionality
            // This would typically filter a list of projects or navigate
        });
    }
}

// Helper function to escape HTML to prevent XSS
function escapeHtml(str) {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}