import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useScrollAnimation = () => {
  useEffect(() => {
    // Individual card animations
    const cards = document.querySelectorAll('[data-card]');
    cards.forEach((card) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: card,
            start: 'top bottom-=100',
            toggleActions: 'play none none reverse',
            // Uncomment to debug scroll triggers
            // markers: true
          },
        }
      );
    });

    // Stagger container animations
    const staggerContainers = document.querySelectorAll('[data-animation="stagger"]');
    staggerContainers.forEach((container) => {
      const items = container.querySelectorAll('[data-stagger]');
      gsap.fromTo(
        items,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: {
            each: 0.2,
            from: 'start',
          },
          scrollTrigger: {
            trigger: container,
            start: 'top bottom-=100',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    // Other animations remain the same
    const fadeUpElements = document.querySelectorAll('[data-animation="fade-up"]');
    fadeUpElements.forEach((element) => {
      gsap.fromTo(
        element,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: element,
            start: 'top bottom-=100',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
};