
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('[data-mobile-menu-btn]');
    const mobileMenu = document.querySelector('[data-mobile-menu]');
    
    if (!mobileMenuBtn || !mobileMenu) return;

    // Toggle menu on button click
    mobileMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        mobileMenu.classList.toggle('hidden');
    });

    // Close menu when a link is clicked
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        }
    });

    // Close menu on scroll
    window.addEventListener('scroll', () => {
        if (!mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
        }
    });
}

// ===================================
// 2. SERVICE/PORTFOLIO CAROUSEL
// ===================================
function initServiceCarousel() {
    const serviceCards = document.querySelectorAll('[data-service-card]');
    if (serviceCards.length === 0) return;

    let currentService = 0;

    const updateServiceDisplay = () => {
        serviceCards.forEach((card, index) => {
            if (index === currentService) {
                card.classList.remove('hidden');
                card.classList.add('block');
            } else {
                card.classList.add('hidden');
                card.classList.remove('block');
            }
        });
        updateServiceIndicators();
    };

    const updateServiceIndicators = () => {
        const indicators = document.querySelectorAll('[data-service-indicator]');
        indicators.forEach((indicator, index) => {
            if (index === currentService) {
                indicator.classList.add('w-8', 'bg-accent');
                indicator.classList.remove('w-3', 'bg-gray-300');
            } else {
                indicator.classList.add('w-3', 'bg-gray-300');
                indicator.classList.remove('w-8', 'bg-accent');
            }
        });
    };

    const nextService = () => {
        currentService = (currentService + 1) % serviceCards.length;
        updateServiceDisplay();
    };

    const prevService = () => {
        currentService = (currentService - 1 + serviceCards.length) % serviceCards.length;
        updateServiceDisplay();
    };

    // Attach to buttons
    const nextBtn = document.querySelector('[data-service-next]');
    const prevBtn = document.querySelector('[data-service-prev]');

    if (nextBtn) nextBtn.addEventListener('click', nextService);
    if (prevBtn) prevBtn.addEventListener('click', prevService);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') nextService();
        if (e.key === 'ArrowLeft') prevService();
    });

    // Initial display
    updateServiceDisplay();
}

// ===================================
// 3. TESTIMONIALS CAROUSEL
// ===================================
function initTestimonialCarousel() {
    const testimonialItems = document.querySelectorAll('[data-testimonial-item]');
    if (testimonialItems.length === 0) return;

    let currentTestimonial = 0;

    const updateTestimonialDisplay = () => {
        testimonialItems.forEach((item, index) => {
            if (index === currentTestimonial) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                }, 10);
            } else {
                item.style.opacity = '0';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    };

    const nextTestimonial = () => {
        currentTestimonial = (currentTestimonial + 1) % testimonialItems.length;
        updateTestimonialDisplay();
    };

    const prevTestimonial = () => {
        currentTestimonial = (currentTestimonial - 1 + testimonialItems.length) % testimonialItems.length;
        updateTestimonialDisplay();
    };

    // Attach to buttons
    const nextBtn = document.querySelector('[data-testimonial-next]');
    const prevBtn = document.querySelector('[data-testimonial-prev]');

    if (nextBtn) nextBtn.addEventListener('click', nextTestimonial);
    if (prevBtn) prevBtn.addEventListener('click', prevTestimonial);

    // Auto-advance testimonials every 5 seconds
    setInterval(nextTestimonial, 5000);

    // Initial display
    updateTestimonialDisplay();
}

// ===================================
// 4. SMOOTH SCROLLING
// ===================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===================================
// 5. ACTIVE NAV LINK
// ===================================
function initActiveNavLink() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        document.querySelectorAll('[id]').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('text-accent', 'font-bold');
            link.classList.add('text-gray-600');
            
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.remove('text-gray-600');
                link.classList.add('text-accent', 'font-bold');
            }
        });
    });
}

// ===================================
// 6. LUCIDE ICONS INITIALIZATION
// ===================================
function initIcons() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// ===================================
// 7. FORM HANDLING
// ===================================
function initFormHandling() {
    const contactForm = document.querySelector('form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const inputs = this.querySelectorAll('input[type="text"], input[type="email"], textarea');
        const isEmpty = Array.from(inputs).some(input => !input.value.trim());
        
        if (isEmpty) {
            alert('Please fill all fields');
            return;
        }
        
        // Show success message
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = '✓ Message Sent!';
        submitBtn.disabled = true;
        
        // Reset form
        setTimeout(() => {
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// ===================================
// 8. SCROLL REVEAL ANIMATIONS
// ===================================
function initScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements with data-animate
    document.querySelectorAll('[data-animate]').forEach(el => {
        observer.observe(el);
    });
}

// ===================================
// 9. INITIALIZE ALL
// ===================================
function initAll() {
    initMobileMenu();
    initServiceCarousel();
    initTestimonialCarousel();
    initSmoothScroll();
    initActiveNavLink();
    initIcons();
    initFormHandling();
    initScrollReveal();
    
    console.log('✓ All functions initialized successfully');
}

// ===================================
// 10. RUN ON PAGE LOAD
// ===================================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
} else {
    initPortfolioFilter();
    initAll();
}

// Portfolio Filter Function
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('[data-filter-btn]');
    const portfolioItems = document.querySelectorAll('[data-category]');

    if (!filterButtons.length || !portfolioItems.length) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filterValue = button.getAttribute('data-filter-btn');

            // Update active button styling
            filterButtons.forEach(btn => {
                btn.classList.remove('bg-accent', 'text-white', 'shadow-lg', 'shadow-orange-200');
                btn.classList.add('bg-white', 'border', 'border-gray-200', 'text-gray-600');
            });
            
            button.classList.remove('bg-white', 'border', 'border-gray-200', 'text-gray-600');
            button.classList.add('bg-accent', 'text-white', 'shadow-lg', 'shadow-orange-200');

            // Filter portfolio items
            portfolioItems.forEach(item => {
                const categories = item.getAttribute('data-category').split(' ');
                
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    // Show item with fade animation
                    item.style.display = 'block';
                    item.style.opacity = '0';
                    item.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    // Hide item
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Handle dynamic icon updates
window.addEventListener('load', () => {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});
