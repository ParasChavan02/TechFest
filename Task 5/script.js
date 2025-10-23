// Initialize components
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Modal
    const modal = new Modal({
        element: document.getElementById('demoModal'),
        openButton: document.getElementById('openModalBtn')
    });

    // Initialize Tabs
    const tabs = new Tabs({
        element: document.getElementById('demoTabs')
    });

    // Initialize Carousel
    const carousel = new Carousel({
        element: document.getElementById('demoCarousel'),
        autoplay: true,
        interval: 5000
    });
});