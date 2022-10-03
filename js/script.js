let form = document.querySelector('#task_form');
let taskList = document.querySelector('ul');
let clearBtn = document.querySelector('#clear_list');
let filter = document.querySelector('#task_filter');
let taskInput = document.querySelector('#new_task');

//Define Event Listeners
form.addEventListener('submit', addTask);
taskList.addEventListener('click', removeTask);

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
        taskInput.value = '';
    }
    e.preventDefault(); // Without this config line the browser reloads fast
}

function removeTask(e) {
    if (e.target.hasAttribute("href")) {
        if (confirm("Are you Sure ?")) {
            console.log(e.target);
        }
    }

}