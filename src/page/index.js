import './index.css'

//import all the classes
import {
  selectors,
  validationConfig,
  editProfileButton,
  addCardButton,
  profileNameEl,
  profileTitleEl,
  profileAvatarEl,
  editProfileModalForm,
  addCardModalForm,
  updateProfilePicForm,
  updateProfilePicButton,
} from '../utils/constants'
import FormValidator from '../components/FormValidator'
import Card from '../components/Card'
import Section from '../components/Section'
import PopupWithImage from '../components/PopupWithImage'
import PopupWithForm from '../components/PopupWithForm'
import PopupWithConfirmation from '../components/PopupWithConfirmation'
import UserInfo from '../components/UserInfo'
import Api from '../components/Api'

let userId

const imagePopup = new PopupWithImage(selectors.imagePopupSelector)
const editProfilePopup = new PopupWithForm(
  handleEditFormSubmit,
  selectors.editProfilePopupSelector,
)
editProfilePopup.setEventListeners()

const addCardPopup = new PopupWithForm(
  handleAddCardFormSubmit,
  selectors.addCardPopupSelector,
)
addCardPopup.setEventListeners()

const updateProfilePicPopup = new PopupWithForm(
  handleUpdateProfileFormSubmit,
  selectors.updateProfilePopupPicSelector,
)
updateProfilePicPopup.setEventListeners()

const addFormValidator = new FormValidator(validationConfig, addCardModalForm)
const editFormValidator = new FormValidator(
  validationConfig,
  editProfileModalForm,
)
const updateProfileFormValidator = new FormValidator(
  validationConfig,
  updateProfilePicForm,
)

addFormValidator.enableValidation()
editFormValidator.enableValidation()
updateProfileFormValidator.enableValidation()

const profileUserInfo = new UserInfo({
  userNameElement: profileNameEl,
  userTitleElement: profileTitleEl,
})

const cardSection = new Section(
  (item) => {
    renderCard(item)
  },

  selectors.cardContainerSelector,
)

const renderCard = (cardResult) => {
  const card = new Card(
    cardResult,
    userId,
    selectors.cardTemplate,
    handleCardClick,
    api,
    handleCardDeleteClick,
    handleDeleteCardFormSubmit,
  )
  const cardEl = card.generateCard()
  console.log(card._likeDiv)
  cardSection.addItem(cardEl)
}

//callbacks passed in as class constructor params

function handleCardClick(data) {
  imagePopup.open(data)
}

function handleEditFormSubmit({ name, about }) {
  api
    .setUserInfo({
      name,
      about,
    })
    .then(() => {
      //update UI
      profileUserInfo.setUserInfo({
        name,
        about,
      })
      editProfilePopup.close()
    })
    .catch((err) => {
      console.log(`can't set user info: ${err}`)
    })
}

function handleAddCardFormSubmit({ title: name, url: link }) {
  api
    .addCard({ name, link })
    .then((res) => {
      if (renderCard != undefined) {
        renderCard(res)
      }
    })
    .catch((err) => {
      console.log(`can't add new card: ${err}`)
    })
  addCardPopup.close()
}

function handleUpdateProfileFormSubmit({ url: link }) {
  api
    .updateProfilePicture(link)
    .then(() => {
      //update DOM profile pic
      profileAvatarEl.src = link
    })
    .catch((err) => {
      console.log(`can't update user profile picture: ${err}`)
    })
  updateProfilePicPopup.close()
}

function handleCardDeleteClick(cardId, element) {
  deleteCardPopup.open(cardId, element)
}

function handleDeleteCardFormSubmit(cardId, element) {
  api
    .deleteCard(cardId)
    .then(() => element.remove())
    .catch((err) => {
      console.log(`can't delete card: ${err}`)
    })
  deleteCardPopup.close()
}

//add event listeners to buttons
editProfileButton.addEventListener('click', () => {
  editFormValidator.updateButtonState()
  const currentUserInfo = profileUserInfo.getUserInfo()
  const userNameInput = editProfileModalForm.name
  const userJobInput = editProfileModalForm.about
  userNameInput.value = currentUserInfo.userName
  userJobInput.value = currentUserInfo.title
  editProfilePopup.open()
})
addCardButton.addEventListener('click', () => {
  addFormValidator.updateButtonState()
  addCardPopup.open()
})

updateProfilePicButton.addEventListener('click', () => {
  console.log('update ran')
  updateProfilePicPopup.open()
})

const api = new Api({
  baseUrl: 'https://around.nomoreparties.co/v1/group-12',
  headers: {
    authorization: 'bdbcf068-f0a2-4438-8115-013f3ee9f311',
    'Content-Type': 'application/json',
  },
})

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then((values) => {
    const [user, initialCards] = values
    console.log(initialCards)
    const { name, about, avatar, _id } = user
    profileAvatarEl.src = avatar
    profileNameEl.textContent = name
    profileTitleEl.textContent = about
    userId = _id
    cardSection.renderItems(initialCards)
  })
  .catch((err) => {
    console.log(`can't get inital cards: ${err}`)
  })

const deleteCardPopup = new PopupWithConfirmation(
  selectors.deleteCardPopupSelector,
  handleDeleteCardFormSubmit,
)

deleteCardPopup.setEventListeners()

// function deleteFormSubmit() {
//   api.deleteCard().catch((err) => {
//     console.log(`can't set user info: ${err}`)
//   })

//   editProfilePopup.close()
// }
