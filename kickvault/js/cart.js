// ===== CART SYSTEM =====
let cart = JSON.parse(localStorage.getItem('kv_cart') || '[]');

function saveCart() {
  localStorage.setItem('kv_cart', JSON.stringify(cart));
  updateCartUI();
}

function addToCart(productId, size) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  if (!size) { showToast('Please select a size first!'); return; }

  const existing = cart.find(i => i.id === productId && i.size === size);
  if (existing) {
    showToast('Already in your cart!');
    return;
  }
  cart.push({ id: productId, size, name: product.name, brand: product.brand, price: product.price, img: product.img, imgFallback: product.imgFallback });
  saveCart();
  showToast(`Added to cart — Size UK ${size} ✓`);
}

function removeFromCart(productId, size) {
  cart = cart.filter(i => !(i.id === productId && i.size === size));
  saveCart();
}

function updateCartUI() {
  const count = document.getElementById('cartCount');
  if (count) count.textContent = cart.length;

  const itemsEl = document.getElementById('cartItems');
  const totalEl = document.getElementById('cartTotal');
  if (!itemsEl) return;

  if (cart.length === 0) {
    itemsEl.innerHTML = '<p class="cart-empty">Your cart is empty.</p>';
    if (totalEl) totalEl.textContent = '£0.00';
    return;
  }

  let total = 0;
  itemsEl.innerHTML = cart.map(item => {
    total += item.price;
    return `
      <div class="cart-item">
        <div class="cart-item-img">
          <img src="${item.img}" alt="${item.name}" onerror="this.src='${item.imgFallback}'" />
        </div>
        <div class="cart-item-info">
          <div class="brand">${item.brand}</div>
          <div class="name">${item.name}</div>
          <div class="size">UK ${item.size}</div>
        </div>
        <div class="cart-item-right">
          <div class="price">£${item.price}</div>
          <button onclick="removeFromCart(${item.id}, '${item.size}')">Remove</button>
        </div>
      </div>`;
  }).join('');

  if (totalEl) totalEl.textContent = `£${total.toFixed(2)}`;
}

function openCart() {
  document.getElementById('cartOverlay')?.classList.add('open');
  document.getElementById('cartSidebar')?.classList.add('open');
  updateCartUI();
}

function closeCart() {
  document.getElementById('cartOverlay')?.classList.remove('open');
  document.getElementById('cartSidebar')?.classList.remove('open');
}

// Init on load
updateCartUI();
