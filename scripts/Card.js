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
    this._setEventListeners()

    const cardImage = this._element.querySelector('.card__image')
    cardImage.src = this._imageUrl
    cardImage.alt = this._title
    this._element.querySelector('.card__title').textContent = this._title

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
    this._element
      .querySelector('.card__image')
      .addEventListener('click', (e) => {
        this._handleCardImage(e)
      })

    this._element
      .querySelector('.card__close-button')
      .addEventListener('click', (e) => {
        this._handleModalClose(e)
      })
    this._element
      .querySelector('.card__like-button')
      .addEventListener('click', (e) => {
        this._handleModalToggleLike(e)
      })
  }
}
