var TaskManager = /** @class */ (function () {
    // chamadas na construção da classe para inicializar os elementos html
    function TaskManager() {
        this.tasks = [];
        this.initializeElements();
        this.bindEvents();
        this.loadTasks();
    }
    // inicialização dos elementos html
    TaskManager.prototype.initializeElements = function () {
        this.taskInput = document.getElementById("taskInput");
        this.addTaskBtn = document.getElementById("addTask");
        this.taskList = document.getElementById("taskList");
        this.taskPrioritySelect = document.getElementById("taskPriority");
        this.taskCountDisplay = document.getElementById("taskCount");
        this.clearCompletedBtn = document.getElementById("clearCompleted");
        this.filterButtons = document.querySelectorAll(".btn-filter");
        this.confirmDeleteDialog = document.getElementById("confirmDeleteDialog");
    };
    // adiciona eventos aos elementos html
    TaskManager.prototype.bindEvents = function () {
        var _this = this;
        this.addTaskBtn.addEventListener("click", function () { return _this.addTask(); });
        this.taskInput.addEventListener("keydown", function (event) {
            if (event.key === "Enter")
                _this.addTask();
        });
        this.clearCompletedBtn.addEventListener("click", function () {
            return _this.clearCompletedTasks();
        });
        this.filterButtons.forEach(function (button) {
            button.addEventListener("click", function () { return _this.filterTasks(button.id); });
        });
    };
    // verifica se o input tem value e adiciona a tarefa
    TaskManager.prototype.addTask = function () {
        var taskText = this.taskInput.value.trim();
        if (!taskText)
            return;
        var newTask = {
            id: this.generateUniqueId(),
            text: taskText,
            priority: this.taskPrioritySelect.value,
            completed: false,
            createdAt: new Date(),
        };
        this.tasks.push(newTask);
        this.renderTasks();
        this.saveTasks();
        this.taskInput.value = "";
        this.taskPrioritySelect.selectedIndex = 1; // Volta para prioridade média
    };
    TaskManager.prototype.renderTasks = function (filter) {
        var _this = this;
        if (filter === void 0) { filter = "all"; }
        this.taskList.innerHTML = "";
        var filteredTasks = this.filterTasksList(filter);
        // cria lista de tarefas filtrando por prioridade
        filteredTasks.forEach(function (task) {
            var li = document.createElement("li");
            li.dataset.taskId = task.id;
            li.classList.add("priority-".concat(task.priority));
            if (task.completed)
                li.classList.add("completed");
            var taskTextSpan = document.createElement("span");
            taskTextSpan.textContent = task.text;
            taskTextSpan.classList.add("task-text");
            taskTextSpan.addEventListener("click", function () {
                return _this.toggleTaskCompletion(task.id);
            });
            var actionContainer = document.createElement("div");
            actionContainer.classList.add("task-actions");
            var editButton = _this.createButton("Editar", function () { return _this.editTask(task.id); }, "edit-btn");
            var deleteButton = _this.createButton("Deletar", function () { return _this.confirmDeleteTask(task.id); }, "delete-btn");
            actionContainer.append(editButton, deleteButton);
            li.append(taskTextSpan, actionContainer);
            _this.taskList.appendChild(li);
        });
        this.updateTaskCount();
    };
    TaskManager.prototype.createButton = function (text, onClick, className) {
        var button = document.createElement("button");
        button.textContent = text;
        button.classList.add(className);
        button.addEventListener("click", onClick);
        return button;
    };
    TaskManager.prototype.toggleTaskCompletion = function (taskId) {
        var task = this.tasks.find(function (t) { return t.id === taskId; });
        if (task) {
            task.completed = !task.completed;
            this.renderTasks();
            this.saveTasks();
        }
    };
    TaskManager.prototype.editTask = function (taskId) {
        var task = this.tasks.find(function (t) { return t.id === taskId; });
        if (task) {
            var newText = prompt("Editar tarefa:", task.text);
            if (newText !== null && newText.trim() !== "") {
                task.text = newText.trim();
                this.renderTasks();
                this.saveTasks();
            }
        }
    };
    TaskManager.prototype.confirmDeleteTask = function (taskId) {
        var _this = this;
        var confirmDelete = document.getElementById("confirmDelete");
        var cancelDelete = document.getElementById("cancelDelete");
        if (confirmDelete && cancelDelete) {
            this.confirmDeleteDialog.showModal();
            var handleConfirm_1 = function () {
                _this.deleteTask(taskId);
                _this.confirmDeleteDialog.close();
                confirmDelete.removeEventListener("click", handleConfirm_1);
                cancelDelete.removeEventListener("click", handleCancel_1);
            };
            var handleCancel_1 = function () {
                _this.confirmDeleteDialog.close();
                confirmDelete.removeEventListener("click", handleConfirm_1);
                cancelDelete.removeEventListener("click", handleCancel_1);
            };
            confirmDelete.addEventListener("click", handleConfirm_1);
            cancelDelete.addEventListener("click", handleCancel_1);
        }
    };
    TaskManager.prototype.deleteTask = function (taskId) {
        this.tasks = this.tasks.filter(function (task) { return task.id !== taskId; });
        this.renderTasks();
        this.saveTasks();
    };
    TaskManager.prototype.clearCompletedTasks = function () {
        this.tasks = this.tasks.filter(function (task) { return !task.completed; });
        this.renderTasks();
        this.saveTasks();
    };
    TaskManager.prototype.filterTasks = function (filterId) {
        this.filterButtons.forEach(function (btn) { return btn.classList.remove("active"); });
        var activeButton = document.getElementById(filterId);
        if (activeButton)
            activeButton.classList.add("active");
        switch (filterId) {
            case "filterAll":
                this.renderTasks("all");
                break;
            case "filterActive":
                this.renderTasks("active");
                break;
            case "filterCompleted":
                this.renderTasks("completed");
                break;
        }
    };
    TaskManager.prototype.filterTasksList = function (filter) {
        switch (filter) {
            case "active":
                return this.tasks.filter(function (task) { return !task.completed; });
            case "completed":
                return this.tasks.filter(function (task) { return task.completed; });
            default:
                return this.tasks;
        }
    };
    TaskManager.prototype.updateTaskCount = function () {
        var activeTasks = this.tasks.filter(function (task) { return !task.completed; }).length;
        this.taskCountDisplay.textContent = "".concat(activeTasks, " tarefa").concat(activeTasks !== 1 ? "s" : "", " ativa").concat(activeTasks !== 1 ? "s" : "");
    };
    TaskManager.prototype.generateUniqueId = function () {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    };
    TaskManager.prototype.saveTasks = function () {
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
    };
    // Método para carregar as tarefas do localStorage
    TaskManager.prototype.loadTasks = function () {
        var savedTasks = localStorage.getItem("tasks");
        if (savedTasks) {
            this.tasks = JSON.parse(savedTasks);
            this.renderTasks();
        }
    };
    return TaskManager;
}());
// Inicialização do gerenciador de tarefas a partir do carregamento da página
document.addEventListener("DOMContentLoaded", function () {
    new TaskManager();
});
