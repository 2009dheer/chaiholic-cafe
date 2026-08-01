import { useState, useEffect, useCallback } from 'react';

interface ScrollProgress {
  progress: number; // 0-1 normalized scroll progress
  scrollY: number;
  direction: 'up' | 'down';
  activeSection: number;
  velocity: number;
}

export function useScrollProgress(sectionIds: string[]): ScrollProgress {
  const [state, setState] = useState<ScrollProgress>({
    progress: 0,
    scrollY: 0,
    direction: 'down',
    activeSection: 0,
    velocity: 0,
  });

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? Math.min(scrollY / maxScroll, 1) : 0;

    // Determine active section
    let activeSection = 0;
    const viewportCenter = scrollY + window.innerHeight / 2;
    
    for (let i = sectionIds.length - 1; i >= 0; i--) {
      const el = document.getElementById(sectionIds[i]);
      if (el && viewportCenter >= el.offsetTop) {
        activeSection = i;
        break;
      }
    }

    setState(prev => ({
      progress,
      scrollY,
      direction: scrollY > prev.scrollY ? 'down' : 'up',
      activeSection,
      velocity: Math.abs(scrollY - prev.scrollY),
    }));
  }, [sectionIds]);

  useEffect(() => {
    let rafId: number;
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        rafId = requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [handleScroll]);

  return state;
}

export default useScrollProgress;
