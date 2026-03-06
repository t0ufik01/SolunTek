/**
 * Theme: dark / light toggle
 * Apply BEFORE DOMContentLoaded to avoid flash of wrong theme
 */

// Inline theme application (called immediately in app.js top-level)
(function applyThemeEarly() {
    const saved = localStorage.getItem('soluntek-theme') || 'light';
    document.documentElement.setAttribute('data-theme', saved);
})();

export function initTheme() {
    const btn = document.getElementById('themeToggle');
    const mobileBtns = document.querySelectorAll('.navbar__mobile-theme');

    function toggle() {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('soluntek-theme', next);
    }

    if (btn) btn.addEventListener('click', toggle);
    mobileBtns.forEach(b => b.addEventListener('click', toggle));
}