document.addEventListener("DOMContentLoaded", function () {
  // Immediately check for an existing guest
  checkForExistingGuest();

  // Reload visitors array from localStorage to ensure it's up to date
  const visitors = JSON.parse(localStorage.getItem("visitors")) || [];
  displayGuests(visitors);

  document
    .getElementById("search-guest")
    .addEventListener("input", function (e) {
      const searchText = e.target.value.toLowerCase();
      const filteredGuests = visitors.filter((visitor) =>
        visitor.name.toLowerCase().includes(searchText)
      );
      displayGuests(filteredGuests);
    });
});

function displayGuests(guestList) {
  const container = document.getElementById("guests-container");
  container.innerHTML = "";

  guestList.forEach((guest) => {
    const guestElement = document.createElement("div");
    guestElement.className = "guest-card";
    guestElement.innerHTML = `
      <img src="${guest.imageUrl}" alt="${guest.name}" style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover;" />
      <p>Name: ${guest.name}</p>
      <p>Coins: ${guest.coins}</p>
      <button onclick="loginAsVisitor('${guest.name}')">Login as ${guest.name}</button>
    `;
    container.appendChild(guestElement);
  });
}

function loginAsVisitor(visitorName) {
  localStorage.setItem("currentGuest", visitorName);
  alert(`${visitorName} logged in successfully!`);
  window.location.href = "/zoo.html";
}

function checkForExistingGuest() {
  const currentGuest = localStorage.getItem("currentGuest");
  if (currentGuest) {
    const confirmLogout = confirm(
      `There is already a selected guest: ${currentGuest}. Do you want to disconnect?`
    );
    if (confirmLogout) {
      logout();
    }
  }
}

function logout() {
  localStorage.removeItem("currentGuest");
  alert("You have been logged out.");
  window.location.reload();
}
