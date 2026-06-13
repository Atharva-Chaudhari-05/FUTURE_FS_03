// FIX 6: Menu Filter Logic
// Menu state
let allDishes = [];
let filteredDishes = [];
let cart = [];
let activeCategory = 'all';
let vegFilter = 'all';

// Fetch menu from API
async function fetchMenu() {
  try {
    const response = await fetch('/api/menu');
    const data = await response.json();
    allDishes = data.data || [];
    filteredDishes = [...allDishes];
    renderMenu(filteredDishes);
  } catch (error) {
    console.error('Menu fetch failed:', error);
    if(window.showToast) window.showToast('Failed to load menu. Please refresh.', 'error');
  }
}

// Filter menu
function filterMenu() {
  filteredDishes = allDishes.filter(dish => {
    
    const categoryMatch = 
      activeCategory === 'all' || 
      dish.category === activeCategory;
    
    const vegMatch = 
      vegFilter === 'all' || 
      (vegFilter === 'veg' && dish.is_veg === 1) ||
      (vegFilter === 'non-veg' && dish.is_veg === 0);
    
    return categoryMatch && vegMatch;
  });
  
  renderMenu(filteredDishes);
}

// Category filter click
document.querySelectorAll('.filter-tab').forEach(tab => {
  tab.addEventListener('click', function() {
    document.querySelectorAll('.filter-tab').forEach(t => {
        t.classList.remove('active');
        t.style.borderBottomColor = 'transparent';
        t.style.color = 'inherit';
    });
    this.classList.add('active');
    this.style.borderBottomColor = 'var(--primary)';
    this.style.color = 'var(--primary)';
    
    activeCategory = this.getAttribute('data-category');
    filterMenu();
  });
});

// Veg toggle
document.querySelectorAll('.veg-toggle').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.veg-toggle').forEach(b => {
        b.classList.remove('active');
        b.style.background = 'white';
        b.style.color = b.getAttribute('data-filter') === 'veg' ? '#2e7d32' : (b.getAttribute('data-filter') === 'non-veg' ? '#c62828' : 'inherit');
    });
    this.classList.add('active');
    
    if(this.getAttribute('data-filter') === 'veg') {
        this.style.background = '#2e7d32';
        this.style.color = 'white';
    } else if(this.getAttribute('data-filter') === 'non-veg') {
        this.style.background = '#c62828';
        this.style.color = 'white';
    } else {
        this.style.background = '#ddd';
    }
    
    vegFilter = this.getAttribute('data-filter');
    filterMenu();
  });
});

// Render menu cards
function renderMenu(dishes) {
  const grid = document.getElementById('menuGrid');
  
  if (dishes.length === 0) {
    grid.innerHTML = `
      <div class="no-results" style="grid-column:1/-1; text-align:center; padding:50px;">
        <span style="font-size:3rem">🔍</span>
        <p>No dishes found. Try a different filter.</p>
      </div>
    `;
    return;
  }
  
  grid.innerHTML = dishes.map(dish => `
    <div class="dish-card" data-id="${dish.id}" data-aos="fade-up">
      <div class="veg-indicator ${dish.is_veg ? 'veg' : 'non-veg'}"></div>
      ${dish.is_bestseller ? '<span class="badge-bestseller">⭐ Best</span>' : ''}
      <img src="${dish.image_url}" alt="${dish.name}" class="dish-card-img" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400'" />
      
      <div class="dish-card-body">
        <h3 class="dish-card-title">${dish.name}</h3>
        <p class="dish-card-desc" title="${dish.description}">${dish.description}</p>
        <div class="spice-level">
          ${getSpiceIcons(dish.spice_level)}
        </div>
        <div class="dish-card-footer">
          <span class="dish-price">₹${dish.price}</span>
          <button class="btn-add-cart" onclick="addToCart(${dish.id})">
            + Add
          </button>
        </div>
      </div>
    </div>
  `).join('');
  
  // Re-apply scroll animations
  document.querySelectorAll('.dish-card').forEach((card, i) => {
      card.style.animationDelay = `${i * 0.05}s`;
      card.classList.add('scroll-hidden');
  });
  
  setTimeout(() => {
    document.querySelectorAll('.dish-card').forEach(card => {
        card.classList.remove('scroll-hidden');
        card.classList.add('animate-up');
    });
  }, 100);
}

function getSpiceIcons(level) {
  const levels = {
    'mild': '🌶️',
    'medium': '🌶️🌶️',
    'hot': '🌶️🌶️🌶️',
    'extra_hot': '🌶️🌶️🌶️🌶️'
  };
  return `<span class="spice">${levels[level]||''}</span>`;
}

// FIX 7: CART NOT WORKING
function addToCart(dishId) {
  const dish = allDishes.find(d => d.id === dishId);
  if (!dish) return;
  
  const existingItem = cart.find(item => item.id === dishId);
  
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ ...dish, quantity: 1 });
  }
  
  updateCartUI();
  if(window.showToast) window.showToast(`${dish.name} added to cart! 🛒`, 'success');
  
  // Animate cart icon
  const cartIcon = document.getElementById('cartToggle');
  if(cartIcon) {
      cartIcon.style.transform = 'scale(1.3)';
      setTimeout(() => cartIcon.style.transform = 'scale(1)', 300);
  }
}

function removeFromCart(dishId) {
  cart = cart.filter(item => item.id !== dishId);
  updateCartUI();
}

window.updateQuantity = function(dishId, change) {
  const item = cart.find(i => i.id === dishId);
  if (!item) return;
  
  item.quantity += change;
  if (item.quantity <= 0) removeFromCart(dishId);
  else updateCartUI();
}

function updateCartUI() {
  const cartCount = document.getElementById('cartCount');
  const cartItems = document.getElementById('cartItems');
  const cartTotal = document.getElementById('cartTotal');
  const cartSubtotal = document.getElementById('cartSubtotal');
  
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = totalPrice * 0.05;
  const grandTotal = totalPrice + tax;
  
  if (cartCount) cartCount.textContent = totalItems;
  if (cartSubtotal) cartSubtotal.textContent = `₹${totalPrice.toFixed(2)}`;
  if (cartTotal) cartTotal.textContent = `₹${grandTotal.toFixed(2)}`;
  
  if (cartItems) {
    if (cart.length === 0) {
      cartItems.innerHTML = `
        <div class="cart-empty" style="text-align:center; padding:50px 0; color:var(--gray);">
          <span style="font-size:3rem">🛒</span>
          <p>Your cart is empty</p>
          <p>Add some delicious food!</p>
        </div>
      `;
    } else {
      cartItems.innerHTML = cart.map(item => `
        <div class="cart-item" style="display:flex; align-items:center; gap:15px; border-bottom:1px solid #eee; padding-bottom:10px;">
          <img src="${item.image_url}" alt="${item.name}" style="width:60px; height:60px; object-fit:cover; border-radius:10px;" onerror="this.src='https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=100'" />
          <div class="cart-item-info" style="flex:1;">
            <h4 style="margin:0; font-size:0.9rem;">${item.name}</h4>
            <span class="cart-item-price" style="color:var(--secondary); font-weight:bold;">₹${item.price}</span>
          </div>
          <div class="cart-item-controls" style="display:flex; align-items:center; gap:10px; border:1px solid #ddd; border-radius:5px; padding:2px 5px;">
            <button onclick="updateQuantity(${item.id}, -1)" style="border:none; background:none; cursor:pointer;">−</button>
            <span>${item.quantity}</span>
            <button onclick="updateQuantity(${item.id}, 1)" style="border:none; background:none; cursor:pointer;">+</button>
          </div>
          <button class="cart-item-remove" onclick="removeFromCart(${item.id})" style="border:none; background:none; color:red; cursor:pointer;">✕</button>
        </div>
      `).join('');
    }
  }
}

// Cart sidebar toggle
const cartToggle = document.getElementById('cartToggle');
const cartSidebar = document.getElementById('cartSidebar');
const cartClose = document.getElementById('cartClose');
const cartOverlay = document.getElementById('cartOverlay');

if (cartToggle) {
  cartToggle.addEventListener('click', () => {
    cartSidebar.style.right = '0';
    cartOverlay.style.opacity = '1';
    cartOverlay.style.visibility = 'visible';
  });
}

if (cartClose) {
  cartClose.addEventListener('click', () => {
    cartSidebar.style.right = '-400px';
    cartOverlay.style.opacity = '0';
    cartOverlay.style.visibility = 'hidden';
  });
}

if (cartOverlay) {
  cartOverlay.addEventListener('click', () => {
    cartSidebar.style.right = '-400px';
    cartOverlay.style.opacity = '0';
    cartOverlay.style.visibility = 'hidden';
  });
}

// Initialize
document.addEventListener('DOMContentLoaded', fetchMenu);
