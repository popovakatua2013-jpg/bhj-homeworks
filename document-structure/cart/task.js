const cartProducts = document.querySelector('.cart__products');
const cart = document.querySelector('.cart');
const STORAGE_KEY = 'cart';

document.querySelectorAll('.product').forEach((product) => {
  const quantityValue = product.querySelector('.product__quantity-value');

  product.querySelectorAll('.product__quantity-control').forEach((control) => {
    control.addEventListener('click', () => {
      const value = control.classList.contains('product__quantity-control_dec')
        ? Math.max(1, Number(quantityValue.textContent) - 1)
        : Number(quantityValue.textContent) + 1;

      quantityValue.textContent = value;
    });
  });

  product.querySelector('.product__add').addEventListener('click', () => {
    const productImage = product.querySelector('.product__image');
    const cartProduct = addToCart(product.dataset.id, productImage.src, Number(quantityValue.textContent));

    flyToCart(productImage, cartProduct.querySelector('.cart__product-image'));
  });
});

function addToCart(id, src, count) {
  let cartProduct = cartProducts.querySelector(`.cart__product[data-id="${id}"]`);

  if (cartProduct) {
    const cartCount = cartProduct.querySelector('.cart__product-count');
    cartCount.textContent = Number(cartCount.textContent) + count;
  } else {
    cartProduct = createCartProduct(id, src, count);
  }

  updateCartVisibility();
  saveCart();

  return cartProduct;
}

function createCartProduct(id, src, count) {
  const cartProduct = document.createElement('div');
  cartProduct.className = 'cart__product';
  cartProduct.dataset.id = id;

  const image = document.createElement('img');
  image.className = 'cart__product-image';
  image.src = src;

  const cartCount = document.createElement('div');
  cartCount.className = 'cart__product-count';
  cartCount.textContent = count;

  const remove = document.createElement('a');
  remove.href = '#';
  remove.className = 'cart__product-remove';
  remove.textContent = '×';

  remove.addEventListener('click', (event) => {
    event.preventDefault();
    cartProduct.remove();
    updateCartVisibility();
    saveCart();
  });

  cartProduct.append(image, cartCount, remove);
  cartProducts.append(cartProduct);

  return cartProduct;
}

function updateCartVisibility() {
  cart.style.display = cartProducts.children.length === 0 ? 'none' : '';
}

function saveCart() {
  const items = Array.from(cartProducts.querySelectorAll('.cart__product')).map((item) => ({
    id: item.dataset.id,
    src: item.querySelector('.cart__product-image').src,
    count: Number(item.querySelector('.cart__product-count').textContent),
  }));

  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function loadCart() {
  const items = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (!Array.isArray(items)) {
    return;
  }

  items.forEach((item) => createCartProduct(item.id, item.src, item.count));
}

function flyToCart(fromImage, toImage) {
  const image = fromImage.cloneNode();
  image.className = 'flying-image';
  document.body.append(image);

  const from = fromImage.getBoundingClientRect();
  const to = toImage.getBoundingClientRect();

  const startX = from.left + window.pageXOffset;
  const startY = from.top + window.pageYOffset;
  const endX = to.left + window.pageXOffset;
  const endY = to.top + window.pageYOffset;

  image.style.left = `${startX}px`;
  image.style.top = `${startY}px`;
  image.style.width = `${from.width}px`;
  image.style.height = `${from.height}px`;

  const steps = 20;
  let step = 0;

  const timer = setInterval(() => {
    step += 1;
    const progress = step / steps;

    image.style.left = `${startX + (endX - startX) * progress}px`;
    image.style.top = `${startY + (endY - startY) * progress}px`;
    image.style.width = `${from.width + (to.width - from.width) * progress}px`;
    image.style.height = `${from.height + (to.height - from.height) * progress}px`;

    if (step >= steps) {
      clearInterval(timer);
      image.remove();
    }
  }, 15);
}

loadCart();
updateCartVisibility();