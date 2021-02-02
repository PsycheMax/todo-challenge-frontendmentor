
function populateToDo(object) {
    let newText = object.text;
    // let newCompleted = object.completed;
    let newPosition = object.position;
    let toReturn = `
    <div class="to-do" draggable="true" ondragstart="dragStart(event)" ondragend="dragEnd(event)">
    <div class="drag-target-above" ondragover="dragOver(event)" ondrop="dropOver(event,false)" ondragleave="dragLeave(event)">&nbsp;</div>
        <div class="check-wrapper">
        <label class="task-done-label" id="task-done-label" for="task-done-number-${newPosition}" onchange="todosList.markAs('${newText}')">
            <input type="checkbox" name="task-done-number-${newPosition}" id="task-done-number-${newPosition}">
            <div class="checkmark"><img class="check-icon" src="./images/icon-check.svg" alt="Check"></div>
        </label>
        </div>
        <div class="task-single-wrapper">
        <div class="task-label">
            <p class="task-text">
            ${newText}
            </p>
        </div>
        </div>

        <label for="clear-todo-${newPosition}" class="task-clear-label">
        <div class="task-clear-label-${newPosition}"><img src="./images/icon-cross.svg" alt="X - Clear Task icon"></div>
        <input class="task-clear-button" type="button" value="X" id="clear-todo-${newPosition}" onclick="todosList.eliminateTask('${newText}')">
        </label>
    </div>`;
    return toReturn;
}
let placeBelowDiv = document.createElement("div");
placeBelowDiv.innerHTML = "&nbsp;";
placeBelowDiv.setAttribute("class", "drag-target-below");
placeBelowDiv.setAttribute("ondragover", "dragOver(event)");
placeBelowDiv.setAttribute("ondragleave", "dragLeave(event)");
placeBelowDiv.setAttribute("ondrop", "dropOver(event,true)");

let itemsCounter = document.getElementById("items-left-number");
let todoContainer = document.getElementById("to-do-container");

let toDoArray = [
    {
        text: "Jog around the park 3x",
        completed: true,
        position: 0,
    },
    {
        text: "10 minutes meditation",
        completed: false,
        position: 1
    },
    {
        text: "Read for 1 hour",
        completed: false,
        position: 2
    },
    {
        text: "Pick up groceries",
        completed: false,
        position: 3
    },
    {
        text: "Complete Todo App on Frontend Mentor",
        completed: true,
        position: 4
    }
];

const body = document.body;
const todosList = document.body.getElementsByClassName('todos-list-wrapper');

todosList.show = function (arrayToShow = toDoArray) {
    todoContainer.innerHTML = "";
    arrayToShow.forEach(todo => {
        let todoNode = document.createElement("div");
        todoNode.innerHTML = populateToDo(todo);
        todoContainer.appendChild(todoNode);
    });
    for (let i = 0; i < arrayToShow.length; i++) {
        arrayToShow[i].position = i;
        todoContainer.children[i].querySelector(`input[type="checkbox"]`).checked = arrayToShow[i].completed;
    }
};

todosList.addTodo = function () {
    let newText = document.getElementById(`newToDo`).value;
    let newCompleted = document.getElementById(`newTaskStatus`).checked;
    let newEntry = {
        text: newText,
        completed: newCompleted,
        position: toDoArray.length
    }
    toDoArray.push(newEntry);
    document.getElementById(`newToDo`).value = "";
    document.getElementById(`newTaskStatus`).checked = false;
    let todoNode = document.createElement("div");
    todoNode.innerHTML = populateToDo(newEntry);
    todoContainer.appendChild(todoNode);
    todosList.updatePositions();
    selectorActivation(activeFilter.status);
}

todosList.markAs = function (taskText) {
    let task = toDoArray.find((found) => {
        if (found.text == taskText) {
            return found;
        }
    })
    task.completed = !task.completed;
    todosList.updatePositions();
    selectorActivation(activeFilter.status);
}

todosList.eliminateTask = function (taskText) {
    let toEliminate = toDoArray.findIndex((found) => {
        if (found.text == taskText) {
            return found;
        }
    })
    toDoArray.splice(toEliminate, 1);
    todosList.updatePositions();
    selectorActivation(activeFilter.status);
}

todosList.eliminateCompleted = function () {
    toDoArray.forEach(task => {
        if (task.completed == true) {
            todosList.eliminateTask(task.text);
        }
    });
    todosList.updatePositions;
    selectorActivation(activeFilter.status);
}

todosList.filterTasks = function (completedStatus) {

    let showArray = [];
    toDoArray.find((found) => {
        if (found.completed == completedStatus) {
            showArray.push(found);
        } else {
            // nothing?
        }
    })
    todosList.updatePositions();
    todosList.show(showArray);
    // go through the array, list only the tasks with a completed status of completedStatus
}

todosList.updatePositions = function () {
    for (let i = 0; i < todoContainer.children.length; i++) {
        let check = todoContainer.children[i].querySelector(`input[type="checkbox"]`);
        let paragraph = todoContainer.children[i].querySelector('p');
        if (paragraph) {
            let todoInArray = toDoArray.find((foundItem) => {
                if (foundItem.text == paragraph.innerText) {
                    return foundItem
                } else {
                    return undefined
                }
            });
            if (todoInArray) {
                check.checked = todoInArray.completed;
                if (check.checked == true) {
                    todoContainer.children[i].querySelector("p").classList.add("completed-task");
                } else {
                    todoContainer.children[i].querySelector("p").classList.remove("completed-task");
                }
            }
        }

    }
    for (let i = 0; i < toDoArray.length; i++) {
        const element = toDoArray[i];
        element.position = i;
    }
    todoContainer.append(placeBelowDiv);
    itemsCounter.innerText = toDoArray.length;
}

let activeFilter = {
    ALL: "all",
    ACTIVE: "active",
    COMPLETED: "completed"
}
activeFilter.status = activeFilter.ALL;

const selectorWrapper = document.querySelector('#selectors-wrapper');
function selectorActivation(target) {
    let all = selectorWrapper.children[0].children[0];
    let active = selectorWrapper.children[1].children[0];
    let completed = selectorWrapper.children[2].children[0];

    switch (target) {
        case "all":
            all.classList.add("selected-selector");
            active.classList.remove("selected-selector");
            completed.classList.remove("selected-selector");
            activeFilter.status = activeFilter.ALL;
            todosList.show();
            todosList.updatePositions();
            break;
        case "active":
            all.classList.remove("selected-selector");
            active.classList.add("selected-selector");
            completed.classList.remove("selected-selector");
            activeFilter.status = activeFilter.ACTIVE;
            todosList.filterTasks(false);
            todosList.updatePositions();
            break;
        case "completed":
            all.classList.remove("selected-selector");
            active.classList.remove("selected-selector");
            completed.classList.add("selected-selector");
            activeFilter.status = activeFilter.COMPLETED;
            todosList.filterTasks(true);
            todosList.updatePositions();
            break;
        default:
            all.classList.add("selected-selector");
            active.classList.remove("selected-selector");
            completed.classList.remove("selected-selector");
            activeFilter.status = activeFilter.ALL;
            todosList.show();
            todosList.updatePositions();
            break;
    }
}

let darkModeActive = false;
function darkModeToggle() {
    // implement logic to change everything to dark-mode and from dark mode.
    if (!darkModeActive) {
        // ACTIVATE dark mode
    } else {
        // DE-ACTIVATE dark mode
    }
}

todosList.changeOrder = function (toMoveText, whereTo) {
    let toMove = toDoArray.find((task) => {
        if (task.text == toMoveText) {
            return task;
        }
    });
    if (toDoArray[whereTo]) {
        toDoArray.forEach(element => {
            if (element.position >= whereTo) {
                element.position = element.position + 5;
            }
        });
    };
    toMove.position = whereTo;
    toDoArray.sort((a, b) => a.position - b.position);
    todosList.updatePositions();
    selectorActivation(activeFilter.status);
}

function dragStart(event) {
    const dtrans = event.dataTransfer;
    dtrans.dropEffect = "move";
    dtrans.effectAllowed = "move";
    let paragraph = event.target.querySelector('p');
    dtrans.setData("text", paragraph.innerText);
    let arrayOfDragAbove = body.querySelectorAll('.drag-target-above');
    let dragBelow = body.querySelector('.drag-target-below');
    dragBelow.classList.add('increase-z-index');
    arrayOfDragAbove.forEach(element => {
        element.classList.add('increase-z-index');
    });
}

function dragEnd(event) {
    let arrayOfDragAbove = body.querySelectorAll('.drag-target-above');
    let dragBelow = body.querySelector('.drag-target-below');
    dragBelow.classList.remove('increase-z-index');
    arrayOfDragAbove.forEach(element => {
        element.classList.remove('increase-z-index');
    });
}

function dragOver(event) {
    console.log(event.target);
    event.target.classList.add("drag-evident");
    event.preventDefault();
}

function dragLeave(event) {
    console.log(event.target);
    event.target.classList.remove("drag-evident");
    event.preventDefault();
}

function dropOver(event, isBelow) {
    let dataGet = event.dataTransfer.getData("text");
    let targetText = event.target.parentNode.querySelector('p').innerText;
    let targetPosition;
    toDoArray.forEach(found => {
        if (found.text == targetText) {
            if (!isBelow) {
                targetPosition = found.position;
            } else {
                targetPosition = found.position + 99;
            }
        }
    });
    todosList.changeOrder(dataGet, targetPosition);
}

function onPageLoad() {
    selectorActivation(activeFilter.status);
    todosList.updatePositions();
}
