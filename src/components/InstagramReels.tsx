import React, { useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Instagram } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Genuine local media from @chaiholicindia
const reelsData = [
  { thumbnail: '/instagram/img1.jpg', url: 'https://www.instagram.com/chaiholicindia' },
  { thumbnail: '/instagram/img2.jpg', url: 'https://www.instagram.com/chaiholicindia' },
  { thumbnail: '/instagram/img3.jpg', url: 'https://www.instagram.com/chaiholicindia' },
  { thumbnail: '/instagram/img4.jpg', url: 'https://www.instagram.com/chaiholicindia' },
];

const InstagramReels: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (cardsRef.current && cardsRef.current.children) {
        gsap.fromTo(cardsRef.current.children,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power3.out', scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%'
          }}
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 bg-dark-blue overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-[#E1306C]/20 rounded-full mix-blend-screen filter blur-[100px] pointer-events-none transform -translate-x-1/2" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#F56040]/20 rounded-full mix-blend-screen filter blur-[120px] pointer-events-none transform translate-x-1/3" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div 
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="w-16 h-16 bg-gradient-to-tr from-[#FFDC80] via-[#F56040] to-[#C13584] rounded-2xl flex items-center justify-center shadow-2xl mb-6"
          >
            <Instagram className="text-white w-8 h-8" />
          </motion.div>
          <span className="font-serif italic text-white/70 text-xl mb-4">Going Viral</span>
          <h2 className="font-serif text-white text-4xl md:text-5xl font-bold mb-6">Loved by Millions</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#F56040] to-[#C13584] mb-6 rounded-full"></div>
          <p className="text-white/60 max-w-xl mx-auto font-sans">
            Our chai has taken the internet by storm! Watch our most viral moments directly from Instagram.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {reelsData.map((reel, index) => (
            <a 
              key={index}
              href={reel.url}
              target="_blank"
              rel="noopener noreferrer" 
              className="glass-card rounded-[2rem] overflow-hidden group/reel relative aspect-[9/16] block cursor-pointer transform transition-all duration-500 hover:-translate-y-2 hover:shadow-gold-glow"
            >
              <img 
                src={reel.thumbnail} 
                alt={`Instagram Reel ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover/reel:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
              <div className="absolute bottom-6 left-6 opacity-0 transform translate-y-4 transition-all duration-300 group-hover/reel:opacity-100 group-hover/reel:translate-y-0">
                <Instagram className="text-white w-6 h-6" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramReels;
