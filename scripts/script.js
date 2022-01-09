import FormValidator from './FormValidator.js'
import Card from './Card.js'
import {
  closeModalByButtonAndOverlay,
  openEditProfileModal,
  openAddCardModal,
  editSubmitHandler,
  addCardSubmitHandler,
} from './utils.js'

const editProfileModal = document.querySelector('#edit-profile-modal')
const addCardModal = document.querySelector('#add-card-modal')
const imageModal = document.querySelector('#image-modal')
const allModals = document.querySelectorAll('.modal')
const editProfileButton = document.querySelector('.profile__edit-button')
const profileName = document.querySelector('.profile__name')
const profileTitile = document.querySelector('.profile__title')
const cardsContainer = document.querySelector('.cards-container')
const addCardButton = document.querySelector('.profile__add-button')
const editProfileModalForm = document.getElementById('edit-profile')
const addCardModalForm = document.getElementById('add-card')
const modalImage = document.querySelector('.modal__image')
const modalCaption = document.querySelector('.modal__caption')

const cardSelector = '#card-template'
const initialCards = [
  {
    name: 'Yosemite Valley',
    link: 'https://code.s3.yandex.net/web-code/yosemite.jpg',
  },
  {
    name: 'Lake Louise',
    link: 'https://code.s3.yandex.net/web-code/lake-louise.jpg',
  },
  {
    name: 'Bald Mountains',
    link: 'https://code.s3.yandex.net/web-code/bald-mountains.jpg',
  },
  {
    name: 'Latemar',
    link: 'https://code.s3.yandex.net/web-code/latemar.jpg',
  },
  {
    name: 'Vanoise National Park',
    link: 'https://code.s3.yandex.net/web-code/vanoise.jpg',
  },
  {
    name: 'Lago di Braies',
    link: 'https://code.s3.yandex.net/web-code/lago.jpg',
  },
]

const validationConfig = {
  formSelector: '.modal__form',
  inputSelector: '.modal__input',
  submitButtonSelector: '.modal__submit-button',
  inactiveButtonClass: 'modal__submit-button_disabled',
  inputErrorClass: 'modal__input_type_error',
  errorClass: 'modal__error_visible',
}

function renderCard(data) {
  const newCard = new Card(data, cardSelector).generateCard()
  cardsContainer.prepend(newCard)
}

allModals.forEach((modal) => {
  modal.addEventListener('click', closeModalByButtonAndOverlay)
})

editProfileButton.addEventListener('click', () => {
  openEditProfileModal()
})
addCardButton.addEventListener('click', () => {
  openAddCardModal()
})

editProfileModalForm.addEventListener('submit', editSubmitHandler)
addCardModalForm.addEventListener('submit', addCardSubmitHandler)

initialCards.forEach((cardData) => {
  renderCard(cardData)
})

const addFormValidator = new FormValidator(validationConfig, addCardModalForm)
const editFormValidator = new FormValidator(
  validationConfig,
  editProfileModalForm,
)
addFormValidator.enableValidation()
editFormValidator.enableValidation()

export {
  editProfileModal,
  imageModal,
  modalImage,
  modalCaption,
  addCardModalForm,
  editProfileModalForm,
  profileName,
  addCardModal,
  profileTitile,
}
