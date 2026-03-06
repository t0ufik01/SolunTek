/**
 * SVG Loader Utility
 * Dynamically injects external SVGs inline for CSS styling
 */
export async function loadSVG(url, container) {
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Failed to load ${url}`);
        const text = await res.text();
        container.innerHTML = text;
        return container.querySelector('svg');
    } catch (err) {
        console.warn('[SVG Loader]', err.message);
        return null;
    }
}

export function loadAllSVGs() {
    const targets = document.querySelectorAll('[data-svg-src]');
    targets.forEach(async (el) => {
        const src = el.getAttribute('data-svg-src');
        if (src) await loadSVG(src, el);
    });
}
