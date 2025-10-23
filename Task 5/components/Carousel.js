class Carousel {
    constructor(options = {}) {
        this.container = options.element;
        this.slides = Array.from(this.container.querySelectorAll('.carousel-slide'));
        this.prevButton = this.container.querySelector('.carousel-prev');
        this.nextButton = this.container.querySelector('.carousel-next');
        this.dotsContainer = this.container.querySelector('.carousel-dots');
        
        this.currentIndex = 0;
        this.touchStartX = 0;
        this.touchEndX = 0;
        
        this.options = {
            autoplay: options.autoplay || false,
            interval: options.interval || 5000,
            ...options
        };

        this.init();
    }

    init() {
        // Create dots
        this.slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.setAttribute('role', 'tab');
            dot.setAttribute('aria-label', `Slide ${index + 1}`);
            dot.addEventListener('click', () => this.goToSlide(index));
            this.dotsContainer.appendChild(dot);
        });

        // Add event listeners
        this.prevButton.addEventListener('click', () => this.prev());
        this.nextButton.addEventListener('click', () => this.next());
        this.container.addEventListener('touchstart', (e) => this.handleTouchStart(e));
        this.container.addEventListener('touchend', (e) => this.handleTouchEnd(e));
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));

        // Initialize state
        this.updateSlides();

        // Start autoplay if enabled
        if (this.options.autoplay) {
            this.startAutoplay();
        }
    }

    updateSlides() {
        this.slides.forEach((slide, index) => {
            if (index === this.currentIndex) {
                slide.style.display = 'block';
                slide.setAttribute('aria-hidden', 'false');
            } else {
                slide.style.display = 'none';
                slide.setAttribute('aria-hidden', 'true');
            }
        });

        // Update dots
        Array.from(this.dotsContainer.children).forEach((dot, index) => {
            dot.setAttribute('aria-selected', index === this.currentIndex);
            dot.classList.toggle('active', index === this.currentIndex);
        });
    }

    goToSlide(index) {
        this.currentIndex = index;
        this.updateSlides();
    }

    next() {
        this.currentIndex = (this.currentIndex + 1) % this.slides.length;
        this.updateSlides();
    }

    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        this.updateSlides();
    }

    handleTouchStart(e) {
        this.touchStartX = e.touches[0].clientX;
    }

    handleTouchEnd(e) {
        this.touchEndX = e.changedTouches[0].clientX;
        const diff = this.touchStartX - this.touchEndX;
        
        if (Math.abs(diff) > 50) { // Minimum swipe distance
            if (diff > 0) {
                this.next();
            } else {
                this.prev();
            }
        }
    }

    handleKeyDown(e) {
        if (!this.container.contains(document.activeElement)) return;

        switch(e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                this.prev();
                break;
            case 'ArrowRight':
                e.preventDefault();
                this.next();
                break;
        }
    }

    startAutoplay() {
        this.autoplayInterval = setInterval(() => this.next(), this.options.interval);
    }

    stopAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
        }
    }
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Carousel;
}