import {
  editProfileModalForm,
  addCardModalForm,
  editProfileModal,
  addCardModal,
  profileName,
  profileTitile,
} from './script.js'
import { renderCard } from './script.js'
function closeModalByEscape(e) {
  if (e.key === 'Escape') {
    const openedModal = document.querySelector('.modal_open')
    closeModal(openedModal)
  }
}
function closeModal(modal) {
  document.removeEventListener('keydown', closeModalByEscape)
  modal.classList.remove('modal_open')
}

function closeModalByButtonAndOverlay(e) {
  if (
    e.target.classList.contains('modal__close-button') ||
    e.target.classList.contains('modal_open')
  ) {
    closeModal(e.currentTarget)
  }
}

function openModal(modal) {
  document.addEventListener('keydown', closeModalByEscape)
  modal.classList.add('modal_open')
}

function openEditProfileModal() {
  editProfileModalForm.name.value = profileName.textContent
  editProfileModalForm.about.value = profileTitile.textContent
  openModal(editProfileModal)
}

function openAddCardModal() {
  // reset add card form value
  addCardModalForm.title.value = ''
  addCardModalForm.url.value = ''
  //open modal
  openModal(addCardModal)
  //disable the submit button
  const addCardSubmitButton = addCardModalForm.querySelector(
    '.modal__submit-button',
  )
  addCardSubmitButton.classList.add('modal__submit-button_disabled')
  addCardSubmitButton.disabled = true
}

function editSubmitHandler(e) {
  e.preventDefault()
  profileName.textContent = editProfileModalForm.name.value
  profileTitile.textContent = editProfileModalForm.about.value
  closeModal(editProfileModal)
}
function addCardSubmitHandler(e) {
  e.preventDefault()
  const newCard = {}
  newCard.name = addCardModalForm.title.value
  newCard.link = addCardModalForm.url.value
  renderCard(newCard)
  closeModal(addCardModal)
}

export {
  closeModalByEscape,
  closeModal,
  closeModalByButtonAndOverlay,
  openModal,
  openEditProfileModal,
  openAddCardModal,
  editSubmitHandler,
  addCardSubmitHandler,
}
