var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var TaskManager = /** @class */ (function () {
    // chamadas na construção da classe para inicializar os elementos html
    function TaskManager() {
        this.tasks = [];
        this.initializeElements();
        this.bindEvents();
        this.loadTasks();
    }
    // função que recupera os elementos do html DOM
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
    // adiciona eventos aos elementos
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
            "class": null,
            text: taskText,
            priority: this.taskPrioritySelect.value,
            completed: false,
            createdAt: new Date()
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
            li.setAttribute("class", "task");
            li.setAttribute("draggable", "true");
            li.dataset.taskId = task.id;
            li.classList.add("priority-" + task.priority);
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
            // botão de editar tarefa
            var editButton = _this.createButton("Editar", function () { return _this.editTask(task.id); }, "edit-btn");
            // botão de deletar tarefa
            var deleteButton = _this.createButton("Deletar", function () { return _this.confirmDeleteTask(task.id); }, "delete-btn");
            actionContainer.append(editButton, deleteButton);
            li.append(taskTextSpan, actionContainer);
            _this.taskList.appendChild(li);
        });
        this.updateTaskCount();
    };
    // função para criar botões
    TaskManager.prototype.createButton = function (text, onClick, className) {
        var button = document.createElement("button");
        button.textContent = text;
        button.classList.add(className);
        button.addEventListener("click", onClick);
        return button;
    };
    // função para alterar entre as completadas
    TaskManager.prototype.toggleTaskCompletion = function (taskId) {
        var task = this.tasks.find(function (t) { return t.id === taskId; });
        if (task) {
            task.completed = !task.completed;
            this.renderTasks();
            this.saveTasks();
        }
    };
    // função para editar tarefas
    TaskManager.prototype.editTask = function (taskId) {
        var task = this.tasks.find(function (t) { return t.id === taskId; });
        if (task) {
            this.taskInput.value = task.text.trim();
            // const newText = prompt(`Editar tarefa: ${task.text}`);
            // if (newText !== null && newText.trim() !== "") {
            //   task.text = newText.trim();
            //   // this.renderTasks();
            //   // this.saveTasks();
            // }
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
        this.taskCountDisplay.textContent = activeTasks + " tarefa" + (activeTasks !== 1 ? "s" : "") + " ativa" + (activeTasks !== 1 ? "s" : "");
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
    var dragAndDropEvents = new DragAndDropEvents();
});
// Drag and drop effect
var DragAndDrop = /** @class */ (function () {
    function DragAndDrop() {
        this.initDomElements();
    }
    DragAndDrop.prototype.initDomElements = function () {
        this.listTasksItems = document.querySelector("#taskList");
    };
    return DragAndDrop;
}());
var DragAndDropEvents = /** @class */ (function (_super) {
    __extends(DragAndDropEvents, _super);
    function DragAndDropEvents() {
        var _this = _super.call(this) || this;
        _this.addEvents();
        return _this;
    }
    // função que adiciona os eventos
    DragAndDropEvents.prototype.addEvents = function () {
        var _this = this;
        this.listTasksItems.addEventListener("dragstart", function (event) {
            _this.dragItem = event.target;
            _this.dragItem.classList.add("dragging");
        });
        // evento disparado quando o elemento termina de ser arrastado
        this.listTasksItems.addEventListener("dragend", function (event) {
            if (_this.dragItem) {
                _this.dragItem.classList.remove("dragging");
                _this.dragItem = null;
            }
        });
        // evento que é disparado quando o elemento está sendo arrastado sobre o elemento
        this.listTasksItems.addEventListener("dragover", function (event) {
            event.preventDefault(); // previne comportamento padrão do elemento
            var draggable = document.querySelector(".dragging");
            var afterElement = GetDrgAfterElements.getDragAfterElement(event.clientY);
            if (afterElement == null) {
                _this.listTasksItems.appendChild(draggable);
            }
            else {
                _this.listTasksItems.insertBefore(draggable, afterElement);
            }
        });
    };
    return DragAndDropEvents;
}(DragAndDrop));
// classe que retorna o elemento após o elemento que está sendo arrastado
var GetDrgAfterElements = /** @class */ (function (_super) {
    __extends(GetDrgAfterElements, _super);
    function GetDrgAfterElements() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GetDrgAfterElements.getDragAfterElement = function (positionY) {
        var draggableElements = __spreadArrays(this.listTasks.querySelectorAll(".task:not(.dragging)"));
        return draggableElements.reduce(function (closest, child) {
            var box = child.getBoundingClientRect();
            var offset = positionY - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            }
            else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    };
    return GetDrgAfterElements;
}(DragAndDrop));
