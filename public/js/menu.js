// Menu Page specific logic
let allDishes = [];
let currentCategory = 'all';

document.addEventListener('DOMContentLoaded', () => {
    fetchMenu();
    initFilters();
    renderCart();
});

async function fetchMenu() {
    const grid = document.getElementById('menuGrid');
    if (!grid) return;
    
    try {
        const response = await fetch('/api/menu');
        const data = await response.json();
        
        if(data.success) {
            allDishes = data.data;
            renderMenu();
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        console.error('Fetch menu error:', error);
        grid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; color: #ff3333; padding: 40px;">
                <i class="fa-solid fa-triangle-exclamation fa-3x" style="margin-bottom:20px;"></i>
                <h3>Error Loading Menu</h3>
                <p>Please check if the backend server is running.</p>
            </div>
        `;
    }
}

function initFilters() {
    // Category Pills
    const pills = document.querySelectorAll('.filter-pill');
    pills.forEach(pill => {
        pill.addEventListener('click', function(e) {
            pills.forEach(p => p.classList.remove('active'));
            this.classList.add('active');
            currentCategory = this.getAttribute('data-category');
            renderMenu();
            
            // Auto-scroll active pill into view
            this.scrollIntoView({ 
              behavior: 'smooth', 
              inline: 'center', 
              block: 'nearest' 
            });
        });
    });
    
    // Search
    const searchInput = document.getElementById('searchInput');
    if(searchInput) {
        searchInput.addEventListener('input', renderMenu);
    }
    
    // Veg Toggle
    const vegToggle = document.getElementById('vegToggle');
    if(vegToggle) {
        vegToggle.addEventListener('change', renderMenu);
    }
    
    // Sort
    const sortSelect = document.getElementById('sortSelect');
    if(sortSelect) {
        sortSelect.addEventListener('change', renderMenu);
    }
}

function renderMenu() {
    const grid = document.getElementById('menuGrid');
    if (!grid) return;
    
    const searchVal = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const vegOnly = document.getElementById('vegToggle')?.checked || false;
    const sortBy = document.getElementById('sortSelect')?.value || 'default';
    
    let filtered = allDishes.filter(dish => {
        // Category
        if(currentCategory !== 'all' && dish.category !== currentCategory) return false;
        
        // Search
        if(searchVal && !dish.name.toLowerCase().includes(searchVal) && 
           !(dish.description && dish.description.toLowerCase().includes(searchVal))) return false;
           
        // Veg only
        if(vegOnly && dish.is_veg === 0) return false;
        
        return true;
    });
    
    // Sorting
    if(sortBy === 'price-low') {
        filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if(sortBy === 'price-high') {
        filtered.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    } else if(sortBy === 'popular') {
        filtered.sort((a, b) => b.is_bestseller - a.is_bestseller);
    } else {
        // Default sort (bestsellers first)
        filtered.sort((a, b) => b.is_bestseller - a.is_bestseller);
    }
    
    if(filtered.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 50px;">
                <i class="fa-solid fa-magnifying-glass fa-3x" style="margin-bottom:20px; opacity:0.5;"></i>
                <h3>No dishes found</h3>
                <p>Try adjusting your filters or search term.</p>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = filtered.map((dish, index) => {
        // Make every 4th item a wide card for masonry-like bento grid
        const isWide = index % 5 === 0 && window.innerWidth > 768 ? 'wide' : '';
        const vegClass = dish.is_veg ? '' : 'non-veg';
        const bestBadge = dish.is_bestseller ? '<div class="bestseller-badge">🔥 Bestseller</div>' : '';
        
        return `
            <div class="menu-card ${isWide} animate-on-scroll show">
                <div class="mc-img-wrap">
                    <img src="${dish.image_url}" alt="${dish.name}">
                    <div class="mc-overlay"></div>
                    <div class="mc-badges">
                        <div class="veg-badge ${vegClass}" title="${dish.is_veg ? 'Vegetarian' : 'Non-Vegetarian'}"></div>
                        ${bestBadge}
                    </div>
                    <h3 class="mc-title">${dish.name}</h3>
                </div>
                <div class="mc-body">
                    <div class="mc-desc">${dish.description || 'Authentic flavor, cooked to perfection.'}</div>
                    <div class="mc-footer">
                        <div>
                            <div class="mc-price">₹${dish.price}</div>
                            <div class="mc-spice" style="margin-top:5px;">
                                ${getSpiceDots(dish.spice_level)}
                            </div>
                        </div>
                        <button class="btn-orange" onclick="addToCart(${dish.id}, '${dish.name.replace(/'/g, "\\'")}', ${dish.price}, '${dish.image_url}')" style="padding: 8px 15px;">
                            <i class="fa-solid fa-plus"></i> Add
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function getSpiceDots(level) {
    let count = 0;
    switch(level) {
        case 'mild': count = 1; break;
        case 'medium': count = 2; break;
        case 'hot': count = 3; break;
        case 'extra_hot': count = 4; break;
    }
    
    let html = '';
    for(let i=0; i<4; i++) {
        html += `<div class="spice-dot ${i < count ? 'active' : ''}"></div>`;
    }
    return html;
}

// Cart Functionality
function toggleCart() {
    const sidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('cartOverlay');
    
    sidebar.classList.toggle('open');
    if(sidebar.classList.contains('open')) {
        overlay.classList.add('show');
    } else {
        overlay.classList.remove('show');
    }
}

function renderCart() {
    const cartContainer = document.getElementById('cartItems');
    const subtotalEl = document.getElementById('cartSubtotal');
    const taxEl = document.getElementById('cartTax');
    const totalEl = document.getElementById('cartTotal');
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    if(!cartContainer) return;
    
    const cart = JSON.parse(localStorage.getItem('mirchiCart') || '[]');
    
    if(cart.length === 0) {
        cartContainer.innerHTML = `
            <div style="text-align:center; padding:40px; color:var(--text-muted);">
                <i class="fa-solid fa-basket-shopping fa-3x" style="margin-bottom:15px; opacity:0.5;"></i>
                <p>Your cart is empty.</p>
            </div>
        `;
        subtotalEl.textContent = '₹0.00';
        taxEl.textContent = '₹0.00';
        totalEl.textContent = '₹0.00';
        checkoutBtn.disabled = true;
        return;
    }
    
    let subtotal = 0;
    
    cartContainer.innerHTML = cart.map(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        return `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="ci-img">
                <div class="ci-details">
                    <div class="ci-name">${item.name}</div>
                    <div class="ci-price">₹${item.price}</div>
                    <div class="ci-controls">
                        <button class="qty-btn" onclick="updateQty(${item.id}, -1)">-</button>
                        <span style="color:white; width:20px; text-align:center;">${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQty(${item.id}, 1)">+</button>
                        <button class="qty-btn" style="margin-left:auto; color:#ff3333; background:rgba(255,51,51,0.1);" onclick="removeItem(${item.id})">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    const tax = subtotal * 0.05;
    const total = subtotal + tax;
    
    subtotalEl.textContent = `₹${subtotal.toFixed(2)}`;
    taxEl.textContent = `₹${tax.toFixed(2)}`;
    totalEl.textContent = `₹${total.toFixed(2)}`;
    checkoutBtn.disabled = false;
    
    // Update review total if modal is open
    const reviewTotal = document.getElementById('reviewTotal');
    if(reviewTotal) reviewTotal.textContent = `₹${total.toFixed(2)}`;
}

window.updateQty = function(id, change) {
    let cart = JSON.parse(localStorage.getItem('mirchiCart') || '[]');
    const item = cart.find(i => i.id === id);
    
    if(item) {
        item.quantity += change;
        if(item.quantity <= 0) {
            cart = cart.filter(i => i.id !== id);
        }
        localStorage.setItem('mirchiCart', JSON.stringify(cart));
        renderCart();
        if(window.updateCartBadge) window.updateCartBadge();
    }
}

window.removeItem = function(id) {
    let cart = JSON.parse(localStorage.getItem('mirchiCart') || '[]');
    cart = cart.filter(i => i.id !== id);
    localStorage.setItem('mirchiCart', JSON.stringify(cart));
    renderCart();
    if(window.updateCartBadge) window.updateCartBadge();
}

// Order Modal Logic
let currentStep = 1;
let orderData = {
    type: 'dine_in',
    items: [],
    total: 0
};

window.openOrderModal = function() {
    toggleCart(); // Close sidebar
    document.getElementById('orderModal').classList.add('show');
    resetModal();
}

window.closeOrderModal = function() {
    document.getElementById('orderModal').classList.remove('show');
}

function resetModal() {
    currentStep = 1;
    updateModalView();
    // Default select dine_in
    selectOrderType('dine_in');
}

window.selectOrderType = function(type) {
    orderData.type = type;
    
    document.querySelectorAll('.type-card').forEach(card => card.classList.remove('active'));
    
    if(type === 'dine_in') {
        document.querySelectorAll('.type-card')[0].classList.add('active');
        document.getElementById('addressGroup').style.display = 'none';
        document.getElementById('tableGroup').style.display = 'block';
    } else if(type === 'takeaway') {
        document.querySelectorAll('.type-card')[1].classList.add('active');
        document.getElementById('addressGroup').style.display = 'none';
        document.getElementById('tableGroup').style.display = 'none';
    } else {
        document.querySelectorAll('.type-card')[2].classList.add('active');
        document.getElementById('addressGroup').style.display = 'block';
        document.getElementById('tableGroup').style.display = 'none';
        document.getElementById('deliveryAddress').required = true;
    }
    
    document.getElementById('reviewType').textContent = type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
}

window.nextStep = function() {
    if(currentStep === 2) {
        // Validate form
        const name = document.getElementById('customerName').value;
        const phone = document.getElementById('customerPhone').value;
        
        if(!name || !phone) {
            alert('Please fill in name and phone number');
            return;
        }
        
        if(orderData.type === 'delivery' && !document.getElementById('deliveryAddress').value) {
            alert('Please provide a delivery address');
            return;
        }
    }
    
    if(currentStep === 3) {
        submitOrder();
        return;
    }
    
    currentStep++;
    updateModalView();
}

window.prevStep = function() {
    if(currentStep > 1) {
        currentStep--;
        updateModalView();
    }
}

function updateModalView() {
    // Update steps
    document.querySelectorAll('.step').forEach((step, idx) => {
        const num = idx + 1;
        step.classList.remove('active', 'completed');
        if(num < currentStep) step.classList.add('completed');
        if(num === currentStep) step.classList.add('active');
    });
    
    // Update progress bar
    document.getElementById('progressBar').style.width = ((currentStep - 1) / 2) * 100 + '%';
    
    // Update content
    document.querySelectorAll('.step-content').forEach(content => content.classList.remove('active'));
    document.getElementById(`step${currentStep}`).classList.add('active');
    
    // Buttons
    document.getElementById('prevBtn').style.display = currentStep === 1 ? 'none' : 'block';
    document.getElementById('nextBtn').textContent = currentStep === 3 ? 'Place Order' : 'Continue';
}

async function submitOrder() {
    const btn = document.getElementById('nextBtn');
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing...';
    btn.disabled = true;
    
    try {
        const cart = JSON.parse(localStorage.getItem('mirchiCart') || '[]');
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const total = subtotal + (subtotal * 0.05);
        
        const payload = {
            customer_name: document.getElementById('customerName').value,
            customer_phone: document.getElementById('customerPhone').value,
            customer_email: 'customer@example.com', // Optional in new schema
            order_type: orderData.type,
            table_number: document.getElementById('tableNumber').value || null,
            delivery_address: document.getElementById('deliveryAddress').value || null,
            special_instructions: document.getElementById('specialInstructions').value || null,
            total_amount: total.toFixed(2),
            items: cart.map(item => ({
                menu_item_id: item.id,
                quantity: item.quantity,
                price: item.price
            }))
        };
        
        const response = await fetch('/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        
        const data = await response.json();
        
        if(data.success) {
            document.getElementById('step3').innerHTML = `
                <div style="text-align:center; padding: 40px 20px;">
                    <div style="width:80px; height:80px; background:#25D366; border-radius:50%; display:flex; align-items:center; justify-content:center; margin:0 auto 20px;">
                        <i class="fa-solid fa-check fa-3x" style="color:white;"></i>
                    </div>
                    <h3 style="color:white; margin-bottom:10px;">Order Placed Successfully!</h3>
                    <p style="color:var(--text-muted); margin-bottom:5px;">Order ID: #${data.orderId}</p>
                    <p style="color:var(--text-muted);">We'll start preparing your food right away.</p>
                </div>
            `;
            
            document.getElementById('prevBtn').style.display = 'none';
            btn.textContent = 'Close';
            btn.onclick = () => {
                localStorage.removeItem('mirchiCart');
                window.location.reload();
            };
            btn.disabled = false;
        } else {
            throw new Error(data.message || 'Failed to place order');
        }
    } catch (error) {
        console.error('Order error:', error);
        alert('Failed to place order: ' + error.message);
        btn.textContent = 'Place Order';
        btn.disabled = false;
    }
}
