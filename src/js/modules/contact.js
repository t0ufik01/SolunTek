export function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const submitBtn = form.querySelector('button[type="submit"]');
    const formSuccess = document.getElementById('formSuccess');
    const formError = document.getElementById('formError');
    const formErrorText = document.getElementById('formErrorText');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

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
            showError('Veuillez remplir tous les champs requis.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            showError('Veuillez entrer une adresse email valide.');
            return;
        }

        if (submitBtn) {
            submitBtn.disabled = true;
            if (btnSpan) {
                btnSpan.textContent = 'Envoi en cours...';
            }
        }

        try {
            const formData = new FormData();
            formData.append('nom', nameInput.value);
            formData.append('entreprise', form.querySelector('input[name="company"]').value || '');
            formData.append('email', emailInput.value);
            formData.append('telephone', form.querySelector('input[name="phone"]').value || '');
            formData.append('message', messageInput.value);

            const response = await fetch('/api/contact.php', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (data.status === 'success') {
                if (formSuccess) {
                    formSuccess.style.display = 'flex';
                    formSuccess.removeAttribute('hidden');
                }
                form.reset();
                if (submitBtn) {
                    submitBtn.style.display = 'none';
                }
            } else {
                showError(data.message || 'Une erreur est survenue, réessayez ou appelez-nous directement.');
            }
        } catch (error) {
            console.error('Contact Form Error:', error);
            showError('Une erreur est survenue, réessayez ou appelez-nous directement.');
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
