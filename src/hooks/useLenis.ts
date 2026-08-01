import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useLenis() {
  const scrollTo = (target: string | number | HTMLElement, options?: { offset?: number; duration?: number }) => {
    if (typeof target === 'string') {
      const el = document.querySelector(target);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const stop = () => {};
  const start = () => {};

  return { scrollTo, stop, start, lenis: { current: null } };
}

export default useLenis;
