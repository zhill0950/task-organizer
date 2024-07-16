// Tab Logic
const tabs = document.querySelectorAll(".tabs li");
const taskContainers = document.querySelectorAll(
  "#task-container > div.column"
);

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((item) => item.classList.remove("is-active"));
    tab.classList.add("is-active");

    const target = tab.dataset.target;
    taskContainers.forEach((container) => {
      if (container.getAttribute("id") === target) {
        container.classList.remove("is-hidden");
      } else {
        container.classList.add("is-hidden");
      }
    });
  });
});

// Task Management Logic
const formTitle = document.getElementById("form-title");
const formDescription = document.getElementById("form-description");
const formDueDate = document.getElementById("form-duedate");
const formPriority = document.getElementById("form-priority");

const submit = document.getElementById("submitBtn");
const clear = document.getElementById("clearBtn");

const highContainer = document.getElementById("high-content");
const medContainer = document.getElementById("medium-content");
const lowContainer = document.getElementById("low-content");

let taskCards = [];

// Function to push new user input to localStorage
function addArticle(event) {
  event.preventDefault();

  if (
    !formTitle.value ||
    !formDescription.value ||
    !formDueDate.value ||
    !formPriority.value
  ) {
    alert("Please complete the form.");
    return;
  }

  const newCard = {
    Title: formTitle.value,
    Description: formDescription.value,
    "Due Date": formDueDate.value,
    Priority: formPriority.value,
  };

  taskCards.push(newCard);

  formTitle.value = "";
  formDescription.value = "";
  formDueDate.value = "";
  formPriority.value = "";

  storeTaskCards();
  renderTaskCards();
}

// Function to render localStorage into cards
function renderTaskCards() {
  highContainer.innerHTML = "";
  medContainer.innerHTML = "";
  lowContainer.innerHTML = "";

  for (let i = 0; i < taskCards.length; i++) {
    const taskCard = taskCards[i];

    // Create Card / main container
    // Create <p class="is-size-4 p-2"> for TITLE (goes in card)
    // Create <div class="card-content p-2"> for DESCRIPTION (goes in card)
    // Create <p class="is-size-7 has-text-right" for DUE DATE (goes in card)
    // Create <footer class="card-footer"> to contain footer item (goes into card)
    // Create <p class="card-footer-item"> for DELETE (goes into card-footer)
    // Create <a> for DELETE button (goes into card-footer-item)

    const card = document.createElement("div");
    card.className = "card mb-4";

    const titleHeader = document.createElement("div");
    titleHeader.className = "card-header has-background-warning-light";

    const title = document.createElement("p");
    title.className = "is-size-5 p-2 has-text-dark is-capitalized";

    const description = document.createElement("div");
    description.className = "card-content p-2";

    const duedate = document.createElement("p");
    duedate.className = "is-size-7 has-text-right mx-2";

    const cardFooter = document.createElement("footer");
    cardFooter.className = "card-footer";

    const cardFooterItem = document.createElement("p");
    cardFooterItem.className = "card-footer-item";

    const deleteBtn = document.createElement("a");
    deleteBtn.textContent = "Delete";
    deleteBtn.setAttribute("id", "del");

    card.setAttribute("data-index", i);

    title.textContent = taskCard.Title;
    description.textContent = taskCard.Description;
    duedate.textContent = "Due: " + taskCard["Due Date"];

    titleHeader.appendChild(title);
    card.appendChild(titleHeader);
    card.appendChild(description);
    card.appendChild(duedate);
    cardFooterItem.appendChild(deleteBtn);
    cardFooter.appendChild(cardFooterItem);
    card.appendChild(cardFooter);

    if (taskCard.Priority === "HIGH") {
      highContainer.appendChild(card);
    } else if (taskCard.Priority === "MEDIUM") {
      medContainer.appendChild(card);
    } else if (taskCard.Priority === "LOW") {
      lowContainer.appendChild(card);
    }
  }

  // Attach delete event listeners to newly created cards
  attachDeleteListeners();
}

// Function to render stored user data
function init() {
  const storedTaskCards = JSON.parse(localStorage.getItem("taskCards"));
  if (storedTaskCards !== null) {
    taskCards = storedTaskCards;
  }

  renderTaskCards();
}

// Function to store user data as JSON in localStorage
function storeTaskCards() {
  localStorage.setItem("taskCards", JSON.stringify(taskCards));
}

// Submit button logic
submit.addEventListener("click", addArticle);

// Delete card logic
function attachDeleteListeners() {
  const deleteButtons = document.querySelectorAll(".card-footer-item a");

  deleteButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      const card = button.closest(".card");
      if (!card) return;

      const index = parseInt(card.getAttribute("data-index"));

      taskCards.splice(index, 1);

      storeTaskCards();
      renderTaskCards();
    });
  });
}

// Clear all cards logic
clear.addEventListener("click", clearAll);

function clearAll() {
  if (taskCards.length > 0) {
    taskCards = [];
    storeTaskCards();
    renderTaskCards();
  }
}

init();
