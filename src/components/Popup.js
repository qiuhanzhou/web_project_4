export default class Popup {
  constructor(popupSelector) {
    this._element = document.querySelector(popupSelector)
    this._closeButton = this._element.querySelector('button')
  }

  open() {
    document.addEventListener('keydown', (e) => {
      this._handleEscClose(e)
    })
    this._element.classList.add('modal_open')
  }

  close() {
    document.removeEventListener('keydown', (e) => {
      this._handleEscClose(e)
    })
    this._element.classList.remove('modal_open')
  }

  _handleEscClose(e) {
    if (e.key === 'Escape') {
      this.close()
    }
  }

  _handleClickClose(e) {
    if (
      e.target.classList.contains('modal__close-button') ||
      e.target.classList.contains('modal_open')
    ) {
      this.close()
    }
  }
  setEventListeners() {
    this._element.addEventListener('click', (e) => {
      this._handleClickClose(e)
    })
  }
}
