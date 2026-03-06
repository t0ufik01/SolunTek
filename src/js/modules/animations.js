import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initAnimations() {

    // ── 1. HERO ENTRANCE (fires once body.loaded is set) ──
    const heroTl = gsap.timeline({ delay: 0.1 });

    // Headline words
    const heroText = document.querySelector('.hero__text');
    if (heroText) {
        heroTl.from('.hero__eyebrow', {
            y: 30, opacity: 0, duration: 0.6, ease: 'power2.out',
        });

        // Word-by-word stagger on headline spans
        const headlineSpans = document.querySelectorAll('.hero__headline span');
        if (headlineSpans.length) {
            heroTl.from(headlineSpans, {
                y: 60, opacity: 0, stagger: 0.1, duration: 0.7, ease: 'power3.out',
            }, '-=0.3');
        }

        heroTl.from('.hero__sub', {
            y: 30, opacity: 0, duration: 0.6, ease: 'power2.out',
        }, '-=0.3');

        heroTl.from('.hero__ctas', {
            y: 24, opacity: 0, duration: 0.6, ease: 'power2.out',
        }, '-=0.2');

        heroTl.from('.hero__scroll-indicator', {
            y: 16, opacity: 0, duration: 0.5, ease: 'power2.out',
        }, '-=0.3');
    }

    const heroVisual = document.querySelector('.hero__visual');
    if (heroVisual) {
        heroTl.from('.hero__visual', {
            x: 40, opacity: 0, duration: 0.8, ease: 'power2.out',
        }, '-=0.6');
    }

    // ── 2. SCROLL REVEALS ──
    // Generic reveal-up
    ScrollTrigger.batch('.reveal-up', {
        onEnter: els => gsap.to(els, {
            opacity: 1, y: 0, stagger: 0.12, duration: 0.7, ease: 'power2.out',
        }),
        start: 'top 90%',
        once: true,
    });

    ScrollTrigger.batch('.reveal-left', {
        onEnter: els => gsap.to(els, {
            opacity: 1, x: 0, stagger: 0.1, duration: 0.7, ease: 'power2.out',
        }),
        start: 'top 90%',
        once: true,
    });

    ScrollTrigger.batch('.reveal-right', {
        onEnter: els => gsap.to(els, {
            opacity: 1, x: 0, stagger: 0.1, duration: 0.7, ease: 'power2.out',
        }),
        start: 'top 90%',
        once: true,
    });

    // ── 3. SERVICE CARDS STAGGER ──
    const servicesGrid = document.querySelector('.services__grid');
    if (servicesGrid) {
        ScrollTrigger.create({
            trigger: servicesGrid,
            start: 'top 80%',
            once: true,
            onEnter: () => {
                gsap.to('.stagger-item', {
                    opacity: 1,
                    y: 0,
                    stagger: 0.08,
                    duration: 0.6,
                    ease: 'power2.out',
                });
            },
        });
    }

    // ── 4. STATS COUNT-UP ──
    const statNums = document.querySelectorAll('.stat-card__num[data-count]');
    if (statNums.length) {
        ScrollTrigger.create({
            trigger: '.about__stats',
            start: 'top 80%',
            once: true,
            onEnter: () => {
                statNums.forEach(el => {
                    const target = parseInt(el.getAttribute('data-count'), 10);
                    const suffix = el.getAttribute('data-suffix') || '';
                    gsap.to({ val: 0 }, {
                        val: target,
                        duration: 1.8,
                        ease: 'power2.out',
                        snap: { val: 1 },
                        onUpdate() {
                            el.textContent = Math.round(this.targets()[0].val) + suffix;
                        },
                    });
                });
            },
        });
    }

    // ── 5. WHY TIMELINE PROGRESS ──
    const connectors = document.querySelectorAll('.timeline-connector');
    const nodes = document.querySelectorAll('.timeline-node');

    if (connectors.length) {
        ScrollTrigger.create({
            trigger: '.why__timeline',
            start: 'top 80%',
            once: true,
            onEnter: () => {
                connectors.forEach((conn, i) => {
                    setTimeout(() => {
                        conn.classList.add('filled');
                        if (nodes[i + 1]) nodes[i + 1].classList.add('active', 'passed');
                    }, i * 400);
                });
                if (nodes[0]) nodes[0].classList.add('active', 'passed');
            },
        });
    }

    // ── 6. HERO PARALLAX (Removed orb logic since HTML elements were removed) ──

    // ── 7. NAVBAR ACTIVE SECTION TRACKING ──
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar__links a[href^="#"]');

    sections.forEach(section => {
        ScrollTrigger.create({
            trigger: section,
            start: 'top 55%',
            end: 'bottom 55%',
            onEnter: () => setActiveNav(section.id),
            onEnterBack: () => setActiveNav(section.id),
        });
    });

    function setActiveNav(id) {
        navLinks.forEach(a => {
            a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
        });
    }

    // ── 8. PILLAR CARDS REVEAL ──
    ScrollTrigger.batch('.pillar-card', {
        onEnter: els => gsap.from(els, {
            opacity: 0, y: 40, stagger: 0.1, duration: 0.65, ease: 'power2.out',
        }),
        start: 'top 85%',
        once: true,
    });
}