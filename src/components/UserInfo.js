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

  setUserInfo({ userName, title }) {
    this._userName.textContent = userName
    this._userTitle.textContent = title
  }
}
