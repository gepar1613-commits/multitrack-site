/* ─────────────────────────────────────────
   Multitrack de Excelência — script.js
   Interactivity: scroll reveals, FAQ, countdown
───────────────────────────────────────── */

// ── SCROLL REVEAL ──────────────────────────
const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                // Stagger children if the parent has a grid/flex of child items
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                revealObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal, .reveal-right').forEach((el, i) => {
    // Check if it's a grid parent — stagger its children too
    const gridChildren = el.querySelectorAll(
        '.pain-card, .learn-card, .bonus-card, .testimonial-card, .faq-item'
    );
    if (gridChildren.length > 0) {
        gridChildren.forEach((child, idx) => {
            child.style.transitionDelay = `${idx * 0.1}s`;
        });
    }
    revealObserver.observe(el);
});

// ── NAVBAR SCROLL EFFECT ──────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(2, 8, 16, 0.97)';
        navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.3)';
    } else {
        navbar.style.background = 'rgba(2, 8, 16, 0.85)';
        navbar.style.boxShadow = 'none';
    }
}, { passive: true });

// ── FAQ ACCORDION ─────────────────────────
function toggleFaq(id) {
    const item = document.getElementById(id);
    if (!item) return;

    const answer = item.querySelector('.faq-answer');
    const isOpen = item.classList.contains('active');

    // Close all
    document.querySelectorAll('.faq-item').forEach(el => {
        el.classList.remove('active');
        const ans = el.querySelector('.faq-answer');
        if (ans) ans.classList.remove('open');
    });

    // Open clicked (if it was closed)
    if (!isOpen) {
        item.classList.add('active');
        answer.classList.add('open');
    }
}

// ── COUNTDOWN TIMER ───────────────────────
(function initCountdown() {
    // Sempre começa em 24 horas a cada visita
    const DURATION_MINS = 24 * 60;
    const endTime = Date.now() + DURATION_MINS * 60 * 1000;

    const hoursEl = document.getElementById('c-hours');
    const minsEl = document.getElementById('c-mins');
    const secsEl = document.getElementById('c-secs');

    function pad(n) { return String(n).padStart(2, '0'); }

    function tick() {
        const remaining = Math.max(0, endTime - Date.now());

        const totalSecs = Math.floor(remaining / 1000);
        const hrs = Math.floor(totalSecs / 3600);
        const mins = Math.floor((totalSecs % 3600) / 60);
        const secs = totalSecs % 60;

        if (hoursEl) hoursEl.textContent = pad(hrs);
        if (minsEl) minsEl.textContent = pad(mins);
        if (secsEl) secsEl.textContent = pad(secs);

        if (remaining > 0) {
            setTimeout(tick, 1000);
        }
    }

    tick();
})();

// ── SMOOTH SCROLL FOR ANCHOR LINKS ────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        const targetId = anchor.getAttribute('href').slice(1);
        if (!targetId) return;
        const target = document.getElementById(targetId);
        if (target) {
            e.preventDefault();
            const offset = 80; // navbar height
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// ── HERO immediate reveal ─────────────────
// Hero content should appear right away without waiting for scroll
window.addEventListener('load', () => {
    document.querySelectorAll('.hero .reveal, .hero .reveal-right').forEach(el => {
        setTimeout(() => el.classList.add('visible'), 100);
    });
});
