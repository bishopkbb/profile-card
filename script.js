// ============================================
// TIMESTAMP UPDATE (Home Page)
// ============================================
function updateTime() {
    const timeEl = document.getElementById('currentTime');
    if (timeEl) {
        timeEl.textContent = Date.now();
    }
}

// Initialize timestamp if on home page
if (document.getElementById('currentTime')) {
    updateTime();
    setInterval(updateTime, 1000);
}

// ============================================
// MOBILE NAVIGATION TOGGLE
// ============================================
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        
        navToggle.setAttribute('aria-expanded', !isExpanded);
        navLinks.classList.toggle('active');
        
        // Animate hamburger icon
        navToggle.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.classList.remove('active');
        }
    });
}

// ============================================
// KEYBOARD ACCESSIBILITY ENHANCEMENTS
// ============================================
// Add visible focus states for keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});