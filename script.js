const products = [
  { id: 1, name: "Wireless Headphones", price: 1200, image: "https://via.placeholder.com/220" },
  { id: 2, name: "Smart Watch", price: 2500, image: "https://via.placeholder.com/220" },
  { id: 3, name: "Bluetooth Speaker", price: 1800, image: "https://via.placeholder.com/220" },
  { id: 4, name: "Gaming Mouse", price: 900, image: "https://via.placeholder.com/220" },
  { id: 5, name: "Laptop Bag", price: 750, image: "https://via.placeholder.com/220" },
  { id: 6, name: "Keyboard", price: 1100, image: "https://via.placeholder.com/220" },
  { id: 7, name: "Power Bank", price: 1500, image: "https://via.placeholder.com/220" },
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];
const productList = document.getElementById('product-list');
const cartCountElement = document.getElementById('cart-count');
const searchInput = document.getElementById('search-input');
const priceFilter = document.getElementById('price-filter');

// Display products
function displayProducts(items) {
  if (!productList) return;
  productList.innerHTML = '';

  if (items.length === 0) {
    productList.innerHTML = '<p>No products found 😞</p>';
    return;
  }

  items.forEach(product => {
    const card = document.createElement('div');
    card.classList.add('product');
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>₹${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productList.appendChild(card);
  });
}

// Add to cart
function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  alert(`${product.name} added to cart!`);
}

// Update cart counter
function updateCartCount() {
  if (cartCountElement) cartCountElement.textContent = cart.length;
}

// Search and Filter
function filterProducts() {
  let searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
  let priceRange = priceFilter ? priceFilter.value : 'all';

  let filtered = products.filter(p => p.name.toLowerCase().includes(searchTerm));

  if (priceRange !== 'all') {
    const [min, max] = priceRange.split('-').map(Number);
    filtered = filtered.filter(p => p.price >= min && p.price <= max);
  }

  displayProducts(filtered);
}

if (searchInput) searchInput.addEventListener('input', filterProducts);
if (priceFilter) priceFilter.addEventListener('change', filterProducts);

displayProducts(products);
updateCartCount();
