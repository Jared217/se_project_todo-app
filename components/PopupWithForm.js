import Popup from "./Popup.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";

class PopupWithForm extends Popup {
  constructor({ selector, form, formSubmit }) {
    super({ selector });
    this._form = document.forms[form];
    this._formSubmit = formSubmit;
    // bind handlers to instance
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _getInputValues() {
    // values from input form
    const name = this._form.name.value;
    const dateInput = this._form.date.value;
    // generate random id for new tasks
    const id = uuidv4();

    // create a date object and adjust for timezone
    const date = new Date(dateInput);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    // wrap all input values into a new object
    return { name, date, id };
  }

  // send input values to callback function and handle standard submission and form reset
  _handleSubmit(evt) {
    evt.preventDefault();
    const inputValues = this._getInputValues();
    this._formSubmit(inputValues);
    this._form.reset();
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
