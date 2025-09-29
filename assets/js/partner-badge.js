// Partner Badge Section JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const partnerBadge = document.querySelector('.partner-badge-section');
    
    if (!partnerBadge) return;
    
    // Add subtle pulse animation on load
    setTimeout(() => {
        partnerBadge.style.animation = 'none';
    }, 2500);
    
    // Scroll reveal effect
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    observer.observe(partnerBadge);
    
    // Optional: Add click tracking for analytics
    partnerBadge.addEventListener('click', function() {
        console.log('Partner badge clicked');
        // Add your analytics tracking here
    });
});