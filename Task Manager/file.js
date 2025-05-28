let tasks = [];

function addTask() {
  const input = document.getElementById('taskInput');
  const name = input.value.trim();
  if (name === '') return;

  tasks.push({ name, status: 'todo' });
  input.value = '';
  renderTasks();
}

function renderTasks() {
  const list = document.getElementById('taskList');
  list.innerHTML = '';

  const filter = document.getElementById('filter').value;
  const search = document.getElementById('search').value.toLowerCase();

  const filteredTasks = tasks.filter(task => {
    const matchesFilter = filter === 'all' || task.status === filter;
    const matchesSearch = task.name.toLowerCase().includes(search);
    return matchesFilter && matchesSearch;
  });

  filteredTasks.forEach((task, index) => {
    const li = document.createElement('li');

    const span = document.createElement('span');
    span.textContent = task.name;
    if (task.status === 'done') span.classList.add('completed');

    const select = document.createElement('select');
    ['todo', 'in-progress', 'done'].forEach(state => {
      const option = document.createElement('option');
      option.value = state;
      option.textContent = state === 'todo' ? 'Da fare' : state === 'in-progress' ? 'In corso' : 'Completata';
      if (task.status === state) option.selected = true;
      select.appendChild(option);
    });
    select.onchange = () => {
      tasks[index].status = select.value;
      renderTasks();
    };

    const actions = document.createElement('div');
    actions.className = 'task-actions';

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Modifica';
    editBtn.onclick = () => {
      const newName = prompt('Modifica attività:', task.name);
      if (newName !== null && newName.trim() !== '') {
        tasks[index].name = newName.trim();
        renderTasks();
      }
    };

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Elimina';
    delBtn.onclick = () => {
      tasks.splice(index, 1);
      renderTasks();
    };

    actions.appendChild(select);
    actions.appendChild(editBtn);
    actions.appendChild(delBtn);

    li.appendChild(span);
    li.appendChild(actions);
    list.appendChild(li);
  });
}

function filterTasks() {
  renderTasks();
}
