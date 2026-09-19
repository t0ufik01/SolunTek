import '../css/base/variables.css';
import '../css/base/reset.css';
import '../css/base/global.css';
import '../css/pages/coming-soon.css';

// Apply saved theme immediately
const savedTheme = localStorage.getItem('soluntek-theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);

document.addEventListener('DOMContentLoaded', () => {
    initStarfield();
});

function initStarfield() {
    const canvas = document.getElementById('cs-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let W = window.innerWidth;
    let H = window.innerHeight;

    canvas.width = W;
    canvas.height = H;

    window.addEventListener(
        'resize',
        () => {
            W = canvas.width = window.innerWidth;
            H = canvas.height = window.innerHeight;
        },
        { passive: true }
    );

    const STAR_COUNT = 70;
    const stars = Array.from({ length: STAR_COUNT }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        r: 0.5 + Math.random() * 1.2,
        dx: (Math.random() - 0.5) * 0.15,
        dy: (Math.random() - 0.5) * 0.15,
        op: 0.2 + Math.random() * 0.5
    }));

    let animId;
    function drawStarfield() {
        ctx.clearRect(0, 0, W, H);
        stars.forEach((s) => {
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(74, 186, 255, ${s.op})`;
            ctx.fill();
            s.x += s.dx;
            s.y += s.dy;
            if (s.x < 0) s.x = W;
            if (s.x > W) s.x = 0;
            if (s.y < 0) s.y = H;
            if (s.y > H) s.y = 0;
        });
        animId = requestAnimationFrame(drawStarfield);
    }

    drawStarfield();
}
