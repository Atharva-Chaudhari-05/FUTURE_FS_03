// Gallery logic
let allImages = [];
let currentIndex = 0;
let filteredImages = [];

document.addEventListener('DOMContentLoaded', () => {
    fetchGallery();
    initGalleryFilters();
    initLightbox();
});

async function fetchGallery() {
    const grid = document.getElementById('galleryGrid');
    if (!grid) return;
    
    try {
        const response = await fetch('/api/gallery');
        const data = await response.json();
        
        if(data.success) {
            allImages = data.data;
            
            // If empty, add some placeholders
            if (allImages.length === 0) {
                allImages = [
                    { id: 1, image_url: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=80', title: 'Maharashtra Thali', category: 'food' },
                    { id: 2, image_url: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&q=80', title: 'Our Dining Area', category: 'ambiance' },
                    { id: 3, image_url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80', title: 'Busy Kitchen', category: 'kitchen' },
                    { id: 4, image_url: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=800&q=80', title: 'Vada Pav', category: 'food' },
                    { id: 5, image_url: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80', title: 'Reserved Table', category: 'ambiance' },
                    { id: 6, image_url: 'https://images.unsplash.com/photo-1589301760014-d929f39ce9b0?w=800&q=80', title: 'Street Food Spread', category: 'food' }
                ];
            }
            
            filteredImages = [...allImages];
            renderGallery();
        } else {
            throw new Error('Failed to fetch gallery');
        }
    } catch (error) {
        console.error(error);
        grid.innerHTML = '<p style="color:var(--text-muted); text-align:center; padding:40px;">Failed to load images.</p>';
    }
}

function renderGallery() {
    const grid = document.getElementById('galleryGrid');
    if (!grid) return;
    
    if (filteredImages.length === 0) {
        grid.innerHTML = '<p style="color:var(--text-muted); text-align:center; padding:40px;">No images in this category.</p>';
        return;
    }
    
    grid.innerHTML = filteredImages.map((img, index) => `
        <div class="gallery-item animate-on-scroll show" onclick="openLightbox(${index})">
            <img src="${img.image_url}" alt="${img.title || 'Gallery image'}">
            <div class="gallery-overlay">
                <i class="fa-solid fa-magnifying-glass-plus zoom-icon"></i>
                <div class="gi-title">${img.title || 'Delicious Food'}</div>
                <div class="gi-tag">${img.category || 'Food'}</div>
            </div>
        </div>
    `).join('');
}

function initGalleryFilters() {
    const tabs = document.querySelectorAll('.filter-tab');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            tabs.forEach(t => t.classList.remove('active'));
            const target = e.currentTarget;
            target.classList.add('active');
            
            const filter = target.getAttribute('data-filter');
            if (filter === 'all') {
                filteredImages = [...allImages];
            } else {
                filteredImages = allImages.filter(img => img.category === filter);
            }
            
            renderGallery();
        });
    });
}

function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const closeBtn = document.getElementById('lbClose');
    const prevBtn = document.getElementById('lbPrev');
    const nextBtn = document.getElementById('lbNext');
    const downloadBtn = document.getElementById('lbDownload');
    
    if(!lightbox) return;
    
    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', () => navigateLightbox(-1));
    nextBtn.addEventListener('click', () => navigateLightbox(1));
    
    downloadBtn.addEventListener('click', () => {
        const imgUrl = filteredImages[currentIndex].image_url;
        window.open(imgUrl, '_blank');
    });
    
    lightbox.addEventListener('click', (e) => {
        if(e.target === lightbox) closeLightbox();
    });
    
    document.addEventListener('keydown', (e) => {
        if(!lightbox.classList.contains('active')) return;
        
        if(e.key === 'Escape') closeLightbox();
        if(e.key === 'ArrowLeft') navigateLightbox(-1);
        if(e.key === 'ArrowRight') navigateLightbox(1);
    });
}

window.openLightbox = function(index) {
    const lightbox = document.getElementById('lightbox');
    currentIndex = index;
    updateLightbox();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function navigateLightbox(dir) {
    currentIndex += dir;
    if(currentIndex < 0) currentIndex = filteredImages.length - 1;
    if(currentIndex >= filteredImages.length) currentIndex = 0;
    updateLightbox();
}

function updateLightbox() {
    const img = document.getElementById('lbImg');
    const title = document.getElementById('lbTitle');
    const counter = document.getElementById('lbCounter');
    
    const currentImg = filteredImages[currentIndex];
    
    img.src = currentImg.image_url;
    title.textContent = currentImg.title || 'Mirchi & Masala Gallery';
    counter.textContent = `${currentIndex + 1} / ${filteredImages.length}`;
}
