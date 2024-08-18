import {v4 as uuidV4} from "../_snowpack/pkg/uuid.js";
const list = document.querySelector("#list");
const form = document.getElementById("new-task-form");
const input = document.querySelector("#new-task-title");
const addButton = document.getElementById("add-button");
const removeButton = document.getElementById("remove-button");
const tasks = loadTask();
tasks.forEach(addListItem);
form?.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input?.value.trim() === "")
    return;
  const newTask = {
    id: uuidV4(),
    title: input.value.trim(),
    completed: false,
    createdAt: new Date()
  };
  tasks.push(newTask);
  addListItem(newTask);
  saveTask();
  input.value = "";
});
removeButton.addEventListener("click", () => {
  const uncheckedTasks = tasks.filter((task) => !task.completed);
  const listItems = list?.querySelectorAll("li") || [];
  listItems.forEach((item) => {
    const checkbox = item.querySelector('input[type="checkbox"]');
    if (checkbox?.checked) {
      item.remove();
    }
  });
  tasks.length = 0;
  tasks.push(...uncheckedTasks);
  saveTask();
});
function addListItem(task) {
  const item = document.createElement("li");
  item.setAttribute("data-id", task.id);
  const label = document.createElement("label");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked;
    saveTask();
  });
  label.append(checkbox, task.title);
  item.append(label);
  list?.append(item);
}
function saveTask() {
  localStorage.setItem("TASKS", JSON.stringify(tasks));
}
function loadTask() {
  const taskJSON = localStorage.getItem("TASKS");
  if (taskJSON == null)
    return [];
  try {
    return JSON.parse(taskJSON);
  } catch (error) {
    console.error("Error parsing tasks from localStorage", error);
    return [];
  }
}
