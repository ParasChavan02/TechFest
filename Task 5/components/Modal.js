class Modal {
    constructor(options = {}) {
        this.modalElement = options.element;
        this.openButton = options.openButton;
        this.closeButton = this.modalElement.querySelector('.modal-close');
        this.focusableElements = this.getFocusableElements();
        this.firstFocusable = this.focusableElements[0];
        this.lastFocusable = this.focusableElements[this.focusableElements.length - 1];
        this.isOpen = false;
        this.previousActiveElement = null;
        
        this.init();
    }

    getFocusableElements() {
        return Array.from(this.modalElement.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        ));
    }

    init() {
        this.openButton.addEventListener('click', () => this.open());
        this.closeButton.addEventListener('click', () => this.close());
        this.modalElement.addEventListener('keydown', (e) => this.handleKeyDown(e));
        this.modalElement.addEventListener('click', (e) => {
            if (e.target === this.modalElement) this.close();
        });
    }

    open() {
        this.isOpen = true;
        this.previousActiveElement = document.activeElement;
        this.modalElement.setAttribute('aria-hidden', 'false');
        this.modalElement.style.display = 'flex';
        this.closeButton.focus();
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.isOpen = false;
        this.modalElement.setAttribute('aria-hidden', 'true');
        this.modalElement.style.display = 'none';
        document.body.style.overflow = '';
        if (this.previousActiveElement) {
            this.previousActiveElement.focus();
        }
    }

    handleKeyDown(e) {
        if (!this.isOpen) return;

        if (e.key === 'Escape') {
            e.preventDefault();
            this.close();
        }

        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === this.firstFocusable) {
                    e.preventDefault();
                    this.lastFocusable.focus();
                }
            } else {
                if (document.activeElement === this.lastFocusable) {
                    e.preventDefault();
                    this.firstFocusable.focus();
                }
            }
        }
    }
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Modal;
}