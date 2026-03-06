import { initAnimations } from '../modules/animations.js';
import { initLang } from '../modules/lang.js';
import { initContact } from '../modules/contact.js';
import { initCarousel } from '../modules/carousel.js';
import { initTheme } from './theme.js';

export function initApp() {
    initTheme();
    initLang();
    runPreloader();
}

// ── PRELOADER ──────────────────────────────────
function runPreloader() {
    const preloader = document.getElementById('preloader');
    const barFill = document.getElementById('preloaderBarFill');
    const counter = document.getElementById('preloaderCounter');

    if (!preloader) {
        finishLoad();
        return;
    }

    document.body.classList.add('is-loading');

    let progress = 0;
    const duration = 1500; // ms
    let startTime = null;

    function easeOutQuart(x) {
        return 1 - Math.pow(1 - x, 4);
    }

    function tick(now) {
        if (!startTime) startTime = now;
        const elapsed = now - startTime;
        let t = Math.min(elapsed / duration, 1);

        progress = easeOutQuart(t) * 100;

        const displayPct = Math.min(Math.round(progress), 100);

        if (barFill) barFill.style.width = displayPct + '%';
        if (counter) counter.textContent = displayPct + '%';

        if (t === 1) {
            setTimeout(() => exitPreloader(preloader), 150); // tiny pause at 100%
            return;
        }

        requestAnimationFrame(tick);
    }

    // Small initial delay so the logo animation plays first
    setTimeout(() => requestAnimationFrame(tick), 300);
}

function exitPreloader(preloader) {
    preloader.classList.add('exit');

    preloader.addEventListener('animationend', () => {
        preloader.style.display = 'none';
        document.body.classList.remove('is-loading');
        finishLoad();
    }, { once: true });
}

// ── POST-LOAD INIT ─────────────────────────────
function finishLoad() {
    document.body.classList.add('loaded');

    // Background is handled by pure CSS now.

    // GSAP animations
    initAnimations();

    // Contact form
    initContact();

    // Partners marquee
    initCarousel();

    // Navbar behaviour
    initNavbar();

    // WhatsApp float
    setTimeout(() => {
        const wa = document.getElementById('whatsappFloat');
        if (wa) wa.classList.add('visible');
    }, 800);
}

// ── NAVBAR ────────────────────────────────────
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');

    if (!navbar) return;

    // Scroll state
    const onScroll = () => {
        navbar.classList.toggle('scrolled', window.scrollY > 80);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Hamburger / mobile menu
    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            const isOpen = hamburger.classList.toggle('open');
            mobileMenu.classList.toggle('open', isOpen);
            document.body.classList.toggle('is-loading', isOpen);
        });

        // Close on link click
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('open');
                mobileMenu.classList.remove('open');
                document.body.classList.remove('is-loading');
            });
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const id = a.getAttribute('href');
            if (id === '#') return;
            const target = document.querySelector(id);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}