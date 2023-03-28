import "./style.scss";
import "animate.css";

interface TodoInterface {
  id: string;
  text: string;
  createDate: Date;
  done: boolean;
}

const input = document.querySelector(".todo__input") as HTMLInputElement;
const createBtn = document.querySelector(".btn_create") as HTMLButtonElement;
const todoList = document.getElementById("todo") as HTMLOListElement;

let todoData: TodoInterface[] = [];
let removingItemId: string = "";

const generateUniqueId = (): string => {
  const timestamp: string = Date.now().toString(36);
  const randomNum: string = Math.random().toString(36).substr(2, 5);
  const uniqueId: string = `${timestamp}-${randomNum}`;

  return uniqueId;
};

const createNote = (data: string | TodoInterface): void => {
  if (typeof data === "string") {
    const newElem = document.createElement("li");
    newElem.classList.add("todo__item");

    newElem.innerHTML = `<span class="todo__text">${data}</span><button class="btn btn_remove">x</button>`;

    todoList.appendChild(newElem);
  } else if (typeof data === "object") {
    const newElem = document.createElement("li");
    newElem.classList.add("todo__item");

    newElem.innerHTML = `<span class="todo__text ${
      data.done ? "task_complete" : "task_not-complete"
    }">${data.text}</span><button class="btn btn_remove">x</button>`;

    todoList.appendChild(newElem);
  }
};

const deleteItem = (itemId: string) => {
  todoData = todoData.filter((item) => item.id !== itemId);
  todoList.innerHTML = "";
  localStorage.setItem("todos", JSON.stringify(todoData));
  initProject();
};

const initProject = (): void => {
  const localStorageData = localStorage.getItem("todos");

  if (localStorageData) {
    const todoParseData = JSON.parse(localStorageData);
    todoData = todoParseData;
    todoParseData.forEach((task: TodoInterface) => {
      createNote(task);
    });
  }
};

input.addEventListener("keyup", (e: KeyboardEvent) => {
  const target: HTMLInputElement = e.target as HTMLInputElement;
  const data: TodoInterface = {
    id: generateUniqueId(),
    text: target.value,
    createDate: new Date(),
    done: false,
  };

  if (e.key === "Enter" && target.value) {
    todoData.push(data);
    createNote(target.value);
    target.value = "";
    localStorage.setItem("todos", JSON.stringify(todoData));
  }
});

createBtn.addEventListener("click", () => {
  const data: TodoInterface = {
    id: generateUniqueId(),
    text: input.value,
    createDate: new Date(),
    done: false,
  };

  if (input.value) {
    todoData.push(data);
    createNote(input.value);
    input.value = "";
    localStorage.setItem("todos", JSON.stringify(todoData));
  }
});

todoList.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
  for (let i = 0; i < todoList.children.length; i++) {
    const item = todoList.children[i];
    if (item.contains(target)) {
      removingItemId = todoData[i].id;
      deleteItem(removingItemId);
    }
  }
});

initProject();
