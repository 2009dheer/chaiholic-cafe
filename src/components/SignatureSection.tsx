import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const signatureChais = [
  {
    id: 'kesar',
    name: 'Royal Kashmiri Kesar Chai',
    price: '₹45',
    flavorNotes: 'Rich Saffron, Raw Honey, Creamy Milk',
    description: 'Our signature crown jewel, brewed slowly with original handpicked Kashmiri Kesar saffron threads, cardamom pods, and organic gold milk.',
    tag: 'Royal Luxury'
  },
  {
    id: 'special',
    name: 'Chaiholic Five-Spice Blend',
    price: '₹25',
    flavorNotes: 'Green Cardamom, Caper Clove, Ginger Dust',
    description: 'The blend that started it all. Rishabh\'s secret five-spice combination brewed for precisely 12 minutes.',
    tag: 'All-Time Best Seller'
  },
  {
    id: 'chocolate',
    name: 'Artisanal Cocoa Chocolate Chai',
    price: '₹40',
    flavorNotes: 'Ghanian Cocoa, Cardamom, Sweet Cream',
    description: 'An incredible fusion of gourmet hot chocolate and strong Indian tea leaves.',
    tag: 'Chaiholic Innovation'
  }
];

export default function SignatureSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardsRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="signature" 
      ref={sectionRef}
      className="relative py-24 bg-[#0B1D34] overflow-hidden"
    >
      {/* Subtle gold particle effects - simplified as a background pattern */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #D4A64A 1px, transparent 0)', backgroundSize: '40px 40px' }}>
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <div className="text-center mb-16">
          <h3 className="font-hand text-gold-accent text-3xl md:text-4xl mb-4">
            Signature Collection
          </h3>
          <h2 className="font-display text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Brewed to Perfection
          </h2>
          <div className="w-24 h-1 bg-gold-accent mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {signatureChais.map((chai, index) => (
            <div 
              key={chai.id}
              ref={el => cardsRef.current[index] = el}
              className="glass-card-dark rounded-3xl p-8 flex flex-col items-start transition-transform duration-500 hover:-translate-y-2 relative overflow-hidden group"
            >
              {/* Card Glare */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000"></div>
              
              <span className="inline-block px-4 py-1.5 rounded-full bg-gold-accent/20 text-gold-accent text-xs font-semibold tracking-wider mb-6 border border-gold-accent/30">
                {chai.tag}
              </span>
              
              <h4 className="font-serif text-white text-2xl xl:text-3xl font-bold mb-4">
                {chai.name}
              </h4>
              
              <div className="font-display text-3xl xl:text-4xl mb-2 gold-shimmer font-bold">
                {chai.price}
              </div>
              
              <p className="font-montserrat text-xs text-white/60 tracking-wider mb-6 uppercase">
                {chai.flavorNotes}
              </p>
              
              <p className="font-sans text-sm text-white/70 leading-relaxed mb-8 flex-grow">
                {chai.description}
              </p>
              
              <div className="w-full h-px bg-gradient-to-r from-gold-accent/50 to-transparent mb-6"></div>
              
              <button className="flex items-center gap-2 text-gold-accent font-semibold group/btn text-sm uppercase tracking-wider">
                <span className="border-b border-transparent group-hover/btn:border-gold-accent transition-colors pb-0.5">Discover More</span>
                <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
