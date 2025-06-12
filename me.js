

      // Automatically update year in footer
        document.getElementById('current-year').textContent = new Date().getFullYear();
      // JavaScript for interactive features
      // Wait for the DOM to be fully loaded

      document.addEventListener("DOMContentLoaded", function () {
        // Mobile Navigation
        const hamburger = document.querySelector(".hamburger");
        const navLinks = document.querySelector(".nav-links");

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

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
          anchor.addEventListener("click", function (e) {
            e.preventDefault();

            const targetId = this.getAttribute("href");
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

        window.addEventListener("scroll", function () {
          if (window.pageYOffset > 300) {
            backToTopBtn.classList.add("active");
          } else {
            backToTopBtn.classList.remove("active");
          }
        });

        // Form submission
        document
          .getElementById("contact-form")
          .addEventListener("submit", function (e) {
            e.preventDefault();
            const submitBtn = document.getElementById("submit-btn");
            submitBtn.disabled = true;
            submitBtn.textContent = "Sending...";

            // Submit form data
            fetch(this.action, {
              method: "POST",
              body: new FormData(this),
              headers: { Accept: "application/json" },
            })
              .then((response) => {
                if (response.ok) {
                  document.getElementById("contact-form").reset();
                  document
                    .getElementById("contact-form")
                    .classList.add("hidden");
                  document
                    .getElementById("success-message")
                    .classList.remove("hidden");
                } else {
                  throw new Error("Failed to send");
                }
              })
              .catch((error) => {
                alert("Oops! Something went wrong. Please try again.");
                submitBtn.disabled = false;
                submitBtn.textContent = "Send Message";
              });
          });

        // Animate elements when scrolling
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
        document
          .querySelectorAll(
            ".project-card, .skill-category, .about-content, .contact-content"
          )
          .forEach((element) => {
            element.style.opacity = "0";
            element.style.transform = "translateY(50px)";
            element.style.transition = "opacity 0.5s ease, transform 0.5s ease";
          });

        // Run once on page load
        animateOnScroll();

        // Run on scroll
        window.addEventListener("scroll", animateOnScroll);

        document
          .getElementById("commentForm")
          .addEventListener("submit", function (e) {
            e.preventDefault();

            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const comment = document.getElementById("comment").value;

            // Using mailto to open default email client
            const subject = `New Comment from ${name}`;
            const body = `${comment}\n\nSent by: ${name} (${email})`;
            const mailtoLink = `mailto:your-email@example.com?subject=${encodeURIComponent(
              subject
            )}&body=${encodeURIComponent(body)}`;

            window.location.href = mailtoLink;

            // Optional: Reset form after submission
            this.reset();

            // Optional: Show confirmation message
            alert(
              "Your email client will open to send the comment. Please complete the email sending process."
            );
          });
      });
    