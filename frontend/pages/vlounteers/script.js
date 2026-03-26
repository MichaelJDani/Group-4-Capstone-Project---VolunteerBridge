const button = document.querySelector(".submit-button button");

button.addEventListener("click", async () => {
  const name = document.getElementById("project-name").value;
  const description = document.getElementById("description").value;
  const startDate = document.getElementById("start").value;
  const endDate = document.getElementById("end").value;

  if (!name || !description || !startDate || !endDate) {
    alert("All fields are required");
    return;
  }

  button.disabled = true;
  button.textContent = "Submitting...";

  try {
    const res = await fetch("/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        description,
        startDate,
        endDate
      })
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error);
    }

    alert("Project created successfully");

    // clear inputs
    document.getElementById("project-name").value = "";
    document.getElementById("description").value = "";
    document.getElementById("start").value = "";
    document.getElementById("end").value = "";

  } catch (err) {
    alert(err.message);
  }

  button.disabled = false;
  button.textContent = "Submit";
});