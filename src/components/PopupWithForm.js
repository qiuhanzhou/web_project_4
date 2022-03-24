import Popup from './Popup'

export default class PopupWithForm extends Popup {
  constructor(handleFormSubmit, popupSelector) {
    super(popupSelector)
    this._form = this._element.querySelector('form')
    this._closeButton = this._element.querySelector('button')
    this._handleFormSubmit = handleFormSubmit
  }
  _getInputValues() {
    const allInputs = this._element.querySelectorAll('input')
    const inputValues = Array.from(allInputs).map((input) => input.value)
    return inputValues
  }

  setEventListeners() {
    this._form.addEventListener('submit', (e) => {
      e.preventDefault()
      this._handleFormSubmit(this._getInputValues())
    })
    this._closeButton.addEventListener('click', () => {
      this.close()
    })
    super.setEventListeners()
  }
  close() {
    this._form.reset()
    super.close()
  }
}
