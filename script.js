document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    function saveTasks(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false));
    }

    function addTask(taskText = null, save = true) {
        if (taskText === null) {
            taskText = taskInput.value.trim();
        }

        if (taskText === '') {
            alert('Please enter a task!');
            return;
        }

        const listItem = document.createElement('li');
        const textSpan = document.createElement('span');
        textSpan.textContent = taskText;
        listItem.appendChild(textSpan);

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';

        removeButton.onclick = () => {
            taskList.removeChild(listItem);
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            const index = storedTasks.indexOf(taskText);
            if (index > -1) {
                storedTasks.splice(index, 1);
                saveTasks(storedTasks);
            }
        };

        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);

        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            saveTasks(storedTasks);
        }

        taskInput.value = '';
        taskInput.focus();
    }

    addButton.addEventListener('click', () => addTask(null, true));

    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask(null, true);
        }
    });

    loadTasks();
});
