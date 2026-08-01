import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax effect on video and overlay
      gsap.to(videoRef.current, {
        scale: 1.1,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });

      gsap.to(overlayRef.current, {
        backgroundColor: 'rgba(0, 0, 0, 0.8)', // Darkens on scroll
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });
    }, sectionRef);

    // Counter animation
    let start = 0;
    const end = 16;
    const duration = 2000;
    const incrementTime = (duration / end);
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => {
      ctx.revert();
      clearInterval(timer);
    };
  }, []);

  return (
    <section id="home" ref={sectionRef} className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-black">
      {/* Video Background */}
      <video
        ref={videoRef}
        src="/hero_video.mp4"
        autoPlay
        loop
        muted
        playsInline
        onTimeUpdate={(e) => {
          const video = e.currentTarget;
          if (video.duration && video.currentTime >= video.duration - 5) {
            video.currentTime = 0;
            video.play();
          }
        }}
        className="absolute inset-0 w-full h-full object-cover transform origin-center"
      />

      {/* Gradient Overlay */}
      <div 
        ref={overlayRef}
        className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60 pointer-events-none"
      />

      {/* Floating Particles (Simulated with div loop) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div key={i} className={`particle absolute bg-[#D4A64A] rounded-full opacity-60 w-1 h-1 shadow-[0_0_8px_#D4A64A] animate-pulse`} 
               style={{ 
                 top: `${Math.random() * 100}%`, 
                 left: `${Math.random() * 100}%`,
                 animationDelay: `${Math.random() * 2}s`,
                 animationDuration: `${3 + Math.random() * 3}s`
               }} 
          />
        ))}
      </div>

      {/* Center Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        <motion.img
          src="/chaiholic_homepage_logo.png"
          alt="Chaiholic Logo Large"
          className="w-64 md:w-96 lg:w-[500px] mb-8 invert grayscale brightness-200 contrast-200 mix-blend-screen"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
        
        <motion.div
          className="flex items-center space-x-3 bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/20 shadow-lg"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <div className="w-2 h-2 rounded-full bg-[#D4A64A] animate-pulse"></div>
          <span className="text-[#F8FAFC] font-montserrat text-sm md:text-base font-medium tracking-wide">
            {count}+ Outlets Across India
          </span>
          <div className="w-2 h-2 rounded-full bg-[#D4A64A] animate-pulse"></div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center gap-4 mt-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <a href="#franchise" className="px-8 py-3 bg-[#D4A64A] text-[#0c0054] font-montserrat font-bold tracking-wider rounded-full hover:bg-white hover:text-[#0c0054] transition-all duration-300 shadow-[0_0_20px_rgba(212,166,74,0.4)] hover:shadow-[0_0_25px_rgba(255,255,255,0.6)]">
            APPLY FOR FRANCHISE
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center scroll-indicator">
        <span className="font-montserrat text-[9px] uppercase tracking-widest text-white/80 mb-2">
          Scroll to Explore
        </span>
        <div className="w-4 h-6 border-2 border-white/50 rounded-full flex justify-center items-start p-[2px]">
          <div className="w-1 h-1 bg-[#D4A64A] rounded-full animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
