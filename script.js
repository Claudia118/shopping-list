const form = document.getElementById("form");
const input = document.getElementById("item-input");
const list = document.getElementById("item-list");

function addItem(e) {
  e.preventDefault();

  const newItemInput = input.value;

  // Validate Input
  if (newItemInput.value === "") {
    alert("Please add an item");
    return;
  }

  // Create list item
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(newItemInput));

  const button = createButton("remove-item btn-link");

  li.appendChild(button);

  //   Add to DOM
  list.appendChild(li);

  //   Clear item input
  input.value = "";
}

function createButton(classes) {
  const button = document.createElement("button");
  button.className = classes;
  const icon = createBtnIcon("fa-solid fa-xmark");
  button.appendChild(icon);

  return button;
}

function createBtnIcon(classes) {
  const icon = document.createElement("i");
  icon.className = classes;

  return icon;
}

//Event Listeners
form.addEventListener("submit", addItem);
