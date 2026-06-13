let galleryData = [];
let filteredGallery = [];
let currentIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
    fetchGallery();
    initFilters();
    initLightboxEvents();
});

async function fetchGallery() {
    try {
        const res = await fetch('/api/gallery');
        const data = await res.json();
        if(data.success) {
            galleryData = data.data;
            filteredGallery = [...galleryData];
            renderGallery(filteredGallery);
        }
    } catch(err) {
        console.error('Failed to load gallery', err);
        document.getElementById('galleryGrid').innerHTML = '<p class="text-center w-100" style="color:red; grid-column:1/-1;">Failed to load images.</p>';
    }
}

function renderGallery(images) {
    const grid = document.getElementById('galleryGrid');
    grid.innerHTML = '';
    
    if(images.length === 0) {
        grid.innerHTML = '<p class="text-center w-100" style="grid-column:1/-1;">No images found.</p>';
        return;
    }

    images.forEach((img, idx) => {
        const item = document.createElement('div');
        // FIX 4: Animation classes
        item.className = `gallery-item animate-up`;
        item.style.animationDelay = `${(idx % 10) * 0.1}s`;
        item.style.breakInside = 'avoid';
        item.style.marginBottom = '20px';
        item.style.position = 'relative';
        item.style.overflow = 'hidden';
        item.style.borderRadius = '10px';
        item.style.cursor = 'pointer';
        
        item.onclick = () => openLightbox(idx);
        
        // FIX 5: Fallback on error
        item.innerHTML = `
            <img src="${img.image_url}" alt="${img.title}" loading="lazy" style="width:100%; display:block;" onerror="this.src='https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400'">
            <div class="gallery-overlay" style="position:absolute; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.6); display:flex; flex-direction:column; justify-content:center; align-items:center; opacity:0; transition:0.3s; color:white;">
                <i class="fas fa-search-plus" style="font-size:2rem; color:var(--primary); margin-bottom:10px;"></i>
                <h3 style="color:white; font-family:var(--font-heading);">${img.title}</h3>
            </div>
        `;
        
        item.addEventListener('mouseenter', function() {
            this.querySelector('.gallery-overlay').style.opacity = '1';
        });
        item.addEventListener('mouseleave', function() {
            this.querySelector('.gallery-overlay').style.opacity = '0';
        });

        grid.appendChild(item);
    });
}

function initFilters() {
    const btns = document.querySelectorAll('.filter-btn');
    btns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            btns.forEach(b => {
                b.classList.remove('active');
                b.style.background = 'transparent';
                b.style.color = 'var(--text)';
            });
            e.target.classList.add('active');
            e.target.style.background = 'var(--primary)';
            e.target.style.color = 'white';
            
            const category = e.target.getAttribute('data-filter');
            if(category === 'all') {
                filteredGallery = [...galleryData];
            } else {
                filteredGallery = galleryData.filter(img => img.category === category);
            }
            renderGallery(filteredGallery);
        });
    });
}

// Lightbox Logic
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxCounter = document.getElementById('lightboxCounter');

function openLightbox(index) {
    currentIndex = index;
    updateLightboxContent();
    lightbox.style.opacity = '1';
    lightbox.style.visibility = 'visible';
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.style.opacity = '0';
    lightbox.style.visibility = 'hidden';
    document.body.style.overflow = 'auto';
}

function updateLightboxContent() {
    const img = filteredGallery[currentIndex];
    lightboxImg.src = img.image_url;
    lightboxImg.alt = img.title;
    lightboxCaption.innerText = img.title;
    lightboxCounter.innerText = `${currentIndex + 1} / ${filteredGallery.length}`;
}

function prevImage() {
    currentIndex = (currentIndex - 1 + filteredGallery.length) % filteredGallery.length;
    updateLightboxContent();
}

function nextImage() {
    currentIndex = (currentIndex + 1) % filteredGallery.length;
    updateLightboxContent();
}

function initLightboxEvents() {
    document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
    document.getElementById('lightboxPrev').addEventListener('click', prevImage);
    document.getElementById('lightboxNext').addEventListener('click', nextImage);
    
    // Close on click outside image
    lightbox.addEventListener('click', (e) => {
        if(e.target === lightbox) closeLightbox();
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if(lightbox.style.visibility !== 'visible') return;
        if(e.key === 'Escape') closeLightbox();
        if(e.key === 'ArrowLeft') prevImage();
        if(e.key === 'ArrowRight') nextImage();
    });
}
