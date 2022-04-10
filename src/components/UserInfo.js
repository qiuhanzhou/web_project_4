export default class UserInfo {
  constructor(
    { userNameElement, userTitleElement, userAvatarElement },
    { avatar, _id },
  ) {
    this._userNameEl = userNameElement
    this._userTitleEl = userTitleElement
    this._avatarEl = userAvatarElement
    this._avatar = avatar
    this._id = _id
  }
  getUserInfo() {
    return {
      userName: this._userNameEl.textContent,
      title: this._userTitleEl.textContent,
    }
  }

  setUserInfo({ name, about, avatar, _id }) {
    this._userNameEl.textContent = name
    this._userTitleEl.textContent = about
    this._avatarEl.src = avatar
    this._id = _id
  }
}
