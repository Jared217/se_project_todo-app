import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ selector, form, formSubmit }) {
    super({ selector });
    this._form = document.forms[form];
    this._formSubmit = formSubmit;
    // bind handlers to instance
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _getInputValues() {
    // inputs now gathers all user input from form, regardless of type
    const inputs = this._form.querySelectorAll("input, textarea, select");
    const values = {};

    // iterate through each input, storing its value in the object
    inputs.forEach((input) => {
      if (input.type === "date") {
      // create a date object and adjust for timezone
        const date = new Date(input.value);
        date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
        values[input.name] = date;
      } else {
        values[input.name] = input.value;
      }
    });
  
    // return the input values object
    return values;
  }

  // send input values to callback function and handle standard submission and form reset
  _handleSubmit(evt) {
    evt.preventDefault();
    const inputValues = this._getInputValues();
    this._formSubmit(inputValues);
    this._form.reset();
  }

  getForm() {
    return this._form;
  }

  // overwrite parent to also remove sumbit handler
  close() {
    super.close();
    this._form.removeEventListener("submit", this._handleSubmit);
  }

  // overwrite parent to include submit handler
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this._handleSubmit);
  }
}

export default PopupWithForm;
