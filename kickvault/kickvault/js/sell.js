// ===== SELL PAGE JS =====
let selectedProduct = null;
let sellSize = null;

function searchSellProducts(query) {
  const resultsEl = document.getElementById('sellResults');
  if (!query || query.length < 2) { resultsEl.innerHTML = ''; return; }

  const q = query.toLowerCase();
  const matches = products.filter(p =>
    p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)
  ).slice(0, 6);

  if (!matches.length) {
    resultsEl.innerHTML = '<p style="color:var(--text2);font-size:0.9rem">No products found. Try a different search.</p>';
    return;
  }

  resultsEl.innerHTML = matches.map(p => `
    <div class="sell-result-card" onclick="selectSellProduct(${p.id})">
      <img src="${p.img}" alt="${p.name}" onerror="this.src='${p.imgFallback}'" />
      <div class="brand">${p.brand}</div>
      <div class="name">${p.name}</div>
      <div class="price">Market: £${p.price}</div>
    </div>
  `).join('');
}

function selectSellProduct(id) {
  selectedProduct = products.find(p => p.id === id);
  const card = document.getElementById('selectedShoeCard');
  const wrap = document.getElementById('selectedShoe');

  card.innerHTML = `
    <div style="display:flex;gap:16px;align-items:center">
      <img src="${selectedProduct.img}" onerror="this.src='${selectedProduct.imgFallback}'" style="width:80px;height:60px;object-fit:contain;background:var(--bg3);border-radius:8px;padding:6px" />
      <div>
        <div style="font-size:0.7rem;color:var(--accent);text-transform:uppercase;font-weight:700">${selectedProduct.brand}</div>
        <div style="font-weight:600;margin:4px 0">${selectedProduct.name}</div>
        <div style="color:var(--text2);font-size:0.85rem">Market: £${selectedProduct.price} &nbsp;•&nbsp; Retail: £${selectedProduct.retail}</div>
      </div>
    </div>
  `;
  wrap.style.display = 'block';
  document.getElementById('sellResults').innerHTML = '';

  // Populate price info for step 2
  const gain = selectedProduct.price - selectedProduct.retail;
  document.getElementById('sellPriceInfo').innerHTML = `
    <div style="display:flex;gap:32px;flex-wrap:wrap">
      <div><span style="font-family:var(--font-display);font-size:1.8rem;color:var(--accent)">£${selectedProduct.price}</span><p style="color:var(--text2);font-size:0.8rem">Last Sale</p></div>
      <div><span style="font-family:var(--font-display);font-size:1.8rem">£${selectedProduct.retail}</span><p style="color:var(--text2);font-size:0.8rem">Retail</p></div>
      <div><span style="font-family:var(--font-display);font-size:1.8rem;color:var(--green)">+£${gain}</span><p style="color:var(--text2);font-size:0.8rem">Premium</p></div>
    </div>
  `;
}

function goToStep(n) {
  if (n === 2 && !selectedProduct) { showToast('Please select a shoe first!'); return; }
  if (n === 3) {
    const ask = document.getElementById('askPrice').value;
    if (!ask) { showToast('Please enter your ask price!'); return; }
    if (!sellSize) { showToast('Please select a size!'); return; }
    buildListingSummary();
  }

  document.querySelectorAll('.sell-step-content').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.sell-step').forEach((t,i) => {
    t.classList.toggle('active', i === n-1);
  });
  document.getElementById(`step${n}`).classList.add('active');
}

function selectSellSize(btn, size) {
  document.querySelectorAll('#sellSizeGrid .size-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  sellSize = size;
}

function updatePayout() {
  const ask = parseFloat(document.getElementById('askPrice').value) || 0;
  if (ask > 0) {
    const fee = ask * 0.095;
    const net = ask - fee - 5;
    document.getElementById('payoutAsk').textContent = `£${ask.toFixed(2)}`;
    document.getElementById('payoutFee').textContent = `-£${fee.toFixed(2)}`;
    document.getElementById('payoutNet').textContent = `£${Math.max(0, net).toFixed(2)}`;
    document.getElementById('payoutSummary').style.display = 'block';
  }
}

function buildListingSummary() {
  const ask = document.getElementById('askPrice').value;
  document.getElementById('listingSummary').innerHTML = `
    <div style="font-size:0.8rem;color:var(--text2);margin-bottom:8px;text-transform:uppercase;letter-spacing:1px">Listing Summary</div>
    <div style="font-weight:700;margin-bottom:4px">${selectedProduct.name}</div>
    <div style="color:var(--text2);font-size:0.9rem">Size UK ${sellSize} &nbsp;•&nbsp; Ask £${ask} &nbsp;•&nbsp; ${selectedProduct.condition}</div>
  `;
}

function submitListing() {
  showToast('Listing submitted! We\'ll send a courier to collect your pair 🚀');
  setTimeout(() => window.location.href='portfolio.html', 2000);
}
