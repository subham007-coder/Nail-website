import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useAnimation(elementRef, options = {}) {
  useEffect(() => {
    if (!elementRef.current) return;

    const animation = gsap.from(elementRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: elementRef.current,
        start: 'top bottom-=100',
        end: 'bottom top+=100',
        toggleActions: 'play none none reverse',
        ...options,
      },
    });

    return () => {
      animation.kill();
    };
  }, [elementRef, options]);
}