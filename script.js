const toggle = document.getElementById("theme-toggle");

// Apply saved theme when page loads
if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light-mode");
    toggle.classList.remove("fa-sun");
    toggle.classList.add("fa-moon");
} else {
    toggle.classList.remove("fa-moon");
    toggle.classList.add("fa-sun");
}



// Toggle theme on click
toggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("light-mode")) {
        toggle.classList.remove("fa-sun");
        toggle.classList.add("fa-moon");

        // Save theme
        localStorage.setItem("theme", "light");
    } else {
        toggle.classList.remove("fa-moon");
        toggle.classList.add("fa-sun");

        // Save theme
        localStorage.setItem("theme", "dark");
    }
});





// Initialize EmailJS
emailjs.init("j2OLsHWUZ-YbMAKuE");

// Get Elements
const form = document.getElementById("contactForm");
const messageBox = document.getElementById("message");
const counter = document.getElementById("charCount");
const button = document.querySelector(".send-btn");

// Character Counter
messageBox.addEventListener("input", () => {
    counter.textContent = messageBox.value.length;
});

// Form Submit
form.addEventListener("submit", function (e) {

    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    // Validation
    if (name === "") {
        alert("Please enter your name.");
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    if (subject === "") {
        alert("Please enter a subject.");
        return;
    }

    if (message.length < 10) {
        alert("Message should be at least 10 characters.");
        return;
    }

    if (message.length > 2000) {
        alert("Message cannot exceed 2000 characters.");
        return;
    }

    // Disable Button
    button.disabled = true;
    button.innerHTML = "Sending...";

    // Send Email
    emailjs.send(
    "service_6a0uvgm",
    "template_z7xsmin",
    {
        name: name,
        email: email,
        title: subject,
        message: message,
        time: new Date().toLocaleString()
    }
)

    .then(() => {

        alert("Message sent successfully!");

        form.reset();
        counter.textContent = "0";

        button.disabled = false;
        button.innerHTML =
            '<i class="fa-regular fa-paper-plane"></i> Send Message';

    })

    .catch((error) => {

        console.error("EmailJS Error:", error);

        alert("Failed to send message. Please try again.");

        button.disabled = false;
        button.innerHTML =
            '<i class="fa-regular fa-paper-plane"></i> Send Message';

    });

});

