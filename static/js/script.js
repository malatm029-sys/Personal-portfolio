const contactForm = document.getElementById("contact-form");

const formMessage = document.getElementById("form-message");


contactForm.addEventListener("submit", async function (event) {

    event.preventDefault();


    const name = document.getElementById("name").value.trim();

    const email = document.getElementById("email").value.trim();

    const message = document.getElementById("message").value.trim();


    if (!name || !email || !message) {

        formMessage.textContent =
            "Please fill in all fields.";

        return;
    }


    formMessage.textContent =
        "Sending message...";


    try {

        const response = await fetch("/contact", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                name: name,

                email: email,

                message: message

            })

        });


        const data = await response.json();


        if (data.success) {

            formMessage.textContent =
                data.message;

            contactForm.reset();

        } else {

            formMessage.textContent =
                data.message;

        }


    } catch (error) {

        console.error(error);

        formMessage.textContent =
            "Something went wrong. Please try again.";

    }

});