class TodoCounter {
  constructor(todos, selector) {
    this._element = document.querySelector(selector);
    this._completed = todos.filter((todo) => todo.completed).length;
    this._total = todos.length;
    this._updateText(); // set initial counter display
  }

  updateCompleted = (isAdding) => {
    this._completed += isAdding ? 1 : -1; // +1 if true, -1 if false
    this._updateText();
  };

  updateTotal = (isAdding) => {
    this._total += isAdding ? 1 : -1; // +1 if true, -1 if false
    this._updateText();
  };

  _updateText() {
    this._element.textContent = `Showing ${this._completed} out of ${this._total} completed`;
    // dynamically update values on counter
  }
}

export default TodoCounter;
