// ===== PRODUCT PAGE JS =====
let selectedSize = null;

function init() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'));
  const product = products.find(p => p.id === id);

  if (!product) {
    document.getElementById('productPage').innerHTML = '<div style="padding:120px 24px;text-align:center"><h2>Product not found</h2><a href="browse.html" class="btn-primary" style="margin-top:20px;display:inline-block">Browse All</a></div>';
    return;
  }

  document.title = `${product.name} — KickVault`;
  const gain = product.price - product.retail;
  const gainPct = ((gain / product.retail) * 100).toFixed(1);
  const changeClass = product.change >= 0 ? 'up' : 'down';
  const changeStr = product.change >= 0 ? `+${product.change}%` : `${product.change}%`;

  const related = products.filter(p => p.brand === product.brand && p.id !== product.id).slice(0, 4);

  document.getElementById('productPage').innerHTML = `
    <div style="margin-bottom:12px">
      <a href="browse.html" style="color:var(--text2);font-size:0.85rem">← Browse</a>
      <span style="color:var(--border);margin:0 8px">|</span>
      <span style="color:var(--text2);font-size:0.85rem">${product.brand}</span>
    </div>

    <div class="product-detail">
      <div class="product-gallery">
        <div class="product-main-img">
          <img src="${product.img}" alt="${product.name}" onerror="this.src='${product.imgFallback}'" id="mainImg" />
        </div>
      </div>

      <div class="product-info">
        <div style="display:inline-block;background:rgba(232,255,59,0.1);border:1px solid rgba(232,255,59,0.3);color:var(--accent);padding:4px 12px;border-radius:100px;font-size:0.75rem;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:12px">${product.brand}</div>
        <h1>${product.name}</h1>
        <div class="product-sku">SKU: ${product.sku} &nbsp;•&nbsp; ${product.colorway} &nbsp;•&nbsp; ${product.condition}</div>

        <div class="product-market">
          <div class="market-row">
            <span class="market-label">Market Price</span>
            <span class="market-price">£${product.price}</span>
          </div>
          <div class="market-row">
            <span class="market-label">Retail Price</span>
            <span class="market-val">£${product.retail}</span>
          </div>
          <div class="market-row">
            <span class="market-label">Premium</span>
            <span class="market-val" style="color:${gain >= 0 ? 'var(--green)' : 'var(--red)'}">+£${gain} (${gainPct}%)</span>
          </div>
          <div class="market-row" style="margin-top:8px;padding-top:8px;border-top:1px solid var(--border)">
            <span class="market-label">24h Change</span>
            <span class="change ${changeClass}" style="font-size:0.9rem">${changeStr}</span>
          </div>
        </div>

        <div class="product-stats">
          <div class="pstat"><span>${product.sales}</span><p>All-Time Sales</p></div>
          <div class="pstat"><span>${product.asks}</span><p>Active Asks</p></div>
          <div class="pstat"><span>${product.bids}</span><p>Active Bids</p></div>
          <div class="pstat"><span>${product.releaseDate}</span><p>Release Date</p></div>
        </div>

        <div class="product-sizes">
          <h3>Select Size (UK) <span style="color:var(--text2);font-weight:400;font-size:0.8rem" id="selectedSizeLabel"></span></h3>
          <div class="size-grid" style="grid-template-columns:repeat(6,1fr)">
            ${product.sizes.map(s => `<button class="size-btn" onclick="selectSize(this,'${s}')">${s}</button>`).join('')}
          </div>
        </div>

        <div class="product-buy-actions">
          <button class="btn-primary" onclick="buyNow(${product.id})">Buy Now — £${product.price}</button>
          <button class="btn-secondary" onclick="placeBid(${product.id})">Place Bid</button>
        </div>
        <div class="auth-badge">Authenticated by KickVault Experts — 100% Genuine</div>
      </div>
    </div>

    ${related.length ? `
      <div class="related-section">
        <h2>More from ${product.brand}</h2>
        <div class="product-grid" id="relatedGrid"></div>
      </div>` : ''}
  `;

  if (related.length) {
    renderGrid('relatedGrid', related);
    setTimeout(observeCards, 50);
  }
}

function selectSize(btn, size) {
  document.querySelectorAll('.product-sizes .size-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  selectedSize = size;
  document.getElementById('selectedSizeLabel').textContent = `— UK ${size} selected`;
}

function buyNow(id) {
  if (!selectedSize) { showToast('Please select a size first!'); return; }
  addToCart(id, selectedSize);
  openCart();
}

function placeBid(id) {
  if (!selectedSize) { showToast('Please select a size to bid on!'); return; }
  showToast(`Bid placed for UK ${selectedSize} — We'll notify you if matched ✓`);
}

init();
