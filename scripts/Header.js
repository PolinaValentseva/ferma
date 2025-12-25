class Header {
  selectors = {
    root: '[data-js-header]',
    overlay: '[data-js-header-overlay]',
    burgerButton: '[data-js-header-burger-button]',
  };

  stateClass = {
    isActive: 'is-active',
    isLock: 'is-lock',
    isScrolled: 'header-scrolled',
  };

  constructor() {
    this.rootElement = document.querySelector(this.selectors.root);
    this.overlayElement = document.querySelector(this.selectors.overlay);
    this.burgerButtonElement = document.querySelector(this.selectors.burgerButton);

    // Инициализация только если шапка существует
    if (!this.rootElement) return;

    this.lastScrollY = window.scrollY;
    this.ticking = false;

    this.bindEvents();
    this.initScrollAnimation();
  }

  onBurgerButtonClick = () => {
    this.burgerButtonElement.classList.toggle(this.stateClass.isActive);
    this.overlayElement.classList.toggle(this.stateClass.isActive);
    document.documentElement.classList.toggle(this.stateClass.isLock);
  };

  // Обновление состояния шапки при скролле
  updateHeader = () => {
    const currentScrollY = window.scrollY;

    // Порог активации — 50px
    if (currentScrollY > 50) {
      if (currentScrollY > this.lastScrollY) {
        // Прокрутка вниз → скрыть
        this.rootElement.classList.add(this.stateClass.isScrolled);
      } else {
        // Прокрутка вверх → показать
        //this.rootElement.classList.remove(this.stateClass.isScrolled);
      }
    } else {
      // В самом верху — всегда показываем
      this.rootElement.classList.remove(this.stateClass.isScrolled);
    }

    this.lastScrollY = currentScrollY;
    this.ticking = false;
  };

  // Оптимизированный обработчик скролла
  onScroll = () => {
    if (!this.ticking) {
      requestAnimationFrame(this.updateHeader);
      this.ticking = true;
    }
  };

  // Инициализация анимации прокрутки
  initScrollAnimation() {
    window.addEventListener('scroll', this.onScroll, { passive: true });
  }

  bindEvents() {
    if (this.burgerButtonElement) {
      this.burgerButtonElement.addEventListener('click', this.onBurgerButtonClick);
    }
  }
}

export default Header;