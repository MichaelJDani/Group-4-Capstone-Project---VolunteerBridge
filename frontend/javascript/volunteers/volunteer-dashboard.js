
document.addEventListener("DOMContentLoaded", async () => {
  const user = await protectRoute("volunteer");

  if (!user) return;

  document.getElementById("logout-btn").addEventListener("click", logout);
});

