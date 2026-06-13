document.addEventListener('DOMContentLoaded', () => {
  loadBestsellers();
  setTimeout(() => {
    document.querySelectorAll('.stat-num').forEach(animateCounter);
  }, 300);
});

// FIX 2: Hero Section Counter animation
function animateCounter(el) {
  const target = parseFloat(el.getAttribute('data-target'));
  const isDecimal = !Number.isInteger(target);
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      el.textContent = isDecimal ? target.toFixed(1) : target;
      clearInterval(timer);
    } else {
      el.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);
    }
  }, 16);
}



async function loadBestsellers() {
  try {
    const response = await fetch('/api/menu');
    const data = await response.json();

    if (!data.success) throw new Error('API failed');

    // Get bestsellers, fallback to first 6 if none
    let dishes = data.data.filter(d => d.is_bestseller);
    if (dishes.length < 3) dishes = data.data.slice(0, 6);

    // Take max 6
    dishes = dishes.slice(0, 6);

    const grid = document.getElementById('bestsellersGrid');
    if (!grid) return;

    grid.innerHTML = dishes.map((dish, i) => `
      <div class="dish-card" 
        style="animation-delay: ${i * 0.1}s">
        
        <div class="veg-indicator 
          ${dish.is_veg ? 'veg' : 'non-veg'}">
        </div>
        
        <span class="badge-bestseller">⭐ Best</span>
        
        <div class="dish-img-wrap">
          <img 
            src="${dish.image_url}"
            alt="${dish.name}"
            class="dish-card-img"
            loading="lazy"
            onerror="this.src='https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80'"
          />
        </div>
        
        <div class="dish-card-body">
          <h3 class="dish-card-title">${dish.name}</h3>
          <p class="dish-card-desc">
            ${dish.description || ''}
          </p>
          
          <div class="dish-meta">
            <span class="spice-icons">
              ${'🌶️'.repeat(
      {
        'mild': 1, 'medium': 2,
        'hot': 3, 'extra_hot': 4
      }
      [dish.spice_level] || 1
    )}
            </span>
          </div>
          
          <div class="dish-card-footer">
            <span class="dish-price">₹${dish.price}</span>
            <a href="menu.html" class="btn-order-dish">
              + Order
            </a>
          </div>
        </div>
      </div>
    `).join('');

  } catch (error) {
    console.error('Bestsellers load failed:', error);
    document.getElementById('bestsellersGrid')
      .innerHTML = `
        <p style="grid-column:1/-1; text-align:center; 
          color:#888; padding:40px">
          Could not load dishes. 
          Please check server connection.
        </p>
      `;
  }
}

function getSpiceCount(level) {
    switch(level) {
        case 'mild': return 1;
        case 'medium': return 2;
        case 'hot': return 3;
        case 'extra_hot': return 4;
        default: return 0;
    }
}
