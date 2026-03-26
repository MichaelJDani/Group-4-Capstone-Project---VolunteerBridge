 const allTasks = [{
    id: 1,
    title: 'Design fliers',
    description: 'Design ten fliers for Community outreach',
    dueDate: '2023-06-30',
    estimatedHours: 2,
    status: 'Pending',
    projectId: 1
 },
{
    id: 2,  
    title: 'Arrange chairs',
    description: 'Arrange chairs for Event organisation',
    dueDate: '2023-06-30',
    estimatedHours: 2,
    status: 'Pending',
    projectId: 2
},
{
    id: 3,  
    title: 'Create Cartoon',
    description: 'Create Cartoon for Awareness campaign',
    dueDate: '2023-06-30',
    estimatedHours: 2,
    status: 'Pending',
    projectId: 3
},
{
    id: 4,  
    title: 'Design Slides',
    description: 'Design Slides for Field outreach',
    dueDate: '2023-06-30',
    estimatedHours: 2,
    status: 'Pending',
    projectId: 4
},
{
    id: 5,  
        title: 'Facilitate Workshops',
    description: 'Facilitate Workshops',
    dueDate: '2023-06-30',
    estimatedHours: 2,
    status: 'Pending',
    projectId: 5
},
{
    id: 6,  
    title: 'Facilitate Workshops',
    description: 'Facilitate Workshops',
    dueDate: '2023-06-30',
    estimatedHours: 2,
    status: 'Pending',
    projectId: 6
},
{
    id: 7,  
    title: 'Send Emails',
    description: 'Send emails for Advocacy programme',
    dueDate: '2023-06-30',
    estimatedHours: 2,
    status: 'Pending',  
    projectId: 7
},
{
    id: 8,  
    title: 'Facilitate Workshops',
    description: 'Facilitate Workshops',
    dueDate: '2023-06-30',
    estimatedHours: 2,
    status: 'Pending',
    projectId: 8
},
{
    id: 9,  
    title: 'Facilitate Workshops',
    description: 'Facilitate Workshops',
    dueDate: '2023-06-30',
    estimatedHours: 2,
    status: 'Pending',
    projectId: 9
},
{
    id: 10,  
    title: 'Facilitate Workshops',
    description: 'Facilitate Workshops',
    dueDate: '2023-06-30',
    estimatedHours: 2,
    status: 'Pending',
    projectId: 10
},
]
 

document.addEventListener('DOMContentLoaded', () => {
    const taskList = document.getElementById('taskList');
    allTasks.forEach(task => {
        const item = document.createElement('div');
        item.className = 'task';
        item.innerHTML =`
        <div class="task-title">${task.description}</div>

        <div class="menu-btn"><i class="fa-solid fa-angle-down task-dropdown"></i></div>
        <div class="dropdown">
          <div class="active-option">Pending</div>
          <div>Progress</div>
          <div>Done</div>
        </div>

        `;

     item.addEventListener("click", () => {
        window.location.href = `task-details.html?id=${task.id}`;
      });

        const dropdown = item.querySelector('.dropdown');
        const menuBtn = item.querySelector('.menu-btn');
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeAllDropdowns();
            dropdown.style.display = 'block';
        });
        dropdown.querySelectorAll('div').forEach(option => {
            option.addEventListener('click', (e) => {
                e.stopPropagation();
                dropdown.querySelectorAll('div').forEach(opt => opt.classList.remove('active-option'));
                option.classList.add('active-option');
                dropdown.style.display = 'none';
            });
        });

      taskList.appendChild(item);
    });
});
function closeAllDropdowns() {
      document.querySelectorAll(".dropdown").forEach(d => d.style.display = "none");
    }

    window.addEventListener("click", closeAllDropdowns);
