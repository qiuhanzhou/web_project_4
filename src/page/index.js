import './index.css'

//import all the classes
import {
  initialCards,
  selectors,
  validationConfig,
  editProfileButton,
  addCardButton,
  profileNameEl,
  profileTitleEl,
  editProfileModalForm,
  addCardModalForm,
} from '../utils/constants'
import FormValidator from '../components/FormValidator'
import Card from '../components/Card'
import Section from '../components/Section'
import PopupWithImage from '../components/PopupWithImage'
import PopupWithForm from '../components/PopupWithForm'
import UserInfo from '../components/UserInfo'

const renderCard = (card) => {
  const cardEl = card.generateCard()
  cardSection.addItem(cardEl)
}

//create instances of the classes

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, selectors.cardTemplate, handleCardClick)
      renderCard(card)
    },
  },
  selectors.cardContainerSelector,
)
const addFormValidator = new FormValidator(validationConfig, addCardModalForm)
const editFormValidator = new FormValidator(
  validationConfig,
  editProfileModalForm,
)

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

const profileUserInfo = new UserInfo({
  userNameElement: profileNameEl,
  userTitleElement: profileTitleEl,
})

//callbacks passed in as class constructor params

function handleCardClick(data) {
  imagePopup.open(data)
}

function handleEditFormSubmit({ name: userName, about: title }) {
  profileUserInfo.setUserInfo({
    userName,
    title,
  })
  editProfilePopup.close()
}

function handleAddCardFormSubmit({ title: name, url: link }) {
  const card = new Card({ name, link }, selectors.cardTemplate, handleCardClick)
  renderCard(card)
  addCardPopup.close()
}

//initialize all my classes
cardSection.renderItems()

addFormValidator.enableValidation()
editFormValidator.enableValidation()

editProfileButton.addEventListener('click', () => {
  editFormValidator.updateButtonState()
  editProfilePopup.open()
})
addCardButton.addEventListener('click', () => {
  addFormValidator.updateButtonState()
  addCardPopup.open()
})
