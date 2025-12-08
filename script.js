let input = document.getElementById("todoInput");
let addBtn = document.getElementById("addBtn");
let todoList = document.getElementById("todoList");

// Load todos
chrome.storage.sync.get(["todos"], (result) => {
  if (result.todos) {
    result.todos.forEach(t => addTodoToUI(t));
  }
});

// Add task
addBtn.addEventListener("click", () => {
  let task = input.value.trim();
  if (task === "") return;

  addTodoToUI(task);
  saveTodo(task);
  input.value = "";
});

// Add task to UI
function addTodoToUI(task) {
  let li = document.createElement("li");
  li.innerHTML = `${task} <span class="delete">x</span>`;

  // Delete event
  li.querySelector(".delete").addEventListener("click", () => {
    li.remove();
    deleteTodo(task);
  });

  todoList.appendChild(li);
}

// Save task to storage
function saveTodo(task) {
  chrome.storage.sync.get(["todos"], (result) => {
    let todos = result.todos || [];
    todos.push(task);
    chrome.storage.sync.set({ todos });
  });
}

// Delete task
function deleteTodo(task) {
  chrome.storage.sync.get(["todos"], (result) => {
    let todos = result.todos || [];
    todos = todos.filter(t => t !== task);
    chrome.storage.sync.set({ todos });
  });
}
