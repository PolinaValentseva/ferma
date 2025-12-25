const rootSelector = '[data-js-tabs]'

class Tabs {
  selectors = {
    root: rootSelector,
    button: '[data-js-tabs-button]',
    content: '[data-js-tabs__content]',
  }

  stateClasses = {
    isActive: 'is-active',
  }

  stateAttributes = {
    ariaSelected: 'aria-selected',
    tabIndex: 'tabindex',
  }

  constructor(rootElement) {
    this.rootElement = rootElement
    this.buttonElements = this.rootElement.querySelectorAll(this.selectors.button)
    this.contentElements = this.rootElement.querySelectorAll(this.selectors.content)

    // Находим начальный активный таб
    this.activeTabIndex = [...this.buttonElements]
      .findIndex((buttonElement) => buttonElement.classList.contains(this.stateClasses.isActive))

    this.limitTabsIndex = this.buttonElements.length - 1
    this.bindEvents()
    this.updateUI()
  }

  updateUI() {
    this.buttonElements.forEach((buttonElement, index) => {
      const isActive = index === this.activeTabIndex

      buttonElement.classList.toggle(this.stateClasses.isActive, isActive)
      buttonElement.setAttribute(this.stateAttributes.ariaSelected, isActive.toString())
      buttonElement.setAttribute(this.stateAttributes.tabIndex, isActive ? '0' : '-1')
    })

    this.contentElements.forEach((contentElement, index) => {
      const isActive = index === this.activeTabIndex

      contentElement.classList.toggle(this.stateClasses.isActive, isActive)
    })
  }

  activateTab(newTabIndex) {
    this.activeTabIndex = newTabIndex
    this.updateUI()
    this.buttonElements[newTabIndex].focus()
  }

  onButtonClick = (event) => {
    const buttonElement = event.target.closest(this.selectors.button)
    if (!buttonElement) return

    const index = [...this.buttonElements].indexOf(buttonElement)
    this.activateTab(index)
  }

  onKeyDown = (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.code)) return

    event.preventDefault()

    let newTabIndex = this.activeTabIndex

    switch (event.code) {
      case 'ArrowLeft':
        newTabIndex = this.activeTabIndex === 0 ? this.limitTabsIndex : this.activeTabIndex - 1
        break
      case 'ArrowRight':
        newTabIndex = this.activeTabIndex === this.limitTabsIndex ? 0 : this.activeTabIndex + 1
        break
      case 'Home':
        newTabIndex = 0
        break
      case 'End':
        newTabIndex = this.limitTabsIndex
        break
    }

    this.activateTab(newTabIndex)
  }

  bindEvents() {
    this.rootElement.addEventListener('click', this.onButtonClick)
    this.rootElement.addEventListener('keydown', this.onKeyDown)
  }
}

export default Tabs