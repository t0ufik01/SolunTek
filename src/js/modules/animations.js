import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initAnimations() {
    // ── 0. REDUCED MOTION CHECK ──
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
        document.body.classList.add('reduced-motion');
        // Simple reveal without stagger or complex GSAP
        document
            .querySelectorAll(
                '.reveal-up, .reveal-left, .pillar-card, .stagger-item'
            )
            .forEach((el) => {
                el.style.opacity = '1';
                el.style.transform = 'translate(0, 0)';
            });

        return; // Skip complex GSAP setup
    }

    // ── 1. HERO ENTRANCE (fires once body.loaded is set) ──
    const heroTl = gsap.timeline({ delay: 0.1 });

    // Headline words
    const heroText = document.querySelector('.hero__text');
    if (heroText) {
        heroTl.from('.hero__eyebrow', {
            y: 30,
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out'
        });

        // Word-by-word stagger on headline spans
        const headlineSpans = document.querySelectorAll('.hero__headline span');
        if (headlineSpans.length) {
            heroTl.from(
                headlineSpans,
                {
                    y: 60,
                    opacity: 0,
                    stagger: 0.1,
                    duration: 0.7,
                    ease: 'power3.out'
                },
                '-=0.3'
            );
        }

        heroTl.from(
            '.hero__sub',
            {
                y: 30,
                opacity: 0,
                duration: 0.6,
                ease: 'power2.out'
            },
            '-=0.3'
        );

        heroTl.from(
            '.hero__ctas',
            {
                y: 24,
                opacity: 0,
                duration: 0.6,
                ease: 'power2.out'
            },
            '-=0.2'
        );

        heroTl.from(
            '.hero__scroll-indicator',
            {
                y: 16,
                opacity: 0,
                duration: 0.5,
                ease: 'power2.out'
            },
            '-=0.3'
        );
    }

    const heroVisual = document.querySelector('.hero__visual');
    if (heroVisual) {
        heroTl.from(
            '.hero__visual',
            {
                x: 40,
                opacity: 0,
                duration: 0.8,
                ease: 'power2.out'
            },
            '-=0.6'
        );
    }

    // ── 2. SCROLL REVEALS ──
    // Generic reveal-up
    ScrollTrigger.batch('.reveal-up', {
        onEnter: (els) =>
            gsap.to(els, {
                opacity: 1,
                y: 0,
                stagger: 0.12,
                duration: 0.7,
                ease: 'power2.out'
            }),
        start: 'top 90%',
        once: true
    });

    ScrollTrigger.batch('.reveal-left', {
        onEnter: (els) =>
            gsap.to(els, {
                opacity: 1,
                x: 0,
                stagger: 0.1,
                duration: 0.7,
                ease: 'power2.out'
            }),
        start: 'top 90%',
        once: true
    });

    ScrollTrigger.batch('.reveal-right', {
        onEnter: (els) =>
            gsap.to(els, {
                opacity: 1,
                x: 0,
                stagger: 0.1,
                duration: 0.7,
                ease: 'power2.out'
            }),
        start: 'top 90%',
        once: true
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
                    ease: 'power2.out'
                });
            }
        });
    }

    // ── 4. STATS COUNT-UP — removed (stats block deleted) ──


    // ── 6. HERO PARALLAX (Removed orb logic since HTML elements were removed) ──

    // ── 7. NAVBAR ACTIVE SECTION TRACKING ──
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar__links a[href^="#"]');

    sections.forEach((section) => {
        ScrollTrigger.create({
            trigger: section,
            start: 'top 55%',
            end: 'bottom 55%',
            onEnter: () => setActiveNav(section.id),
            onEnterBack: () => setActiveNav(section.id)
        });
    });

    function setActiveNav(id) {
        navLinks.forEach((a) => {
            a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
        });
    }

    // ── 8. PILLAR CARDS REVEAL ──
    // Initial state is set in CSS (opacity:0, translateY:40px).
    // gsap.to() animates each card to the visible state when it enters viewport.
    ScrollTrigger.batch('.pillar-card', {
        onEnter: (els) =>
            gsap.to(els, {
                opacity: 1,
                y: 0,
                stagger: 0.13,
                duration: 0.65,
                ease: 'power2.out',
                clearProps: 'transform'
            }),
        start: 'top 88%',
        once: true
    });
}
