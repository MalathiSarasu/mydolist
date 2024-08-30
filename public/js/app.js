document.addEventListener('DOMContentLoaded', function() {
    fetchTasks();

    document.getElementById('add-task').addEventListener('click', addTask);
});

function fetchTasks() {
    fetch('/api/todos')
        .then(response => response.json())
        .then(tasks => {
            const taskList = document.getElementById('task-list');
            taskList.innerHTML = '';
            tasks.forEach(task => {
                const li = document.createElement('li');
                li.innerHTML = `
                    ${task.description}
                    <div>
                        <button class="update" onclick="updateTask(${task.id}, '${task.description}')">Update</button>
                        <button class="delete" onclick="deleteTask(${task.id})">Delete</button>
                    </div>
                `;
                taskList.appendChild(li);
            });
        });
}

function addTask() {
    const newTaskInput = document.getElementById('new-task');
    const taskDescription = newTaskInput.value;
    if (taskDescription.trim()) {
        fetch('/api/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ description: taskDescription })
        }).then(() => {
            fetchTasks();
            newTaskInput.value = '';
        });
    }
}

function deleteTask(id) {
    fetch(`/api/todos/${id}`, {
        method: 'DELETE'
    }).then(() => {
        fetchTasks();
    });
}

function updateTask(id, currentDescription) {
    const newDescription = prompt("Update task", currentDescription);
    if (newDescription && newDescription.trim()) {
        fetch(`/api/todos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ description: newDescription })
        }).then(() => {
            fetchTasks();
        });
    }
}
