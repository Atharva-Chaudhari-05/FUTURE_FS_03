// Main functionality for all pages

document.addEventListener('DOMContentLoaded', () => {
    initCursor();
    initLoader();
    initNavbar();
    initScrollAnimations();
    initPageTransitions();
    initStars();
});

// 1. Custom Cursor with Trail
function initCursor() {
    const cursor = document.getElementById('cursor');
    if (!cursor) return;

    const trailCount = 10;
    const trails = [];
    
    // Create trail elements
    for(let i=0; i<trailCount; i++) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        document.body.appendChild(trail);
        trails.push({ element: trail, x: 0, y: 0 });
    }

    let mouseX = 0, mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    });

    // Animate trails
    function animateTrails() {
        let x = mouseX, y = mouseY;
        
        trails.forEach((trail, index) => {
            const nextTrail = trails[index + 1] || trails[0];
            
            trail.x += (x - trail.x) * 0.4;
            trail.y += (y - trail.y) * 0.4;
            
            trail.element.style.transform = `translate(${trail.x}px, ${trail.y}px)`;
            
            x = trail.x;
            y = trail.y;
        });
        
        requestAnimationFrame(animateTrails);
    }
    animateTrails();
    
    // Hover effects for links and buttons
    const interactables = document.querySelectorAll('a, button, .cat-pill, .time-slot, .faq-question');
    interactables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = `translate(${mouseX}px, ${mouseY}px) scale(2)`;
            cursor.style.backgroundColor = 'transparent';
            cursor.style.border = '1px solid var(--primary)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = `translate(${mouseX}px, ${mouseY}px) scale(1)`;
            cursor.style.backgroundColor = 'var(--primary)';
            cursor.style.border = 'none';
        });
    });
}

// 2. Page Loader
function initLoader() {
    const loader = document.getElementById('pageLoader');
    const bar = document.getElementById('loaderBar');
    if (!loader || !bar) return;

    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;
        bar.style.width = progress + '%';
        
        if (progress === 100) {
            clearInterval(interval);
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.visibility = 'hidden';
                }, 500);
            }, 500);
        }
    }, 100);
}

// 3. Navbar logic
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    
    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.innerHTML = navLinks.classList.contains('active') ? 
                '<i class="fa-solid fa-xmark"></i>' : 
                '<i class="fa-solid fa-bars"></i>';
        });
    }
    
    updateCartBadge();
}

function updateCartBadge() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        const cart = JSON.parse(localStorage.getItem('mirchiCart') || '[]');
        cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    }
}

// 4. Scroll Animations (Intersection Observer)
function initScrollAnimations() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                
                // Number Counter
                if (entry.target.classList.contains('stat-item') || entry.target.querySelector('.counter')) {
                    const counter = entry.target.querySelector('.counter');
                    if (counter && !counter.classList.contains('counted')) {
                        counter.classList.add('counted');
                        const target = parseInt(counter.getAttribute('data-target'));
                        const duration = 2000;
                        const step = target / (duration / 16);
                        let current = 0;
                        
                        const updateCounter = () => {
                            current += step;
                            if (current < target) {
                                counter.textContent = Math.ceil(current) + (target > 100 ? '+' : '');
                                requestAnimationFrame(updateCounter);
                            } else {
                                counter.textContent = target + (target > 100 ? '+' : '');
                            }
                        };
                        updateCounter();
                    }
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(el => observer.observe(el));
}

// 5. Page Transitions
function initPageTransitions() {
    const transition = document.getElementById('pageTransition');
    if (!transition) return;
    
    const links = document.querySelectorAll('a[href]:not([target="_blank"]):not([href^="#"])');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const destination = link.getAttribute('href');
            if (destination === window.location.pathname.split('/').pop()) return;
            
            e.preventDefault();
            transition.classList.add('active');
            
            setTimeout(() => {
                window.location.href = destination;
            }, 500);
        });
    });
}

// Global functions for cart
window.addToCart = function(id, name, price, image) {
    let cart = JSON.parse(localStorage.getItem('mirchiCart') || '[]');
    const existing = cart.find(item => item.id === id);
    
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ id, name, price: parseFloat(price), image, quantity: 1 });
    }
    
    localStorage.setItem('mirchiCart', JSON.stringify(cart));
    updateCartBadge();
    
    // Pulse animation on cart icon
    const cartIcon = document.querySelector('.cart-icon-btn');
    cartIcon.style.transform = 'scale(1.3)';
    cartIcon.style.color = 'var(--primary)';
    setTimeout(() => {
        cartIcon.style.transform = '';
        cartIcon.style.color = '';
    }, 300);
    
    if(window.renderCart) window.renderCart();
}

// 6. Ambient Star Background
function initStars() {
    const canvas = document.createElement('canvas');
    canvas.id = 'starCanvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.zIndex = '-2'; // Behind everything, even background gradients
    canvas.style.pointerEvents = 'none'; // Don't block clicks
    canvas.style.background = 'transparent';
    document.body.prepend(canvas);

    const ctx = canvas.getContext('2d');
    let width, height;
    let stars = [];

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    class Star {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 1.5 + 0.5;
            this.speedX = Math.random() * 0.3 - 0.15;
            this.speedY = Math.random() * 0.3 - 0.15;
            this.opacity = Math.random();
            this.fadeSpeed = Math.random() * 0.02 + 0.005;
            this.fadeDir = Math.random() > 0.5 ? 1 : -1;
            // Mixed colors: some white, some accent yellow, some primary orange
            const rand = Math.random();
            if (rand > 0.8) this.color = '255, 107, 53'; // Primary orange
            else if (rand > 0.6) this.color = '255, 234, 167'; // Accent yellow
            else this.color = '230, 237, 243'; // White text color
        }
        update() {
            this.x += this.speedX;
            this.y -= this.speedY; // Float upwards slightly
            if (this.x < 0) this.x = width;
            if (this.x > width) this.x = 0;
            if (this.y < 0) this.y = height;
            if (this.y > height) this.y = 0;

            this.opacity += this.fadeSpeed * this.fadeDir;
            if (this.opacity <= 0.05) {
                this.opacity = 0.05;
                this.fadeDir = 1;
            }
            if (this.opacity >= 0.8) {
                this.opacity = 0.8;
                this.fadeDir = -1;
            }
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
            ctx.fill();
        }
    }

    // Number of stars based on screen size
    const starCount = Math.floor((width * height) / 8000);
    for (let i = 0; i < starCount; i++) {
        stars.push(new Star());
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        stars.forEach(star => {
            star.update();
            star.draw();
        });
        requestAnimationFrame(animate);
    }
    animate();
}
