// ===== THEME TOGGLE =====
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');

// Check saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    themeIcon.className = 'fas fa-moon';
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    themeIcon.className = isLight ? 'fas fa-moon' : 'fas fa-sun';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

// ===== PRELOADER =====
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('hidden');
    }, 1500);
});

// ===== PARTICLES =====
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.width = Math.random() * 4 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.animationDuration = Math.random() * 10 + 8 + 's';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.opacity = Math.random() * 0.3 + 0.1;

        // Randomize colors between primary and secondary
        const colors = ['rgba(0, 212, 255, 0.5)', 'rgba(124, 58, 237, 0.5)', 'rgba(6, 182, 212, 0.5)'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];

        particlesContainer.appendChild(particle);
    }
}

createParticles();

// ===== NAVBAR =====
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Back to top button visibility
    const backToTop = document.getElementById('backToTop');
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }

    // Active nav link based on scroll position
    updateActiveNavLink();
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu on link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Update active nav link
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollPos >= top && scrollPos < top + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ===== BACK TO TOP =====
document.getElementById('backToTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== ANIMATED COUNTERS =====
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');

    counters.forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-target'));
        const decimals = parseInt(counter.getAttribute('data-decimals')) || 0;
        const duration = 2000;
        const startTime = performance.now();

        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = easeOut * target;

            if (decimals > 0) {
                counter.textContent = current.toFixed(decimals);
            } else {
                counter.textContent = Math.floor(current).toLocaleString();
            }

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                if (decimals > 0) {
                    counter.textContent = target.toFixed(decimals);
                } else {
                    counter.textContent = target.toLocaleString();
                }
            }
        }

        requestAnimationFrame(updateCounter);
    });
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    // Add animation classes to elements
    const animateElements = [
        { selector: '.service-card', class: '' },
        { selector: '.gallery-item', class: 'animate-scale' },
        { selector: '.why-card', class: '' },
        { selector: '.contact-card', class: '' },
        { selector: '.social-card', class: 'animate-scale' },
        { selector: '.stat-card', class: '' },
        { selector: '.about-text', class: 'animate-left' },
        { selector: '.about-stats', class: 'animate-right' },
        { selector: '.map-container', class: '' },
        { selector: '.section-header', class: '' }
    ];

    animateElements.forEach(item => {
        document.querySelectorAll(item.selector).forEach((el, index) => {
            el.classList.add('animate-on-scroll');
            if (item.class) el.classList.add(item.class);
            el.style.transitionDelay = `${index * 0.1}s`;
        });
    });

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');

                // Trigger counters when about section is visible
                if (entry.target.closest('#about') && entry.target.classList.contains('animate-on-scroll')) {
                    const statsSection = document.querySelector('.about-stats');
                    if (statsSection && !statsSection.dataset.counted) {
                        statsSection.dataset.counted = 'true';
                        animateCounters();
                    }
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ===== PARALLAX EFFECT ON MOUSE MOVE =====
const hero = document.querySelector('.hero');
const phone3d = document.querySelector('.phone-3d');

if (hero && phone3d) {
    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        phone3d.style.transform = `
            translateY(${Math.sin(Date.now() / 1000) * 15}px)
            rotateY(${x * 15}deg)
            rotateX(${-y * 10}deg)
        `;
    });

    hero.addEventListener('mouseleave', () => {
        phone3d.style.transform = '';
    });
}

// ===== TILT EFFECT ON SERVICE CARDS =====
function initTiltEffect() {
    const cards = document.querySelectorAll('.service-card, .why-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            card.style.transform = `
                perspective(1000px)
                translateY(-5px)
                rotateX(${-y * 5}deg)
                rotateY(${x * 5}deg)
            `;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// ===== MAGNETIC EFFECT ON BUTTONS =====
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            button.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = '';
        });
    });
}

// ===== TYPING EFFECT FOR PHONE CONTENT =====
function initTypingEffect() {
    const phoneContent = document.querySelector('.phone-content span');
    if (!phoneContent) return;

    const text = phoneContent.textContent;
    phoneContent.textContent = '';
    let index = 0;

    function type() {
        if (index < text.length) {
            phoneContent.textContent += text.charAt(index);
            index++;
            setTimeout(type, 100);
        } else {
            setTimeout(() => {
                phoneContent.textContent = '';
                index = 0;
                type();
            }, 3000);
        }
    }

    setTimeout(type, 2000);
}

// ===== GALLERY LIGHTBOX =====
function initGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-img');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <img src="${img.src}" alt="${img.alt}">
                    <button class="lightbox-close" aria-label="Close lightbox">&times;</button>
                </div>
            `;
            lightbox.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                opacity: 0;
                transition: opacity 0.3s ease;
                cursor: pointer;
            `;

            const content = lightbox.querySelector('.lightbox-content');
            content.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                position: relative;
            `;

            const lightboxImg = lightbox.querySelector('img');
            lightboxImg.style.cssText = `
                max-width: 100%;
                max-height: 80vh;
                border-radius: 12px;
                object-fit: contain;
            `;

            const closeBtn = lightbox.querySelector('.lightbox-close');
            closeBtn.style.cssText = `
                position: absolute;
                top: -40px;
                right: 0;
                font-size: 2rem;
                color: white;
                background: none;
                border: none;
                cursor: pointer;
                padding: 10px;
            `;

            document.body.appendChild(lightbox);
            requestAnimationFrame(() => {
                lightbox.style.opacity = '1';
            });

            const closeLightbox = () => {
                lightbox.style.opacity = '0';
                setTimeout(() => lightbox.remove(), 300);
            };

            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox || e.target === closeBtn) {
                    closeLightbox();
                }
            });

            document.addEventListener('keydown', function escHandler(e) {
                if (e.key === 'Escape') {
                    closeLightbox();
                    document.removeEventListener('keydown', escHandler);
                }
            });
        });
    });
}

// ===== CURSOR GLOW EFFECT =====
function initCursorGlow() {
    const glow = document.createElement('div');
    glow.style.cssText = `
        position: fixed;
        width: 200px;
        height: 200px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(0, 212, 255, 0.06) 0%, transparent 70%);
        pointer-events: none;
        z-index: 9998;
        transform: translate(-50%, -50%);
        transition: opacity 0.3s;
    `;
    document.body.appendChild(glow);

    document.addEventListener('mousemove', (e) => {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
    });

    // Hide on mobile
    if (window.matchMedia('(max-width: 768px)').matches) {
        glow.style.display = 'none';
    }
}

// ===== SECTION DIVIDER EFFECTS =====
function addSectionDividers() {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        const divider = document.createElement('div');
        divider.style.cssText = `
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.2), rgba(124, 58, 237, 0.2), transparent);
        `;
        section.appendChild(divider);
    });
}

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initTiltEffect();
    initMagneticButtons();
    initTypingEffect();
    initGalleryLightbox();
    initCursorGlow();
    addSectionDividers();
});
