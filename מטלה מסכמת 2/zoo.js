document.addEventListener("DOMContentLoaded", function () {
  generateDataset();
  setupNavbar();
  loadFilters();
  renderAvailableAnimals();

  document
    .getElementById("apply-filters")
    .addEventListener("click", applyFilters);
  const searchAnimalInput = document.getElementById("search-animal");
  searchAnimalInput.addEventListener("input", function () {
    localStorage.setItem("searchText", searchAnimalInput.value);
    renderAvailableAnimals();
  });
});

function renderAvailableAnimals() {
  const animals = JSON.parse(localStorage.getItem("animals")) || [];
  const filters = JSON.parse(localStorage.getItem("animalFilters")) || {};
  const searchValue = localStorage.getItem("searchText") || "";
  document.getElementById("search-animal").value = searchValue;

  const filteredAnimals = animals.filter(
    (animal) =>
      applyAnimalFilter(animal, filters) &&
      animal.name.toLowerCase().includes(searchValue.toLowerCase())
  );
  displayAnimals(filteredAnimals);
}

function applyFilters() {
  const weight =
    parseInt(document.getElementById("weight-filter").value, 10) || null;
  const height =
    parseInt(document.getElementById("height-filter").value, 10) || null;
  const color = document.getElementById("color-filter").value || "";
  const habitat = document.getElementById("habitat-filter").value || "";

  const filters = { weight, height, color, habitat };
  localStorage.setItem("animalFilters", JSON.stringify(filters));
  renderAvailableAnimals();
}

function loadFilters() {
  const filters = JSON.parse(localStorage.getItem("animalFilters")) || {};
  document.getElementById("weight-filter").value = filters.weight || "";
  document.getElementById("height-filter").value = filters.height || "";
  document.getElementById("color-filter").value = filters.color || "";
  document.getElementById("habitat-filter").value = filters.habitat || "";
  document.getElementById("search-animal").value =
    localStorage.getItem("searchText") || "";

  populateColorOptions();
}

function populateColorOptions() {
  const animals = JSON.parse(localStorage.getItem("animals")) || [];
  const uniqueColors = Array.from(
    new Set(animals.map((animal) => animal.color))
  ).sort();
  const colorFilterElement = document.getElementById("color-filter");
  colorFilterElement.innerHTML = '<option value="">Color</option>';

  uniqueColors.forEach((color) => {
    const option = document.createElement("option");
    option.value = color;
    option.textContent = color;
    if (filters.color === color) option.selected = true;
    colorFilterElement.appendChild(option);
  });
}

function applyAnimalFilter(animal, filters) {
  const meetsWeight = !filters.weight || animal.weight >= filters.weight;
  const meetsHeight = !filters.height || animal.height >= filters.height;
  const meetsColor =
    !filters.color ||
    animal.color.toLowerCase() === filters.color.toLowerCase();
  const meetsHabitat =
    !filters.habitat ||
    animal.habitat.toLowerCase() === filters.habitat.toLowerCase();

  return meetsWeight && meetsHeight && meetsColor && meetsHabitat;
}

function displayAnimals(filteredAnimals) {
  const container = document.getElementById("animal-cards");
  container.innerHTML = "";
  filteredAnimals.forEach((animal) => {
    const animalCard = document.createElement("div");
    animalCard.innerHTML = `
      <h3>${animal.name}</h3>
      <p>Weight: ${animal.weight}</p>
      <p>Height: ${animal.height}</p>
      <p>Color: ${animal.color}</p>
      <p>Habitat: ${animal.habitat}</p>
      <button onclick="visitAnimal('${animal.name}')">Visit</button>
    `;
    container.appendChild(animalCard);
  });
}

function visitAnimal(animalName) {
  localStorage.setItem("currentAnimal", animalName);
  window.location.href = "animal.html?name=" + encodeURIComponent(animalName);
}
