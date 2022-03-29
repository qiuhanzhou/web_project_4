import Popup from './Popup'

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._imageEl = this._element.querySelector('.modal__image')
    this._imageCaption = this._element.querySelector('.modal__caption')
  }
  open(data) {
    this._imageEl.src = data.url
    this._imageEl.alt = data.title
    this._imageCaption.textContent = data.title
    super.open()
  }
}
