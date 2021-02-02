
function populateToDo(object) {
    let newText = object.text;
    // let newCompleted = object.completed;
    let newPosition = object.position;
    let toReturn = `
    <div class="to-do">
    <div class="check-wrapper">
      <label class="task-done-label" id="task-done-label" for="task-done-number-${newPosition}" onchange="todosList.markAs(toDoArray[${newPosition}])">
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
      <input class="task-clear-button" type="button" value="X" id="clear-todo-${newPosition}">
    </label>

  </div>`

    return toReturn;
}

let itemsCounter = document.getElementById("items-left-number");
let todoContainer = document.getElementById("to-do-container");

let toDoArray = [
    {
        text: "Jog around the park 3x",
        completed: true,
        position: 0
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
}

todosList.markAs = function (task) {
    task.completed = !task.completed;
    todosList.updatePositions();
}

todosList.eliminateTask = function (task) {
    let toEliminate = toDoArray.findIndex((found) => {
        if (found.text == task.text) {
            return found;
        }
    })
    toDoArray.splice(toEliminate, 1);
    toDoArray.updatePositions();
}

todosList.changeOrder = function (toMove, whereTo) {
    toMove.position = whereTo;
    toDoArray.sort((a, b) => a.position - b.position);
    todosList.updatePositions();
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
    // todosList.updatePositions();
    todosList.show(showArray);
    // go through the array, list only the tasks with a completed status of completedStatus
}

todosList.updatePositions = function () {
    for (let i = 0; i < todoContainer.children; i++) {


        // TODO: FIX THIS
        todoContainer.children[i].querySelector(`input[type="checkbox"]`).checked = toDoArray.find((foundItem) => {
            if (foundItem.position == i) {
                return foundItem
            } else {
                return
            }
        }).checked;
    }
    itemsCounter.innerText = toDoArray.length + 1;
}

function darkModeToggle(darkMode) {
    if (darkMode) {
        // enable dark-mode
    } else {
        // enable light-mode
    }
}

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
            break;
        case "active":
            all.classList.remove("selected-selector");
            active.classList.add("selected-selector");
            completed.classList.remove("selected-selector");
            break;
        case "completed":
            all.classList.remove("selected-selector");
            active.classList.remove("selected-selector");
            completed.classList.add("selected-selector");
            break;
        default:
            all.classList.add("selected-selector");
            active.classList.remove("selected-selector");
            completed.classList.remove("selected-selector");
            break;
    }

}

function onPageLoad() {
    todosList.show();
    todosList.updatePositions();
}
