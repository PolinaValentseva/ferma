class Slider {
  selectors = {
    root: '[data-js-slider]',
    slide: '[data-js-slide]',
    overlay: '[data-js-slider-overlay]',
  };

  stateClass = {
    isActive: 'is-active',
  };

  constructor() {
    this.init();
    this.rootElement = document.querySelector(this.selectors.root);
    this.slides = this.rootElement.querySelectorAll(this.selectors.slide);
    this.allOverlays = this.rootElement.querySelectorAll(this.selectors.overlay);
    this.bindEvents();
  }

  init() {
    const swiperElement = document.querySelector('.swiper');
    if (!swiperElement) {
      console.warn('Swiper element not found');
      return;
    }

    this.swiper = new Swiper(swiperElement, {
      autoplay: {
        delay: 2000,
        disableOnInteraction: true,
        pauseOnMouseEnter: true,
      },

      loop: true,
      speed: 800, 
      slidesPerView: 'auto',
      spaceBetween: 30,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.slider__navigation-custom-next-btn',
        prevEl: '.slider__navigation-custom-prev-btn',
      },
      scrollbar: {
        el: '.swiper__custom-progress-bar',
        type: 'progressbar',
      },
    });
  }

  onSlideClick = (event) => {
    const clickedSlide = event.currentTarget.closest(this.selectors.slide);
    if (!clickedSlide) return;

    const clickedOverlay = clickedSlide.querySelector(this.selectors.overlay);
    if (!clickedOverlay) return;

    this.allOverlays.forEach(overlay => {
      overlay.classList.remove(this.stateClass.isActive);
    });

    clickedOverlay.classList.add(this.stateClass.isActive);
  };

  onDocumentClick = (event) => {
    const isClickInsideSlide = event.target.closest(this.selectors.slide);
    const isClickOnOverlay = event.target.closest(this.selectors.overlay);

    if (!isClickInsideSlide && !isClickOnOverlay) {
      this.allOverlays.forEach(overlay => {
        overlay.classList.remove(this.stateClass.isActive);
      });
    }
  };

  bindEvents() {
    this.slides.forEach(slide => {
      slide.addEventListener('click', this.onSlideClick);
    });

    document.addEventListener('click', this.onDocumentClick);
  }
}

export default Slider;