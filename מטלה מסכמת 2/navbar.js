document.addEventListener("DOMContentLoaded", function () {
  setupNavbar();
  document.addEventListener("coinsUpdated", updateNavbar);
});

function setupNavbar() {
  const guestInfo = document.getElementById("guest-info");
  const cleanButton = document.getElementById("clean-button");
  const guestDropdown = document.getElementById("guest-dropdown");

  const currentGuestName = localStorage.getItem("currentGuest");
  const visitors = JSON.parse(localStorage.getItem("visitors")) || [];

  const currentGuest = visitors.find(
    (visitor) => visitor.name === currentGuestName
  );
  guestInfo.innerHTML = currentGuest
    ? `Current Guest: ${currentGuest.name}, Coins: ${currentGuest.coins}`
    : "No Guest Selected";

  cleanButton.addEventListener("click", function () {
    const currentAnimal = localStorage.getItem("currentAnimal");
    localStorage.clear();
    localStorage.setItem("currentAnimal", currentAnimal);
    document.dispatchEvent(new CustomEvent("dataCleared"));
    window.location.reload();
  });

  guestDropdown.innerHTML = "";
  visitors.forEach((visitor) => {
    const option = document.createElement("option");
    option.value = visitor.name;
    option.textContent = visitor.name;
    option.selected = visitor.name === currentGuestName;
    guestDropdown.appendChild(option);
  });

  guestDropdown.addEventListener("change", function (event) {
    localStorage.setItem("currentGuest", event.target.value);
    document.dispatchEvent(new CustomEvent("guestChanged"));
    window.location.reload();
  });
}

function updateNavbar() {
  const guestInfo = document.getElementById("guest-info");
  const currentGuestName = localStorage.getItem("currentGuest");
  const visitors = JSON.parse(localStorage.getItem("visitors")) || [];
  const currentGuest = visitors.find(
    (visitor) => visitor.name === currentGuestName
  );

  guestInfo.innerHTML = currentGuest
    ? `Current Guest: ${currentGuest.name}, Coins: ${currentGuest.coins}`
    : "No Guest Selected";
}
