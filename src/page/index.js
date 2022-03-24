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

//create instances of the classes

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, selectors.cardTemplate, handleCardClick)
      const cardEl = card.generateCard()
      cardSection.addItem(cardEl)
    },
  },
  selectors.cardContainerSelector,
)
const addFormValidator = new FormValidator(validationConfig, addCardModalForm)
const editFormValidator = new FormValidator(
  validationConfig,
  editProfileModalForm,
)

const imagepopup = new PopupWithImage(selectors.imagePopupSelector)
imagepopup.setEventListeners()

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
  imagepopup.open(data)
}

function handleEditFormSubmit([userName, title]) {
  profileUserInfo.setUserInfo({
    userName,
    title,
  })
  editProfilePopup.close()
}

function handleAddCardFormSubmit([name, link]) {
  const card = new Card({ name, link }, selectors.cardTemplate, handleCardClick)
  const cardEl = card.generateCard()
  cardSection.addItem(cardEl)
  addCardPopup.close()
}

//initialize all my classes
cardSection.renderItems()

editProfileButton.addEventListener('click', () => {
  editProfilePopup.open()
})
addCardButton.addEventListener('click', () => {
  addCardPopup.open()
})

addFormValidator.enableValidation()
editFormValidator.enableValidation()
