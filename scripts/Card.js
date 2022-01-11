import { imageModal, modalImage, modalCaption } from './script.js'
import { openModal } from './utils.js'

export default class Card {
  constructor(data, cardSelector) {
    this._title = data.name
    this._imageUrl = data.link
    this._cardSelector = cardSelector
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector('.card')
      .cloneNode(true)

    return cardElement
  }

  generateCard() {
    this._element = this._getTemplate()
    this._cardImage = this._element.querySelector('.card__image')
    this._cardTitle = this._element.querySelector('.card__title')
    this._deleteButton = this._element.querySelector('.card__close-button')
    this._likeButton = this._element.querySelector('.card__like-button')

    this._cardImage.src = this._imageUrl
    this._cardImage.alt = this._title
    this._cardTitle.textContent = this._title
    this._setEventListeners()

    return this._element
  }

  _handleModalToggleLike(e) {
    e.target.classList.toggle('card__like-button_full')
  }

  _handleModalClose(e) {
    this._element.remove()
  }

  _handleCardImage(e) {
    openModal(imageModal)
    modalImage.src = e.target.src
    modalImage.alt = e.target.alt
    modalCaption.textContent = e.target.alt
  }

  _setEventListeners() {
    this._cardImage.addEventListener('click', (e) => {
      this._handleCardImage(e)
    })

    this._deleteButton.addEventListener('click', (e) => {
      this._handleModalClose(e)
    })
    this._likeButton.addEventListener('click', (e) => {
      this._handleModalToggleLike(e)
    })
  }
}
