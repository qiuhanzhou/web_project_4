export default class Popup {
  constructor(popupSelector) {
    this._element = document.querySelector(popupSelector)
    this._closeButton = this._element.querySelector('button')
  }

  open() {
    this._setEventListeners()
    this._element.classList.add('modal_open')
  }

  close() {
    this._removeEventListeners()
    this._element.classList.remove('modal_open')
  }

  _handleEscClose = (e) => {
    if (e.key === 'Escape') {
      this.close()
    }
  }

  _handleClickClose = (e) => {
    if (
      e.target.classList.contains('modal__close-button') ||
      e.target.classList.contains('modal_open')
    ) {
      this.close()
    }
  }
  _setEventListeners() {
    this._element.addEventListener('mousedown', this._handleClickClose)
    document.addEventListener('keydown', this._handleEscClose)
  }
  _removeEventListeners() {
    this._element.removeEventListener('mousedown', this._handleClickClose)
    document.removeEventListener('keydown', this._handleEscClose)
  }
}
