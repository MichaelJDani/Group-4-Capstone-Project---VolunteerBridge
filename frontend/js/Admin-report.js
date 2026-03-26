// DUMMY DATA 
const volunteers = [
    { name: "Emeka Okafor", tasks: 14, hours: 35, projects: 3, project: "community-clean-up", date: "2026-01-15" },
    { name: "Victory Clement", tasks: 15, hours: 25, projects: 4, project: "food-drive", date: "2026-02-10" },
    { name: "Ngozi Emeka", tasks: 14, hours: 35, projects: 3, project: "youth-mentorship", date: "2026-01-20" },
    { name: "Hassan Daniel", tasks: 14, hours: 35, projects: 3, project: "community-clean-up", date: "2026-03-05" },
    { name: "Bosede Akinola", tasks: 15, hours: 25, projects: 4, project: "health-outreach", date: "2026-02-28" },
    { name: "Kehinde Oladele", tasks: 14, hours: 35, projects: 3, project: "food-drive", date: "2026-01-30" },
];


const ITEMS_PER_PAGE = window.innerWidth >= 768 ? 6 : 3; let currentCount = ITEMS_PER_PAGE;
let filteredVolunteers = [...volunteers];


// RENDER FUNCTION 
function renderVolunteers(data, count) {

    const list = document.querySelector('.volunteers-list');
    if (!list) return;

    list.innerHTML = '';

    const toShow = data.slice(0, count);

    if (toShow.length === 0) {
        list.innerHTML = '<p class="no-results">No volunteers found.</p>';
        document.querySelector('.more-button').style.display = 'none';
        return;
    }

    toShow.forEach(function (volunteer) {

        const initials = volunteer.name
            .split(' ')
            .map(n => n[0])
            .join('');


        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
      <div class="avatar">${initials}</div>
      <p class="volunteer-name">${volunteer.name}</p>
      <div class="stats">
        <div class="stat-item">
          <span class="stat-label">Tasks</span>
          <span class="stat-value">${volunteer.tasks}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Total Hours</span>
          <span class="stat-value">${volunteer.hours}</span>
          <span class="stat-unit">hrs</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Projects</span>
          <span class="stat-value">${volunteer.projects}</span>
        </div>
      </div>
    `;

        list.appendChild(card);
    });

    const btn = document.querySelector('.more-button');

    if (data.length <= ITEMS_PER_PAGE) {
        btn.style.display = 'none';
    } else if (count >= data.length) {
        btn.style.display = 'block';
        btn.innerHTML = 'Less &#8592;';
    } else {
        btn.style.display = 'block';
        btn.innerHTML = 'More &#8594;';
    }
}


// LOAD MORE 
function loadMore() {
    const btn = document.querySelector('.more-button');

    if (btn.textContent.includes('More')) {
        currentCount += ITEMS_PER_PAGE;
        renderVolunteers(filteredVolunteers, currentCount);
        btn.innerHTML = 'Less &#8592;';
    } else {
        currentCount = ITEMS_PER_PAGE;
        renderVolunteers(filteredVolunteers, currentCount);
        btn.innerHTML = 'More &#8594;';
    }
}


//FILTER FUNCTION 
function applyFilters() {

    const projectVal = document.querySelector('#filter-select').value;


    const startVal = document.querySelector('#startDate').value;
    const endVal = document.querySelector('#endDate').value;


    filteredVolunteers = volunteers.filter(function (volunteer) {

        const matchProject = projectVal === '' ||
            volunteer.project === projectVal;


        let matchDate = true;
        if (startVal) {
            matchDate = matchDate && volunteer.date >= startVal;
        }
        if (endVal) {
            matchDate = matchDate && volunteer.date <= endVal;
        }

        return matchProject && matchDate;
    });


    currentCount = ITEMS_PER_PAGE;
    renderVolunteers(filteredVolunteers, currentCount);
}



// EXPORT CSV 
function exportCSV() {

    let csv = 'Name,Tasks Completed,Total Hours,Projects\n';

    filteredVolunteers.forEach(function (volunteer) {
        csv += `${volunteer.name},${volunteer.tasks},${volunteer.hours}hrs,${volunteer.projects}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'volunteer-report.csv';
    a.click();
    URL.revokeObjectURL(url);
}


// EXPORT PDF 
function exportPDF() {
    window.print();
}


// ===== FETCH REAL VOLUNTEERS =====
async function fetchVolunteers() {
  try {
    const response = await fetch(
      'https://volunteer-bridge-3.onrender.com/api/volunteers',
      {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc3Mzk1NTg3NywiZXhwIjoxNzc2NTQ3ODc3fQ.V-7sSGxPR3lwM12uPcBMQmuT6JVw409yrmMmq4dnJYk',
          'Content-Type': 'application/json'
        }
      }
    );

    const data = await response.json();

    if (data && data.length > 0) {
      filteredVolunteers = data.map((v, index) => {
        return {
          name: volunteers[index] ? volunteers[index].name : `Volunteer ${v.userId}`,
          tasks: volunteers[index] ? volunteers[index].tasks : 0,
          hours: volunteers[index] ? volunteers[index].hours : 0,
          projects: volunteers[index] ? volunteers[index].projects : 0,
          project: volunteers[index] ? volunteers[index].project : "community-clean-up",
          date: volunteers[index] ? volunteers[index].date : "2026-01-15"
        };
      });
    }

    renderVolunteers(filteredVolunteers, currentCount);

  } catch (error) {
    console.error('API Error:', error);
    renderVolunteers(filteredVolunteers, currentCount);
  }
}

// ===== INITIALIZE =====
fetchVolunteers();