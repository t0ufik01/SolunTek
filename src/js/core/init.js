import { initAnimations } from '../modules/animations.js';
import { initContactForm } from '../modules/contact.js';
import { initCarousel } from '../modules/carousel.js';
import { initTheme } from './theme.js';
import { initData } from '../modules/data.js';

export function initApp() {
    initTheme();
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

    // Guard: only exit once (load event and failsafe race each other)
    let exited = false;
    function triggerExit() {
        if (exited) return;
        exited = true;
        // Snap bar to 100% before fading out
        if (barFill) barFill.style.width = '100%';
        if (counter) counter.textContent = '100%';
        // Small pause so the user sees 100% before the fade
        setTimeout(() => exitPreloader(preloader), 200);
    }

    // ── Primary exit trigger: page fully loaded ──
    window.addEventListener('load', triggerExit, { once: true });

    // ── Failsafe: force-hide after 4 seconds max ──
    // Prevents the preloader from blocking the user if window.onload hangs
    // (e.g. a slow third-party resource, a stalled network request, etc.)
    const failsafeTimer = setTimeout(triggerExit, 4000);

    // ── Visual progress bar (cosmetic — runs in parallel with real load) ──
    let startTime = null;
    const duration = 1500; // ms — visual sweep, not tied to actual load state

    function easeOutQuart(x) {
        return 1 - Math.pow(1 - x, 4);
    }

    function tick(now) {
        if (!startTime) startTime = now;
        const elapsed = now - startTime;
        let t = Math.min(elapsed / duration, 1);

        const displayPct = Math.min(Math.round(easeOutQuart(t) * 100), 99); // cap at 99%

        if (!exited) {
            // Hold at 99% — triggerExit() snaps to 100% and fades out
            if (barFill) barFill.style.width = displayPct + '%';
            if (counter) counter.textContent = displayPct + '%';
        }

        if (t < 1 && !exited) {
            requestAnimationFrame(tick);
        }
    }

    // Small initial delay so the logo fade-in animation plays first
    setTimeout(() => requestAnimationFrame(tick), 300);

    // Clean up the failsafe if load fires first
    window.addEventListener('load', () => clearTimeout(failsafeTimer), { once: true });
}

function exitPreloader(preloader) {
    preloader.classList.add('exit'); // triggers opacity: 0 transition in CSS

    preloader.addEventListener(
        'transitionend',
        () => {
            preloader.style.display = 'none';
            document.body.classList.remove('is-loading');
            finishLoad();
        },
        { once: true }
    );
}

// ── POST-LOAD INIT ─────────────────────────────
function finishLoad() {
    document.body.classList.add('loaded');

    // Background is handled by pure CSS now.

    // Data injection
    initData();

    // GSAP animations
    initAnimations();

    // Contact form
    initContactForm();

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
        mobileMenu.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('open');
                mobileMenu.classList.remove('open');
                document.body.classList.remove('is-loading');
            });
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
        a.addEventListener('click', (e) => {
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
