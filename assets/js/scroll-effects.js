/**
 * Smooth Scroll Effects and Animations
 * Handles intersection observer for scroll-triggered animations
 */

class ScrollEffects {
    constructor() {
        this.init();
    }

    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupScrollEffects());
        } else {
            this.setupScrollEffects();
        }
    }

    setupScrollEffects() {
        this.createIntersectionObserver();
        this.setupSmoothScrollForLinks();
        this.addScrollProgressIndicator();
        this.setupParallaxEffect();
    }

    createIntersectionObserver() {
        // Options for the intersection observer
        const options = {
            root: null,
            rootMargin: '0px 0px -100px 0px', // Trigger when element is 100px from bottom of viewport
            threshold: 0.1
        };

        // Create the observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add the 'in-view' class to trigger animations
                    entry.target.classList.add('in-view');

                    // For staggered animations, trigger children sequentially
                    if (entry.target.classList.contains('animate-stagger')) {
                        this.triggerStaggeredAnimation(entry.target);
                    }
                }
            });
        }, options);

        // Observe all elements with animation classes
        const animatedElements = document.querySelectorAll([
            '.animate-fade-in',
            '.animate-slide-up',
            '.animate-slide-up-delayed',
            '.animate-slide-in-right',
            '.animate-slide-in-left',
            '.animate-fade-in-up',
            '.animate-stagger',
            '.animate-scale'
        ].join(', '));

        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }

    triggerStaggeredAnimation(container) {
        const children = container.children;
        Array.from(children).forEach((child, index) => {
            setTimeout(() => {
                child.style.transitionDelay = `${index * 0.1}s`;
            }, index * 100);
        });
    }

    setupSmoothScrollForLinks() {
        // Handle smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');

                // Skip if it's just "#" or doesn't exist
                if (href === '#' || href === '#!') return;

                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();

                    // Smooth scroll to target with offset for fixed header
                    const offsetTop = target.offsetTop - 100; // Adjust for fixed navigation

                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    addScrollProgressIndicator() {
        // Create progress bar
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.innerHTML = '<div class="scroll-progress-bar"></div>';
        document.body.appendChild(progressBar);

        // Add CSS for progress bar
        const style = document.createElement('style');
        style.textContent = `
            .scroll-progress {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 3px;
                background: rgba(255, 255, 255, 0.1);
                z-index: 9999;
                pointer-events: none;
            }

            .scroll-progress-bar {
                height: 100%;
                background: linear-gradient(90deg, #FF3621, #e02d18);
                width: 0%;
                transition: width 0.1s ease-out;
                box-shadow: 0 0 10px rgba(255, 54, 33, 0.5);
            }
        `;
        document.head.appendChild(style);

        // Update progress on scroll
        window.addEventListener('scroll', () => {
            const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            document.querySelector('.scroll-progress-bar').style.width = `${Math.min(scrolled, 100)}%`;
        });
    }

    setupParallaxEffect() {
        // Add subtle parallax effect to background images
        const parallaxElements = document.querySelectorAll('.hero-background img, .outcomes-section img, .core-services-section img');

        if (parallaxElements.length > 0) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.5;

                parallaxElements.forEach(element => {
                    const rect = element.getBoundingClientRect();
                    const isVisible = rect.bottom >= 0 && rect.top <= window.innerHeight;

                    if (isVisible) {
                        element.style.transform = `translateY(${rate}px)`;
                    }
                });
            });
        }
    }

    // Enhanced scroll to section method
    static scrollToSection(sectionId, offset = 100) {
        const section = document.getElementById(sectionId) || document.querySelector(sectionId);
        if (section) {
            const offsetTop = section.offsetTop - offset;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    // Add loading animation for images
    setupImageLoadingEffects() {
        const images = document.querySelectorAll('img');

        images.forEach(img => {
            if (img.complete && img.naturalHeight !== 0) {
                img.classList.add('loaded');
            } else {
                img.addEventListener('load', () => {
                    img.classList.add('loaded');
                });
            }
        });

        // Add CSS for image loading effect
        const style = document.createElement('style');
        style.textContent = `
            img {
                opacity: 0;
                transition: opacity 0.5s ease-in-out;
            }

            img.loaded {
                opacity: 1;
            }
        `;
        document.head.appendChild(style);
    }

    // Debounce function for performance
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Enhanced scroll performance
class ScrollPerformance {
    constructor() {
        this.ticking = false;
        this.setupOptimizedScrolling();
    }

    setupOptimizedScrolling() {
        // Use passive listeners for better performance
        window.addEventListener('scroll', this.handleScroll.bind(this), { passive: true });
        window.addEventListener('resize', this.handleResize.bind(this), { passive: true });
    }

    handleScroll() {
        if (!this.ticking) {
            requestAnimationFrame(() => {
                this.updateScrollEffects();
                this.ticking = false;
            });
            this.ticking = true;
        }
    }

    handleResize() {
        // Recalculate positions on resize
        this.debounce(() => {
            this.updateScrollEffects();
        }, 250)();
    }

    updateScrollEffects() {
        const scrollY = window.pageYOffset;

        // Add scroll-based navbar styling
        const nav = document.querySelector('.navigation');
        if (nav) {
            if (scrollY > 100) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        }

        // Add subtle scroll indicator for sections
        this.updateSectionIndicators(scrollY);
    }

    updateSectionIndicators(scrollY) {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            const isActive = rect.top <= 200 && rect.bottom >= 200;

            if (isActive) {
                // Update active navigation
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${section.id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Initialize scroll effects when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new ScrollEffects();
    new ScrollPerformance();
});

// Export for use in other modules if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ScrollEffects, ScrollPerformance };
}