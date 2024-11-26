document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("task-input");
    const addTaskBtn = document.getElementById("add-task-btn");
    const taskList = document.getElementById("task-list");
  
    // Load tasks from local storage
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach((task) => addTaskToDOM(task.text, task.completed));
  
    // Add new task
    addTaskBtn.addEventListener("click", () => {
      const taskText = taskInput.value.trim();
      if (taskText !== "") {
        addTaskToDOM(taskText, false);
        saveTaskToLocalStorage(taskText, false);
        taskInput.value = "";
      }
    });
  
    // Add task to DOM
    function addTaskToDOM(text, completed) {
      const taskItem = document.createElement("li");
      taskItem.classList.add("task-item");
      if (completed) taskItem.classList.add("completed");
  
      const taskTextSpan = document.createElement("span");
      taskTextSpan.classList.add("task-text");
      taskTextSpan.textContent = text;
  
      const completeCheckbox = document.createElement("input");
      completeCheckbox.type = "checkbox";
      completeCheckbox.classList.add("complete-checkbox");
      completeCheckbox.checked = completed;
      completeCheckbox.addEventListener("change", () => {
        taskItem.classList.toggle("completed");
        updateTaskInLocalStorage(text, completeCheckbox.checked);
      });
  
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.classList.add("delete-btn");
      deleteBtn.addEventListener("click", () => {
        taskItem.remove();
        deleteTaskFromLocalStorage(text);
      });
  
      taskItem.appendChild(completeCheckbox);
      taskItem.appendChild(taskTextSpan);
      taskItem.appendChild(deleteBtn);
      taskList.appendChild(taskItem);
    }
  
    // Save task to local storage
    function saveTaskToLocalStorage(text, completed) {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks.push({ text, completed });
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  
    // Update task in local storage
    function updateTaskInLocalStorage(text, completed) {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      const taskIndex = tasks.findIndex((task) => task.text === text);
      if (taskIndex > -1) {
        tasks[taskIndex].completed = completed;
        localStorage.setItem("tasks", JSON.stringify(tasks));
      }
    }
  
    // Delete task from local storage
    function deleteTaskFromLocalStorage(text) {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      const updatedTasks = tasks.filter((task) => task.text !== text);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }
  });
  