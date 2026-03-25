// ===== SHARED APP FUNCTIONS =====

function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

function toggleMenu() {
  document.getElementById('mobileMenu')?.classList.toggle('open');
}

function handleSearch() {
  const q = document.getElementById('searchInput')?.value.trim();
  if (q) window.location.href = `browse.html?q=${encodeURIComponent(q)}`;
}

document.getElementById('searchInput')?.addEventListener('keydown', e => {
  if (e.key === 'Enter') handleSearch();
});

// Sticky nav shadow
window.addEventListener('scroll', () => {
  const nav = document.getElementById('nav');
  if (nav) nav.style.boxShadow = window.scrollY > 10 ? '0 4px 24px rgba(0,0,0,0.4)' : 'none';
});

// Render product cards
function renderGrid(containerId, items) {
  const el = document.getElementById(containerId);
  if (!el) return;
  if (!items || items.length === 0) {
    el.innerHTML = '<p style="color:var(--text2);grid-column:1/-1;text-align:center;padding:40px">No products found.</p>';
    return;
  }
  el.innerHTML = items.map(p => productCard(p)).join('');
}

function productCard(p) {
  const changeClass = p.change >= 0 ? 'up' : 'down';
  const changeStr = p.change >= 0 ? `+${p.change}%` : `${p.change}%`;
  return `
    <div class="product-card" onclick="window.location.href='product.html?id=${p.id}'">
      <div class="product-card-img">
        <img src="${p.img}" alt="${p.name}" onerror="this.src='${p.imgFallback}'" loading="lazy" />
      </div>
      <div class="product-card-body">
        <div class="product-card-brand">${p.brand}</div>
        <div class="product-card-name">${p.name}</div>
        <div class="product-card-price">
          <span class="price">£${p.price}</span>
          <span class="change ${changeClass}">${changeStr}</span>
        </div>
      </div>
      <div class="product-card-actions" onclick="event.stopPropagation()">
        <button class="btn-buy" onclick="quickBuy(${p.id})">Buy Now</button>
        <button class="btn-wish" onclick="addToWishlist(${p.id})">♡</button>
      </div>
    </div>`;
}

function quickBuy(id) {
  // Navigate to product page for size selection
  window.location.href = `product.html?id=${id}`;
}

function addToWishlist(id) {
  const p = products.find(x => x.id === id);
  showToast(`${p?.name.split(' ').slice(0,3).join(' ')}... added to watchlist ♡`);
}

// Card entrance animation
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

function observeCards() {
  document.querySelectorAll('.product-card').forEach(c => {
    c.style.opacity = '0';
    c.style.transform = 'translateY(20px)';
    c.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    observer.observe(c);
  });
}
setTimeout(observeCards, 100);
