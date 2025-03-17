import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");

const todoList = new Section({
  items: initialTodos,
  renderer: renderTodo,
  containerSelector: ".todos__list",
});

todoList.renderItems(); // Initial Page Load

function renderTodo(item) {
  // recieves "todo" from Section class
  const todo = generateTodo(item); // sends to generateTodo for template
  todoList.addItem(todo); // sends new element back to Section to add to the DOM
}

function generateTodo(data) {
  const todo = new Todo(data, "#todo-template", updateCompleted, updateTotal); // established template for markup
  const todoElement = todo.getView(); // creates html element to send back

  return todoElement;
}

// i added an additional parameter for more flexibility within the class
const newTodoPopup = new PopupWithForm({
  selector: "#add-todo-popup",
  form: "add-todo-form",
  formSubmit: (inputValues) => {
    // now dynamically assigns an id if the element does not have one
    const newTodo = { ...inputValues, id: uuidv4() };
    renderTodo(newTodo);
    todoCounter.updateTotal(true);
    newTodoPopup.close();
    newTodoValidator.resetValidation();
  },
});

function updateCompleted(isAdding) {
  todoCounter.updateCompleted(isAdding);
}

function updateTotal(isAdding) {
  todoCounter.updateTotal(isAdding);
}

addTodoButton.addEventListener("click", () => {
  newTodoPopup.open();
});

const todoCounter = new TodoCounter(initialTodos, ".counter__text");
const newTodoValidator = new FormValidator(
  validationConfig,
  newTodoPopup.getForm()
);
newTodoValidator.enableValidation();
