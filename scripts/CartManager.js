class CartManager {
  selectors = {
    // Карточки в каталоге
    productCard: '.card[data-product-id]',
    addBtn: '.card__add-btn',
    quantityWrapper: '.card__quantity',
    quantityValue: '.card__quantity-value',
    minusBtn: '.card__quantity-btn--minus',
    plusBtn: '.card__quantity-btn--plus',

    // Элементы в корзине
    cartItem: '.cart-item[data-product-id]',
    cartMinusBtn: '.cart-item__btn--minus',
    cartPlusBtn: '.cart-item__btn--plus',
    cartQuantityValue: '.cart-item__quantity',
  };

  stateClass = {
    visuallyHidden: 'visually-hidden',
  };

  storageKey = 'farm-cart';

  constructor() {
    this.cart = this.loadFromStorage();
    this.bindEvents();
    this.updateAllUI();
  }

  // === Работа с хранилищем ===
  loadFromStorage() {
    try {
      const saved = localStorage.getItem(this.storageKey);
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      console.warn('Не удалось загрузить корзину', e);
      return {};
    }
  }

  saveToStorage() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.cart));
    } catch (e) {
      console.warn('Не удалось сохранить корзину', e);
    }
  }

  // === Логика корзины ===
  getQuantity(productId) {
    return this.cart[productId] || 0;
  }

  setQuantity(productId, qty) {
    if (qty <= 0) {
      delete this.cart[productId];
    } else {
      this.cart[productId] = qty;
    }
    this.saveToStorage();
    this.updateAllUI();
  }

  // === Обновление ВСЕГО UI: и каталог, и корзина ===
  updateAllUI() {
    // Обновляем карточки в каталоге
    document.querySelectorAll(this.selectors.productCard).forEach((card) => {
      const productId = card.dataset.productId;
      const qty = this.getQuantity(productId);
      this.updateProductCard(card, qty);
    });

    // Обновляем элементы в корзине
    document.querySelectorAll(this.selectors.cartItem).forEach((item) => {
      const productId = item.dataset.productId;
      const qty = this.getQuantity(productId);
      this.updateCartItem(item, qty);
    });
  }

  updateProductCard(card, qty) {
    const addButton = card.querySelector(this.selectors.addBtn);
    const quantityEl = card.querySelector(this.selectors.quantityWrapper);
    const valueEl = card.querySelector(this.selectors.quantityValue);

    if (!addButton || !quantityEl || !valueEl) return;

    if (qty > 0) {
      addButton.classList.add(this.stateClass.visuallyHidden);
      quantityEl.classList.remove(this.stateClass.visuallyHidden);
      valueEl.textContent = qty;
    } else {
      addButton.classList.remove(this.stateClass.visuallyHidden);
      quantityEl.classList.add(this.stateClass.visuallyHidden);
    }
  }

  updateCartItem(item, qty) {
    const valueEl = item.querySelector(this.selectors.cartQuantityValue);
    
    if (valueEl) {
      valueEl.textContent = qty;
      // Если qty = 0 — можно скрыть или удалить элемент (по желанию)
      // Но обычно в корзине qty ≥ 1, так что это редко нужно
      
    }
  }

  // === Обработчики событий ===
  onAddButtonClick = (e) => {
    const card = e.target.closest(this.selectors.productCard);
    if (!card) return;
    const productId = card.dataset.productId;
    this.setQuantity(productId, 1);
  };

  onMinusButtonClick = (e) => {
    // Поддержка кнопок и в каталоге, и в корзине
    const context = e.target.closest(this.selectors.productCard) || e.target.closest(this.selectors.cartItem);
    if (!context) return;

    const productId = context.dataset.productId;
    this.setQuantity(productId, this.getQuantity(productId) - 1);
  };

  onPlusButtonClick = (e) => {
    const context = e.target.closest(this.selectors.productCard) || e.target.closest(this.selectors.cartItem);
    if (!context) return;

    const productId = context.dataset.productId;
    this.setQuantity(productId, this.getQuantity(productId) + 1);
  };

  // === Привязка событий ===
  bindEvents() {
    document.addEventListener('click', (e) => {
      if (e.target.closest(this.selectors.addBtn)) {
        this.onAddButtonClick(e);
      } else if (
        e.target.closest(this.selectors.minusBtn) ||
        e.target.closest(this.selectors.cartMinusBtn)
      ) {
        this.onMinusButtonClick(e);
      } else if (
        e.target.closest(this.selectors.plusBtn) ||
        e.target.closest(this.selectors.cartPlusBtn)
      ) {
        this.onPlusButtonClick(e);
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new CartManager();
});

export default CartManager;