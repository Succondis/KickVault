// ===== CHECKOUT PAGE JS =====
function init() {
  const itemsEl = document.getElementById('checkoutItems');
  const subtotalEl = document.getElementById('checkoutSubtotal');
  const totalEl = document.getElementById('checkoutTotal');

  if (!cart || cart.length === 0) {
    itemsEl.innerHTML = '<p style="color:var(--text2);text-align:center;padding:20px">Your cart is empty. <a href="browse.html" style="color:var(--accent)">Browse sneakers</a></p>';
    return;
  }

  let total = 0;
  itemsEl.innerHTML = cart.map(item => {
    total += item.price;
    return `
      <div style="display:flex;gap:12px;padding:12px 0;border-bottom:1px solid var(--border)">
        <div style="width:56px;height:42px;background:var(--bg3);border-radius:6px;display:flex;align-items:center;justify-content:center;padding:4px;flex-shrink:0">
          <img src="${item.img}" onerror="this.src='${item.imgFallback}'" style="width:100%;object-fit:contain" />
        </div>
        <div style="flex:1">
          <div style="font-size:0.7rem;color:var(--accent);font-weight:700;text-transform:uppercase">${item.brand}</div>
          <div style="font-weight:600;font-size:0.85rem">${item.name.slice(0,40)}...</div>
          <div style="font-size:0.75rem;color:var(--text2)">UK ${item.size}</div>
        </div>
        <div style="font-family:var(--font-display);font-size:1.1rem;flex-shrink:0">£${item.price}</div>
      </div>`;
  }).join('');

  subtotalEl.textContent = `£${total.toFixed(2)}`;
  totalEl.textContent = `£${total.toFixed(2)}`;
}

function placeOrder() {
  if (cart.length === 0) { alert('Your cart is empty!'); return; }
  const orderNum = Math.floor(Math.random() * 900000) + 100000;
  document.getElementById('orderNum').textContent = orderNum;
  document.getElementById('confirmModal').style.display = 'flex';
  // Clear cart
  localStorage.removeItem('kv_cart');
  cart = [];
}

init();
