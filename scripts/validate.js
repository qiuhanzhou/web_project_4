function showErrorMessage(inputEl, formEl, errorMessage, settings) {
  const errorEl = formEl.querySelector(`.${inputEl.id}-error`)
  errorEl.classList.add(settings.errorClass)
  errorEl.textContent = errorMessage
  inputEl.classList.add(settings.inputErrorClass)
}

function hideErrorMessage(inputEl, formEl, settings) {
  const errorEl = formEl.querySelector(`.${inputEl.id}-error`)
  errorEl.classList.remove(settings.errorClass)
  errorEl.textContent = ''
  inputEl.classList.remove(settings.inputErrorClass)
}

//check for individal input's validity and show/hide error message
function checkInputValidity(inputEl, formEl, settings) {
  const errorMessage = inputEl.validationMessage
  if (!inputEl.validity.valid) {
    showErrorMessage(inputEl, formEl, errorMessage, settings)
  } else {
    hideErrorMessage(inputEl, formEl, settings)
  }
}

// check if any field doesn't pass validation within a form
function hasInvalidInput(inputEl, formEl, settings, inputList) {
  return !inputList.every((input) => input.validity.valid)
}

function updateButtonState(inputEl, formEl, settings, submitButton, inputList) {
  if (hasInvalidInput(inputEl, formEl, settings, inputList)) {
    submitButton.classList.add(settings.inactiveButtonClass)
    submitButton.disabled = true
  } else {
    submitButton.classList.remove(settings.inactiveButtonClass)
    submitButton.disabled = false
  }
}

function setEventListeners(formEl, settings) {
  //get all the inputs and submit buttons
  const inputList = Array.from(formEl.querySelectorAll(settings.inputSelector))
  const submitButton = formEl.querySelector(settings.submitButtonSelector)

  //loop thru input lists and set up event listener
  inputList.forEach((inputEl) => {
    inputEl.addEventListener('input', () => {
      // check for validation
      checkInputValidity(inputEl, formEl, settings)

      // update button state (disabled or not)
      //if any field doesn't pass validation, the button should be inactive. If both fields pass validation, then it should be active

      updateButtonState(inputEl, formEl, settings, submitButton, inputList)
    })
  })
}

function enableValidation(settings) {
  // get list of forms that need to be valided
  const formList = Array.from(document.querySelectorAll(settings.formSelector))
  //loop thru each form
  formList.forEach((formEl) => {
    // prevent default submit bahavior
    formEl.addEventListener('submit', (e) => {
      e.preventDefault()
    })

    //add validation
    setEventListeners(formEl, settings)
  })
}

// enabling validation by calling enableValidation()
// pass all the settings on call

enableValidation({
  formSelector: '.modal__form',
  inputSelector: '.modal__input',
  submitButtonSelector: '.modal__submit-button',
  inactiveButtonClass: 'modal__submit-button_disabled',
  inputErrorClass: 'modal__input_type_error',
  errorClass: 'modal__error_visible',
})
