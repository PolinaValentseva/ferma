import Header from './Header.js'
import Tabs from './Tabs.js'
import Slider from './Slider.js'
import Animations from './Animations.js'
import CartManager from './CartManager.js'

new Header()

const tabsElement = document.querySelector('[data-js-tabs]')
if (tabsElement) {
  new Tabs(tabsElement)
}

new Slider();
new Animations();
new CartManager();
