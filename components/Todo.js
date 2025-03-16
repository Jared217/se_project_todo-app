class Todo {
  constructor(data, selector, updateCompleted, updateTotal) {
    this._name = data.name;
    this._date = data.date;
    this._id = data.id;
    this._completed = data.completed;
    this._templateElement = document.querySelector(selector);
    this._updateCompleted = updateCompleted;
    this._updateTotal = updateTotal;
  }

  _generateCheckboxEl() {
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");
    this._todoCheckboxEl.checked = this._completed;

    // Apply id and for attributes.
    // The id will initially be undefined for new todos.
    this._todoCheckboxEl.id = `todo-${this._id}`;
    this._todoLabel.setAttribute("for", `todo-${this._id}`);
  }

  _setEventListeners() {
    this._todoCheckboxEl.addEventListener(
      "change",
      this._toggleCheckbox.bind(this)
    );
    this._todoDeleteBtn.addEventListener("click", this._todoDelete.bind(this));
  }

  _todoDelete = () => {
    if (this._completed) {
      this._updateCompleted(false);
    }
    this._todoElement.remove();
    this._todoElement = null;
    this._updateTotal(false);
  };

  _toggleCheckbox = () => {
    this._completed = !this._completed;
    let isAdding = this._completed;
    this._updateCompleted(isAdding);
  };

  _setTodoDate() {
    const dueDate = new Date(this._date);
    if (!isNaN(dueDate)) {
      this._todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }
  }

  getView() {
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);
    const todoNameEl = this._todoElement.querySelector(".todo__name");
    this._todoDate = this._todoElement.querySelector(".todo__date");
    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");

    todoNameEl.textContent = this._name;

    this._generateCheckboxEl();
    this._setEventListeners();
    this._setTodoDate();

    return this._todoElement;
  }
}

export default Todo;
