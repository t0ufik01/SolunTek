/**
 * Contact form handler
 * Success message hidden by default, shown only after successful submit
 */
export function initContact() {
    const form = document.getElementById('contactForm');
    const successEl = document.getElementById('formSuccess');

    // Ensure success hidden on init
    if (successEl) {
        successEl.hidden = true;
        successEl.style.display = 'none';
        successEl.style.opacity = '0'; // default pre-animation state
    }

    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const btn = form.querySelector('button[type="submit"]');
        if (!btn) return;

        // Validate
        const name = form.querySelector('#cf-name')?.value.trim();
        const email = form.querySelector('#cf-email')?.value.trim();
        const message = form.querySelector('#cf-message')?.value.trim();

        if (!name || !email || !message) {
            shakeForm(form);
            return;
        }

        if (!isValidEmail(email)) {
            shakeForm(form);
            return;
        }

        // Loading state
        const originalHTML = btn.innerHTML;
        btn.disabled = true;
        btn.innerHTML = `<span data-fr="Envoi en cours..." data-en="Sending...">Envoi en cours...</span>`;
        btn.style.opacity = '0.7';

        // Simulate send (replace with real fetch when backend is ready)
        await delay(1200);

        // Hide form fields
        form.querySelectorAll('.form-row, .form-field--full').forEach(el => {
            el.style.transition = 'opacity 0.3s ease';
            el.style.opacity = '0';
            el.style.pointerEvents = 'none';
        });
        btn.style.display = 'none';

        // Show success
        if (successEl) {
            successEl.hidden = false;
            successEl.style.display = 'flex';
            successEl.style.opacity = '0';
            successEl.style.transform = 'translateY(10px)';

            setTimeout(() => {
                successEl.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                successEl.style.opacity = '1';
                successEl.style.transform = 'none';
            }, 50);
        }
    });
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function shakeForm(form) {
    form.classList.remove('shake');
    void form.offsetWidth; // reflow
    form.classList.add('shake');
    setTimeout(() => form.classList.remove('shake'), 500);
}

function delay(ms) {
    return new Promise(res => setTimeout(res, ms));
}
