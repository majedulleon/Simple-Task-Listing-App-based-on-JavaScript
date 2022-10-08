let form = document.querySelector('#task_form');
let taskList = document.querySelector('ol');
let clearBtn = document.querySelector('#clear_list');
let filter = document.querySelector('#task_filter');
let taskInput = document.querySelector('#new_task');

//Define Event Listeners
form.addEventListener('submit', addTask);
taskList.addEventListener('click', removeTask);
clearBtn.addEventListener('click', removeAll);
filter.addEventListener('keyup', taskFilter);
document.addEventListener('DOMContentLoaded', getTasks);

//Define Functions
function addTask(e) {
    if (taskInput.value === '') {
        alert('Please Enter A Task');
    }
    else {
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(taskInput.value + " "));
        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.innerHTML = 'x';
        li.appendChild(link);
        taskList.appendChild(li);

        storeTaskInLocalStorage(taskInput.value);

        taskInput.value = '';
    }
    e.preventDefault(); // Without this config line the browser reloads fast
}

function removeTask(e) {
    if (e.target.hasAttribute("href")) {
        if (confirm("Are you Sure ?")) {
            let elem = e.target.parentElement;
            elem.remove();
            removeFromLS(elem);
        }
    }
    e.preventDefault();
}

function removeAll(e) {
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    localStorage.clear();
    e.preventDefault();
}
// TASK FILTER SECTION HERE

function taskFilter(e) {
    let text = e.target.value.toLowerCase();

    document.querySelectorAll('li').forEach(task => {
        let item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        }
        else {
            task.style.display = 'none';
        }
    });
    e.preventDefault();
}

//Store In Local Storage

function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        task = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    task.preventDefault();
}

function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        task = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(task => {
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(task + " "));
        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.innerHTML = 'x';
        li.appendChild(link);
        taskList.appendChild(li);
    })
}

function removeFromLS(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        task = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    let li = taskItem;
    li.removeChild(li.lastChild);

    tasks.forEach((task, index) => {
        if (li.textContent.trim() === task) {
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    taskItem.preventDefault();
}