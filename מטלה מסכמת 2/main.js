let visitors = [
  { name: "John Smith", coins: 50, imageUrl: "imgs/JohnSmith-login.webp" },
  {
    name: "Emily Johnson",
    coins: 50,
    imageUrl: "imgs/EmilyJohnson-login.webp",
  },
  {
    name: "Michael Williams",
    coins: 50,
    imageUrl: "imgs/MichaelWilliams-login.webp",
  },
  {
    name: "Jessica Brown",
    coins: 50,
    imageUrl: "imgs/jessicaBrown-login.webp",
  },
  {
    name: "Christopher Jones",
    coins: 50,
    imageUrl: "imgs/ChristopherJones-login.webp",
  },
  { name: "Ashley Davis", coins: 50, imageUrl: "imgs/AshleyDavis-login.webp" },
  {
    name: "Matthew Miller",
    coins: 50,
    imageUrl: "imgs/MatthewMiller-login.webp",
  },
  {
    name: "Amanda Wilson",
    coins: 50,
    imageUrl: "imgs/AmandaWilson-login.webp",
  },
  { name: "David Moore", coins: 50, imageUrl: "imgs/DavidMoore-login.webp" },
  { name: "Sarah Taylor", coins: 50, imageUrl: "imgs/sarahtaylor-login.webp" },
  {
    name: "James Anderson",
    coins: 50,
    imageUrl: "imgs/jamesAnderson-login.webp",
  },
  {
    name: "Jennifer Thomas",
    coins: 50,
    imageUrl: "imgs/JenniferThomas-login.webp",
  },
  {
    name: "Robert Jackson",
    coins: 50,
    imageUrl: "imgs/RobertJackson-login.webp",
  },
  {
    name: "Elizabeth White",
    coins: 50,
    imageUrl: "imgs/ElizabethWhite-login.webp",
  },
  {
    name: "Daniel Harris",
    coins: 50,
    imageUrl: "imgs/DanielHarris-login.webp",
  },
  {
    name: "Melissa Martin",
    coins: 50,
    imageUrl: "imgs/MelissaMartin-login.webp",
  },
  {
    name: "William Thompson",
    coins: 50,
    imageUrl: "imgs/WilliamThompson-login.webp",
  },
  { name: "Linda Garcia", coins: 50, imageUrl: "imgs/LindaGarcia-login.webp" },
  {
    name: "Joseph Martinez",
    coins: 50,
    imageUrl: "imgs/JosephMartinez-login.webp",
  },
  {
    name: "Karen Robinson",
    coins: 50,
    imageUrl: "imgs/KarenRobinson-login.webp",
  },
];

let animals = [
  {
    name: "Lion",
    isPredator: true,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",
    imageUrl: "imgs/lion-catalog-animal.jpg",
  },
  {
    name: "Elephant",
    isPredator: false,
    weight: 1200,
    height: 200,
    color: "grey",
    habitat: "land",
    imageUrl: "imgs/elephent-catalog-animal.webp",
  },
  {
    name: "Giraffe",
    isPredator: false,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",
    imageUrl: "imgs/giraffe-catalog-animal.webp",
  },
  {
    name: "Tiger",
    isPredator: true,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",
    imageUrl: "imgs/tiger-catalog-animal.webp",
  },
  {
    name: "Monkey",
    isPredator: false,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",
    imageUrl: "imgs/monkey-catalog-animal.webp",
  },
  {
    name: "Kangaroo",
    isPredator: false,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",
    imageUrl: "imgs/Kangaroo-catalog-animal.webp",
  },
  {
    name: "Penguin",
    isPredator: false,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "sea",
    imageUrl: "imgs/penguin-catalog-animal.webp",
  },
  {
    name: "Zebra",
    isPredator: false,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",
    imageUrl: "imgs/zebra-catalog-animal.webp",
  },
  {
    name: "Cheetah",
    isPredator: true,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",
    imageUrl: "imgs/cheeta-catalog-animal.webp",
  },
  {
    name: "Panda",
    isPredator: false,
    weight: 100,
    height: 120,
    color: "black and white",
    habitat: "land",
    imageUrl: "imgs/panda-catalog-animal.webp",
  },
  {
    name: "Koala",
    isPredator: false,
    weight: 100,
    height: 120,
    color: "grey",
    habitat: "land",
    imageUrl: "imgs/koala-catalog-animal.webp",
  },
  {
    name: "Grizzly Bear",
    isPredator: true,
    weight: 1000,
    height: 180,
    color: "brown",
    habitat: "land",
    imageUrl: "imgs/GrizzlyBear-catalog-animal.webp",
  },
  {
    name: "Hippopotamus",
    isPredator: false,
    weight: 2000,
    height: 150,
    color: "grey",
    habitat: "sea",
    imageUrl: "imgs/Hippopotamus-catalog-animal.webp",
  },
  {
    name: "Crocodile",
    isPredator: true,
    weight: 500,
    height: 100,
    color: "green",
    habitat: "sea",
    imageUrl: "imgs/Crocodile-catalog-animal.webp",
  },
];

function generateDataset() {
  if (!localStorage.getItem("visitors")) {
    localStorage.setItem("visitors", JSON.stringify(visitors));
  } else {
    visitors = JSON.parse(localStorage.getItem("visitors"));
  }
  if (!localStorage.getItem("animals")) {
    localStorage.setItem("animals", JSON.stringify(animals));
  } else {
    animals = JSON.parse(localStorage.getItem("animals"));
  }
  console.log("Visitors and Animals loaded into local storage.");
}

function logout() {
  localStorage.removeItem("currentGuest");
  alert("You have been logged out.");
  window.location.href = "/login.html";
}

generateDataset();
