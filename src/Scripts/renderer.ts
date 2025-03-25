const taskInput = document.getElementById("taskInput") as HTMLInputElement;
const addTaskBtn = document.getElementById("addTask") as HTMLButtonElement;
const taskList = document.getElementById("taskList") as HTMLUListElement;

const createListItems = (task: HTMLInputElement): void => {
  if (!task.value.trim()) return;

  const li = document.createElement("li");

  const textTask = document.createElement("p");
  textTask.classList.add("text-task");

  const editButton = document.createElement("button");
  editButton.classList.add("edit-btn");
  editButton.textContent = "Editar✏️";
  editButton.onclick = () => {
    if (editButton) editTask(textTask);
  };
  textTask.textContent = task.value;

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.textContent = "Deletar❌";
  deleteBtn.onclick = () => li.remove();

  li.appendChild(textTask);
  li.appendChild(deleteBtn);
  li.appendChild(editButton);
  taskList.appendChild(li);

  task.value = "";
};

addTaskBtn.addEventListener("click", () => {
  createListItems(taskInput);
});

taskInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    createListItems(taskInput);
  }
});
const editTask = (textTask: HTMLParagraphElement):void => {
    if (!taskInput.value.trim()) {
        taskInput.value = textTask.innerHTML || '';
        taskInput.focus();
    }
    return;
}// Aplicativo renderer.ts convertiodo em renderer.js
const numerateTask = (): void => {
    const tasks = Array.from(document.querySelectorAll("li") as NodeListOf<HTMLElement>);
    tasks.forEach((task, index) => {
        task.textContent = `${index + 1}. ${task.textContent}`;
    });
};