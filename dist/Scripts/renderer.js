"use strict";
class TaskManager {
    // chamadas na construção da classe para inicializar os elementos html
    constructor() {
        this.tasks = [];
        this.initializeElements();
        this.bindEvents();
        this.loadTasks();
    }
    // função que recupera os elementos do html DOM
    initializeElements() {
        this.taskInput = document.getElementById("taskInput");
        this.addTaskBtn = document.getElementById("addTask");
        this.taskList = document.getElementById("taskList");
        this.taskPrioritySelect = document.getElementById("taskPriority");
        this.taskCountDisplay = document.getElementById("taskCount");
        this.clearCompletedBtn = document.getElementById("clearCompleted");
        this.filterButtons = document.querySelectorAll(".btn-filter");
        this.confirmDeleteDialog = document.getElementById("confirmDeleteDialog");
    }
    // adiciona eventos aos elementos
    bindEvents() {
        this.addTaskBtn.addEventListener("click", () => this.addTask());
        this.taskInput.addEventListener("keydown", (event) => {
            if (event.key === "Enter")
                this.addTask();
        });
        this.clearCompletedBtn.addEventListener("click", () => this.clearCompletedTasks());
        this.filterButtons.forEach((button) => {
            button.addEventListener("click", () => this.filterTasks(button.id));
        });
    }
    // verifica se o input tem value e adiciona a tarefa
    addTask() {
        const taskText = this.taskInput.value.trim();
        if (!taskText)
            return;
        const newTask = {
            id: this.generateUniqueId(),
            class: null,
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
    }
    renderTasks(filter = "all") {
        this.taskList.innerHTML = "";
        const filteredTasks = this.filterTasksList(filter);
        // cria lista de tarefas filtrando por prioridade
        filteredTasks.forEach((task) => {
            const li = document.createElement("li");
            li.dataset.taskId = task.id;
            li.classList.add(`priority-${task.priority}`);
            if (task.completed)
                li.classList.add("completed");
            const taskTextSpan = document.createElement("span");
            taskTextSpan.textContent = task.text;
            taskTextSpan.classList.add("task-text");
            taskTextSpan.addEventListener("click", () => this.toggleTaskCompletion(task.id));
            const actionContainer = document.createElement("div");
            actionContainer.classList.add("task-actions");
            // botão de editar tarefa
            const editButton = this.createButton("Editar", () => this.editTask(task.id), "edit-btn");
            // botão de deletar tarefa
            const deleteButton = this.createButton("Deletar", () => this.confirmDeleteTask(task.id), "delete-btn");
            actionContainer.append(editButton, deleteButton);
            li.append(taskTextSpan, actionContainer);
            this.taskList.appendChild(li);
        });
        this.updateTaskCount();
    }
    // função para criar botões
    createButton(text, onClick, className) {
        const button = document.createElement("button");
        button.textContent = text;
        button.classList.add(className);
        button.addEventListener("click", onClick);
        return button;
    }
    // função para alterar entre as completadas
    toggleTaskCompletion(taskId) {
        const task = this.tasks.find((t) => t.id === taskId);
        if (task) {
            task.completed = !task.completed;
            this.renderTasks();
            this.saveTasks();
        }
    }
    // função para editar tarefas
    editTask(taskId) {
        const task = this.tasks.find((t) => t.id === taskId);
        if (task) {
            this.taskInput.value = task.text.trim();
            // const newText = prompt(`Editar tarefa: ${task.text}`);
            // if (newText !== null && newText.trim() !== "") {
            //   task.text = newText.trim();
            //   // this.renderTasks();
            //   // this.saveTasks();
            // }
        }
    }
    confirmDeleteTask(taskId) {
        const confirmDelete = document.getElementById("confirmDelete");
        const cancelDelete = document.getElementById("cancelDelete");
        if (confirmDelete && cancelDelete) {
            this.confirmDeleteDialog.showModal();
            const handleConfirm = () => {
                this.deleteTask(taskId);
                this.confirmDeleteDialog.close();
                confirmDelete.removeEventListener("click", handleConfirm);
                cancelDelete.removeEventListener("click", handleCancel);
            };
            const handleCancel = () => {
                this.confirmDeleteDialog.close();
                confirmDelete.removeEventListener("click", handleConfirm);
                cancelDelete.removeEventListener("click", handleCancel);
            };
            confirmDelete.addEventListener("click", handleConfirm);
            cancelDelete.addEventListener("click", handleCancel);
        }
    }
    deleteTask(taskId) {
        this.tasks = this.tasks.filter((task) => task.id !== taskId);
        this.renderTasks();
        this.saveTasks();
    }
    clearCompletedTasks() {
        this.tasks = this.tasks.filter((task) => !task.completed);
        this.renderTasks();
        this.saveTasks();
    }
    filterTasks(filterId) {
        this.filterButtons.forEach((btn) => btn.classList.remove("active"));
        const activeButton = document.getElementById(filterId);
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
    }
    filterTasksList(filter) {
        switch (filter) {
            case "active":
                return this.tasks.filter((task) => !task.completed);
            case "completed":
                return this.tasks.filter((task) => task.completed);
            default:
                return this.tasks;
        }
    }
    updateTaskCount() {
        const activeTasks = this.tasks.filter((task) => !task.completed).length;
        this.taskCountDisplay.textContent = `${activeTasks} tarefa${activeTasks !== 1 ? "s" : ""} ativa${activeTasks !== 1 ? "s" : ""}`;
    }
    generateUniqueId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
    saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
    }
    // Método para carregar as tarefas do localStorage
    loadTasks() {
        const savedTasks = localStorage.getItem("tasks");
        if (savedTasks) {
            this.tasks = JSON.parse(savedTasks);
            this.renderTasks();
        }
    }
}
// Inicialização do gerenciador de tarefas a partir do carregamento da página
document.addEventListener("DOMContentLoaded", () => {
    new TaskManager();
});
