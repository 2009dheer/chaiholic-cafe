import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface GallerySectionProps {
  onImageClick: (src: string) => void;
}

const galleryItems = [
  { title: 'Cozy Celebrations', desc: 'Festive lights and warm holiday setup', url: '/gallery_christmas.jpeg' },
  { title: 'Signature Poha', desc: 'Delicious tempered poha with herbs', url: '/gallery_poha.jpeg' },
  { title: 'Our Iconic Facade', desc: 'Spread love and good vibes', url: '/gallery_storefront.png' },
  { title: 'Pure Kulhad Magic', desc: 'Authentic steaming clay cup chai', url: '/gallery_kulhad_chai.png' },
  { title: 'Chaiholic Vibes', desc: 'Take a stroll inside our cafe', url: '/gallery_video.mp4', isVideo: true }
];

export default function GallerySection({ onImageClick }: GallerySectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerElementsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerElementsRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Duplicate items to ensure seamless scrolling
  const scrollItems = [...galleryItems, ...galleryItems, ...galleryItems];

  return (
    <section 
      id="gallery" 
      ref={sectionRef}
      className="py-24 bg-dark-blue overflow-hidden"
    >
      <div className="container mx-auto px-6 mb-16 text-center max-w-4xl relative z-10">
        <h3 
          ref={el => headerElementsRef.current[0] = el}
          className="font-serif italic text-gold-accent text-2xl md:text-3xl mb-4"
        >
          Visual Ambience
        </h3>
        <h2 
          ref={el => headerElementsRef.current[1] = el}
          className="font-serif text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
        >
          The Cozy Corner Gallery
        </h2>
        <div 
          ref={el => headerElementsRef.current[2] = el as HTMLElement}
          className="w-24 h-1 bg-gold-accent mx-auto rounded-full mb-6"
        ></div>
        <p 
          ref={el => headerElementsRef.current[3] = el}
          className="font-sans text-white/70 text-lg md:text-xl font-light"
        >
          Immerse yourself in the atmosphere of Chaiholic Cafe. 
          A place where every corner tells a story and every cup warms the soul.
        </p>
      </div>

      {/* Marquee Gallery */}
      <div className="relative flex overflow-hidden group py-4">
        <div className="flex gap-6 animate-marquee hover:[animation-play-state:paused] w-max">
          {scrollItems.map((item, idx) => (
            <div 
              key={idx}
              className="shrink-0 w-[350px] relative cursor-pointer group/card glass-card-dark border border-white/15"
              onClick={() => onImageClick(item.url)}
            >
              <div className="h-[420px] overflow-hidden relative">
                <div className="absolute inset-0 image-glare opacity-0 group-hover/card:opacity-100 z-10 pointer-events-none"></div>
                {item.isVideo ? (
                  <video 
                    src={item.url} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                  />
                ) : (
                  <img 
                    src={item.url} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                    loading="lazy"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover/card:opacity-80 transition-opacity duration-300"></div>
                
                <div className="absolute bottom-0 left-0 w-full p-6 translate-y-4 group-hover/card:translate-y-0 transition-transform duration-300 z-20">
                  <h4 className="font-serif text-white text-xl font-bold mb-1">{item.title}</h4>
                  <p className="font-sans text-white/70 text-sm">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
