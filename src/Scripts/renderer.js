var taskInput = document.getElementById("taskInput");
var addTaskBtn = document.getElementById("addTask");
var taskList = document.getElementById("taskList");
var createListItems = function (task) {
    if (!task.value.trim())
        return;
    var li = document.createElement("li");
    var textTask = document.createElement("p");
    textTask.classList.add("text-task");
    var editButton = document.createElement("button");
    editButton.classList.add("edit-btn");
    editButton.textContent = "Editar✏️";
    editButton.onclick = function () {
        if (editButton)
            editTask(textTask);
    };
    textTask.textContent = task.value;
    var deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.textContent = "Deletar❌";
    deleteBtn.onclick = function () { return li.remove(); };
    li.appendChild(textTask);
    li.appendChild(deleteBtn);
    li.appendChild(editButton);
    taskList.appendChild(li);
    task.value = "";
};
addTaskBtn.addEventListener("click", function () {
    createListItems(taskInput);
});
taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        createListItems(taskInput);
    }
});
var editTask = function (textTask) {
    if (!taskInput.value.trim()) {
        taskInput.value = textTask.innerHTML || '';
        taskInput.focus();
    }
    return;
}; // Aplicativo renderer.ts convertiodo em renderer.js
var numerateTask = function () {
    var tasks = Array.from(document.querySelectorAll("li"));
    tasks.forEach(function (task, index) {
        task.textContent = "".concat(index + 1, ". ").concat(task.textContent);
    });
};
