import "./style.scss";

interface TodoInterface {
  text: string;
  createDate: Date;
  done: boolean;
}

const input = document.querySelector(".todo__input") as HTMLInputElement;
const createBtn = document.querySelector(".btn_create") as HTMLButtonElement;
const todoList = document.querySelector(".todo__list") as HTMLOListElement;

let todoData: TodoInterface[] = [];

const createNoteFromStorage = (data: TodoInterface): void => {
  const newElem = document.createElement("li");
  newElem.classList.add("todo__item");

  newElem.innerHTML = `<span class="todo__text ${
    data.done ? "task_complete" : "task_not-complete"
  }">${data.text}</span><button class="btn btn_remove">❌</button>`;

  todoList.appendChild(newElem);
};

const createNote = (text: string): void => {
  const newElem = document.createElement("li");

  newElem.classList.add("todo__item");
  newElem.innerHTML = `<span class="todo__text">${text}</span><button class="btn btn_remove">❌</button>`;

  todoList.appendChild(newElem);
};

const initProject = (): void => {
  const localStorageData = localStorage.getItem("todos");

  if (localStorageData) {
    const todoParseData = JSON.parse(localStorageData);
    todoData = todoParseData;
    todoParseData.forEach((task: TodoInterface) => {
      createNoteFromStorage(task);
    });
  }
};

input.addEventListener("keyup", (e: KeyboardEvent) => {
  const target: HTMLInputElement = e.target as HTMLInputElement;
  const data: TodoInterface = {
    text: target.value,
    createDate: new Date(),
    done: false,
  };

  if (e.key === "Enter" && target.value) {
    todoData.push(data);
    createNote(target.value);
    target.value = "";
    console.log(todoData);
    localStorage.setItem("todos", JSON.stringify(todoData));
    console.log("storage", localStorage.getItem("todos"));
  }
});

createBtn.addEventListener("click", () => {
  const data: TodoInterface = {
    text: input.value,
    createDate: new Date(),
    done: false,
  };

  if (input.value) {
    todoData.push(data);
    createNote(input.value);
    input.value = "";
    console.log(todoData);
    localStorage.setItem("todos", JSON.stringify(todoData));
    console.log("storage", localStorage.getItem("todos"));
  }
});

initProject();
