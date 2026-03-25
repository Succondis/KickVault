// ===== BROWSE PAGE JS =====
let selectedSizes = [];
let maxPrice = 2000;

function init() {
  const params = new URLSearchParams(window.location.search);
  const q = params.get('q');
  const brand = params.get('brand');
  const sort = params.get('sort');

  if (brand) {
    // Auto-check brand checkbox
    const checkboxes = document.querySelectorAll('#brandFilters input');
    checkboxes.forEach(c => { if (c.value === brand) c.checked = true; });
  }
  if (sort === 'trending') {
    document.getElementById('sortSelect').value = 'change';
  }

  applyFilters(q);

  if (q) {
    document.getElementById('searchInput').value = q;
  }
}

function toggleSize(btn, size) {
  btn.classList.toggle('active');
  if (selectedSizes.includes(size)) {
    selectedSizes = selectedSizes.filter(s => s !== size);
  } else {
    selectedSizes.push(size);
  }
  applyFilters();
}

function updatePrice(val) {
  maxPrice = parseInt(val);
  document.getElementById('priceVal').textContent = `£${maxPrice}`;
  applyFilters();
}

function applyFilters(searchOverride) {
  const q = searchOverride || document.getElementById('searchInput')?.value.toLowerCase() || '';
  const brands = Array.from(document.querySelectorAll('#brandFilters input:checked')).map(i => i.value);
  const conditions = Array.from(document.querySelectorAll('.filter-checkboxes input:checked')).filter(i => ['New','Used'].includes(i.value)).map(i => i.value);
  const sort = document.getElementById('sortSelect')?.value || 'default';

  let filtered = products.filter(p => {
    const matchQ = !q || p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q);
    const matchBrand = brands.length === 0 || brands.includes(p.brand);
    const matchSize = selectedSizes.length === 0 || selectedSizes.some(s => p.sizes.includes(s));
    const matchPrice = p.price <= maxPrice;
    const matchCond = conditions.length === 0 || conditions.includes(p.condition);
    return matchQ && matchBrand && matchSize && matchPrice && matchCond;
  });

  // Sort
  if (sort === 'price-asc') filtered.sort((a,b) => a.price - b.price);
  else if (sort === 'price-desc') filtered.sort((a,b) => b.price - a.price);
  else if (sort === 'change') filtered.sort((a,b) => b.change - a.change);
  else if (sort === 'name') filtered.sort((a,b) => a.name.localeCompare(b.name));

  document.getElementById('resultCount').textContent = `${filtered.length} Sneaker${filtered.length !== 1 ? 's' : ''}`;
  renderGrid('browseGrid', filtered);
  setTimeout(observeCards, 50);
}

function clearFilters() {
  document.querySelectorAll('.filter-checkboxes input').forEach(i => i.checked = false);
  document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
  selectedSizes = [];
  maxPrice = 2000;
  document.getElementById('priceRange').value = 2000;
  document.getElementById('priceVal').textContent = '£1000';
  document.getElementById('sortSelect').value = 'default';
  applyFilters();
}

init();
