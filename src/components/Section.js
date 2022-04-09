export default class Section {
  constructor(renderer, containerSelector) {
    this._renderer = renderer
    this._container = document.querySelector(containerSelector)
  }

  //a public method that takes a DOM element and adds it to the container.
  addItem(element) {
    this._container.prepend(element)
  }

  clear() {
    this._container.innerHTML = ''
  }

  //a public method that renders all elements on the page. The renderer() function will render each element on a page.
  renderItems(items) {
    this.clear()
    for (let i = items.length - 1; i >= 0; i--) {
      this._renderer(items[i])
    }
  }
}
