// me.js

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
        });

        // Close mobile menu when clicking a link
        document.querySelectorAll(".nav-links a").forEach((link) => {
            link.addEventListener("click", () => {
                hamburger.classList.remove("active");
                navLinks.classList.remove("active");
            });
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
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: "smooth",
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
            
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = "Sending...";
            }

            // Submit form data
            fetch(this.action, {
                method: "POST",
                body: new FormData(this),
                headers: { Accept: "application/json" },
            })
                .then((response) => {
                    if (response.ok) {
                        contactForm.reset();
                        contactForm.classList.add("hidden");
                        
                        const successMessage = document.getElementById("success-message");
                        if (successMessage) {
                            successMessage.classList.remove("hidden");
                        }
                    } else {
                        throw new Error("Failed to send");
                    }
                })
                .catch((error) => {
                    alert("Oops! Something went wrong. Please try again.");
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.textContent = "Send Message";
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
            iframe.style.opacity = '1';
            iframe.style.transition = 'opacity 0.3s ease-in';
        });

        iframe.addEventListener('error', function() {
            console.error('Failed to load CV preview');
            // Fallback content
            const fallbackHTML = `
                <div class="iframe-fallback">
                    <p>CV Preview not available</p>
                    <a href="https://drive.google.com/file/d/1WPtKs12Jdk_RllwmmjBmntNqvHAOi-gB/view" 
                       class="btn" target="_blank">
                        View CV in New Tab
                    </a>
                </div>
            `;
            iframe.parentNode.innerHTML = fallbackHTML;
        });
    }

    // Download Resume button handler
    const downloadBtn = document.querySelector('#about .btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.open(this.href, '_blank');
        });
    }

    // Scroll animations for project cards and skill categories
    const animateOnScroll = function () {
        const elements = document.querySelectorAll(
            ".project-card, .skill-category, .about-content, .contact-content"
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
    document.querySelectorAll(".project-card, .skill-category, .about-content, .contact-content")
        .forEach((element) => {
            element.style.opacity = "0";
            element.style.transform = "translateY(50px)";
            element.style.transition = "opacity 0.5s ease, transform 0.5s ease";
        });

    // Run once on page load
    animateOnScroll();

    // Run on scroll
    window.addEventListener("scroll", animateOnScroll);
});
