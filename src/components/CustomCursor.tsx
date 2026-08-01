import React, { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const requestRef = useRef<number>();
  const mouse = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Check if device supports hover
    const mq = window.matchMedia('(pointer: coarse)');
    setIsTouchDevice(mq.matches);

    const checkTouch = (e: MediaQueryListEvent) => setIsTouchDevice(e.matches);
    mq.addEventListener('change', checkTouch);

    if (mq.matches) return () => mq.removeEventListener('change', checkTouch);

    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      
      // Update dot position immediately
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Check hover state for custom-cursor-pointer
      const target = e.target as HTMLElement;
      const isPointer = window.getComputedStyle(target).cursor === 'pointer' || 
                        target.closest('[data-cursor="pointer"]') !== null ||
                        target.tagName.toLowerCase() === 'a' ||
                        target.tagName.toLowerCase() === 'button';
      setIsHovering(isPointer);
    };

    const updateRing = () => {
      // Spring physics for ring
      ringPos.current.x += (mouse.current.x - ringPos.current.x) * 0.15;
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * 0.15;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      requestRef.current = requestAnimationFrame(updateRing);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    requestRef.current = requestAnimationFrame(updateRing);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      mq.removeEventListener('change', checkTouch);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      <div 
        ref={dotRef}
        className={`fixed top-0 left-0 w-3 h-3 bg-[#D4A64A] rounded-full pointer-events-none z-[9999] mix-blend-difference -ml-1.5 -mt-1.5 transition-transform duration-200 ease-out will-change-transform ${isHovering ? 'scale-[3]' : 'scale-100'}`}
      />
      <div 
        ref={ringRef}
        className={`fixed top-0 left-0 w-10 h-10 border-[1.5px] border-[#D4A64A] rounded-full pointer-events-none z-[9998] mix-blend-difference -ml-5 -mt-5 transition-opacity duration-200 will-change-transform ${isHovering ? 'opacity-0 scale-50' : 'opacity-100 scale-100'}`}
      />
    </>
  );
}
