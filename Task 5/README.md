# Accessible UI Components

This project contains three reusable, accessible UI components implemented in vanilla JavaScript:
1. Modal Dialog
2. Tabbed Content
3. Carousel/Slider

## Features

- Pure JavaScript implementation (no dependencies)
- WAI-ARIA compliant
- Keyboard navigation support
- Touch support for carousel
- Focus management
- Unit tests

## Components API

### Modal

```javascript
const modal = new Modal({
    element: document.getElementById('myModal'),      // Required: Modal container element
    openButton: document.getElementById('openBtn')    // Required: Button to open modal
});
```

Methods:
- `open()`: Opens the modal
- `close()`: Closes the modal

### Tabs

```javascript
const tabs = new Tabs({
    element: document.getElementById('myTabs')    // Required: Tabs container element
});
```

The tabs container should follow this structure:
```html
<div id="myTabs">
    <div role="tablist">
        <button role="tab">Tab 1</button>
        ...
    </div>
    <div>
        <div role="tabpanel">Panel 1</div>
        ...
    </div>
</div>
```

### Carousel

```javascript
const carousel = new Carousel({
    element: document.getElementById('myCarousel'),   // Required: Carousel container
    autoplay: true,                                  // Optional: Enable autoplay
    interval: 5000                                   // Optional: Autoplay interval in ms
});
```

Methods:
- `next()`: Go to next slide
- `prev()`: Go to previous slide
- `goToSlide(index)`: Go to specific slide
- `startAutoplay()`: Start automatic slideshow
- `stopAutoplay()`: Stop automatic slideshow

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

## Development

Run the development server:
```bash
npm start
```

## Testing

Run the test suite:
```bash
npm test
```

## Accessibility Features

### Modal
- Focus trap within modal
- ESC key closes modal
- Focus returns to trigger element
- ARIA attributes for screen readers

### Tabs
- Arrow key navigation
- ARIA attributes
- Proper focus management
- Home/End key support

### Carousel
- Touch swipe support
- Keyboard navigation
- ARIA labels
- Pause on hover/focus

## Browser Support

Tested and supported in:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)