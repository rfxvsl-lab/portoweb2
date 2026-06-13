/**
 * RFXcreative Portfolio - Main JavaScript
 * 
 * This script handles all interactive elements of the portfolio, including:
 * - Dark/Light mode theme toggling
 * - Mobile navigation
 * - Portfolio filtering
 * - Smooth scrolling
 * - Active navigation links
 * - Back-to-top button functionality
 * - Scroll animations
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all functions on page load
    initTheme();
    initMobileMenu();
    initPortfolioFilter();
    initSmoothScroll();
    initActiveNavLink();
    initBackToTop();
    initScrollReveal();
    initIcons();
});

/**
 * Initializes the theme (dark/light mode) functionality.
 */
function initTheme() {
    const themeToggler = document.querySelector('[data-theme-toggler]');
    if (!themeToggler) return;

    const htmlEl = document.documentElement;

    // Check for saved theme preference in localStorage
    const savedTheme = localStorage.getItem('theme');

    // Check for OS-level theme preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Determine initial theme
    let currentTheme = savedTheme ? savedTheme : (prefersDark ? 'dark' : 'light');

    // Apply the initial theme
    htmlEl.classList.add(currentTheme);
    updateTheme(currentTheme);

    // Listen for theme toggler click
    themeToggler.addEventListener('click', () => {
        const newTheme = htmlEl.classList.contains('dark') ? 'light' : 'dark';
        updateTheme(newTheme);
    });

    function updateTheme(theme) {
        htmlEl.classList.remove('light', 'dark');
        htmlEl.classList.add(theme);
        localStorage.setItem('theme', theme);
        initIcons(); // Re-create icons to reflect theme change
    }
}

/**
 * Initializes the mobile menu functionality.
 */
function initMobileMenu() {
    const menuBtn = document.querySelector('[data-mobile-menu-btn]');
    const mobileMenu = document.querySelector('[data-mobile-menu]');
    if (!menuBtn || !mobileMenu) return;

    menuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        mobileMenu.classList.toggle('hidden');
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
    });

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
            filterButtons.forEach(btn => {
                btn.classList.toggle('bg-accent', btn === button);
                btn.classList.toggle('text-white', btn === button);
                // Handle non-active button styles for both themes
                if (btn !== button) {
                    btn.classList.remove('bg-accent', 'text-white');
                }
            });
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
                window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
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

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.remove('hidden');
            backToTopBtn.classList.add('flex');
        } else {
            backToTopBtn.classList.add('hidden');
            backToTopBtn.classList.remove('flex');
        }
    });

    backToTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
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
 * Initializes or re-initializes Lucide icons.
 */
function initIcons() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}
