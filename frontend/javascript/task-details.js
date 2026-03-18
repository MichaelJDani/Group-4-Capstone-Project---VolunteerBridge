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
];

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  const task = allTasks.find(t => t.id === parseInt(id, 10));

document.getElementById("title").textContent = task ? task.title : "Task not found";

document.getElementById("description").textContent = task ? task.description : "No details available.";
document.getElementById("dueDate").textContent = task ? task.dueDate : "No due date available.";
document.getElementById("estimatedHours").textContent = task ? task.estimatedHours : "No estimated hours available.";
document.getElementById("status").textContent = task ? task.status : "No status available.";

});