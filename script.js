document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("todoInput");
  const addBtn = document.getElementById("addBtn");
  const todoList = document.getElementById("todoList");

  // Load todos
  chrome.storage.sync.get(["todos"], (result) => {
    if (result.todos) {
      result.todos.forEach(t => addTodoToUI(t));
    }
  });

  // Add task
  addBtn.addEventListener("click", () => {
    let task = input.value.trim();
    if (!task) return;

    addTodoToUI(task);
    saveTodo(task);
    input.value = "";
  });

  function addTodoToUI(task) {
    const li = document.createElement("li");
    li.textContent = task;

    const delSpan = document.createElement("span");
    delSpan.textContent = " x";
    delSpan.className = "delete";
    delSpan.style.cursor = "pointer";
    li.appendChild(delSpan);

    // Delete event
    delSpan.addEventListener("click", () => {
      li.remove();
      deleteTodo(task);
    });

    todoList.appendChild(li);
  }

  function saveTodo(task) {
    chrome.storage.sync.get(["todos"], (result) => {
      let todos = result.todos || [];
      todos.push(task);
      chrome.storage.sync.set({ todos });
    });
  }

  function deleteTodo(task) {
    chrome.storage.sync.get(["todos"], (result) => {
      let todos = result.todos || [];
      todos = todos.filter(t => t !== task);
      chrome.storage.sync.set({ todos });
    });
  }
});
