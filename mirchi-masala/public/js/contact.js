// Contact Page Logic

document.addEventListener('DOMContentLoaded', () => {
    initContactForm();
    initReservationForm();
    initFAQ();
    
    // Set min date for reservation to today
    const dateInput = document.getElementById('resDate');
    if(dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
    }
});

function initContactForm() {
    const form = document.getElementById('contactForm');
    const status = document.getElementById('contactStatus');
    const btn = document.getElementById('contactSubmitBtn');
    
    if(!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
        btn.disabled = true;
        
        const payload = {
            name: document.getElementById('contactName').value,
            email: document.getElementById('contactEmail').value,
            phone: document.getElementById('contactPhone').value,
            subject: document.getElementById('contactSubject').value,
            message: document.getElementById('contactMessage').value
        };
        
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            
            const data = await response.json();
            
            if(data.success) {
                status.innerHTML = '<span style="color:#25D366;"><i class="fa-solid fa-check"></i> Message sent successfully! We will get back to you soon.</span>';
                form.reset();
            } else {
                throw new Error(data.message || 'Failed to send message');
            }
        } catch (error) {
            console.error('Contact error:', error);
            status.innerHTML = '<span style="color:#ff3333;"><i class="fa-solid fa-triangle-exclamation"></i> Error sending message. Please try again.</span>';
        } finally {
            btn.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane"></i>';
            btn.disabled = false;
        }
    });
}

function initReservationForm() {
    const form = document.getElementById('reservationForm');
    const status = document.getElementById('resStatus');
    const btn = document.getElementById('resSubmitBtn');
    
    if(!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Confirming...';
        btn.disabled = true;
        
        const payload = {
            guest_name: document.getElementById('resName').value,
            guest_phone: document.getElementById('resPhone').value,
            guest_email: 'guest@example.com', // Optional in schema
            date: document.getElementById('resDate').value,
            time: document.getElementById('resTime').value,
            guests_count: document.getElementById('resGuests').value,
            special_requests: document.getElementById('resSpecial').value
        };
        
        try {
            const response = await fetch('/api/reservations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            
            const data = await response.json();
            
            if(data.success) {
                status.innerHTML = `<span style="color:#25D366;"><i class="fa-solid fa-check-circle"></i> Table reserved successfully! Booking ID: #${data.id}</span>`;
                form.reset();
                document.getElementById('resGuests').value = 2;
                document.getElementById('guestCountDisplay').textContent = 2;
                // Reset time to default 8 PM
                document.querySelectorAll('.time-slot').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.time-slot')[5].classList.add('active');
                document.getElementById('resTime').value = '08:00 PM';
            } else {
                throw new Error(data.message || 'Failed to reserve table');
            }
        } catch (error) {
            console.error('Reservation error:', error);
            status.innerHTML = '<span style="color:#ff3333;"><i class="fa-solid fa-triangle-exclamation"></i> Error making reservation. Please call us directly.</span>';
        } finally {
            btn.innerHTML = 'Confirm Reservation';
            btn.disabled = false;
        }
    });
}

// Global functions for reservation form
window.selectTime = function(element, time) {
    document.querySelectorAll('.time-slot').forEach(el => el.classList.remove('active'));
    element.classList.add('active');
    document.getElementById('resTime').value = time;
}

window.updateGuests = function(change) {
    const input = document.getElementById('resGuests');
    const display = document.getElementById('guestCountDisplay');
    let current = parseInt(input.value);
    
    current += change;
    if(current < 1) current = 1;
    if(current > 20) current = 20;
    
    input.value = current;
    display.textContent = current;
}

function initFAQ() {
    const items = document.querySelectorAll('.faq-item');
    
    items.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all others
            items.forEach(i => i.classList.remove('active'));
            
            // Toggle current
            if(!isActive) {
                item.classList.add('active');
            }
        });
    });
}
