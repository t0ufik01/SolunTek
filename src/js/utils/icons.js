/**
 * Service icons — inline SVG strings keyed by service icon name.
 * Source: extracted from hand-crafted static HTML cards in index.html.
 * All use stroke="#4ABAFF" (--color-accent), stroke-width="1.5", viewBox="0 0 48 48".
 */
export const ICONS = {
    // Réseau & Câblage — network/nodes topology
    globe: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-svg" aria-hidden="true">
        <circle cx="24" cy="12" r="4" stroke="#4ABAFF" stroke-width="1.5"/>
        <circle cx="8" cy="36" r="4" stroke="#4ABAFF" stroke-width="1.5"/>
        <circle cx="40" cy="36" r="4" stroke="#4ABAFF" stroke-width="1.5"/>
        <circle cx="24" cy="36" r="4" stroke="#4ABAFF" stroke-width="1.5"/>
        <line x1="24" y1="16" x2="8" y2="32" stroke="#4ABAFF" stroke-width="1.5"/>
        <line x1="24" y1="16" x2="24" y2="32" stroke="#4ABAFF" stroke-width="1.5"/>
        <line x1="24" y1="16" x2="40" y2="32" stroke="#4ABAFF" stroke-width="1.5"/>
    </svg>`,

    // Vidéosurveillance CCTV — camera body with lens
    camera: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-svg" aria-hidden="true">
        <rect x="4" y="16" width="28" height="16" rx="3" stroke="#4ABAFF" stroke-width="1.5"/>
        <path d="M32 20L44 14V34L32 28" stroke="#4ABAFF" stroke-width="1.5"/>
        <circle cx="18" cy="24" r="4" stroke="#4ABAFF" stroke-width="1.5"/>
        <circle cx="18" cy="24" r="1.5" fill="#4ABAFF"/>
    </svg>`,

    // Contrôle d'Accès — padlock with keyhole
    lock: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-svg" aria-hidden="true">
        <rect x="10" y="22" width="28" height="22" rx="3" stroke="#4ABAFF" stroke-width="1.5"/>
        <path d="M16 22V16C16 10 32 10 32 16V22" stroke="#4ABAFF" stroke-width="1.5"/>
        <circle cx="24" cy="33" r="3" fill="#4ABAFF"/>
        <line x1="24" y1="36" x2="24" y2="40" stroke="#4ABAFF" stroke-width="1.5" stroke-linecap="round"/>
    </svg>`,

    // Systèmes d'Alarme — shield with checkmark
    bell: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-svg" aria-hidden="true">
        <path d="M24 4L8 12V28C8 36 16 42 24 44C32 42 40 36 40 28V12L24 4Z" stroke="#4ABAFF" stroke-width="1.5"/>
        <path d="M18 24L22 28L30 20" stroke="#4ABAFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,

    // Matériel Informatique — rack servers / desktop hardware
    desktop: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-svg" aria-hidden="true">
        <rect x="6" y="10" width="36" height="10" rx="2" stroke="#4ABAFF" stroke-width="1.5"/>
        <rect x="6" y="24" width="36" height="10" rx="2" stroke="#4ABAFF" stroke-width="1.5"/>
        <circle cx="36" cy="15" r="2" fill="#4ABAFF"/>
        <circle cx="36" cy="29" r="2" fill="#4ABAFF"/>
        <circle cx="30" cy="15" r="2" fill="rgba(74,186,255,0.4)"/>
        <circle cx="30" cy="29" r="2" fill="rgba(74,186,255,0.4)"/>
    </svg>`
};
