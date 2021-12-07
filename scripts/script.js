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

function createCard(data) {
  const cardTemplate = document.querySelector('#card-template').content
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true)
  const likeButton = cardElement.querySelector('.card__like-button')
  const deleteButton = cardElement.querySelector('.card__close-button')
  const cardImage = cardElement.querySelector('.card__image')

  cardImage.src = data.link
  cardImage.alt = data.name
  cardElement.querySelector('.card__title').textContent = data.name

  function onClickLikeButtonHandler(e) {
    e.target.classList.toggle('card__like-button_full')
  }
  function onClickDeleteButtonHandler(e) {
    cardElement.remove()
  }
  function onClickImageHandler(e) {
    openModal(imageModal)
    modalImage.src = e.target.src
    modalImage.alt = e.target.alt
    modalCaption.textContent = e.target.alt
  }
  likeButton.addEventListener('click', onClickLikeButtonHandler)
  deleteButton.addEventListener('click', onClickDeleteButtonHandler)
  cardImage.addEventListener('click', onClickImageHandler)

  return cardElement
}

function renderCard(data) {
  const newCard = createCard(data)
  cardsContainer.prepend(newCard)
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

function closeModal(modal) {
  document.removeEventListener('keydown', closeModalByEscape)
  modal.classList.remove('modal_open')
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

initialCards.forEach((card) => {
  renderCard(card)
})

function closeModalByButtonAndOverlay(e) {
  if (
    e.target.classList.contains('modal__close-button') ||
    e.target.classList.contains('modal_open')
  ) {
    closeModal(e.currentTarget)
  }
}

function closeModalByEscape(e) {
  if (e.key === 'Escape') {
    const openedModal = document.querySelector('.modal_open')
    closeModal(openedModal)
  }
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
