import React, { useRef, useEffect } from 'react';
import { Star } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reviewsData = [
  { name: "Aditya S.", role: "Local Guide · 42 reviews", date: "2 weeks ago", content: "Best chai in gurgaon hands down!! The kulhad chai is absolutely amazing. Ambience is also very good. Must visit 🔥", rating: 5 },
  { name: "Sneha M.", role: "8 reviews", date: "1 month ago", content: "Went here with friends, loved the bun maska and cold coffee combo. Staff was super friendly. Only minus is the wait time on weekends.", rating: 4 },
  { name: "Rohan V.", role: "Local Guide · 15 reviews", date: "3 weeks ago", content: "The vibe of this place is unmatched. Perfect for a chai date. Their special masala chai reminded me of my nani's chai. Will definitely come back!", rating: 5 }
];

const ReviewsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const linkRef = useRef<HTMLDivElement>(null);

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

      gsap.fromTo(linkRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.4, ease: 'power3.out', scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 80%'
        }}
      );
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
            <div key={idx} className="glass-card rounded-3xl p-8 shadow-premium hover:-translate-y-2 transition-transform duration-300 relative flex flex-col h-full">
              <div className="flex justify-between items-center mb-6">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < review.rating ? 'fill-gold-accent text-gold-accent' : 'fill-gray-200 text-gray-200'}`} />
                  ))}
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-500">
                  <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                </div>
              </div>
              
              <div className="text-6xl text-gold-accent/10 font-serif absolute top-6 right-8 leading-none select-none">
                "
              </div>
              
              <p className="font-sans text-dark-blue/80 text-lg mb-8 leading-relaxed relative z-10 flex-grow">
                {review.content}
              </p>
              
              <div className="mt-auto border-t border-gray-100 pt-4">
                <h4 className="font-bold text-dark-blue">{review.name}</h4>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-gray-500 text-xs">{review.role}</span>
                  <span className="text-gray-400 text-xs">{review.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div ref={linkRef} className="mt-16 text-center">
          <a href="#" className="inline-flex items-center gap-2 font-semibold text-dark-blue hover:text-gold-accent transition-colors">
            View All Reviews on Google
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
