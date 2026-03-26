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

let currentProject = null;
let container = null;

// Initialize
document.addEventListener('DOMContentLoaded', function () {
    container = document.getElementById('projectDetailsContainer');

    if (!container) {
        console.error('projectDetailsContainer not found');
        return;
    }

    const savedProject = localStorage.getItem('newlyCreatedProject');

    if (savedProject) {
        try {
            currentProject = JSON.parse(savedProject);
            localStorage.removeItem('newlyCreatedProject');
        } catch (e) {
            console.error('Error parsing saved project:', e);
            currentProject = { ...dummyProject };
        }
    } else {
        currentProject = { ...dummyProject };
    }

    renderProjectDetails();
});

// Render page
function renderProjectDetails() {
    const html = `
        <!-- Project Name -->
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
        
        <!-- Task List -->
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
        
        <!-- Task History -->
        <div class="task-section">
            <div class="section-title">Task History</div>
            ${renderTaskHistory()}
        </div>
    `;

    container.innerHTML = html;

    attachButtonListeners();
    attachTaskRemoveListeners();
}

// Task list
function renderTaskList() {
    if (!currentProject.tasks || currentProject.tasks.length === 0) {
        return '<div class="empty-state">No pending tasks. Create a new task to get started.</div>';
    }

    let html = '<ul class="task-list">';
    currentProject.tasks.forEach((task, index) => {
        html += `
            <li class="task-item">
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

// Task history
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

// Buttons
function attachButtonListeners() {
    const createTaskBtn = document.getElementById('createTaskBtn');
    const editProjectBtn = document.getElementById('editProjectBtn');
    const editTaskBtn = document.getElementById('editTaskBtn');
    const viewVolunteersBtn = document.getElementById('viewVolunteersBtn');

    if (createTaskBtn) {
        createTaskBtn.addEventListener('click', () => {
            console.log('Create Task clicked');
        });
    }

    if (editProjectBtn) {
        editProjectBtn.addEventListener('click', () => {
            console.log('Edit Project clicked');
        });
    }

    if (editTaskBtn) {
        editTaskBtn.addEventListener('click', () => {
            console.log('Edit Task clicked');
        });
    }

    if (viewVolunteersBtn) {
        viewVolunteersBtn.addEventListener('click', () => {
            console.log('View Volunteers clicked');
        });
    }
}

// Remove task
function attachTaskRemoveListeners() {
    const removeIcons = document.querySelectorAll('.task-remove');

    removeIcons.forEach(icon => {
        icon.addEventListener('click', (event) => {
            event.stopPropagation();

            const taskIndex = parseInt(icon.getAttribute('data-task-index'), 10);

            if (!isNaN(taskIndex) && currentProject.tasks[taskIndex]) {
                currentProject.tasks.splice(taskIndex, 1);
                renderProjectDetails();
            }
        });
    });
}

// Escape HTML
function escapeHtml(str) {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}