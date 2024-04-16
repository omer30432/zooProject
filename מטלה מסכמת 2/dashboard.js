document.addEventListener("DOMContentLoaded", function () {
  updateDashboard();
  document.addEventListener("guestChanged", updateDashboard);
});

function updateDashboard() {
  updateNavbar();
  renderVisitedAnimals();
  renderFedAnimals();
  renderFavoriteAnimal();
}

function renderVisitedAnimals() {
  const visitedAnimals = JSON.parse(
    localStorage.getItem("visitedAnimals") || "[]"
  );
  const list = document.querySelector("#visited-animals ul");
  list.innerHTML = "";
  visitedAnimals.forEach((animalName) => {
    const item = document.createElement("li");
    item.textContent = animalName;
    list.appendChild(item);
  });
}

function renderFedAnimals() {
  const fedAnimals = JSON.parse(localStorage.getItem("fedAnimals") || "[]");
  const list = document.querySelector("#fed-animals ul");
  fedAnimals.forEach((animal) => {
    const item = document.createElement("li");
    item.textContent = animal;
    list.appendChild(item);
  });
}

function renderFavoriteAnimal() {
  const animalVisits = JSON.parse(localStorage.getItem("animalVisits") || "{}");
  let favoriteAnimal = "";
  let maxVisits = 0;

  for (const [animalName, visits] of Object.entries(animalVisits)) {
    if (visits > maxVisits) {
      favoriteAnimal = animalName;
      maxVisits = visits;
    }
  }

  const favoriteAnimalDiv = document.getElementById("favorite-animal");
  if (favoriteAnimal && maxVisits > 0) {
    favoriteAnimalDiv.textContent = `Favorite Animal: ${favoriteAnimal} (Visited ${maxVisits} times)`;
  } else {
    favoriteAnimalDiv.textContent = "Favorite Animal: None yet!";
  }
}
