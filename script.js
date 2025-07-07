// Limited Time Banner Functionality
function closeBanner() {
    const banner = document.getElementById('offer-banner');
    const header = document.getElementById('main-header');
    
    if (banner && header) {
        banner.style.transform = 'translateY(-100%)';
        banner.style.opacity = '0';
        
        setTimeout(() => {
            banner.style.display = 'none';
            header.classList.remove('header-with-banner');
            // Store in localStorage so banner stays closed
            localStorage.setItem('offerBannerClosed', 'true');
        }, 300);
    }
}

// Check if banner should be shown
document.addEventListener('DOMContentLoaded', function() {
    const banner = document.getElementById('offer-banner');
    const header = document.getElementById('main-header');
    
    if (localStorage.getItem('offerBannerClosed') === 'true') {
        if (banner) banner.style.display = 'none';
    } else {
        if (header) header.classList.add('header-with-banner');
    }
});

// Mobile Menu Toggle with Premium Animation
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    const body = document.body;
    
    if (mobileMenuToggle && mobileNav) {
        mobileMenuToggle.addEventListener('click', function() {
            const isActive = mobileMenuToggle.classList.contains('active');
            
            if (isActive) {
                // Closing menu
                mobileMenuToggle.classList.remove('active');
                mobileNav.classList.remove('active');
                body.style.overflow = '';
            } else {
                // Opening menu
                mobileMenuToggle.classList.add('active');
                mobileNav.classList.add('active');
                body.style.overflow = 'hidden'; // Prevent background scroll
            }
        });

        // Close mobile menu when clicking on a link
        const mobileNavLinks = mobileNav.querySelectorAll('a');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuToggle.classList.remove('active');
                mobileNav.classList.remove('active');
                body.style.overflow = '';
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenuToggle.contains(event.target) && 
                !mobileNav.contains(event.target) && 
                mobileNav.classList.contains('active')) {
                mobileMenuToggle.classList.remove('active');
                mobileNav.classList.remove('active');
                body.style.overflow = '';
            }
        });
    }
});

// Premium Smooth Scrolling with Offset Calculation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const header = document.querySelector('header');
            const banner = document.getElementById('offer-banner');
            
            let headerHeight = header ? header.offsetHeight : 0;
            let bannerHeight = (banner && banner.style.display !== 'none') ? banner.offsetHeight : 0;
            
            const targetPosition = target.offsetTop - headerHeight - bannerHeight - 20;
            
            window.scrollTo({
                top: Math.max(0, targetPosition),
                behavior: 'smooth'
            });
        }
    });
});

// Premium Header Scroll Effects
let lastScrollTop = 0;
const header = document.querySelector('header');

function updateHeaderOnScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (header) {
        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 8px 40px rgba(0, 44, 71, 0.12)';
            header.style.backdropFilter = 'blur(25px)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 4px 30px rgba(0, 44, 71, 0.08)';
            header.style.backdropFilter = 'blur(20px)';
        }
        
        // Hide/show header on scroll (optional premium feature)
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
    }
    
    lastScrollTop = scrollTop;
}

// Throttled scroll event for better performance
let ticking = false;
window.addEventListener('scroll', function() {
    if (!ticking) {
        requestAnimationFrame(function() {
            updateHeaderOnScroll();
            ticking = false;
        });
        ticking = true;
    }
});

// Premium Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Add staggered animation for grid items
            const gridItems = entry.target.querySelectorAll('.card, .event-card, .special-offer-card');
            gridItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }
    });
}, observerOptions);

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Remove loading class
    document.body.classList.remove('loading');
    document.body.classList.add('loaded');
    
    // Set up intersection observer
    const animatedElements = document.querySelectorAll('.card, .event-card, .special-offer-card, .section');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(element);
    });
});

// Premium hover effects for interactive elements
document.addEventListener('DOMContentLoaded', function() {
    // Enhanced price item interactions
    const priceItems = document.querySelectorAll('.price-item');
    priceItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02) translateX(5px)';
            this.style.boxShadow = '0 8px 25px rgba(96, 173, 105, 0.15)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateX(0)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Premium card hover effects
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Touch-friendly interactions for mobile
document.addEventListener('DOMContentLoaded', function() {
    const touchElements = document.querySelectorAll('.cta-button, .card, .event-card, .special-offer-card');
    
    touchElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        }, { passive: true });
        
        element.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        }, { passive: true });
    });
});

// Optimize iframe loading and responsiveness
document.addEventListener('DOMContentLoaded', function() {
    const iframe = document.querySelector('iframe');
    if (iframe) {
        // Adjust iframe height based on screen size
        function adjustIframeHeight() {
            if (window.innerWidth < 768) {
                iframe.style.height = '600px';
            } else if (window.innerWidth < 1024) {
                iframe.style.height = '700px';
            } else {
                iframe.style.height = '800px';
            }
        }
        
        adjustIframeHeight();
        window.addEventListener('resize', adjustIframeHeight);
        
        // Add loading state
        iframe.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        iframe.style.opacity = '0';
        iframe.style.transition = 'opacity 0.5s ease';
    }
});

// Handle window resize for responsive adjustments
window.addEventListener('resize', function() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768) {
        if (mobileMenuToggle) mobileMenuToggle.classList.remove('active');
        if (mobileNav) mobileNav.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Premium loading experience
window.addEventListener('load', function() {
    // Ensure smooth loading experience
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// Navigation active state management
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav a');
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveNavigation() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavigation);
});

// Premium error handling
window.addEventListener('error', function(e) {
    console.log('Error caught:', e.error);
    // Could implement user-friendly error reporting here
});

// Performance optimization
if ('requestIdleCallback' in window) {
    requestIdleCallback(function() {
        // Preload critical resources during idle time
        const criticalImages = document.querySelectorAll('img[data-src]');
        criticalImages.forEach(img => {
            img.src = img.dataset.src;
        });
    });
}