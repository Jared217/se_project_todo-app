class Section {
  constructor({ items, renderer, containerSelector }) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // iterate over tasks with render callback function
  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  // add newly created element to the DOM
  addItem(element) {
    this._container.append(element);
  }
}

export default Section;
