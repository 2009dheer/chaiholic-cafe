import React, { useRef, useEffect } from 'react';
import { Star } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reviewsData = [
  {
    name: "Aditya Sharma",
    role: "Regular Chaiholic",
    date: "May 2026",
    content: "The Chaiholic Special here is unmatched! I come here every evening after work and the consistency in taste and quality is just mind-blowing.",
  },
  {
    name: "Sneha Gupta",
    role: "Food Blogger",
    date: "April 2026",
    content: "Perfect combination of classic Bun Maska and Cold Coffee. The premium vibe combined with authentic Indian chai flavors makes this place my absolute favorite.",
  },
  {
    name: "Rohan Verma",
    role: "Tech Professional",
    date: "May 2026",
    content: "Their new Gurgaon outlet is gorgeous. It's the perfect spot for casual meetings. The service is prompt and the kulhad chai gives that nostalgic touch.",
  }
];

const ReviewsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%'
        }}
      );

      if (cardsRef.current && cardsRef.current.children) {
        gsap.fromTo(cardsRef.current.children,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out', scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%'
          }}
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="reviews" ref={sectionRef} className="py-24" style={{ backgroundColor: '#F5F0E8', backgroundImage: 'linear-gradient(180deg, #F5F0E8 0%, #FAFAF7 100%)' }}>
      <div className="container mx-auto px-6">
        <div ref={headerRef} className="flex flex-col items-center text-center mb-16">
          <span className="font-hand text-gold-accent text-3xl mb-3">What People Say</span>
          <h2 className="font-serif text-dark-blue text-4xl md:text-5xl font-bold mb-6">Loved by Thousands</h2>
          <div className="w-20 h-1 bg-gold-accent rounded-full mb-4"></div>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {reviewsData.map((review, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-8 shadow-xl hover:-translate-y-2 transition-transform duration-300 relative">
              <div className="flex space-x-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-gold-accent text-gold-accent" />
                ))}
              </div>
              
              <div className="text-6xl text-gold-accent/20 font-serif absolute top-6 right-8 leading-none select-none">
                "
              </div>
              
              <p className="font-serif italic text-dark-blue/80 text-lg mb-8 leading-relaxed relative z-10 min-h-[100px]">
                "{review.content}"
              </p>
              
              <div className="mt-auto border-t border-gray-100 pt-4">
                <h4 className="font-bold text-dark-blue">{review.name}</h4>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-gold-accent text-xs font-semibold uppercase tracking-wider">{review.role}</span>
                  <span className="text-gray-400 text-xs">{review.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
