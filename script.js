console.clear();

const inputText = document.querySelector(".input");
const dueTime = document.querySelector(".time-due");
const addBtn = document.querySelector(".add");
const taskListContainer = document.querySelector(".task-list-cont");
const activeList = document.querySelector(".active-list");
const completedList = document.querySelector(".completed-list");
const reset = document.querySelector(".reset");

let tasksList = [];

function $(el, classList = [], id = null) {
  const newElement = document.createElement(el);

  if (classList.length !== 0) {
    classList.forEach((className) => {
      newElement.classList.add(className);
    });
  }

  if (id !== null) {
    newElement.id = id;
  }

  return newElement;
}

function createNewTask(taskName, timeDue) {
  return {
    taskName: inputText.value,
    timeDue: timeDue,
    isCompleted: false
  };
}

function getTime() {
  if (dueTime.value === "") return undefined;

  const selectedTime = dueTime.value.split(":");
  let hours = selectedTime[0];
  let mins = selectedTime[1];
  let meridiem;

  if (hours > 12) {
    meridiem = "PM";
    hours -= 12;
  } else {
    meridiem = "AM";
    if (hours === "00") {
      hours = 12;
    } else {
      meridiem = "PM";
    }
  }

  return `${hours}:${mins} ${meridiem}`;
}

function addTasksToList() {
  const activeTitle = activeList.firstElementChild;
  const completedTitle = completedList.firstElementChild;
  activeList.innerHTML = "";
  completedList.innerHTML = "";
  activeList.appendChild(activeTitle);
  completedList.appendChild(completedTitle);

  tasksList.forEach((task, idx) => {
    task.id = idx;

    const taskCont = $("div", ["task-cont", "flex"], idx);
    const taskCheckbox = $("input", ["checkbox"]);
    const taskInfo = $("span", ["task"]);
    const deleteBtn = $("div", ["delete-btn"]);
    const leftDiv = $("div", ["left", "flex"]);
    const rightDiv = $("div", ["right", "flex"]);
    const time = $("div", ["time"]);

    taskCheckbox.setAttribute("type", "checkbox");

    if (task.timeDue !== undefined) {
      time.innerHTML = task.timeDue;
    }

    taskInfo.innerHTML = task.taskName;
    deleteBtn.innerHTML = "🗑️";

    taskCont.appendChild(leftDiv);
    taskCont.appendChild(rightDiv);
    leftDiv.appendChild(taskCheckbox);
    leftDiv.appendChild(taskInfo);
    rightDiv.appendChild(time);
    rightDiv.appendChild(deleteBtn);

    if (!task.isCompleted) {
      taskCheckbox.checked = false;
      activeList.appendChild(taskCont);
    } else {
      taskCheckbox.checked = true;
      completedList.appendChild(taskCont);
    }
  });
}

inputText.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    if (e.target.value === "") return;
    const timeDue = getTime();
    const newTask = createNewTask(e.target.value, timeDue);
    tasksList.push(newTask);
    inputText.value = "";
    dueTime.value = "";
    addTasksToList();
  }
});

addBtn.addEventListener("click", () => {
  if (inputText.value === "") return;
  const timeDue = getTime();
  const newTask = createNewTask(inputText.value, timeDue);
  tasksList.push(newTask);
  inputText.value = "";
  dueTime.value = "";
  addTasksToList();
});

taskListContainer.addEventListener("click", (e) => {
  const checkboxes = document.querySelectorAll("input[type=checkbox]");
  const deleteBtns = document.querySelectorAll(".delete-btn");

  checkboxes.forEach((checkbox) => {
    if (checkbox.contains(e.target)) {
      const taskContainer = checkbox.parentNode.parentNode;
      const taskCompleted = parseInt(taskContainer.getAttribute("id"));
      let completed = false;

      tasksList.forEach((task) => {
        if (task.id === taskCompleted) {
          if (checkbox.checked) {
            task.isCompleted = true;
            addTasksToList();
          } else {
            task.isCompleted = false;
            addTasksToList();
          }
        }
      });
    }
  });

  deleteBtns.forEach((delBtn) => {
    if (delBtn.contains(e.target)) {
      const taskContainer = delBtn.parentNode.parentNode;
      const taskToDelete = parseInt(taskContainer.getAttribute("id"));
      const updatedTasksList = [];
      tasksList.map((task) => {
        if (task.id !== taskToDelete) {
          updatedTasksList.push(task);
        }
      });

      tasksList.length = 0;
      tasksList = [...updatedTasksList];

      addTasksToList();
    }
  });
});

taskListContainer.addEventListener("dblclick", (e) => {
  const tasks = document.querySelectorAll(".task");

  tasks.forEach((task) => {
    if (task.contains(e.target)) {
      const taskCont = e.target.parentNode.parentNode.getAttribute("id");

      editedTask = prompt("Edit Task:", task.innerHTML);

      tasksList.forEach((task) => {
        if (task.id === parseInt(taskCont)) {
          if (editedTask === "") return;
          task.taskName = editedTask;
          addTasksToList();
        }
      });
    }
  });
});

reset.addEventListener("click", () => {
  const activeTitle = activeList.firstElementChild;
  const completedTitle = completedList.firstElementChild;

  activeList.innerText = "";
  completedList.innerHTML = "";
  activeList.appendChild(activeTitle);
  completedList.appendChild(completedTitle);
  tasksList.length = 0;
});
