// Import GSAP from CDN
import { gsap } from "https://cdn.skypack.dev/gsap";
import { ScrollTrigger } from "https://cdn.skypack.dev/gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Navbar Animation
function initNavbarAnimation() {
    const nav = document.querySelector('nav');
    const navItems = nav.querySelectorAll('ul li');
    
    // Create navbar slide-in animation
    gsap.fromTo(nav, {
        y: -100,
        opacity: 0
    }, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out"
    });

    // Animate nav items with stagger
    gsap.fromTo(navItems, {
        y: -20,
        opacity: 0
    }, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        delay: 0.5
    });
}

// Button Hover Animations
function initButtonAnimations() {
    // Generic function to handle button hover animations
    function createButtonAnimation(button) {
        const timeline = gsap.timeline({ paused: true });
        
        timeline
            .to(button, {
                scale: 1.05,
                duration: 0.3,
                ease: "power2.out"
            })
            .to(button, {
                scale: 1,
                duration: 0.2,
                ease: "power1.in"
            })
            .to(button, {
                scale: 1.02,
                duration: 0.2,
                ease: "power2.out"
            });

        button.addEventListener("mouseenter", () => timeline.restart());
        button.addEventListener("mouseleave", () => {
            gsap.to(button, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    }

    // Apply to all buttons
    document.querySelectorAll('.cta-button, .nav-cta, .form-submit').forEach(createButtonAnimation);
}

// Hero Section Animations
function initHeroAnimations() {
    const heroTimeline = gsap.timeline();

    heroTimeline
        .from(".badge", {
            y: -50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        })
        .from(".glitch", {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        }, "-=0.5")
        .from(".subtitle", {
            y: 30,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        }, "-=0.7")
        .from(".cta-group", {
            y: 30,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        }, "-=0.7")
        .from(".stats", {
            y: 30,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        }, "-=0.5");
}

// Scroll-triggered animations
function initScrollAnimations() {
    // Features section animations
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top bottom-=100",
                toggleActions: "play none none reverse"
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.2,
            ease: "power2.out"
        });
    });

    // AI Demo section animations
    const demoSteps = document.querySelectorAll('.demo-steps .step');
    
    demoSteps.forEach((step, index) => {
        gsap.from(step, {
            scrollTrigger: {
                trigger: step,
                start: "top bottom-=50",
                toggleActions: "play none none reverse"
            },
            x: -50,
            opacity: 0,
            duration: 0.6,
            delay: index * 0.15,
            ease: "power2.out"
        });
    });

    // Waitlist section animation
    gsap.from(".waitlist-content", {
        scrollTrigger: {
            trigger: ".waitlist",
            start: "top center+=100",
            toggleActions: "play none none reverse"
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });

    // Background shapes parallax effect
    gsap.to(".shape", {
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: 1
        },
        y: (i, target) => (target.classList.contains("shape-1") ? 100 : -100),
        rotation: (i, target) => target.classList.contains("shape-1") ? 360 : -360,
        ease: "none"
    });
}

// Footer Animation
function initFooterAnimation() {
    gsap.from(".footer-content > *", {
        scrollTrigger: {
            trigger: ".footer",
            start: "top bottom-=100",
            toggleActions: "play none none reverse"
        },
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out"
    });
}

// Form Success Animation
function initFormAnimation() {
    const form = document.getElementById('waitlistForm');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = form.querySelector('.form-submit');
        const timeline = gsap.timeline();
        
        timeline
            .to(submitBtn, {
                scale: 0.95,
                duration: 0.1
            })
            .to(submitBtn, {
                scale: 1,
                duration: 0.2,
                ease: "bounce.out"
            })
            .to('.button-text', {
                y: 20,
                opacity: 0,
                duration: 0.2
            })
            .to('.button-success', {
                y: 0,
                opacity: 1,
                duration: 0.2
            }, "-=0.2");
    });
}

// Initialize all animations
function initAnimations() {
    // Initial animations
    initNavbarAnimation();
    initButtonAnimations();
    initHeroAnimations();
    
    // Scroll-based animations
    initScrollAnimations();
    initFooterAnimation();
    
    // Interactive animations
    initFormAnimation();
}

// Run animations when DOM is loaded
document.addEventListener('DOMContentLoaded', initAnimations);