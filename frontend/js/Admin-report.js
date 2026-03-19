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


// initialize the page
renderVolunteers(filteredVolunteers, currentCount);