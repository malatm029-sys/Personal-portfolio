// Wait until the webpage is completely loaded
document.addEventListener("DOMContentLoaded", function () {

    // Mobile navigation
    const navLinks = document.querySelectorAll(".nav-links a");

    navLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            console.log("Navigation clicked:", link.textContent);
        });
    });


    // Contact form validation
    const contactForm = document.querySelector("#contact form");

    if (contactForm) {

        contactForm.addEventListener("submit", function (event) {

            const name = document.querySelector(
                'input[name="name"]'
            ).value.trim();

            const email = document.querySelector(
                'input[name="email"]'
            ).value.trim();

            const message = document.querySelector(
                'textarea[name="message"]'
            ).value.trim();


            // Check name
            if (name.length < 2) {
                event.preventDefault();

                alert("Please enter your valid name.");

                return;
            }


            // Check email
            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email)) {
                event.preventDefault();

                alert("Please enter a valid email address.");

                return;
            }


            // Check message
            if (message.length < 5) {
                event.preventDefault();

                alert("Please enter a message.");

                return;
            }

            // Form is valid
            console.log("Contact form submitted successfully.");

        });
    }


    // Current year in footer
    const yearElement = document.querySelector("#current-year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

});