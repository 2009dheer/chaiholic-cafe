import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);
  const colsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (colsRef.current) {
        gsap.fromTo(
          colsRef.current.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top 85%',
            }
          }
        );
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer id="footer" ref={footerRef} className="relative bg-[#0c0054] text-[#F8FAFC] border-t border-white/10 pt-20 pb-8 overflow-hidden z-10">
      {/* Decorative Large Background Text */}
      <div className="absolute top-0 left-0 w-full overflow-hidden flex justify-center pointer-events-none select-none">
        <h1 className="font-display text-[12vw] leading-none font-bold text-white/5 tracking-tighter whitespace-nowrap mt-[-2%]">
          CHAIHOLIC
        </h1>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div ref={colsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Column 1: Brand */}
          <div className="flex flex-col space-y-6">
            <div className="flex items-center space-x-4">
              <img src="/clean_logo.png" alt="Chaiholic Icon" className="h-12 invert brightness-0" style={{ filter: 'invert(1)' }} />
              <img src="/chaiholic_homepage_logo.png" alt="Chaiholic Logo" className="h-10 invert brightness-0 grayscale opacity-80" style={{ filter: 'invert(1)' }} />
            </div>
            <p className="font-sans text-white/70 leading-relaxed max-w-xs">
              A premium modern cafe blending authentic traditional flavors with contemporary luxury. Experience the magic of perfectly brewed moments.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-serif text-xl text-[#D4A64A] mb-6 border-b border-white/10 pb-4 inline-block">Explore</h3>
            <ul className="space-y-3 font-montserrat text-sm">
              {['Home', 'Signature Teas', 'Menu', 'Outlets', 'Franchise'].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase().replace(' ', '-')}`} className="text-white/80 hover:text-[#D4A64A] transition-colors duration-300 flex items-center group">
                    <span className="w-2 h-[1px] bg-[#D4A64A] mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="font-serif text-xl text-[#D4A64A] mb-6 border-b border-white/10 pb-4 inline-block">Contact Us</h3>
            <ul className="space-y-5">
              <li className="flex items-start space-x-4">
                <MapPin className="text-[#D4A64A] shrink-0 mt-1" size={20} />
                <span className="font-sans text-white/80 text-sm leading-relaxed">
                  Model Town, Vidya Niketan School Road<br/>
                  (Opposite Raymond Store), Rohtak, Haryana
                </span>
              </li>
              <li className="flex items-center space-x-4">
                <Phone className="text-[#D4A64A] shrink-0" size={20} />
                <span className="font-sans text-white/80 text-sm">+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-4">
                <Mail className="text-[#D4A64A] shrink-0" size={20} />
                <span className="font-sans text-white/80 text-sm">hello@chaiholic.com</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Opening Times */}
          <div>
            <h3 className="font-serif text-xl text-[#D4A64A] mb-6 border-b border-white/10 pb-4 inline-block">Hours</h3>
            <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="flex flex-col space-y-4">
                <div className="flex justify-between items-center border-b border-white/10 pb-3">
                  <span className="font-montserrat text-sm text-white/80">Mon - Sun</span>
                  <span className="font-sans font-semibold text-[#D4A64A]">9:00 AM - 11:00 PM</span>
                </div>
                <div className="flex items-center space-x-3 text-white/60 pt-2">
                  <Clock size={16} className="text-[#D4A64A]" />
                  <span className="font-sans text-xs">Open on all National holidays</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="font-montserrat text-xs text-white/50">
            &copy; 2026 Chaiholic Cafe. All rights reserved.
          </p>
          <div className="flex items-center space-x-3">
            <span className="font-montserrat text-xs text-white/50">Designed by</span>
            <img src="/weblyfy_logo.jpeg" alt="Weblyfy" className="h-6 rounded-md opacity-80 hover:opacity-100 transition-opacity grayscale hover:grayscale-0" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
