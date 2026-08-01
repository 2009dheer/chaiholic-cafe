import React, { useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Instagram, Play } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reels = [
  { id: "C6EX4ooSd40", views: "13.1M" },
  { id: "C6ToN9dSZ-Q", views: "3.6M" },
  { id: "C5i5uA2y55M", views: "1.7M" }
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

        <div ref={cardsRef} className="flex flex-wrap justify-center gap-8 items-center">
          {reels.map((reel, index) => (
            <div key={index} className="relative bg-white rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform transition-transform hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(193,53,132,0.3)] duration-500 w-[320px] h-[580px]">
              <div className="absolute top-4 left-4 z-20 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-white/20">
                <Play className="w-3 h-3 fill-white" /> {reel.views} Views
              </div>
              <iframe 
                src={`https://www.instagram.com/reel/${reel.id}/embed`}
                width="320"
                height="580"
                frameBorder="0"
                scrolling="no"
                allowTransparency={true}
                className="w-full h-full relative z-10"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramReels;
