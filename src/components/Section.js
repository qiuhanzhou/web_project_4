export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._Items = items
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
  renderItems() {
    this.clear()
    this._Items.forEach((item) => {
      this._renderer(item)
    })
  }
}
