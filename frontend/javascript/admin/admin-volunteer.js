const volunteerContainer = document.getElementById("volunteerContainer");

async function fetchvolunteers() {
    let response = await fetch("https://localhost/5000/api/volunteers")
    let volunteers = await response.json();
    console.log(volunteers)
}
async function fetchpost() {
    let response = await fetch("http://localhost/5000/api/volunteers");
    if (!response.ok) {
         console.error("Failed to fetch volunteers:", response.status)
    }
    let volunteers = await response.json();
    console.log(volunteers)
    volunteerContainer.forEach((volunteer) => {
        const volunteerElement = `<div class="volunteerContainer">
        <h3>${volunteer.name}</h3>
        <p>${volunteer.email}</p>
        </div>`;
        volunteerContainer.innerHTML += volunteerElement;
    })
}
fetchpost()