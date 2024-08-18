import { v4 as uuidV4 } from 'uuid';

type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
};

// Select necessary HTML elements
const list = document.querySelector<HTMLUListElement>('#list');
const form = document.getElementById('new-task-form') as HTMLFormElement | null;
const input = document.querySelector<HTMLInputElement>('#new-task-title');
const addButton = document.getElementById('add-button') as HTMLButtonElement;
const removeButton = document.getElementById(
  'remove-button',
) as HTMLButtonElement;

const tasks: Task[] = loadTask();
tasks.forEach(addListItem);

// Handle form submission (Add Task)
form?.addEventListener('submit', (e) => {
  e.preventDefault();

  if (input?.value.trim() === '') return;

  const newTask: Task = {
    id: uuidV4(),
    title: input.value.trim(),
    completed: false,
    createdAt: new Date(),
  };

  tasks.push(newTask);
  addListItem(newTask);
  saveTask();
  input.value = '';
});

// Handle remove button click (Remove Checked Tasks)
removeButton.addEventListener('click', () => {
  // Filter out completed tasks and update the tasks array
  const uncheckedTasks = tasks.filter((task) => !task.completed);

  // Update the DOM by removing checked items
  const listItems = list?.querySelectorAll('li') || [];
  listItems.forEach((item) => {
    const checkbox = item.querySelector(
      'input[type="checkbox"]',
    ) as HTMLInputElement;
    if (checkbox?.checked) {
      item.remove(); // Remove checked item from the DOM
    }
  });

  // Update the tasks array and save the updated list
  tasks.length = 0; // Clear the original array
  tasks.push(...uncheckedTasks); // Push the unchecked tasks back into the array
  saveTask(); // Update localStorage
});

// Function to add a task to the list
function addListItem(task: Task) {
  const item = document.createElement('li');
  item.setAttribute('data-id', task.id); // Add data-id attribute to link with task ID
  const label = document.createElement('label');
  const checkbox = document.createElement('input');

  checkbox.type = 'checkbox';
  checkbox.checked = task.completed;

  checkbox.addEventListener('change', () => {
    task.completed = checkbox.checked;
    saveTask();
  });

  label.append(checkbox, task.title);
  item.append(label);
  list?.append(item);
}

// Function to save tasks to localStorage
function saveTask() {
  localStorage.setItem('TASKS', JSON.stringify(tasks));
}

// Function to load tasks from localStorage
function loadTask(): Task[] {
  const taskJSON = localStorage.getItem('TASKS');
  if (taskJSON == null) return [];
  try {
    return JSON.parse(taskJSON) as Task[];
  } catch (error) {
    console.error('Error parsing tasks from localStorage', error);
    return [];
  }
}
