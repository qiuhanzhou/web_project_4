import Popup from './Popup'

export default class PopupWithImage extends Popup {
  constructor(popupSelector, handleConfirm) {
    super(popupSelector)
    this._form = this._element.querySelector('form')
    this._handleConfirm = handleConfirm
  }
  open(cardId, element) {
    this._cardId = cardId
    this._cardElement = element
    super.open()
  }
  setEventListeners() {
    this._form.addEventListener('submit', (e) => {
      e.preventDefault()
      this._handleConfirm(this._cardId, this._cardElement)
    })
    super._setEventListeners()
  }
}
