export default class Card {
  constructor(
    { name, link, likes, _id, owner },
    userId,
    cardSelector,
    handleCardClick,
    api,
    handleCardDeleteClick,
    handleDeleteCardFormSubmit,
  ) {
    this._title = name
    this._imageUrl = link
    this._cardSelector = cardSelector
    this._handleCardClick = handleCardClick
    this._likes = likes
    this._api = api
    this._id = _id
    this._userId = userId
    this._owner = owner
    this._handleCardDeleteClick = handleCardDeleteClick
    this._handleDeleteCardFormSubmit = handleDeleteCardFormSubmit
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
    this._likeDiv = this._element.querySelector('.card__like-count')
    this._cardImage.src = this._imageUrl
    this._cardImage.alt = this._title
    this._cardTitle.textContent = this._title
    this._likeDiv.textContent = this._likes.length
    this._setEventListeners()

    // check if my user id is in the likes
    // if yes add 'card__like-button_full' to the like button

    console.log('cardID: ', this._id)
    console.log('userId: ', this._userId)
    console.log('ownerId: ', this._owner._id)

    this._likes.forEach((likeUser) => {
      console.log(likeUser._id)
      if (likeUser._id === this._userId) {
        this._likeButton.classList.add('card__like-button_full')
      }
    })

    //check if card owner id matches my userID
    //if no should not show trash bin

    if (this._userId !== this._owner._id) {
      this._deleteButton.remove()
    }

    return this._element
  }

  _updateLikesCount() {
    this._likeDiv.textContent = this._likes.length
  }

  _handleToggleLike = (e) => {
    // have I liked?
    if (this._likeButton.classList.contains('card__like-button_full')) {
      // yes then call unlike
      this._api.unlikeCard(this._id).then((card) => {
        this._likes = card.likes
        this._updateLikesCount()
        this._likeButton.classList.remove('card__like-button_full')
      })
    } else {
      // no then call like
      this._api.likeCard(this._id).then((card) => {
        this._likes = card.likes
        this._updateLikesCount()
        this._likeButton.classList.add('card__like-button_full')
      })
    }
  }

  _setEventListeners() {
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick({ url: this._imageUrl, title: this._title })
    })
    this._deleteButton.addEventListener('click', (e) => {
      //open deleteCard popup  and listen for click on yes
      this._handleCardDeleteClick(this._id, this._element)
    })
    this._likeButton.addEventListener('click', this._handleToggleLike)
  }
}
