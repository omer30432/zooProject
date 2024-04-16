document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("create-visitor-form")
    .addEventListener("submit", createNewVisitor);

  document.getElementById("go-to-login").addEventListener("click", function () {
    window.location.href = "/login.html";
  });
});

function createNewVisitor(event) {
  event.preventDefault();

  const nameInput = document.getElementById("visitor-name");
  const name = nameInput ? nameInput.value.trim() : "";

  if (!validateFormInputs(name)) {
    alert("Please enter a name.");
    return;
  }

  let visitors = JSON.parse(localStorage.getItem("visitors")) || [];
  if (visitorExists(name, visitors)) {
    alert("A visitor with this name already exists.");
    return;
  }

  const newVisitor = makeVisitor(name);
  visitors.push(newVisitor);
  localStorage.setItem("visitors", JSON.stringify(visitors));

  alert("New visitor added successfully");

  nameInput.value = "";
}

const validateFormInputs = (name) => {
  return name !== "";
};

const visitorExists = (name, visitors) => {
  return visitors.some(
    (visitor) => visitor.name.toLowerCase() === name.toLowerCase()
  );
};

const makeVisitor = (name) => {
  return { name: name, coins: 50 };
};
