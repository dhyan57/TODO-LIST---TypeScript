import './style.css'

type TASK = {
  id: number;
  name: string;
  completed: boolean;
}

const inputElement = document.getElementById("todo-input") as HTMLInputElement
const buttonClick = document.getElementById("add-btn") as HTMLButtonElement
const listing = document.getElementById("todo-list") as HTMLUListElement

let tasks: TASK[] = loadTasks()

// Initial render of saved tasks
renderTasks()

buttonClick.addEventListener("click", () => {
  const value = inputElement.value.trim()
  if (value === "") return

  const newTask: TASK = {
    id: Date.now(),
    name: value,
    completed: false
  }

  tasks.push(newTask)
  saveTasks()
  renderTasks()
  inputElement.value = ''
})

function renderTasks() {
  listing.innerHTML = ""

  tasks.forEach(task => {
    const list = document.createElement("li")

    const checkbox = document.createElement("input")
    checkbox.type = "checkbox"
    checkbox.checked = task.completed
    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked
      saveTasks()
    })

    const span = document.createElement("span")
    span.textContent = task.name
    if (task.completed) span.style.textDecoration = "line-through"

    const editBtn = document.createElement("button")
    editBtn.textContent = "Edit"
    editBtn.addEventListener("click", () => {
      const newName = prompt("Edit task:", task.name)
      if (newName !== null && newName.trim() !== "") {
        task.name = newName.trim()
        saveTasks()
        renderTasks()
      }
    })

    const deleteBtn = document.createElement("button")
    deleteBtn.textContent = "Delete"
    deleteBtn.addEventListener("click", () => {
      tasks = tasks.filter(t => t.id !== task.id)
      saveTasks()
      renderTasks()
    })

    list.append(checkbox, span, editBtn, deleteBtn)
    listing.append(list)
  })
}

function saveTasks() {
  localStorage.setItem("TASKS", JSON.stringify(tasks))
}

function loadTasks(): TASK[] {
  const taskData = localStorage.getItem("TASKS")
  try {
    const parsed = taskData ? JSON.parse(taskData) : []
    return Array.isArray(parsed) ? parsed : []
  } catch (e) {
    console.error("Failed to load tasks:", e)
    return []
  }
}

