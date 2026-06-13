document.addEventListener('DOMContentLoaded', () => {
    initCharCounter();
    initDateAndTimePickers();
    initReservationForm();
});

// Character Counter
function initCharCounter() {
    const msgInput = document.getElementById('contactMessage');
    const countSpan = document.getElementById('charCount');
    if(!msgInput) return;

    msgInput.addEventListener('input', () => {
        const len = msgInput.value.length;
        countSpan.innerText = `${len}/500`;
        if(len < 20) countSpan.style.color = 'red';
        else countSpan.style.color = 'var(--gray)';
    });
}

// Date and Time Setup
function initDateAndTimePickers() {
    const dateInput = document.getElementById('resDate');
    const timeSelect = document.getElementById('resTime');
    if(!dateInput || !timeSelect) return;

    // Set min date to today
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
    dateInput.value = today;

    // Generate time slots (7 AM to 10 PM, 30 min intervals)
    for(let h = 7; h <= 22; h++) {
        for(let m = 0; m < 60; m += 30) {
            if(h === 22 && m === 30) continue; // last slot 10:00 PM
            const ampm = h >= 12 ? 'PM' : 'AM';
            const displayH = h > 12 ? h - 12 : (h === 0 ? 12 : h);
            const displayM = m === 0 ? '00' : '30';
            
            const timeString = `${displayH}:${displayM} ${ampm}`;
            const valueString = `${h < 10 ? '0'+h : h}:${displayM}:00`;
            
            const option = document.createElement('option');
            option.value = valueString;
            option.innerText = timeString;
            timeSelect.appendChild(option);
        }
    }
}

// Stepper
window.updateGuests = function(change) {
    const input = document.getElementById('resGuests');
    let val = parseInt(input.value);
    val += change;
    if(val < 1) val = 1;
    if(val > 20) val = 20;
    input.value = val;
};

// FIX 8: FORMS NOT SUBMITTING
// Contact form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    const formData = {
      name: document.getElementById('contactName').value,
      email: document.getElementById('contactEmail').value,
      phone: document.getElementById('contactPhone').value,
      subject: document.getElementById('contactSubject').value,
      message: document.getElementById('contactMessage').value
    };
    
    // Validation
    if (!formData.name || !formData.email || !formData.message) {
      if(window.showToast) window.showToast('Please fill all required fields', 'error');
      submitBtn.textContent = 'Send Message';
      submitBtn.disabled = false;
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      if(window.showToast) window.showToast('Please enter valid email', 'error');
      submitBtn.textContent = 'Send Message';
      submitBtn.disabled = false;
      return;
    }
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(formData)
      });
      
      const result = await response.json();
      
      if (result.success) {
        if(window.showToast) window.showToast('✅ Message sent! We will reply soon.', 'success');
        contactForm.reset();
        document.getElementById('charCount').innerText = '0/500';
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      if(window.showToast) window.showToast('❌ Failed to send. Please try again.', 'error');
    } finally {
      submitBtn.textContent = 'Send Message';
      submitBtn.disabled = false;
    }
  });
}

// Reservation Form Submit
function initReservationForm() {
    const form = document.getElementById('reservationForm');
    if(!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const btn = document.getElementById('resSubmitBtn');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Booking...';
        btn.disabled = true;

        const payload = {
            guest_name: document.getElementById('resName').value,
            guest_phone: document.getElementById('resPhone').value,
            guest_email: document.getElementById('resEmail').value,
            date: document.getElementById('resDate').value,
            time: document.getElementById('resTime').value,
            guests_count: parseInt(document.getElementById('resGuests').value),
            special_requests: document.getElementById('resRequests').value
        };

        try {
            const res = await fetch('/api/reservations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const data = await res.json();
            
            if(data.success) {
                if(window.showToast) window.showToast('Table booked successfully! ✅', 'success');
                form.reset();
                initDateAndTimePickers(); // reset date
            } else {
                if(window.showToast) window.showToast('Error: ' + data.message, 'error');
            }
        } catch(err) {
            console.error('Reservation error:', err);
            if(window.showToast) window.showToast('Something went wrong. Please try again. ❌', 'error');
        } finally {
            btn.innerHTML = originalText;
            btn.disabled = false;
        }
    });
}
