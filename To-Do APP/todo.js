const form = document.querySelector(".form");
const input = document.querySelector(".input");
const todo_container = document.querySelector(".todo_container");
let Sils;
let checkboxs;
let edit;

const addHTML = (todo) => {
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  const todoLeft = document.createElement("div");
  todoLeft.classList.add("todo_left");

  const todoCheckBox = document.createElement("input");
  todoCheckBox.type = "checkbox";
  todoCheckBox.checked = todo.isCompleted;
  todoCheckBox.classList.add("todo_checkbox");

  const todoText = document.createElement("span");
  todoText.classList.add("todo_text");
  todoText.textContent = todo.text;

  todoLeft.appendChild(todoCheckBox);
  todoLeft.appendChild(todoText);

  const todoRigth = document.createElement("div");
  todoRigth.classList.add("todo_right");

  const Sil = document.createElement("button");
  Sil.classList.add("todo_sil");
  Sil.textContent = "Sil";

  const Duzenle = document.createElement("button");
  Duzenle.classList.add("todo_duzenle");
  Duzenle.textContent = "Düzenle";

  todoRigth.appendChild(Sil);
  todoRigth.appendChild(Duzenle);

  todoDiv.appendChild(todoLeft);
  todoDiv.appendChild(todoRigth);

  todo_container.appendChild(todoDiv);
};

const startConf = () => {
  const todos = JSON.parse(localStorage.getItem("todos"));
  if (!todos) {
    localStorage.setItem("todos", JSON.stringify([]));
  } else {
    todos.forEach((todo) => {
      addHTML(todo);
    });
    Sils = document.querySelectorAll(".todo_sil");
    checkboxs = document.querySelectorAll(".todo_checkbox");
    edit = document.querySelectorAll(".todo_duzenle");
  }
};

startConf();

const addTodo = (e) => {
  e.preventDefault();

  const Text = input.value;

  if (Text === "") {
    alert("Lütfen bir görev girin.");
    return;
  }

  const todo = {
    text: Text,
    isCompleted: false,
  };

  const todos = JSON.parse(localStorage.getItem("todos"));
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));

  addHTML(todo);

  form.reset();
  window.location.reload();
};

const deleteTodo = (e) => {
  const todo = e.target.parentElement.parentElement;
  const text = todo.firstChild.children[1].textContent;

  let todos = JSON.parse(localStorage.getItem("todos"));
  todos = todos.filter((td) => td.text != text);
  localStorage.setItem("todos", JSON.stringify(todos));

  todo.remove();
};

const completeTodo = (e) => {
  const todo = e.target.parentElement.parentElement;
  const text = todo.firstChild.children[1].textContent;

  let todos = JSON.parse(localStorage.getItem("todos"));
  todos.forEach((td) => {
    if (td.text === text) td.isCompleted = !td.isCompleted;
  });

  localStorage.setItem("todos", JSON.stringify(todos));
};

const editTodo = (e) => {
  const todo = e.target.parentElement.parentElement;
  const text = todo.firstChild.children[1].textContent;

  let todos = JSON.parse(localStorage.getItem("todos"));
  todos = todos.filter((td) => td.text != text);
  localStorage.setItem("todos", JSON.stringify(todos));

  todo.remove();

  input.value = text;
};

form.addEventListener("submit", addTodo);
Sils.forEach((btn) => btn.addEventListener("click", deleteTodo));
checkboxs.forEach((btn) => btn.addEventListener("click", completeTodo));
edit.forEach((btn) => btn.addEventListener("click", editTodo));

const searchInput = document.querySelector(".search-input");

const filterTodos = () => {
  const searchText = searchInput.value.toLowerCase();
  const todos = document.querySelectorAll(".todo");

  todos.forEach((todo) => {
    const todoText = todo.querySelector(".todo_text").textContent.toLowerCase();
    if (todoText.includes(searchText)) {
      todo.style.display = "block";
    } else {
      todo.style.display = "none";
    }
  });
};

searchInput.addEventListener("input", filterTodos);
