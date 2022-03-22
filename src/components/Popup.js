export default class Popup {
  constructor(popupSelector) {
    this.popupSelector = popupSelector
    this._isOpen = false

    this.deleteButton = document.querySelector(`${popupSelector} button`)
  }
  open() {
    this._isOpen = true
  }
  close() {
    this._isOpen = false
  }
  _handleEscClose(e) {
    console.log(e)
  }
  setEventListeners() {
    this.deleteButton.addEventListener('click', (e) => {
      _handleEscClose(e)
    })
  }
}
