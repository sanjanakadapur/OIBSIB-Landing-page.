// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        // Close mobile menu if open
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
        });

        // Update active link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
        });
        this.classList.add('active');
    });
});

// Form Validation
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Form submission handler
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Reset error messages
    nameError.textContent = '';
    emailError.textContent = '';
    messageError.textContent = '';

    // Validate name
    if (!nameInput.value.trim()) {
        nameError.textContent = 'Name is required';
        nameInput.focus();
        return;
    }

    // Validate email
    if (!emailInput.value.trim()) {
        emailError.textContent = 'Email is required';
        emailInput.focus();
        return;
    } else if (!emailRegex.test(emailInput.value.trim())) {
        emailError.textContent = 'Please enter a valid email address';
        emailInput.focus();
        return;
    }

    // Validate message
    if (!messageInput.value.trim()) {
        messageError.textContent = 'Message is required';
        messageInput.focus();
        return;
    } else if (messageInput.value.trim().length < 20) {
        messageError.textContent = 'Message must be at least 20 characters';
        messageInput.focus();
        return;
    }

    // If all validations pass, submit the form (in this case, log the data)
    const formData = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        message: messageInput.value.trim()
    };

    console.log('Form submitted with data:', formData);

    // Show success message
    alert('Thank you for your message! We will get back to you soon.');

    // Reset form
    contactForm.reset();
});

// Real-time validation
nameInput.addEventListener('blur', function() {
    if (!this.value.trim()) {
        nameError.textContent = 'Name is required';
    } else {
        nameError.textContent = '';
    }
});

emailInput.addEventListener('blur', function() {
    if (!this.value.trim()) {
        emailError.textContent = 'Email is required';
    } else if (!emailRegex.test(this.value.trim())) {
        emailError.textContent = 'Please enter a valid email address';
    } else {
        emailError.textContent = '';
    }
});

messageInput.addEventListener('blur', function() {
    if (!this.value.trim()) {
        messageError.textContent = 'Message is required';
    } else if (this.value.trim().length < 20) {
        messageError.textContent = 'Message must be at least 20 characters';
    } else {
        messageError.textContent = '';
    }
});

// Update active navigation link based on scroll position
window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;

    // Get all sections
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});