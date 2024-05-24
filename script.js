const textBox = document.getElementById("input-box");
const addBttn = document.getElementById("addBttn");
const theList = document.getElementById("list-container");

loadTasks();

function addTask() {
  if (textBox.value === "") {
    textBox.style.background = "#f0c0c0";
    addBttn.style.background = "#dd6e6e";
    textBox.style.border = "solid 2px #dd6e6e";
    textBox.placeholder = "This field can not be empty";
    setTimeout(() => {
      textBox.style.background = "";
      addBttn.style.background = "";
      textBox.style.border = "";
    }, 1300);
  } else {
    let task = document.createElement("div");
    task.classList.add("task-item");

    let paragraph = document.createElement("p");
    paragraph.textContent = textBox.value;
    task.appendChild(paragraph);

    let deleteBttn = document.createElement("button");
    deleteBttn.classList.add("delete-bttn");
    deleteBttn.title = "Remove Task";
    deleteBttn.innerText = "✖";
    task.appendChild(deleteBttn);

    theList.appendChild(task);

    addBttn.innerText = "✔";
    addBttn.style.background = "#9fbb93";
    textBox.style.border = "solid 2px #9fbb93";
    setTimeout(() => {
      addBttn.innerText = "✚";
      addBttn.style.background = "";
      textBox.style.border = "";
    }, 1100);

    textBox.placeholder = "Add a Task";
    textBox.value = "";
  }
  saveTasks();
}

function addTaskEnter(pressEnter) {
  if (pressEnter.keyCode === 13) {
    addTask();
  }
}

// targeting elements in an event with "target" - https://chat.openai.com/share/62adbd46-3707-43aa-824a-e0277df40452
theList.addEventListener("click", function (commence) {
  if (commence.target.classList.contains("task-item")) {
    commence.target.classList.toggle("checked");
    saveTasks();
  } else if (commence.target.classList.contains("delete-bttn")) {
    commence.target.parentNode.remove();
    saveTasks();
  }
});

function saveTasks() {
  const tasks = [];
  // using forEach loop to target specific data from .task-item and structure it for storing through JSON
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
  const taskItems = document.querySelectorAll(".task-item");
  taskItems.forEach((theTask) => {
    const aTask = theTask.querySelector("p").textContent;
    const aStatus = theTask.classList.contains("checked");
    tasks.push({ name: aTask, status: aStatus });
  });

  localStorage.setItem("SavedData", JSON.stringify(tasks));
}

function loadTasks() {
  const savedTasks = JSON.parse(localStorage.getItem("SavedData"));
  if (savedTasks) {
    savedTasks.forEach((task) => {
      let taskItem = document.createElement("div");
      taskItem.classList.add("task-item");

      let paragraph = document.createElement("p");
      paragraph.textContent = task.name;
      taskItem.appendChild(paragraph);

      if (task.status === true) {
        taskItem.classList.add("checked");
      }

      let deleteBttn = document.createElement("button");
      deleteBttn.classList.add("delete-bttn");
      deleteBttn.title = "Remove Task";
      deleteBttn.innerText = "✖";
      taskItem.appendChild(deleteBttn);

      theList.appendChild(taskItem);
    });
  }
}
