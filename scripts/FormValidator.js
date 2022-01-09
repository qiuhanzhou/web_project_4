export default class FormValidator {
  constructor(config, formElement) {
    this._formSelector = config.formSelector
    this._inputSelector = config.inputSelector
    this._submitButtonSelector = config.submitButtonSelector
    this._inactiveButtonClass = config.inactiveButtonClass
    this._inputErrorClass = config.inputErrorClass
    this._errorClass = config.errorClass

    this._formElement = formElement
  }

  _showErrorMessage(inputEl, errorMessage) {
    const errorEl = this._formElement.querySelector(`.${inputEl.id}-error`)
    errorEl.classList.add(this._errorClass)
    errorEl.textContent = errorMessage
    inputEl.classList.add(this._inputErrorClass)
  }

  _hideErrorMessage(inputEl) {
    const errorEl = this._formElement.querySelector(`.${inputEl.id}-error`)
    errorEl.classList.remove(this._errorClass)
    errorEl.textContent = ''
    inputEl.classList.remove(this._inputErrorClass)
  }

  _checkInputValidity(inputEl) {
    const errorMessage = inputEl.validationMessage
    if (!inputEl.validity.valid) {
      this._showErrorMessage(inputEl, errorMessage)
    } else {
      this._hideErrorMessage(inputEl)
    }
  }

  _hasInvalidInput(inputList) {
    return !inputList.every((input) => input.validity.valid)
  }

  _updateButtonState(inputEl, inputList, submitButton) {
    if (this._hasInvalidInput(inputList)) {
      submitButton.classList.add(this._inactiveButtonClass)
      submitButton.disabled = true
    } else {
      submitButton.classList.remove(this._inactiveButtonClass)
      submitButton.disabled = false
    }
  }

  _setEventListeners() {
    //get all the inputs and submit buttons
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector),
    )
    const submitButton = this._formElement.querySelector(
      this._submitButtonSelector,
    )

    inputList.forEach((inputEl) => {
      inputEl.addEventListener('input', () => {
        // check for validation
        this._checkInputValidity(inputEl)

        // update button state (disabled or not)
        //if any field doesn't pass validation, the button should be inactive. If both fields pass validation, then it should be active

        this._updateButtonState(inputEl, inputList, submitButton)
      })
    })
  }

  enableValidation() {
    this._formElement.addEventListener('submit', (e) => {
      e.preventDefault()
    })

    this._setEventListeners()
  }
}
