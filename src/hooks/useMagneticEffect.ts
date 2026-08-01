import { useEffect, useRef, useCallback } from 'react';

interface MagneticOptions {
  strength?: number; // 0-1, default 0.3
  radius?: number; // pixels, default 100
}

export function useMagneticEffect<T extends HTMLElement>(options: MagneticOptions = {}) {
  const ref = useRef<T>(null);
  const { strength = 0.3, radius = 100 } = options;

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distX = e.clientX - centerX;
    const distY = e.clientY - centerY;
    const distance = Math.sqrt(distX * distX + distY * distY);

    if (distance < radius) {
      const pull = (1 - distance / radius) * strength;
      el.style.transform = `translate(${distX * pull}px, ${distY * pull}px)`;
    } else {
      el.style.transform = 'translate(0px, 0px)';
    }
  }, [strength, radius]);

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (el) {
      el.style.transform = 'translate(0px, 0px)';
    }
  }, []);

  useEffect(() => {
    // Only apply on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const el = ref.current;
    if (!el) return;

    el.classList.add('magnetic-btn');

    window.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return ref;
}

export default useMagneticEffect;
