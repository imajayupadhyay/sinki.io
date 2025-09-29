// Main JavaScript File
// Import section scripts
import './sections/navigation.js';
import './sections/hero.js';

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Databricks Website Loaded');
    
    // Load sections dynamically
    loadSection('navigation', './sections/navigation.html');
    loadSection('hero', './sections/hero.html');
    
    // Initialize animations
    initScrollAnimations();
});

// Function to load HTML sections
async function loadSection(elementId, filePath) {
    try {
        const response = await fetch(filePath);
        const html = await response.text();
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = html;
        }
    } catch (error) {
        console.error(`Error loading section ${elementId}:`, error);
    }
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// Smooth scroll to anchor
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// Export utility functions
window.AppUtils = {
    loadSection,
    initScrollAnimations
};