const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

let allToDos = JSON.parse(localStorage.getItem('todos')) || [];
updateToDoList();
updateProgress();

function submitForm(e) {
  e.preventDefault();
  addToDo();
}

function addToDo() {
  const toDoText = todoInput.value.trim();
  if (toDoText) {
    allToDos.push({
      toDoText,
      completed: false
    });
    updateToDoList();
    updateProgress();
    saveToDos();
    todoInput.value = '';
  } else {
    alert('Please enter a task');
  }
}

function updateToDoList() {
  todoList.innerHTML = '';
  allToDos.forEach((todo, todoIndex) => {
    const todoItem = createToDoItem(todo, todoIndex);
    todoList.appendChild(todoItem);
    todoList.append();
  });
}

function updateProgress() {
  const completedTasks = allToDos.filter((todo) => todo.completed).length;
  const totalTasks = allToDos.length;
  document.querySelector('.header .progress-count').innerText = `${completedTasks} / ${totalTasks}`;
  const progress = (completedTasks / totalTasks) * 100;

  if (progress) {
    document.getElementById('progress').style.width = `${progress}%`;
    if (progress === 100) {
      blastConfetti();
    }
  } else {
    document.getElementById('progress').style.width = 0;
  }
}

function createToDoItem(todo, todoIndex) {
  const toDoLi = document.createElement('li');
  toDoLi.className = 'todo';
  toDoLi.innerHTML =  `
    <input type="checkbox" id="todo-${todoIndex}" onchange="changeToDoStatus(${todoIndex})">
    <label for="todo-${todoIndex}" class="custom-checkbox">
      <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="undefined"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
    </label>

    <label for="todo-${todoIndex}" class="todo-text">
      ${todo.toDoText}
    </label>

    <button class="delete-btn" onclick="deleteToDoItem(${todoIndex})">
      <svg fill="var(--secondary-color)" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="undefined"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
    </button>
  `;
  toDoLi.querySelector(`#todo-${todoIndex}`).checked = todo.completed;

  return toDoLi;
}

function deleteToDoItem(todoIndex) {
  allToDos = allToDos.filter((_, i) => {
    return i !== todoIndex
  });
  updateToDoList();
  updateProgress();
  saveToDos();
}

function changeToDoStatus(todoIndex) {
  allToDos[todoIndex].completed = !allToDos[todoIndex].completed;
  updateProgress();
  saveToDos();
}

function saveToDos() {
  localStorage.setItem('todos', JSON.stringify(allToDos));
}

function blastConfetti() {
  const count = 200,
  defaults = {
    origin: { y: 0.7 },
  };

  function fire(particleRatio, opts) {
    confetti(
      Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio),
      })
    );
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });

  fire(0.2, {
    spread: 60,
  });

  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
}
