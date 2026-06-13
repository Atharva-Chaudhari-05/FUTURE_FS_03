// FIX 1: Navbar JS
const navbar = document.getElementById('navbar');
if(navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if(hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close menu on link click
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });
}

// Active link detection
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link').forEach(link => {
  if (link.getAttribute('href') === currentPage) {
    link.classList.add('active');
  }
});


// FIX 4: SCROLL ANIMATIONS NOT WORKING
document.addEventListener('DOMContentLoaded', () => {
  // Add animate classes to elements
  const animateElements = [
    { selector: '.section-title', class: 'animate-up' },
    { selector: '.dish-card', class: 'animate-up' },
    { selector: '.category-card', class: 'animate-up' },
    { selector: '.feature-box', class: 'animate-up' },
    { selector: '.team-card', class: 'animate-up' },
    { selector: '.timeline-item', class: 'animate-left' },
    { selector: '.contact-card', class: 'animate-up' },
    { selector: '.gallery-item', class: 'animate-fade' },
  ];

  animateElements.forEach(({ selector, class: cls }) => {
    document.querySelectorAll(selector).forEach(
      (el, i) => {
        el.classList.add('scroll-hidden');
        el.style.transitionDelay = `${(i % 10) * 0.1}s`;
        el.setAttribute('data-animate', cls);
      }
    );
  });

  // Observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const animClass = entry.target.getAttribute('data-animate');
          entry.target.classList.remove('scroll-hidden');
          entry.target.classList.add(animClass);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  document.querySelectorAll('.scroll-hidden').forEach(el => observer.observe(el));
});

// FIX 5: IMAGES NOT LOADING
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('error', function() {
    this.src = 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80';
    this.alt = 'Spice Garden Dhaba Food';
  });
  
  // Add lazy loading
  img.setAttribute('loading', 'lazy');
});

// FIX 9: TOAST NOTIFICATION SYSTEM
window.showToast = function(message, type = 'info') {
  const container = document.getElementById('toastContainer') || createToastContainer();
  
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  const icons = {
    success: '✅',
    error: '❌',
    info: 'ℹ️',
    warning: '⚠️'
  };
  
  toast.innerHTML = `
    <span class="toast-icon">${icons[type]}</span>
    <span class="toast-message">${message}</span>
    <button class="toast-close" onclick="this.parentElement.remove()">✕</button>
  `;
  
  container.appendChild(toast);
  
  setTimeout(() => {
    toast.classList.add('toast-hide');
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

function createToastContainer() {
  const div = document.createElement('div');
  div.id = 'toastContainer';
  div.className = 'toast-container';
  document.body.appendChild(div);
  return div;
}

// FIX 10: Page loader
window.addEventListener('load', () => {
  const loader = document.getElementById('pageLoader');
  if (loader) {
    setTimeout(() => {
      loader.style.opacity = '0';
      setTimeout(() => loader.remove(), 500);
    }, 1500);
  }
});
