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

  // Chamado no carregamento da página para inicializar os elementos HTML,
  // adicionar eventos e carregar tarefas salvas
  constructor() {
    this.initializeElements();
    this.bindEvents();
    this.loadTasks();
  }

  // Recupera os elementos do DOM e os armazena em propriedades da classe
  // Chamado no constructor()
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

  // Adiciona eventos aos elementos HTML
  // Chamado no constructor()
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

  // Adiciona uma nova tarefa ao array, atualiza a interface e salva no localStorage
  // Chamado ao clicar no botão "Adicionar Tarefa" ou pressionar "Enter"
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
    this.taskPrioritySelect.selectedIndex = 1;
  }

  // Renderiza as tarefas na tela, aplicando filtros se necessário
  // Chamado por diversas funções como addTask(), toggleTaskCompletion(), editTask() etc.
  private renderTasks(filter: "all" | "active" | "completed" = "all"): void {
    this.taskList.innerHTML = "";

    const filteredTasks = this.filterTasksList(filter);

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

      // Botão de editar tarefa
      const editButton = this.createButton(
        "Editar",
        () => this.editTask(task.id),
        "edit-btn"
      );

      // Botão de deletar tarefa
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

  // Cria e retorna um botão com evento de clique
  // Chamado dentro de renderTasks() para criar os botões de editar e deletar
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

  // Alterna o estado de conclusão de uma tarefa e salva
  // Chamado ao clicar no texto de uma tarefa
  private toggleTaskCompletion(taskId: string): void {
    const task = this.tasks.find((t) => t.id === taskId);
    if (task) {
      task.completed = !task.completed;
      this.renderTasks();
      this.saveTasks();
    }
  }

  // Permite editar o texto de uma tarefa
  // Chamado ao clicar no botão "Editar"
  private editTask(taskId: string): void {
    const task = this.tasks.find((t) => t.id === taskId);
    if (task) {
      this.taskInput.value = task.text.trim();
      this.taskInput.addEventListener("blur", () => {
        const newText = this.taskInput.value.trim();
        if (newText) {
          task.text = newText;
          this.renderTasks();
          this.saveTasks();
        }
      });
    }
  }

  // Exibe um modal de confirmação antes de excluir uma tarefa
  private confirmDeleteTask(taskId: string): void {
    const confirmDelete = document.getElementById("confirmDelete");
    const cancelDelete = document.getElementById("cancelDelete");

    if (confirmDelete && cancelDelete) {
      this.confirmDeleteDialog.showModal();

      const handleConfirm = () => {
        this.deleteTask(taskId);
        this.confirmDeleteDialog.close();
      };

      confirmDelete.addEventListener("click", handleConfirm);
      cancelDelete.addEventListener("click", () =>
        this.confirmDeleteDialog.close()
      );
    }
  }

  // Exclui uma tarefa e salva a lista atualizada
  private deleteTask(taskId: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
    this.renderTasks();
    this.saveTasks();
  }

  // Remove todas as tarefas concluídas e salva a lista atualizada
  private clearCompletedTasks(): void {
    this.tasks = this.tasks.filter((task) => !task.completed);
    this.renderTasks();
    this.saveTasks();
  }

  // Aplica o filtro de exibição de tarefas
  private filterTasks(filterId: string): void {
    this.filterButtons.forEach((btn) => btn.classList.remove("active"));
    document.getElementById(filterId)?.classList.add("active");

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

  // Retorna as tarefas filtradas com base no estado (todas, ativas ou concluídas)
  private filterTasksList(filter: "all" | "active" | "completed"): Task[] {
    return filter === "active"
      ? this.tasks.filter((task) => !task.completed)
      : filter === "completed"
      ? this.tasks.filter((task) => task.completed)
      : this.tasks;
  }

  // Atualiza o contador de tarefas ativas
  private updateTaskCount(): void {
    const activeTasks = this.tasks.filter((task) => !task.completed).length;
    this.taskCountDisplay.textContent = `${activeTasks} tarefa(s) ativa(s)`;
  }

  // Gera um ID único para cada tarefa
  private generateUniqueId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // Salva as tarefas no localStorage
  private saveTasks(): void {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  // Carrega as tarefas do localStorage ao iniciar a aplicação
  private loadTasks(): void {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      this.tasks = JSON.parse(savedTasks);
      this.renderTasks();
    }
  }
}

// Inicializa o gerenciador de tarefas ao carregar a página
document.addEventListener("DOMContentLoaded", () => new TaskManager());
