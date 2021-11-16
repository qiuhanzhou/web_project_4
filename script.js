const editProfileModal = document.querySelector('.modal')
const editProfileCloseButton = document.querySelector('.modal__close-button')
const openModalButton = document.querySelector('.profile__edit-button')
const modalForm = document.querySelector('.modal__form')
const profileName = document.querySelector('.profile__name')
const profileTitile = document.querySelector('.profile__title')
const likeButtons = document.querySelectorAll('.card__like-button')

function openModal() {
  editProfileModal.classList.add('modal_open')
  modalForm.name.value = profileName.textContent
  modalForm.title.value = profileTitile.textContent
}
function closeModel() {
  editProfileModal.classList.remove('modal_open')
}

function updateProfile(e) {
  e.preventDefault()
  profileName.textContent = modalForm.name.value
  profileTitile.textContent = modalForm.title.value
  editProfileModal.classList.remove('modal_open')
}

function toggleLikeState() {}
openModalButton.addEventListener('click', openModal)
editProfileCloseButton.addEventListener('click', closeModel)
modalForm.addEventListener('submit', updateProfile)
