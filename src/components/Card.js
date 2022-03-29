export default class Card {
  constructor({ name, link }, cardSelector, handleCardClick) {
    this._title = name
    this._imageUrl = link
    this._cardSelector = cardSelector
    this._handleCardClick = handleCardClick
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

  _handleDelete() {
    this._element.remove()
  }

  _handleToggleLike = (e) => {
    e.target.classList.toggle('card__like-button_full')
  }

  _setEventListeners() {
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick({ url: this._imageUrl, title: this._title })
    })
    this._deleteButton.addEventListener('click', (e) => {
      this._handleDelete()
    })
    this._likeButton.addEventListener('click', this._handleToggleLike)
  }
}
