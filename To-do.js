// Select the input element where the user will type the new task
const newTaskInput = document.getElementById('new-task');

// Select the button element that the user will click to add a new task
const addTaskButton = document.getElementById('add-task');

// Select the unordered list (<ul>) element where the tasks will be displayed
const todoList = document.getElementById('todo-list');

// Add Task Event Listener
addTaskButton.addEventListener('click', () => {
    // Capture and trim the value from the input field to remove any leading or trailing whitespace
    const taskText = newTaskInput.value.trim();
    if (taskText) {
        // Call addTask(taskText) to add the task to the list
        addTask(taskText);
        // Clear the input field
        newTaskInput.value = '';
        // Call saveTasks() to save the current list of tasks to localStorage
        saveTasks();
    }
});

// Add Task Function
function addTask(taskText, completed = false) {
    // Create a new <li> element and assign it the class todo-item
    const taskItem = document.createElement('li');
    taskItem.className = 'todo-item';
    if (completed) {
        taskItem.classList.add('completed');
    }
    // Set the inner HTML of the new <li> element to include
    taskItem.innerHTML = `
        <span>${taskText}</span>
        <button onclick="toggleTask(this)">Done</button>
        <button onclick="removeTask(this)">Remove</button>
    `;
    //Append the new task item to the todoList <ul> element
    todoList.appendChild(taskItem);
}

// Toggle Task Function
function toggleTask(button) {
    // Select the parent <li> element of the clicked button
    const taskItem = button.parentElement;
    // Toggle the completed class on the parent <li> element
    taskItem.classList.toggle('completed');
    // Save the updated list of tasks to localStorage
    saveTasks();
}

// Remove Task Function
function removeTask(button) {
    // Select the parent <li> element of the clicked button
    const taskItem = button.parentElement;
    // Remove the parent <li> element from the DOM
    taskItem.remove();
    // Save the updated list of tasks to localStorage
    saveTasks();
}

// Save Tasks Function
function saveTasks() {
    // Initialize an empty tasks array
    const tasks = [];
    // Iterate over all elements with the class todo-item
    document.querySelectorAll('.todo-item').forEach(item => {
        // For each task item, push an object containing
        tasks.push({
            text: item.querySelector('span').innerText, // The task text from the <span> element
            completed: item.classList.contains('completed') // A boolean indicating whether the task is completed (has the completed class)
        });
    });
    // Convert the tasks array to a JSON string and save it in localStorage under the key tasks
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load Tasks Function
function loadTasks() {
    // Parse the tasks from localStorage
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    // If there are tasks, iterate over each and add it to the list
    if (tasks) {
        tasks.forEach(task => addTask(task.text, task.completed));
    }
}

// Load tasks from localStorage when the page loads
loadTasks();
