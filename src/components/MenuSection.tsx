import React, { useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Download } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface MenuSectionProps {
  onImageClick: (src: string) => void;
  onDownloadPdf: () => void;
}

const menuPages = [
  '/menu_1.png',
  '/menu_2.png',
  '/menu_3.png',
  '/menu_4.png',
  '/menu_5.png',
];

export default function MenuSection({ onImageClick, onDownloadPdf }: MenuSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -350, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 350, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header fade up
      gsap.fromTo(headerRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          }
        }
      );

      // Gallery slide in from right
      gsap.fromTo(galleryRef.current,
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: galleryRef.current,
            start: 'top 80%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="menu" 
      ref={sectionRef}
      className="py-24 bg-soft-white overflow-hidden relative"
    >
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div ref={headerRef} className="text-center mb-16 max-w-3xl mx-auto">
          <h3 className="font-hand text-gold-accent text-3xl md:text-4xl mb-4">
            Our Menu
          </h3>
          <h2 className="font-serif text-dark-blue text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Explore the Flavors
          </h2>
          <div className="w-24 h-1 bg-gold-accent mx-auto rounded-full mb-6"></div>
          <p className="font-sans text-charcoal/70 text-lg">
            From our signature kulhad chais to our freshly prepared snacks, 
            discover a menu crafted with love, tradition, and the finest ingredients.
          </p>
        </div>

        <div ref={galleryRef} className="relative mb-16 group">
          {/* Nav Buttons */}
          <button 
            onClick={scrollLeft}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg text-dark-blue hover:bg-gold-accent hover:text-white transition-colors opacity-0 group-hover:opacity-100 duration-300 md:left-0 md:-translate-x-1/2"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button 
            onClick={scrollRight}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg text-dark-blue hover:bg-gold-accent hover:text-white transition-colors opacity-0 group-hover:opacity-100 duration-300 md:right-0 md:translate-x-1/2"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Scroll Container */}
          <div 
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-8 px-4"
          >
            {menuPages.map((src, idx) => (
              <div 
                key={idx}
                className="shrink-0 snap-center cursor-pointer transition-transform duration-500 hover:-translate-y-2"
                onClick={() => onImageClick(src)}
              >
                <div className="w-[340px] md:w-[400px] h-[450px] md:h-[480px] glass-card rounded-xl shadow-cinematic overflow-hidden p-2 relative group/card">
                  <div className="absolute inset-0 image-glare opacity-0 group-hover/card:opacity-100 z-10 pointer-events-none"></div>
                  <img 
                    src={src} 
                    alt={`Menu Page ${idx + 1}`} 
                    className="w-full h-full object-cover rounded-lg"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <button 
            onClick={onDownloadPdf}
            className="flex items-center gap-3 px-8 py-4 border-2 border-gold-accent text-gold-accent hover:bg-gold-accent hover:text-white rounded-full transition-colors duration-300 font-sans font-medium uppercase tracking-wider text-sm"
          >
            <Download className="w-5 h-5" />
            Download Full Menu PDF
          </button>
        </div>
      </div>
    </section>
  );
}
