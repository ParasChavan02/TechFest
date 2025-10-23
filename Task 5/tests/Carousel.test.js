const Carousel = require('../components/Carousel');

describe('Carousel', () => {
    let carousel;
    let container;
    
    beforeEach(() => {
        document.body.innerHTML = `
            <div id="carousel">
                <div class="carousel-container">
                    <div class="carousel-slide">Slide 1</div>
                    <div class="carousel-slide">Slide 2</div>
                    <div class="carousel-slide">Slide 3</div>
                </div>
                <button class="carousel-prev">←</button>
                <button class="carousel-next">→</button>
                <div class="carousel-dots"></div>
            </div>
        `;
        
        container = document.getElementById('carousel');
        carousel = new Carousel({ element: container });
    });

    test('Carousel initializes with first slide visible', () => {
        const slides = container.querySelectorAll('.carousel-slide');
        expect(slides[0].style.display).toBe('block');
        expect(slides[1].style.display).toBe('none');
    });

    test('Next button advances to next slide', () => {
        const nextButton = container.querySelector('.carousel-next');
        nextButton.click();
        
        const slides = container.querySelectorAll('.carousel-slide');
        expect(slides[0].style.display).toBe('none');
        expect(slides[1].style.display).toBe('block');
    });

    test('Previous button goes to previous slide', () => {
        carousel.next(); // Go to slide 2
        const prevButton = container.querySelector('.carousel-prev');
        prevButton.click();
        
        const slides = container.querySelectorAll('.carousel-slide');
        expect(slides[0].style.display).toBe('block');
        expect(slides[1].style.display).toBe('none');
    });
});