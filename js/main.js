/**
 * Zemu Design Portfolio - Main JavaScript
 * 
 * This script handles all interactive elements of the portfolio, including:
 * - Mobile navigation
 * - Portfolio filtering
 * - Smooth scrolling
 * - Active navigation links
 * - Back-to-top button functionality
 * - Scroll animations
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all functions on page load
    initMobileMenu();
    initPortfolioFilter();
    initSmoothScroll();
    initActiveNavLink();
    initBackToTop();
    initScrollReveal();
    initIcons();
});

/**
 * Initializes the mobile menu functionality.
 */
function initMobileMenu() {
    const menuBtn = document.querySelector('[data-mobile-menu-btn]');
    const mobileMenu = document.querySelector('[data-mobile-menu]');

    if (!menuBtn || !mobileMenu) return;

    // Toggle menu visibility on button click
    menuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        mobileMenu.classList.toggle('hidden');
    });

    // Close menu when a link is clicked
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
    });

    // Close menu when clicking outside of it
    document.addEventListener('click', (e) => {
        if (!mobileMenu.classList.contains('hidden') && !menuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
            mobileMenu.classList.add('hidden');
        }
    });
}

/**
 * Initializes the portfolio filtering functionality.
 */
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('[data-filter-btn]');
    const portfolioItems = document.querySelectorAll('[data-category]');

    if (!filterButtons.length || !portfolioItems.length) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filterBtn;

            // Update button styles
            filterButtons.forEach(btn => {
                btn.classList.toggle('bg-accent', btn === button);
                btn.classList.toggle('text-white', btn === button);
                btn.classList.toggle('bg-white', btn !== button);
                btn.classList.toggle('text-gray-600', btn !== button);
            });

            // Show/hide portfolio items based on filter
            portfolioItems.forEach(item => {
                const categories = item.dataset.category.split(' ');
                const shouldShow = filter === 'all' || categories.includes(filter);
                
                item.style.display = shouldShow ? 'block' : 'none';
            });
        });
    });
}

/**
 * Initializes smooth scrolling for anchor links.
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80, // Offset for fixed navbar
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Highlights the active navigation link based on scroll position.
 */
function initActiveNavLink() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    const sections = Array.from(navLinks).map(link => document.querySelector(link.getAttribute('href')));

    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY + 100;

        sections.forEach((section, index) => {
            if (section && section.offsetTop <= scrollPosition && section.offsetTop + section.offsetHeight > scrollPosition) {
                navLinks.forEach(link => link.classList.remove('text-accent', 'font-bold'));
                navLinks[index].classList.add('text-accent', 'font-bold');
            }
        });
    });
}

/**
 * Initializes the back-to-top button functionality.
 */
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    if (!backToTopBtn) return;

    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.remove('hidden');
            backToTopBtn.classList.add('flex');
        } else {
            backToTopBtn.classList.add('hidden');
            backToTopBtn.classList.remove('flex');
        }
    });

    // Scroll to top on click
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/**
 * Initializes scroll-reveal animations for elements.
 */
function initScrollReveal() {
    const elementsToAnimate = document.querySelectorAll('[data-animate]');
    if (!elementsToAnimate.length) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    elementsToAnimate.forEach(el => observer.observe(el));
}

/**
 * Initializes Lucide icons.
 */
function initIcons() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}
