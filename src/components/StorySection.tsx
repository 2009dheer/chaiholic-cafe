import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const StorySection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  
  const [stats, setStats] = useState({ outlets: 0, states: 0, customers: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header stagger reveal
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.2,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 80%',
            }
          }
        );
      }

      // Card animation
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardRef.current,
              start: 'top 85%',
            }
          }
        );
      }

      // Parallax image
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          yPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        });
      }

      // Stats Count Up
      ScrollTrigger.create({
        trigger: '.stats-row',
        start: 'top 90%',
        once: true,
        onEnter: () => {
          gsap.to({}, {
            duration: 2,
            onUpdate: function() {
              const progress = this.progress();
              setStats({
                outlets: Math.floor(16 * progress),
                states: Math.floor(5 * progress),
                customers: Math.floor(1000 * progress)
              });
            }
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="story" ref={sectionRef} className="relative py-24 bg-gradient-to-b from-[#F8FAFC] to-[#FDFBF7] overflow-hidden">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-[#4A82B8] opacity-20 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#D4A64A] opacity-20 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 flex flex-col items-center">
          <h3 className="font-hand text-4xl md:text-5xl text-[#D4A64A] mb-2">Our Story</h3>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#2B5C8F] font-bold mb-6 tracking-tight">Tradition Meets Modernity</h2>
          <div className="w-24 h-1 bg-[#D4A64A] mx-auto mb-8"></div>
          <p className="max-w-3xl text-[#1A1A1A]/80 font-sans text-lg md:text-xl leading-relaxed">
            Born from a passion for authentic flavors and contemporary spaces, Chaiholic reimagines the classic tea-drinking experience. We blend generations of tea mastery with the energy of a modern cafe.
          </p>
        </div>

        {/* Main Card */}
        <div ref={cardRef} className="glass-card-dark rounded-[2.5rem] p-8 md:p-12 lg:p-16 mb-16 relative overflow-hidden">
          {/* subtle noise texture could go here */}
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            {/* Left Column */}
            <div className="lg:col-span-7 text-[#F8FAFC]">
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#D4A64A]/20 text-[#D4A64A] font-montserrat text-sm font-semibold tracking-wider mb-6 border border-[#D4A64A]/30">
                VISIONARY LEADERSHIP
              </span>
              <h3 className="font-serif text-4xl md:text-5xl mb-6">Meet the Founder</h3>
              <div className="pl-6 border-l-4 border-[#D4A64A] mb-8">
                <h4 className="font-montserrat text-2xl md:text-3xl font-bold">Rishabh Gulati</h4>
                <p className="text-[#F8FAFC]/70 mt-1 font-sans">Founder & CEO</p>
              </div>
              <p className="font-sans text-lg leading-relaxed text-white/80">
                Rishabh envisioned a sanctuary where the hustle of the city pauses for a perfect cup of chai. 
                With an unwavering commitment to quality and community, he transformed a simple idea into a 
                rapidly growing phenomenon, bringing premium, handcrafted beverages to neighborhoods across India.
              </p>
            </div>

            {/* Right Column (Image) */}
            <div className="lg:col-span-5 h-[400px] md:h-[500px] rounded-3xl overflow-hidden relative shadow-xl">
              <img 
                ref={imageRef}
                src="/founder.jpeg" 
                alt="Rishabh Gulati - Founder" 
                className="w-full h-[120%] object-cover absolute top-[-10%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/90 via-[#1A1A1A]/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-center">
                <p className="font-hand text-4xl text-[#D4A64A] drop-shadow-lg">"Redefining chai culture."</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="stats-row grid grid-cols-1 md:grid-cols-3 gap-8 text-center border-t border-[#1A1A1A]/10 pt-12">
          <div>
            <div className="font-serif text-5xl text-[#2B5C8F] font-bold mb-2">{stats.outlets}+</div>
            <div className="font-montserrat text-sm tracking-widest text-[#1A1A1A]/60 uppercase">Outlets</div>
          </div>
          <div>
            <div className="font-serif text-5xl text-[#2B5C8F] font-bold mb-2">{stats.states}</div>
            <div className="font-montserrat text-sm tracking-widest text-[#1A1A1A]/60 uppercase">States</div>
          </div>
          <div>
            <div className="font-serif text-5xl text-[#2B5C8F] font-bold mb-2">{stats.customers}+</div>
            <div className="font-montserrat text-sm tracking-widest text-[#1A1A1A]/60 uppercase">Happy Customers Daily</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
