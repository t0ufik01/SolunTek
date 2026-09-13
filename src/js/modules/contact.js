import emailjs from '@emailjs/browser';

export function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    // Initialize EmailJS globally
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

    const submitBtn = form.querySelector('button[type="submit"]');
    const formSuccess = document.getElementById('formSuccess');
    const formError = document.getElementById('formError');
    const formErrorText = document.getElementById('formErrorText');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const lang = document.documentElement.getAttribute('data-lang') || 'fr';
        const btnSpan = submitBtn ? submitBtn.querySelector('span') : null;
        const originalBtnText = btnSpan ? btnSpan.textContent : '';

        if (formError) {
            formError.style.display = 'none';
            formError.setAttribute('hidden', '');
        }

        // 1. Honeypot check
        const honeypot = form.querySelector('input[name="website"]');
        if (honeypot && honeypot.value) {
            console.warn('Bot detected');
            return; // silently fail
        }

        // 2. Client-side Validation
        const emailInput = form.querySelector('input[name="email"]');
        const nameInput = form.querySelector('input[name="name"]');
        const messageInput = form.querySelector('textarea[name="message"]');

        if (!emailInput.value || !nameInput.value || !messageInput.value) {
            showError(
                lang === 'en'
                    ? 'Please fill in all required fields.'
                    : 'Veuillez remplir tous les champs requis.'
            );
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            showError(
                lang === 'en'
                    ? 'Please enter a valid email address.'
                    : 'Veuillez entrer une adresse email valide.'
            );
            return;
        }

        if (submitBtn) {
            submitBtn.disabled = true;
            if (btnSpan) {
                btnSpan.textContent = lang === 'en' ? 'Sending...' : 'Envoi en cours...';
            }
        }

        try {
            const templateParams = {
                name: nameInput.value,
                email: emailInput.value,
                company: form.querySelector('input[name="company"]').value,
                phone: form.querySelector('input[name="phone"]').value,
                message: messageInput.value
            };

            await emailjs.send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                templateParams
            );

            if (formSuccess) {
                formSuccess.style.display = 'flex';
                formSuccess.removeAttribute('hidden');
            }
            form.reset();
            if (submitBtn) {
                submitBtn.style.display = 'none';
            }
        } catch (error) {
            console.error('Contact Form Error:', error);
            showError(
                lang === 'en'
                    ? 'An error occurred, please try again or call us directly.'
                    : 'Une erreur est survenue, réessayez ou appelez-nous directement.'
            );
        } finally {
            if (submitBtn && submitBtn.style.display !== 'none') {
                submitBtn.disabled = false;
                if (btnSpan) {
                    btnSpan.textContent = originalBtnText;
                }
            }
        }
    });

    function showError(message) {
        if (formErrorText) {
            formErrorText.textContent = message;
        }
        if (formError) {
            formError.style.display = 'flex';
            formError.removeAttribute('hidden');
        }
    }
}
