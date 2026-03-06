/**
 * EN / FR Language Toggle
 * Default: French ('fr')
 * Persists in localStorage('soluntek-lang')
 */

const STORAGE_KEY = 'soluntek-lang';
let currentLang = 'fr';

export function initLang() {
    currentLang = localStorage.getItem(STORAGE_KEY) || 'fr';
    applyLang(currentLang, false);

    // Bind all lang toggle buttons (navbar desktop + navbar mobile)
    document.querySelectorAll('.lang-toggle__btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            if (lang !== currentLang) {
                applyLang(lang, true);
                localStorage.setItem(STORAGE_KEY, lang);
            }
        });
    });
}

function applyLang(lang, animate) {
    currentLang = lang;

    // Update html attrs
    document.documentElement.setAttribute('data-lang', lang);
    document.documentElement.setAttribute('lang', lang);

    // Update all translatable elements
    const els = document.querySelectorAll('[data-fr]');

    if (animate) {
        // Fade out all
        els.forEach(el => {
            el.style.transition = 'opacity 0.15s ease';
            el.style.opacity = '0';
        });

        setTimeout(() => {
            updateTextNodes(els, lang);
            els.forEach(el => { el.style.opacity = '1'; });
        }, 150);
    } else {
        updateTextNodes(els, lang);
    }

    // Update active buttons
    document.querySelectorAll('.lang-toggle__btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
}

function updateTextNodes(els, lang) {
    els.forEach(el => {
        const text = el.getAttribute(`data-${lang}`);
        if (text === null) return;
        // Only update if no significant child elements
        if (el.children.length === 0) {
            el.textContent = text;
        }
    });
}

export function getLang() {
    return currentLang;
}