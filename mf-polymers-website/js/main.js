// ===== MF Polymers Website - Main JavaScript =====

// ===== GALLERY MODAL FUNCTIONALITY =====
function initGalleryModals() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modals = document.querySelectorAll('.gallery-modal');
    const closeButtons = document.querySelectorAll('.close-modal');

    // Open modal on gallery item click
    galleryItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const imageId = this.getAttribute('data-image');
            const modal = document.getElementById(`modal-${imageId}`);
            if (modal) {
                // Close any other open modals first
                modals.forEach(m => m.style.display = 'none');
                
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
                
                // Add class to body to prevent hover effects
                document.body.classList.add('modal-open');
                
                // Focus trap for accessibility
                const closeBtn = modal.querySelector('.close-modal');
                if (closeBtn) {
                    closeBtn.focus();
                }
            }
        });
    });

    // Close modal with X button
    closeButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const modal = this.closest('.gallery-modal');
            if (modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
                document.body.classList.remove('modal-open');
            }
        });
    });

    // Close modal when clicking outside
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
                document.body.style.overflow = 'auto';
                document.body.classList.remove('modal-open');
            }
        });
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.gallery-modal[style*="display: block"]');
            if (openModal) {
                openModal.style.display = 'none';
                document.body.style.overflow = 'auto';
                document.body.classList.remove('modal-open');
            }
        }
    });
}

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===== NAVIGATION SCROLL EFFECT =====
function initNavigationScroll() {
    const nav = document.querySelector('nav');
    
    if (nav) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });
    }
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-item, .stat-item, .tech-visual, .mission-visual');
    animateElements.forEach(el => observer.observe(el));
}

// ===== HOVER EFFECTS =====
function initHoverEffects() {
    const serviceItems = document.querySelectorAll('.service-item');
    
    serviceItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// ===== UTILITY FUNCTIONS =====
function formatPhoneNumber(phone) {
    // Format phone number for display
    return phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function handleFormSubmit(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Basic validation
    if (!data.name || !data.email || !data.message) {
        alert('Please fill in all required fields.');
        return false;
    }
    
    if (!validateEmail(data.email)) {
        alert('Please enter a valid email address.');
        return false;
    }
    
    // Here you would typically send the data to your server
    console.log('Form submitted:', data);
    alert('Thank you for your message! We will get back to you soon.');
    form.reset();
    return false;
}

// ===== INITIALIZE ALL FUNCTIONALITY =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions with error handling
    try {
        initSmoothScrolling();
        initNavigationScroll();
        initScrollAnimations();
        initHoverEffects();
        initGalleryModals();
        
        // Initialize form handling
        const contactForm = document.querySelector('#contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                handleFormSubmit(this);
            });
        }
        
        console.log('MF Polymers Website - JavaScript loaded successfully');
    } catch (error) {
        console.error('Error initializing website functionality:', error);
    }
});