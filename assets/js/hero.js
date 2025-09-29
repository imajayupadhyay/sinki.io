// Hero Section JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Parallax effect for hero background
    const heroBackground = document.querySelector('.hero-background img');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        
        if (heroBackground && scrolled < 900) {
            heroBackground.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
    });
    
    // Add hover effects to CTA buttons
    const ctaButtons = document.querySelectorAll('.hero-cta a');
    
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Animate decorative elements on scroll
    const decorativeElements = document.querySelectorAll('.animate-float, .animate-float-delayed');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
            }
        });
    }, observerOptions);
    
    decorativeElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transition = 'opacity 1s ease-in-out';
        observer.observe(element);
    });
    
    // Typewriter effect for hero title (optional enhancement)
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let index = 0;
        
        function typeWriter() {
            if (index < text.length) {
                heroTitle.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, 30);
            }
        }
        
        // Uncomment to enable typewriter effect
        // setTimeout(typeWriter, 500);
    }
});