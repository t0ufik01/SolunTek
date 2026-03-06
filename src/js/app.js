// !! IMPORTANT: Apply theme BEFORE anything else to avoid flash-of-wrong-theme !!
// This runs at module evaluation time, before DOM is parsed
import '../css/base/variables.css';
import '../css/base/reset.css';
import '../css/base/global.css';
import '../css/components/loader.css';
import '../css/components/navbar.css';
import '../css/components/footer.css';
import '../css/components/modal.css';
import '../css/pages/style.css';

// Apply saved theme immediately (before any frame is painted)
const _savedTheme = localStorage.getItem('soluntek-theme') || 'light';
document.documentElement.setAttribute('data-theme', _savedTheme);

// Apply saved language immediately
const _savedLang = localStorage.getItem('soluntek-lang') || 'fr';
document.documentElement.setAttribute('data-lang', _savedLang);
document.documentElement.setAttribute('lang', _savedLang);

import { initApp } from './core/main.js';

document.addEventListener('DOMContentLoaded', () => {
    initApp();
});