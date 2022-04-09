export default class UserInfo {
  constructor({ userNameElement, userTitleElement }) {
    this._userName = userNameElement
    this._userTitle = userTitleElement
  }
  getUserInfo() {
    return {
      userName: this._userName.textContent,
      title: this._userTitle.textContent,
    }
  }

  setUserInfo({ name, about }) {
    this._userName.textContent = name
    this._userTitle.textContent = about
  }
}
