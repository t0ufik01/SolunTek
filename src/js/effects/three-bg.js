let scene, camera, renderer;

export function init(canvasEl) {
    if (!canvasEl) return;

    // Use IntersectionObserver to lazy load three.js
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(async (entry) => {
                if (entry.isIntersecting) {
                    observer.unobserve(canvasEl);
                    try {
                        const THREE = await import('three');
                        setupScene(THREE, canvasEl);
                    } catch (err) {
                        console.error('Failed to load three.js', err);
                    }
                }
            });
        },
        { threshold: 0.1 }
    );

    observer.observe(canvasEl);
}

function setupScene(THREE, canvasEl) {
    // Basic setup placeholder since original was removed
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ canvas: canvasEl, alpha: true, antialias: false });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // limit pixel ratio for performance

    // TODO: Add any specific 3D objects here if required
}

export function destroy() {
    if (renderer) {
        renderer.dispose();
    }
}
