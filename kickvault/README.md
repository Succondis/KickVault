# KickVault — StockX-Style Sneaker Marketplace

## How to Open
1. Open the `kickvault` folder in VS Code
2. Open `index.html` in your browser (right-click → Open in Default Browser)
   - Or install the **Live Server** extension and click "Go Live"

## Pages
| File | Description |
|------|-------------|
| `index.html` | Homepage with hero, trending grid, brand categories |
| `browse.html` | Browse/filter/search all sneakers |
| `product.html` | Individual product detail with buy/bid |
| `sell.html` | 3-step seller flow |
| `portfolio.html` | Collection tracker, watchlist, order history |
| `login.html` | Sign in / Register |
| `checkout.html` | Full checkout form with order confirmation |

## Adding Your Own Images

All product images are in the `images/` folder. To replace placeholders:

1. Add your sneaker images to the `images/` folder
2. Open `js/data.js`
3. For each product, change the `img` field:
   ```js
   img: "images/your-shoe-image.jpg",
   ```

Current image filenames expected:
- `images/hero-shoe.png` — Hero section shoe
- `images/shoe-1.png` through `images/shoe-12.png` — Product images
- `images/brand-nike.png`, `images/brand-jordan.png`, etc. — Brand logos

If an image file is missing, a coloured placeholder automatically shows instead.

## Adding More Products

In `js/data.js`, add a new object to the `products` array:
```js
{
  id: 13,                          // Unique ID (increment from last)
  name: "Your Shoe Name",
  brand: "Nike",                   // Nike | Jordan | Adidas | Yeezy | New Balance | Asics
  sku: "AB1234-001",
  price: 200,                      // Market price in £
  retail: 120,                     // Original retail price
  change: 5.2,                     // 24h % change (positive or negative)
  sizes: ["7","8","9","10","11"],  // Available UK sizes
  condition: "New",
  colorway: "White / Black",
  releaseDate: "Jan 2025",
  sales: "1,200",
  asks: 30,
  bids: 25,
  img: "images/shoe-13.png",
  imgFallback: "https://placehold.co/400x300/1a1a1a/e8ff3b?text=SHOE+NAME",
  tags: []                         // Optional: ["trending","hyped","popular"]
}
```

## Features
- ✅ Live product search (nav + browse page)
- ✅ Filter by brand, size, price, condition
- ✅ Sort by price, movers, name
- ✅ Working shopping cart (persists in localStorage)
- ✅ Product detail pages with market data
- ✅ 3-step seller listing flow with payout calculator
- ✅ Portfolio tracker with gain/loss
- ✅ Order history
- ✅ Checkout with order confirmation
- ✅ Mobile responsive
- ✅ Price ticker
- ✅ Toast notifications
