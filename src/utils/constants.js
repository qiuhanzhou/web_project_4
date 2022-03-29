export const editProfileModal = document.querySelector('#edit-profile-modal')
export const allModals = document.querySelectorAll('.modal')
export const editProfileButton = document.querySelector('.profile__edit-button')
export const profileName = document.querySelector('.profile__name')
export const profileTitile = document.querySelector('.profile__title')
export const addCardButton = document.querySelector('.profile__add-button')
export const editProfileModalForm = document.getElementById('edit-profile')
export const addCardModalForm = document.getElementById('add-card')
export const modalButtons = document.querySelectorAll('.modal')n

export const initialCards = [
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

export const validationConfig = {
  formSelector: '.modal__form',
  inputSelector: '.modal__input',
  submitButtonSelector: '.modal__submit-button',
  inactiveButtonClass: 'modal__submit-button_disabled',
  inputErrorClass: 'modal__input_type_error',
  errorClass: 'modal__error_visible',
}

export const selectors = {
  cardContainerSelector: '.cards-container',
  cardTemplate: '#card-template',
  editProfilePopupSelector: '#edit-profile-modal',
  addCardPopupSelector: '#add-card-modal',
  imagePopupSelector: '#image-modal',
}
