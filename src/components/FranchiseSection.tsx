import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'motion/react';
import { TrendingUp, Users, Crown, Rocket, Sparkles, Send } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Custom hook for cursor tracking glow effect
const useCursorGlow = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };
  return { position, handleMouseMove };
};

const FranchiseSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { position, handleMouseMove } = useCursorGlow();

  const [formData, setFormData] = useState({
    fullName: '', mobile: '', city: '', investment: ''
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background parallax
      gsap.to('.franchise-bg-video', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `*🔥 PREMIUM FRANCHISE INQUIRY 🔥*%0A%0A*Name:* ${formData.fullName}%0A*Mobile:* ${formData.mobile}%0A*City:* ${formData.city}%0A*Investment:* ${formData.investment}`;
    window.open(`https://wa.me/919812989816?text=${message}`, '_blank');
  };

  const features = [
    { icon: <TrendingUp />, title: "300% ROI", desc: "Industry leading returns within 14 months" },
    { icon: <Crown />, title: "Premium Brand", desc: "Recognized as the fastest growing cafe chain" },
    { icon: <Rocket />, title: "Turnkey Setup", desc: "From interior design to staff training" }
  ];

  return (
    <section 
      id="franchise" 
      ref={sectionRef} 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black py-32"
    >
      {/* 1. CINEMATIC BACKGROUND */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <video
          src="/hero_video.mp4"
          autoPlay loop muted playsInline
          onTimeUpdate={(e) => {
            const video = e.currentTarget;
            if (video.duration && video.currentTime >= video.duration - 5) {
              video.currentTime = 0;
              video.play();
            }
          }}
          className="franchise-bg-video absolute top-[-20%] left-0 w-full h-[140%] object-cover opacity-30"
        />
        {/* Complex Gradient Overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c0054] via-black/80 to-[#0c0054]/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold-accent/10 via-transparent to-transparent" />
      </div>

      {/* 2. FLOATING PARTICLES */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gold-accent rounded-full shadow-[0_0_10px_#D4A64A]"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight,
              opacity: Math.random() * 0.5 + 0.2 
            }}
            animate={{ 
              y: [null, Math.random() * -200 - 100],
              opacity: [null, 0] 
            }}
            transition={{ 
              duration: Math.random() * 5 + 5, 
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10" ref={containerRef}>
        <div className="flex flex-col xl:flex-row items-center gap-20">
          
          {/* LEFT: TYPOGRAPHY & HOLOGRAMS */}
          <div className="xl:w-1/2 w-full text-left">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="text-gold-accent animate-pulse" />
                <span className="text-gold-accent tracking-[0.3em] font-montserrat font-bold text-sm uppercase">Exclusive Opportunity</span>
                <div className="h-[1px] w-12 bg-gradient-to-r from-gold-accent to-transparent"></div>
              </div>

              <h2 className="font-display text-5xl md:text-7xl xl:text-8xl font-black text-white leading-[0.9] mb-6">
                OWN A <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-accent via-[#FFF2D8] to-gold-accent animate-gradient-x">
                  CHAIHOLIC
                </span> <br />
                <span className="text-transparent" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.2)' }}>
                  EMPIRE
                </span>
              </h2>

              <p className="text-white/60 font-sans text-xl md:text-2xl mb-12 max-w-xl font-light leading-relaxed">
                Step into the future of cafe franchising. We don't just build cafes; we engineer <strong className="text-white font-medium">highly profitable</strong> cinematic experiences.
              </p>

              {/* Holographic Feature Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {features.map((feature, idx) => (
                  <motion.div 
                    key={idx}
                    whileHover={{ y: -10, scale: 1.05 }}
                    className="relative group bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl p-6 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-gold-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="text-gold-accent mb-4">{feature.icon}</div>
                    <h4 className="text-white font-bold font-montserrat mb-2">{feature.title}</h4>
                    <p className="text-white/50 text-sm">{feature.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* RIGHT: THE ULTIMATE APPLICATION TERMINAL */}
          <div className="xl:w-1/2 w-full flex justify-center xl:justify-end">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1.2, type: "spring", bounce: 0.4 }}
              style={{ perspective: 2000 }}
              className="w-full max-w-lg relative"
            >
              {/* Animated Conic Gradient Border */}
              <div className="absolute -inset-[2px] bg-gradient-to-r from-gold-accent via-[#0c0054] to-[#0c0054] rounded-[2.5rem] opacity-70 blur-md animate-spin-slow" style={{ animationDuration: '8s' }} />
              
              <div 
                className="relative bg-[#0c0054]/80 backdrop-blur-3xl rounded-[2.5rem] p-6 md:p-10 overflow-hidden border border-white/10"
                onMouseMove={handleMouseMove}
              >
                {/* Mouse tracking glow */}
                <div 
                  className="pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-0 transition duration-300 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(212,166,74,0.15), transparent 40%)`
                  }}
                />

                <div className="relative z-10">
                  <div className="mb-10 text-center">
                    <h3 className="font-serif text-4xl text-white font-bold mb-3">Apply Now</h3>
                    <p className="text-white/50 text-sm font-sans">Strictly for serious investors ready to disrupt the market.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="group relative">
                      <input type="text" required placeholder=" "
                        className="peer w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-transparent focus:outline-none focus:border-gold-accent focus:bg-white/10 transition-all"
                        onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                      />
                      <label className="absolute left-5 top-4 text-white/40 transition-all peer-focus:-top-3 peer-focus:text-xs peer-focus:text-gold-accent peer-focus:bg-[#0c0054] peer-focus:px-2 peer-valid:-top-3 peer-valid:text-xs peer-valid:text-gold-accent peer-valid:bg-[#0c0054] peer-valid:px-2 pointer-events-none">
                        Full Name
                      </label>
                    </div>

                    <div className="group relative">
                      <input type="tel" required placeholder=" "
                        className="peer w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-transparent focus:outline-none focus:border-gold-accent focus:bg-white/10 transition-all"
                        onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                      />
                      <label className="absolute left-5 top-4 text-white/40 transition-all peer-focus:-top-3 peer-focus:text-xs peer-focus:text-gold-accent peer-focus:bg-[#0c0054] peer-focus:px-2 peer-valid:-top-3 peer-valid:text-xs peer-valid:text-gold-accent peer-valid:bg-[#0c0054] peer-valid:px-2 pointer-events-none">
                        Mobile Number
                      </label>
                    </div>

                    <div className="group relative">
                      <input type="text" required placeholder=" "
                        className="peer w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-transparent focus:outline-none focus:border-gold-accent focus:bg-white/10 transition-all"
                        onChange={(e) => setFormData({...formData, city: e.target.value})}
                      />
                      <label className="absolute left-5 top-4 text-white/40 transition-all peer-focus:-top-3 peer-focus:text-xs peer-focus:text-gold-accent peer-focus:bg-[#0c0054] peer-focus:px-2 peer-valid:-top-3 peer-valid:text-xs peer-valid:text-gold-accent peer-valid:bg-[#0c0054] peer-valid:px-2 pointer-events-none">
                        City of Interest
                      </label>
                    </div>

                    <div className="group relative">
                      <select required
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-gold-accent focus:bg-white/10 transition-all appearance-none"
                        onChange={(e) => setFormData({...formData, investment: e.target.value})}
                      >
                        <option value="" disabled selected className="text-black">Investment Budget</option>
                        <option value="15L - 25L" className="text-black">₹15 Lakhs - ₹25 Lakhs</option>
                        <option value="25L - 50L" className="text-black">₹25 Lakhs - ₹50 Lakhs</option>
                        <option value="50L+" className="text-black">₹50 Lakhs +</option>
                      </select>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full relative overflow-hidden group/btn mt-8 bg-gold-accent text-[#0c0054] font-black tracking-widest uppercase py-5 rounded-xl shadow-[0_0_40px_rgba(212,166,74,0.4)]"
                    >
                      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                      <span className="relative z-10 flex items-center justify-center gap-3">
                        INITIATE APPLICATION <Send className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
                      </span>
                    </motion.button>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default FranchiseSection;
