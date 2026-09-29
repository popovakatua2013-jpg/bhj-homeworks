const form = document.querySelector('.tasks__control');
const input = document.querySelector('.tasks__input');
const tasksList = document.querySelector('.tasks__list');

function createTask(text) {
  const task = document.createElement('div');
  task.className = 'task';

  const taskTitle = document.createElement('div');
  taskTitle.className = 'task__title';
  taskTitle.textContent = text;

  const taskRemove = document.createElement('a');
  taskRemove.href = '#';
  taskRemove.className = 'task__remove';
  taskRemove.textContent = '×';

  taskRemove.addEventListener('click', (event) => {
    event.preventDefault();
    task.remove();
  });

  task.append(taskTitle, taskRemove);
  tasksList.append(task);
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const taskText = input.value.trim();

  if (!taskText) {
    return;
  }

  createTask(taskText);
  input.value = '';
});