document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle?.addEventListener('click', () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        navLinks?.classList.toggle('active');
    });

    // Form validation
    const form = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');

    const validators = {
        name: (value) => {
            if (!value.trim()) return 'Name is required';
            if (value.trim().length < 2) return 'Name must be at least 2 characters';
            return '';
        },
        email: (value) => {
            if (!value.trim()) return 'Email is required';
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) return 'Please enter a valid email address';
            return '';
        },
        message: (value) => {
            if (!value.trim()) return 'Message is required';
            if (value.trim().length < 10) return 'Message must be at least 10 characters';
            return '';
        }
    };

    const showError = (field, message) => {
        const errorElement = document.getElementById(`${field}-error`);
        if (errorElement) {
            errorElement.textContent = message;
            document.getElementById(field)?.setAttribute('aria-invalid', 'true');
        }
    };

    const clearError = (field) => {
        const errorElement = document.getElementById(`${field}-error`);
        if (errorElement) {
            errorElement.textContent = '';
            document.getElementById(field)?.removeAttribute('aria-invalid');
        }
    };

    // Real-time validation
    Object.keys(validators).forEach(field => {
        const input = document.getElementById(field);
        input?.addEventListener('input', () => {
            const error = validators[field](input.value);
            if (error) {
                showError(field, error);
            } else {
                clearError(field);
            }
        });
    });

    // Form submission
    form?.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Validate all fields
        let hasErrors = false;
        Object.keys(validators).forEach(field => {
            const input = document.getElementById(field);
            if (input) {
                const error = validators[field](input.value);
                if (error) {
                    showError(field, error);
                    hasErrors = true;
                } else {
                    clearError(field);
                }
            }
        });

        if (hasErrors) return;

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Show success message
            if (form && formSuccess) {
                form.reset();
                form.style.display = 'none';
                formSuccess.hidden = false;
            }
        } catch (error) {
            alert('An error occurred. Please try again later.');
        }
    });
});