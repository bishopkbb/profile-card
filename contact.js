// ============================================
// CONTACT FORM VALIDATION
// ============================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    // Form fields
    const nameInput = document.getElementById('contactName');
    const emailInput = document.getElementById('contactEmail');
    const subjectInput = document.getElementById('contactSubject');
    const messageInput = document.getElementById('contactMessage');
    const submitButton = document.querySelector('[data-testid="test-contact-submit"]');
    const successMessage = document.querySelector('[data-testid="test-contact-success"]');

    // Error message elements
    const nameError = document.querySelector('[data-testid="test-contact-error-name"]');
    const emailError = document.querySelector('[data-testid="test-contact-error-email"]');
    const subjectError = document.querySelector('[data-testid="test-contact-error-subject"]');
    const messageError = document.querySelector('[data-testid="test-contact-error-message"]');

    // Validation functions
    function validateName(name) {
        if (!name || name.trim() === '') {
            return 'Full name is required';
        }
        if (name.trim().length < 2) {
            return 'Name must be at least 2 characters';
        }
        return null;
    }

    function validateEmail(email) {
        if (!email || email.trim() === '') {
            return 'Email address is required';
        }
        
        // Email regex pattern
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            return 'Please enter a valid email address (e.g., name@example.com)';
        }
        return null;
    }

    function validateSubject(subject) {
        if (!subject || subject.trim() === '') {
            return 'Subject is required';
        }
        if (subject.trim().length < 3) {
            return 'Subject must be at least 3 characters';
        }
        return null;
    }

    function validateMessage(message) {
        if (!message || message.trim() === '') {
            return 'Message is required';
        }
        if (message.trim().length < 10) {
            return `Message must be at least 10 characters (${message.trim().length}/10)`;
        }
        return null;
    }

    // Show error message
    function showError(errorElement, inputElement, message) {
        errorElement.textContent = message;
        errorElement.classList.add('active');
        inputElement.setAttribute('aria-invalid', 'true');
        inputElement.style.borderColor = 'var(--danger-color)';
    }

    // Clear error message
    function clearError(errorElement, inputElement) {
        errorElement.textContent = '';
        errorElement.classList.remove('active');
        inputElement.setAttribute('aria-invalid', 'false');
        inputElement.style.borderColor = '';
    }

    // Validate individual field
    function validateField(input, errorElement, validationFn) {
        const error = validationFn(input.value);
        if (error) {
            showError(errorElement, input, error);
            return false;
        } else {
            clearError(errorElement, input);
            return true;
        }
    }

    // Real-time validation on blur
    nameInput.addEventListener('blur', () => {
        validateField(nameInput, nameError, validateName);
    });

    emailInput.addEventListener('blur', () => {
        validateField(emailInput, emailError, validateEmail);
    });

    subjectInput.addEventListener('blur', () => {
        validateField(subjectInput, subjectError, validateSubject);
    });

    messageInput.addEventListener('blur', () => {
        validateField(messageInput, messageError, validateMessage);
    });

    // Real-time validation on input (for better UX)
    messageInput.addEventListener('input', () => {
        const length = messageInput.value.trim().length;
        if (length > 0 && length < 10) {
            showError(messageError, messageInput, `Message must be at least 10 characters (${length}/10)`);
        } else if (length >= 10) {
            clearError(messageError, messageInput);
        }
    });

    // Clear errors on input
    [nameInput, emailInput, subjectInput].forEach(input => {
        input.addEventListener('input', () => {
            const errorMap = {
                'contactName': nameError,
                'contactEmail': emailError,
                'contactSubject': subjectError
            };
            const errorElement = errorMap[input.id];
            if (errorElement.classList.contains('active')) {
                clearError(errorElement, input);
            }
        });
    });

    // Form submission
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Hide success message if visible
        successMessage.style.display = 'none';

        // Validate all fields
        const isNameValid = validateField(nameInput, nameError, validateName);
        const isEmailValid = validateField(emailInput, emailError, validateEmail);
        const isSubjectValid = validateField(subjectInput, subjectError, validateSubject);
        const isMessageValid = validateField(messageInput, messageError, validateMessage);

        // If all fields are valid
        if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
            // Disable submit button
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';

            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                // Show success message
                successMessage.style.display = 'block';
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

                // Reset form
                contactForm.reset();

                // Re-enable submit button
                submitButton.disabled = false;
                submitButton.textContent = 'Send Message';

                // Clear all error states
                clearError(nameError, nameInput);
                clearError(emailError, emailInput);
                clearError(subjectError, subjectInput);
                clearError(messageError, messageInput);

                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000);
            }, 1000);
        } else {
            // Focus on first invalid field
            if (!isNameValid) {
                nameInput.focus();
            } else if (!isEmailValid) {
                emailInput.focus();
            } else if (!isSubjectValid) {
                subjectInput.focus();
            } else if (!isMessageValid) {
                messageInput.focus();
            }
        }
    });

    // Prevent form submission on Enter key (except in textarea)
    contactForm.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
            e.preventDefault();
        }
    });
}