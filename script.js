const editProfileModal = document.querySelector('.modal')
const editProfileCloseButton = document.querySelector('.modal__close-button')
const openModalButton = document.querySelector('.profile__edit-button')
const modalForm = document.querySelector('.modal__form')
const profileName = document.querySelector('.profile__name')
const profileTitile = document.querySelector('.profile__title')

function openModal(e) {
  editProfileModal.classList.add('modal_open')
}
function editProfile(e) {
  //close modal by clicking the close button or clicking outside the modal content
  if (
    e.target === editProfileCloseButton ||
    e.target.classList.contains('modal')
  ) {
    editProfileModal.classList.remove('modal_open')
  }
}

function updateProfile(e) {
  e.preventDefault()
  const name = modalForm.name.value
  const title = modalForm.title.value

  console.log(modalForm.name.value)

  profileName.textContent = name
  profileTitile.textContent = title
  editProfileModal.classList.remove('modal_open')
}
openModalButton.addEventListener('click', openModal)
editProfileModal.addEventListener('click', editProfile)
modalForm.addEventListener('submit', updateProfile)
