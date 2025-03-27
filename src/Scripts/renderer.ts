// Tipos para melhor tipagem
interface Task {
  id: string;
  class: string | null;
  text: string;
  priority: "low" | "media" | "high";
  completed: boolean;
  createdAt: Date;
}

class TaskManager {
  private taskInput!: HTMLInputElement;
  private addTaskBtn!: HTMLButtonElement;
  private taskList!: HTMLUListElement;
  private taskPrioritySelect!: HTMLSelectElement;
  private taskCountDisplay!: HTMLSpanElement;
  private clearCompletedBtn!: HTMLButtonElement;
  private filterButtons!: NodeListOf<HTMLButtonElement>;
  private confirmDeleteDialog!: HTMLDialogElement;

  private tasks: Task[] = [];

  // chamadas na construção da classe para inicializar os elementos html
  constructor() {
    this.initializeElements();
    this.bindEvents();
    this.loadTasks();
  }

  // função que recupera os elementos do html DOM
  private initializeElements(): void {
    this.taskInput = document.getElementById("taskInput") as HTMLInputElement;
    this.addTaskBtn = document.getElementById("addTask") as HTMLButtonElement;
    this.taskList = document.getElementById("taskList") as HTMLUListElement;

    this.taskPrioritySelect = document.getElementById(
      "taskPriority"
    ) as HTMLSelectElement;

    this.taskCountDisplay = document.getElementById(
      "taskCount"
    ) as HTMLSpanElement;
    this.clearCompletedBtn = document.getElementById(
      "clearCompleted"
    ) as HTMLButtonElement;
    this.filterButtons = document.querySelectorAll(".btn-filter");
    this.confirmDeleteDialog = document.getElementById(
      "confirmDeleteDialog"
    ) as HTMLDialogElement;
  }

  // adiciona eventos aos elementos
  private bindEvents(): void {
    this.addTaskBtn.addEventListener("click", () => this.addTask());
    this.taskInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") this.addTask();
    });

    this.clearCompletedBtn.addEventListener("click", () =>
      this.clearCompletedTasks()
    );

    this.filterButtons.forEach((button) => {
      button.addEventListener("click", () => this.filterTasks(button.id));
    });
  }

  // verifica se o input tem value e adiciona a tarefa
  private addTask(): void {
    const taskText = this.taskInput.value.trim();
    if (!taskText) return;

    const newTask: Task = {
      id: this.generateUniqueId(),
      class: null,
      text: taskText,
      priority: this.taskPrioritySelect.value as Task["priority"],
      completed: false,
      createdAt: new Date(),
    };

    this.tasks.push(newTask);
    this.renderTasks();
    this.saveTasks();

    this.taskInput.value = "";
    this.taskPrioritySelect.selectedIndex = 1; // Volta para prioridade média
  }

  private renderTasks(filter: "all" | "active" | "completed" = "all"): void {
    this.taskList.innerHTML = "";

    const filteredTasks = this.filterTasksList(filter);

    // cria lista de tarefas filtrando por prioridade
    filteredTasks.forEach((task) => {
      const li = document.createElement("li");
      li.setAttribute("class", "task");
      li.setAttribute("draggable", "true");
      li.dataset.taskId = task.id;
      li.classList.add(`priority-${task.priority}`);
      if (task.completed) li.classList.add("completed");

      const taskTextSpan = document.createElement("span");
      taskTextSpan.textContent = task.text;
      taskTextSpan.classList.add("task-text");
      taskTextSpan.addEventListener("click", () =>
        this.toggleTaskCompletion(task.id)
      );

      const actionContainer = document.createElement("div");
      actionContainer.classList.add("task-actions");

      // botão de editar tarefa
      const editButton = this.createButton(
        "Editar",
        () => this.editTask(task.id),
        "edit-btn"
      );

      // botão de deletar tarefa
      const deleteButton = this.createButton(
        "Deletar",
        () => this.confirmDeleteTask(task.id),
        "delete-btn"
      );

      actionContainer.append(editButton, deleteButton);
      li.append(taskTextSpan, actionContainer);
      this.taskList.appendChild(li);
    });

    this.updateTaskCount();
  }
  // função para criar botões
  private createButton(
    text: string,
    onClick: () => void,
    className: string
  ): HTMLButtonElement {
    const button = document.createElement("button");
    button.textContent = text;
    button.classList.add(className);
    button.addEventListener("click", onClick);
    return button;
  }

  // função para alterar entre as completadas
  private toggleTaskCompletion(taskId: string): void {
    const task = this.tasks.find((t) => t.id === taskId);
    if (task) {
      task.completed = !task.completed;
      this.renderTasks();
      this.saveTasks();
    }
  }

  // função para editar tarefas
  private editTask(taskId: string): void {
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

  private confirmDeleteTask(taskId: string): void {
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

  private deleteTask(taskId: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
    this.renderTasks();
    this.saveTasks();
  }

  private clearCompletedTasks(): void {
    this.tasks = this.tasks.filter((task) => !task.completed);
    this.renderTasks();
    this.saveTasks();
  }

  private filterTasks(filterId: string): void {
    this.filterButtons.forEach((btn) => btn.classList.remove("active"));
    const activeButton = document.getElementById(filterId);
    if (activeButton) activeButton.classList.add("active");

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

  private filterTasksList(filter: "all" | "active" | "completed"): Task[] {
    switch (filter) {
      case "active":
        return this.tasks.filter((task) => !task.completed);
      case "completed":
        return this.tasks.filter((task) => task.completed);
      default:
        return this.tasks;
    }
  }

  private updateTaskCount(): void {
    const activeTasks = this.tasks.filter((task) => !task.completed).length;
    this.taskCountDisplay.textContent = `${activeTasks} tarefa${
      activeTasks !== 1 ? "s" : ""
    } ativa${activeTasks !== 1 ? "s" : ""}`;
  }

  private generateUniqueId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  private saveTasks(): void {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  // Método para carregar as tarefas do localStorage
  private loadTasks(): void {
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
  const dragAndDropEvents = new DragAndDropEvents();
});


// Drag and drop effect
class DragAndDrop {
  protected listTasksItems!: HTMLUListElement;
  constructor() {
    this.initDomElements();
  }
  private initDomElements() {
    this.listTasksItems = document.querySelector(
      "#taskList"
    ) as HTMLUListElement;
  }
}

class DragAndDropEvents extends DragAndDrop {
  private dragItem!: HTMLElement | null;
  constructor() {
    super();
    this.addEvents();
  }

  // função que adiciona os eventos
  private addEvents() {
    this.listTasksItems.addEventListener("dragstart", (event) => {
      this.dragItem = event.target as HTMLElement;
      this.dragItem.classList.add("dragging");
    });

    // evento disparado quando o elemento termina de ser arrastado
    this.listTasksItems.addEventListener("dragend", (event) => {
      if (this.dragItem) {
        this.dragItem.classList.remove("dragging");
        this.dragItem = null;
      }
    });

    // evento que é disparado quando o elemento está sendo arrastado sobre o elemento
    this.listTasksItems.addEventListener("dragover", (event) => {
      event.preventDefault(); // previne comportamento padrão do elemento

      const draggable = document.querySelector(".dragging") as HTMLElement;
      const afterElement = GetDrgAfterElements.getDragAfterElement(
        event.clientY
      );
      if (afterElement == null) {
        this.listTasksItems.appendChild(draggable);
      } else {
        this.listTasksItems.insertBefore(draggable, afterElement);
      }
    });
  }
}
// classe que retorna o elemento após o elemento que está sendo arrastado
class GetDrgAfterElements extends DragAndDrop {
  static listTasks: any;
  static getDragAfterElement(positionY: number) {
    const draggableElements = [
      ...this.listTasks.querySelectorAll(".task:not(.dragging)"),
    ];
    return draggableElements.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = positionY - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      { offset: Number.NEGATIVE_INFINITY }
    ).element;
  }
}
