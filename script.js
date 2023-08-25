const form = document.getElementById("form");
const input = document.getElementById("item-input");
const list = document.getElementById("item-list");
const filter = document.getElementById("filter");
const clearBtn = document.getElementById("clear");

function displayItems() {
  const addItemToStorage = getItemsFromStorage();

  addItemToStorage.forEach((item) => addItemToDOM(item));

  checkUI();
}

function addItem(e) {
  e.preventDefault();

  const newItemInput = input.value;

  // Validate Input
  if (newItemInput.value === "") {
    alert("Please add an item");
    return;
  }

  //Creates item Dom element
  addItemToDOM(newItemInput);

  //Add item to local storage
  addItemToStorage(newItemInput);

  checkUI();

  //   Clear item input
  input.value = "";
}

function addItemToDOM(item) {
  // Create list item
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(item));

  const button = createButton("remove-item btn-link");

  li.appendChild(button);

  //   Add to DOM
  list.appendChild(li);
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

function addItemToStorage(item) {
  const addItemToStorage = getItemsFromStorage();

  //Add new item to array
  addItemToStorage.push(item);

  // Conver to JSON string and set to local storage
  localStorage.setItem("items", JSON.stringify(addItemToStorage));
}

// Get Items from Local Storage
function getItemsFromStorage() {
  let addItemToStorage;

  if (localStorage.getItem("items") === null) {
    addItemToStorage = [];
  } else {
    addItemToStorage = JSON.parse(localStorage.getItem("items"));
  }

  return addItemToStorage;
}

// Targets the li to be removed when the icon is click
function removeItem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();

      checkUI();
    }
  }
}

function clearItems() {
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }

  checkUI();
}

function filterItems(e) {
  const listItems = list.querySelectorAll("li");
  const text = e.target.value.toLowerCase();

  listItems.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();

    if (itemName.indexOf(text) != -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

function checkUI() {
  const listItems = list.querySelectorAll("li");

  if (listItems.length === 0) {
    filter.style.display = "none";
    clearBtn.style.display = "none";
  } else {
    filter.style.display = "block";
    clearBtn.style.display = "block";
  }
}

// Initialize app
function init() {
  //Event Listeners
  form.addEventListener("submit", addItem);
  list.addEventListener("click", removeItem);
  clearBtn.addEventListener("click", clearItems);
  filter.addEventListener("input", filterItems);
  document.addEventListener("DOMContentLoaded", displayItems);

  checkUI();
}

init();
