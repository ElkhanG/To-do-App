let tasks = [];
let taskOrder = [];
let currentSortState = 0;

function addOrToggleInput() {
  const taskInput = document.getElementById('new-task-input');
  const inputContainer = document.getElementById('input-container');

  if (inputContainer.style.display === 'none' || inputContainer.style.display === '') {
    inputContainer.style.display = 'flex';
    taskInput.focus();
  } else {
    addTask();
  }
}

function addTask() {
  const taskInput = document.getElementById('new-task-input');
  const taskText = taskInput.value.trim();

  if (taskText) {
    tasks.push(taskText);
    taskOrder = [...tasks];
    taskInput.value = '';
    renderTasks();

    const inputContainer = document.getElementById('input-container');
    inputContainer.style.display = 'none';
  }
}

function renderTasks() {
  const todoList = document.getElementById('todo-list');
  todoList.innerHTML = '';

  tasks.forEach((task, index) => {
    const listItem = document.createElement('li');
    listItem.className = 'todo-item';
    listItem.draggable = true;
    listItem.setAttribute('data-index', index);

    const taskText = document.createElement('span');
    taskText.textContent = task;

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = '×';
    deleteBtn.onclick = () => deleteTask(index);

    listItem.appendChild(taskText);
    listItem.appendChild(deleteBtn);
    todoList.appendChild(listItem);

    addDragAndDropHandlers(listItem);
  });
}

function deleteTask(index) {
  tasks.splice(index, 1);
  taskOrder = [...tasks];
  renderTasks();
}

function toggleSort() {
  if (currentSortState === 0) {
    tasks.sort((a, b) => a.localeCompare(b));
    currentSortState = 1;
  } else if (currentSortState === 1) {
    tasks.sort((a, b) => b.localeCompare(a));
    currentSortState = 2;
  } else {
    tasks = [...taskOrder];
    currentSortState = 0;
  }
  renderTasks();
}

function addDragAndDropHandlers(item) {
  item.addEventListener('dragstart', handleDragStart);
  item.addEventListener('dragover', handleDragOver);
  item.addEventListener('drop', handleDrop);
  item.addEventListener('dragend', handleDragEnd);
}

let draggedItem = null;

function handleDragStart(e) {
  draggedItem = this;
  setTimeout(() => (this.style.display = 'none'), 0);
}

function handleDragOver(e) {
  e.preventDefault();
}

function handleDrop(e) {
  e.preventDefault();
  const todoList = document.getElementById('todo-list');
  const draggedIndex = parseInt(draggedItem.getAttribute('data-index'));
  const targetIndex = parseInt(this.getAttribute('data-index'));

  const draggedTask = tasks.splice(draggedIndex, 1)[0];
  tasks.splice(targetIndex, 0, draggedTask);

  taskOrder = [...tasks];
  renderTasks();
}

function handleDragEnd() {
  this.style.display = 'flex';
  draggedItem = null;
}

document.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.getElementById('new-task-input');

  taskInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  });

  const inputContainer = document.getElementById('input-container');
  inputContainer.style.display = 'flex';

  renderTasks();
});
