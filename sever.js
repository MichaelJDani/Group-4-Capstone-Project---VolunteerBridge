const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Serve static files from the current directory
app.use(express.static('.'));

// Sample project data
let projects = [
  { id: 1, name: 'Community Outreach', status: 'active' },
  { id: 2, name: 'Event Organization', status: 'active' },
  { id: 3, name: 'Awareness Campaigns', status: 'active' },
  { id: 4, name: 'Design Slides for Field Outreach', status: 'active' },
  { id: 5, name: 'Workshops', status: 'active' },
  { id: 6, name: 'Advocacy Programme', status: 'active' },
  { id: 7, name: 'Girls Child Campaign 1', status: 'inactive' },
  { id: 8, name: 'Field Outreach', status: 'active' },
  { id: 9, name: 'New Active Project 1', status: 'active' },
  { id: 10, name: 'New Active Project 2', status: 'active' },
  { id: 11, name: 'New Active Project 3', status: 'active' },
  { id: 12, name: 'Girl Child Campaign 2', status: 'inactive' },
];

// API endpoint for projects
app.get('/api/projects', (req, res) => {
  const { status, search } = req.query;
  let filteredProjects = projects;

  if (status) {
    filteredProjects = filteredProjects.filter(p => p.status === status);
  }

  if (search) {
    const query = search.toLowerCase();
    filteredProjects = filteredProjects.filter(p =>
      p.name.toLowerCase().includes(query)
    );
  }

  res.json(filteredProjects);
});

// API endpoint to create a new project
app.post('/api/projects', (req, res) => {
  const { name, description, startDate, endDate } = req.body;

  if (!name || !description || !startDate || !endDate) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const newProject = {
    id: projects.length + 1,
    name,
    description,
    startDate,
    endDate,
    status: 'active'
  };

  projects.push(newProject);
  res.status(201).json(newProject);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
