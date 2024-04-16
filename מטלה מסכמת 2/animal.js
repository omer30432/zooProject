document.addEventListener("DOMContentLoaded", function () {
  renderAnimal();
  setupNavbar();
  renderRelatedAnimals();
  document.getElementById("feed-animal").addEventListener("click", feedAnimal);
  trackVisit();
});

function renderAnimal() {
  const animalName = localStorage.getItem("currentAnimal");
  const animals = JSON.parse(localStorage.getItem("animals"));
  const animal = animals.find((a) => a.name === animalName);

  if (animal) {
    document.getElementById("name").textContent = animal.name;
    document.getElementById(
      "weight"
    ).textContent = `Weight: ${animal.weight}kg`;
    document.getElementById(
      "height"
    ).textContent = `Height: ${animal.height}cm`;
    document.getElementById("color").textContent = `Color: ${animal.color}`;
    document.getElementById(
      "habitat"
    ).textContent = `Habitat: ${animal.habitat}`;
    document.getElementById("isPredator").textContent = animal.isPredator
      ? "Diet: Carnivorous"
      : "Diet: Herbivore";

    document.getElementById(
      "image"
    ).innerHTML = `<img src="${animal.imageUrl}" alt="${animal.name}" style="max-width:100%;"/>`;
  }
}

function feedAnimal() {
  const currentGuestName = localStorage.getItem("currentGuest");
  let visitors = JSON.parse(localStorage.getItem("visitors"));
  let guestIndex = visitors.findIndex(
    (visitor) => visitor.name === currentGuestName
  );

  const currentAnimalName = localStorage.getItem("currentAnimal");
  const animals = JSON.parse(localStorage.getItem("animals"));
  const animal = animals.find((animal) => animal.name === currentAnimalName);

  if (guestIndex !== -1 && visitors[guestIndex].coins >= 2) {
    localStorage.setItem("visitors", JSON.stringify(visitors));
    alert("Thank you for feeding the animal.");
    document.dispatchEvent(new CustomEvent("coinsUpdated"));
    trackFedAnimal(currentAnimalName);
  } else {
    if (animal.isPredator) {
      visitors.splice(guestIndex, 1);
      localStorage.setItem("visitors", JSON.stringify(visitors));

      logout();
    } else {
      const animalIndex = animals.findIndex(
        (animal) => animal.name === currentAnimalName
      );
      if (animalIndex !== -1) {
        animals.splice(animalIndex, 1);
        localStorage.setItem("animals", JSON.stringify(animals));
        alert("The animal has escaped from the zoo!");
        window.location.href = "/zoo.html";
      }
    }
  }
}

function trackVisit() {
  const currentAnimalName = localStorage.getItem("currentAnimal");
  let visitedAnimals = JSON.parse(
    localStorage.getItem("visitedAnimals") || "[]"
  );

  if (!visitedAnimals.includes(currentAnimalName)) {
    visitedAnimals.push(currentAnimalName);
    localStorage.setItem("visitedAnimals", JSON.stringify(visitedAnimals));
  }

  let animalVisits = JSON.parse(localStorage.getItem("animalVisits") || "{}");
  animalVisits[currentAnimalName] = (animalVisits[currentAnimalName] || 0) + 1;
  localStorage.setItem("animalVisits", JSON.stringify(animalVisits));
}

function trackFedAnimal(animalName) {
  let fedAnimals = JSON.parse(localStorage.getItem("fedAnimals") || "[]");

  if (!fedAnimals.includes(animalName)) {
    fedAnimals.push(animalName);
    localStorage.setItem("fedAnimals", JSON.stringify(fedAnimals));
  }
}

function updateVisitors(visitors) {
  localStorage.setItem("visitors", JSON.stringify(visitors));
  document.dispatchEvent(new CustomEvent("updateNavbar"));
}

function visitorGotEaten(guest, visitors) {
  const index = visitors.findIndex((v) => v.name === guest.name);
  if (index > -1) {
    visitors.splice(index, 1);
    localStorage.setItem("visitors", JSON.stringify(visitors));
    alert("The visitor has been eaten!");
    window.location.href = "/login.html";
  }
}

function animalEscaped(animal, animals) {
  const index = animals.findIndex((a) => a.name === animal.name);
  if (index > -1) {
    animals.splice(index, 1);
    localStorage.setItem("animals", JSON.stringify(animals));
    alert("The animal has escaped!");
    window.location.href = "/zoo.html";
  }
}

function renderRelatedAnimals() {
  const currentAnimalName = localStorage.getItem("currentAnimal");
  const animals = JSON.parse(localStorage.getItem("animals"));
  const currentAnimal = animals.find((a) => a.name === currentAnimalName);
  const relatedAnimals = animals.filter(
    (a) => a.habitat === currentAnimal.habitat && a.name !== currentAnimalName
  );

  const relatedContainer = document.getElementById("related-animals");
  relatedContainer.innerHTML = "";

  relatedAnimals.forEach((animal) => {
    const animalDiv = document.createElement("button");
    animalDiv.textContent = animal.name;
    animalDiv.classList.add("related-animal-button");
    animalDiv.addEventListener("click", () => {
      localStorage.setItem("currentAnimal", animal.name);
      window.location.reload();
    });
    relatedContainer.appendChild(animalDiv);
  });
}
