// ===== PORTFOLIO PAGE JS =====
let activeTab = 'collection';

function init() {
  // Calculate portfolio stats
  let totalValue = 0, totalPaid = 0;
  portfolioItems.forEach(item => {
    const product = products.find(p => p.id === item.productId);
    if (product) {
      totalValue += product.price;
      totalPaid += item.purchasePrice;
    }
  });
  const gain = totalValue - totalPaid;

  document.getElementById('pTotal').textContent = `£${totalValue.toLocaleString()}`;
  document.getElementById('pGain').textContent = `${gain >= 0 ? '+' : ''}£${gain.toLocaleString()}`;
  document.getElementById('pGain').className = gain >= 0 ? 'green' : 'red';
  document.getElementById('pCount').textContent = portfolioItems.length;

  showTab('collection');
}

function showTab(tab) {
  activeTab = tab;
  document.querySelectorAll('.ptab').forEach(t => t.classList.remove('active'));
  event?.target?.classList.add('active');

  const content = document.getElementById('portfolioContent');

  if (tab === 'collection') {
    if (portfolioItems.length === 0) {
      content.innerHTML = '<p style="color:var(--text2);text-align:center;padding:60px">Your collection is empty. Start buying!</p>';
      return;
    }
    content.innerHTML = `
      <div style="overflow-x:auto">
        <table style="width:100%;border-collapse:collapse">
          <thead>
            <tr style="border-bottom:1px solid var(--border);font-size:0.8rem;text-transform:uppercase;letter-spacing:1px;color:var(--text2)">
              <th style="padding:12px 8px;text-align:left">Sneaker</th>
              <th style="padding:12px 8px;text-align:center">Size</th>
              <th style="padding:12px 8px;text-align:right">Paid</th>
              <th style="padding:12px 8px;text-align:right">Current</th>
              <th style="padding:12px 8px;text-align:right">Gain/Loss</th>
              <th style="padding:12px 8px;text-align:center">Action</th>
            </tr>
          </thead>
          <tbody>
            ${portfolioItems.map(item => {
              const p = products.find(x => x.id === item.productId);
              if (!p) return '';
              const gain = p.price - item.purchasePrice;
              const gainPct = ((gain / item.purchasePrice) * 100).toFixed(1);
              const gainClass = gain >= 0 ? 'green' : 'red';
              return `
                <tr style="border-bottom:1px solid var(--border)" onclick="window.location.href='product.html?id=${p.id}'" style="cursor:pointer">
                  <td style="padding:16px 8px">
                    <div style="display:flex;align-items:center;gap:12px">
                      <img src="${p.img}" onerror="this.src='${p.imgFallback}'" style="width:56px;height:42px;object-fit:contain;background:var(--bg3);border-radius:6px;padding:4px" />
                      <div>
                        <div style="font-size:0.7rem;color:var(--accent);font-weight:700;text-transform:uppercase">${p.brand}</div>
                        <div style="font-weight:600;font-size:0.9rem">${p.name.slice(0,40)}${p.name.length>40?'...':''}</div>
                        <div style="font-size:0.75rem;color:var(--text2)">${item.dateAdded}</div>
                      </div>
                    </div>
                  </td>
                  <td style="padding:16px 8px;text-align:center;font-weight:600">UK ${item.size}</td>
                  <td style="padding:16px 8px;text-align:right;font-family:var(--font-display);font-size:1.1rem">£${item.purchasePrice}</td>
                  <td style="padding:16px 8px;text-align:right;font-family:var(--font-display);font-size:1.1rem">£${p.price}</td>
                  <td style="padding:16px 8px;text-align:right">
                    <span class="${gainClass}" style="font-weight:700">${gain >= 0 ? '+' : ''}£${gain} (${gain >= 0 ? '+' : ''}${gainPct}%)</span>
                  </td>
                  <td style="padding:16px 8px;text-align:center">
                    <a href="sell.html" class="btn-secondary" style="padding:6px 14px;font-size:0.8rem">Sell</a>
                  </td>
                </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>`;
  }

  if (tab === 'watchlist') {
    const watched = products.slice(0, 4); // Demo watchlist
    content.innerHTML = `
      <div class="product-grid">
        ${watched.map(p => productCard(p)).join('')}
      </div>`;
    setTimeout(observeCards, 50);
  }

  if (tab === 'orders') {
    content.innerHTML = `
      <div style="overflow-x:auto">
        <table style="width:100%;border-collapse:collapse">
          <thead>
            <tr style="border-bottom:1px solid var(--border);font-size:0.8rem;text-transform:uppercase;letter-spacing:1px;color:var(--text2)">
              <th style="padding:12px 8px;text-align:left">Order</th>
              <th style="padding:12px 8px;text-align:left">Item</th>
              <th style="padding:12px 8px;text-align:center">Size</th>
              <th style="padding:12px 8px;text-align:right">Price</th>
              <th style="padding:12px 8px;text-align:center">Status</th>
              <th style="padding:12px 8px;text-align:right">Date</th>
            </tr>
          </thead>
          <tbody>
            ${orderHistory.map(o => {
              const statusColors = { Delivered: 'var(--green)', Authenticated: 'var(--accent)', 'In Transit': '#4cc9f0' };
              const col = statusColors[o.status] || 'var(--text2)';
              return `
                <tr style="border-bottom:1px solid var(--border)">
                  <td style="padding:14px 8px;font-size:0.85rem;color:var(--accent);font-weight:600">${o.id}</td>
                  <td style="padding:14px 8px;font-weight:600;font-size:0.9rem">${o.product}</td>
                  <td style="padding:14px 8px;text-align:center">UK ${o.size}</td>
                  <td style="padding:14px 8px;text-align:right;font-family:var(--font-display);font-size:1.1rem">£${o.price}</td>
                  <td style="padding:14px 8px;text-align:center">
                    <span style="background:rgba(255,255,255,0.05);padding:4px 12px;border-radius:100px;font-size:0.78rem;font-weight:700;color:${col}">${o.status}</span>
                  </td>
                  <td style="padding:14px 8px;text-align:right;color:var(--text2);font-size:0.85rem">${o.date}</td>
                </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>`;
  }
}

init();
