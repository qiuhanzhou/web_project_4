import Popup from './Popup'

export default class PopupWithForm extends Popup {
  constructor(handleFormSubmit, popupSelector) {
    super(popupSelector)
    this._form = this._element.querySelector('form')
    this._closeButton = this._element.querySelector('button')
    this._handleFormSubmit = handleFormSubmit
    this._allInputs = this._element.querySelectorAll('input')
    this._submitButon = this._element.querySelector('button[type="submit"]')
  }
  _getInputValues() {
    const inputData = {}
    this._allInputs.forEach((input) => {
      const name = input.name
      const value = input.value

      inputData[name] = value
    })
    return inputData
  }

  setEventListeners() {
    this._form.addEventListener('submit', (e) => {
      e.preventDefault()
      // update submit button text to 'saving...'
      this._submitButon.textContent = 'Saving...'
      this._handleFormSubmit(this._getInputValues())
    })
    this._closeButton.addEventListener('click', () => {
      this.close()
    })
    super._setEventListeners()
  }
  close() {
    super.close()
    this._form.reset()
    // revert submit button text to original
    this._submitButon.textContent = 'Save'
  }
}
