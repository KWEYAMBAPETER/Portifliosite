

// Automatically update year in footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// JavaScript for interactive features
document.addEventListener("DOMContentLoaded", function () {
    // Mobile Navigation
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    if (hamburger && navLinks) {
        hamburger.addEventListener("click", function () {
            this.classList.toggle("active");
            navLinks.classList.toggle("active");
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        // Close mobile menu when clicking a link
        document.querySelectorAll(".nav-links a").forEach((link) => {
            link.addEventListener("click", () => {
                hamburger.classList.remove("active");
                navLinks.classList.remove("active");
                document.body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !hamburger.contains(e.target) && navLinks.classList.contains('active')) {
                hamburger.classList.remove("active");
                navLinks.classList.remove("active");
                document.body.style.overflow = '';
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();

            const targetId = this.getAttribute("href");
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Back to top button
    const backToTopBtn = document.querySelector(".back-to-top");
    if (backToTopBtn) {
        window.addEventListener("scroll", function () {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add("active");
            } else {
                backToTopBtn.classList.remove("active");
            }
        });
    }

    // Contact form submission
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const submitBtn = document.getElementById("submit-btn");
            const originalText = submitBtn.innerHTML;
            
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            }

            // Submit form data
            fetch(this.action, {
                method: "POST",
                body: new FormData(this),
                headers: { 
                    Accept: "application/json",
                },
            })
                .then((response) => {
                    if (response.ok) {
                        contactForm.reset();
                        contactForm.classList.add("hidden");
                        
                        const successMessage = document.getElementById("success-message");
                        if (successMessage) {
                            successMessage.classList.remove("hidden");
                        }
                        
                        // Reset button after success
                        setTimeout(() => {
                            if (submitBtn) {
                                submitBtn.disabled = false;
                                submitBtn.innerHTML = originalText;
                                contactForm.classList.remove("hidden");
                                successMessage.classList.add("hidden");
                            }
                        }, 5000);
                    } else {
                        throw new Error("Failed to send");
                    }
                })
                .catch((error) => {
                    alert("Oops! Something went wrong. Please try again.");
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalText;
                    }
                });
        });
    }

    // Fix duplicate iframes in About section
    const aboutIframes = document.querySelectorAll('#about iframe');
    if (aboutIframes.length > 1) {
        // Keep only the first iframe, remove duplicates
        for (let i = 1; i < aboutIframes.length; i++) {
            aboutIframes[i].remove();
        }
    }

    // Add loading state to iframe
    const iframe = document.querySelector('#about iframe');
    if (iframe) {
        iframe.addEventListener('load', function() {
            console.log('CV preview loaded successfully');
            this.style.opacity = '1';
            this.style.transition = 'opacity 0.3s ease-in';
        });

        iframe.addEventListener('error', function() {
            console.error('Failed to load CV preview');
            // Fallback content
            const fallbackHTML = `
                <div class="iframe-fallback">
                    <i class="fas fa-file-pdf" style="font-size: 3rem; margin-bottom: 20px; color: var(--primary-color);"></i>
                    <h4>CV Preview Not Available</h4>
                    <p>Unable to load the CV preview at this time.</p>
                    <a href="https://drive.google.com/file/d/1WPtKs12Jdk_RllwmmjBmntNqvHAOi-gB/view" 
                       class="btn" target="_blank" style="margin-top: 20px;">
                        <i class="fas fa-external-link-alt"></i>
                        View CV in New Tab
                    </a>
                </div>
            `;
            this.parentNode.innerHTML = fallbackHTML;
        });
    }

    // Download Resume button handler
    const downloadBtn = document.querySelector('#about .btn');
    if (downloadBtn && downloadBtn.href.includes('drive.google.com')) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.open(this.href, '_blank', 'noopener,noreferrer');
        });
    }

    // Scroll animations for elements
    const animateOnScroll = function () {
        const elements = document.querySelectorAll(
            ".project-card, .skill-category, .about-content, .contact-content, .stat-item"
        );

        elements.forEach((element) => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementPosition < windowHeight - 100) {
                element.style.opacity = "1";
                element.style.transform = "translateY(0)";
            }
        });
    };

    // Set initial state for animation
    document.querySelectorAll(".project-card, .skill-category, .about-content, .contact-content, .stat-item")
        .forEach((element) => {
            element.style.opacity = "0";
            element.style.transform = "translateY(50px)";
            element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        });

    // Run once on page load
    animateOnScroll();

    // Run on scroll with throttle
    let scrollTimeout;
    window.addEventListener("scroll", function() {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(function() {
                scrollTimeout = null;
                animateOnScroll();
            }, 100);
        }
    });

    // Add loading animation to project cards with staggered delay
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });

    // Enhanced touch experience for mobile
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
        
        // Add touch feedback for buttons
        document.querySelectorAll('.btn, .project-links a, .social-links a').forEach(button => {
            button.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            });
            
            button.addEventListener('touchend', function() {
                this.style.transform = '';
            });
        });
    }

    // Handle window resize
    window.addEventListener('resize', function() {
        // Close mobile menu when switching to desktop
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        
        if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Performance optimization - lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    console.log('Portfolio website loaded successfully!');
});

// Add some performance optimizations
window.addEventListener('load', function() {
    // Remove loading states if any
    document.body.classList.add('loaded');
});

// Handle page visibility for performance
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Page is hidden, could pause non-essential animations
    } else {
        // Page is visible
    }
});
