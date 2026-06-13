// Home page specific logic

document.addEventListener('DOMContentLoaded', () => {
    // Hero Title Animation
    animateHeroTitle();
    
    // Load Bestsellers
    loadBestsellers();
    
    // Countdown Timer
    initCountdown();
});

function animateHeroTitle() {
    const title = document.getElementById('heroTitle');
    if (!title) return;
    
    const text = title.innerHTML;
    const lines = text.split('<br>');
    title.innerHTML = '';
    
    lines.forEach((line, lineIndex) => {
        const words = line.trim().split(' ');
        words.forEach((word, wordIndex) => {
            const span = document.createElement('span');
            span.className = 'word';
            span.innerHTML = word + '&nbsp;';
            span.style.animation = `fadeInUp 0.5s ease forwards ${0.5 + (lineIndex * 0.3) + (wordIndex * 0.1)}s`;
            if (lineIndex === 1 && wordIndex === 1) {
                span.style.color = 'var(--primary)';
            }
            title.appendChild(span);
        });
        if (lineIndex < lines.length - 1) {
            title.appendChild(document.createElement('br'));
        }
    });
}

// Add animation keyframes to document
const style = document.createElement('style');
style.innerHTML = `
@keyframes fadeInUp {
    to { opacity: 1; transform: translateY(0); }
}
`;
document.head.appendChild(style);

async function loadBestsellers() {
    const grid = document.getElementById('bestsellersGrid');
    if (!grid) return;
    
    try {
        const response = await fetch('/api/menu/bestsellers');
        if (!response.ok) throw new Error('API Error');
        
        const data = await response.json();
        if (!data.success) throw new Error(data.message);
        
        const dishes = data.data.slice(0, 6);
        
        if (dishes.length === 0) {
            grid.innerHTML = '<p style="color:var(--text-muted); padding:20px;">No bestsellers found.</p>';
            return;
        }
        
        grid.innerHTML = dishes.map(dish => `
            <div class="bs-card">
                <img src="${dish.image_url}" alt="${dish.name}" class="bs-img">
                <div class="bs-info">
                    <span class="bs-tag">${formatCategory(dish.category)}</span>
                    <h3 class="bs-name">${dish.name}</h3>
                    <p class="bs-desc">${dish.description || 'Authentic flavor, cooked to perfection.'}</p>
                    <div style="display:flex; gap:3px; margin-bottom:10px;">
                        ${getSpiceDots(dish.spice_level)}
                    </div>
                    <div class="bs-footer">
                        <span class="bs-price">₹${dish.price}</span>
                        <button class="btn-add" onclick="addToCart(${dish.id}, '${dish.name.replace(/'/g, "\\'")}', ${dish.price}, '${dish.image_url}')">Add +</button>
                    </div>
                </div>
            </div>
        `).join('');
        
    } catch (error) {
        console.error('Bestsellers load failed:', error);
        grid.innerHTML = '<p style="color:red; padding:20px;">Failed to load menu. Is the server running?</p>';
    }
}

function formatCategory(cat) {
    return cat.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
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

function initCountdown() {
    const hoursEl = document.getElementById('cd-hours');
    const minsEl = document.getElementById('cd-minutes');
    const secsEl = document.getElementById('cd-seconds');
    
    if (!hoursEl) return;
    
    // Set a random time between 2 and 5 hours
    let time = (Math.floor(Math.random() * 3) + 2) * 3600 + Math.floor(Math.random() * 60) * 60 + Math.floor(Math.random() * 60);
    
    setInterval(() => {
        time--;
        if (time < 0) time = 5 * 3600; // reset
        
        const h = Math.floor(time / 3600);
        const m = Math.floor((time % 3600) / 60);
        const s = time % 60;
        
        hoursEl.textContent = h.toString().padStart(2, '0');
        minsEl.textContent = m.toString().padStart(2, '0');
        secsEl.textContent = s.toString().padStart(2, '0');
    }, 1000);
}
