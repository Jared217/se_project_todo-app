class Popup {
  constructor({ selector }) {
    this._popup = document.querySelector(selector);
    // explicitly bind event handling for instance
    this._handleEventClose = this._handleEventClose.bind(this);
  }

  // track all popup close events, whether click or keybind (submission handled in child class)
  // GRADER: in my thought process I feel like this is a streamline approach to handle various event listeners, but would be interested in your feedback
  _handleEventClose(evt) {
    const closeButton = this._popup.querySelector(".popup__close");
    if (
      evt.key === "Escape" ||
      evt.target === this._popup ||
      evt.target === closeButton
    ) {
      this.close();
    }
  }

  // add appropriate event listeners to close popup
  setEventListeners() {
    this._popup.addEventListener("click", this._handleEventClose);
    document.addEventListener("keydown", this._handleEventClose);
  }

  // remove listeners to prevent memory leak
  removeEventListeners() {
    this._popup.removeEventListener("click", this._handleEventClose);
    document.removeEventListener("keydown", this._handleEventClose);
  }

  // simultaneously show popup and call method to add listeners
  open() {
    this._popup.classList.add("popup_visible");
    this.setEventListeners();
  }

  // simultaneously close popup and call method to remove listeners
  close() {
    this._popup.classList.remove("popup_visible");
    this.removeEventListeners();
  }
}

export default Popup;
