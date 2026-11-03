import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Crosshair, Loader2, ChevronLeft, ChevronRight, MapPin, Navigation } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface Outlet {
  name: string;
  address: string;
  lat: number;
  lon: number;
  state: string;
  phone?: string;
  mapsQuery?: string;
}

interface OutletsSectionProps {
  outlets: Outlet[];
}

interface OutletWithDistance extends Outlet {
  distance?: number;
}

const haversineDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const OutletsSection: React.FC<OutletsSectionProps> = ({ outlets }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const [isLocating, setIsLocating] = useState(false);
  const [locationStatus, setLocationStatus] = useState<string | null>(null);
  const [userCoords, setUserCoords] = useState<{lat: number, lon: number} | null>(null);
  const [nearestIndex, setNearestIndex] = useState<number | null>(null);

  const sortedOutlets = useMemo(() => {
    if (!userCoords) return outlets.map(o => ({ ...o }));

    const withDist = outlets.map(o => ({
      ...o,
      distance: haversineDistance(userCoords.lat, userCoords.lon, o.lat, o.lon)
    }));

    withDist.sort((a, b) => (a.distance || 0) - (b.distance || 0));
    return withDist;
  }, [outlets, userCoords]);

  useEffect(() => {
    if (userCoords && sortedOutlets.length > 0) {
      setNearestIndex(0); // The first one is nearest after sorting
    }
  }, [sortedOutlets, userCoords]);

  const scrollContainer = (direction: 'left' | 'right') => {
    if (cardsRef.current) {
      const scrollAmount = 350;
      cardsRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current, 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%'
        }}
      );

      if (cardsRef.current && cardsRef.current.children) {
        gsap.fromTo(cardsRef.current.children,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out', scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 85%'
          }}
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [outlets]);

  const handleLocate = () => {
    setIsLocating(true);
    setLocationStatus("Detecting location...");
    
    if (!navigator.geolocation) {
      setLocationStatus("Geolocation is not supported by your browser");
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserCoords({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        });
        setLocationStatus("Found nearest outlet!");
        setIsLocating(false);
        
        // Scroll to the cards container start
        if (cardsRef.current) {
          cardsRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        }
      },
      (error) => {
        setLocationStatus("Unable to retrieve your location");
        setIsLocating(false);
      }
    );
  };

  return (
    <section 
      id="outlets" 
      ref={sectionRef}
      className="relative py-24 bg-soft-white overflow-hidden"
    >
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{
          backgroundImage: 'radial-gradient(circle at center, #4A82B8 1px, transparent 1px)',
          backgroundSize: '16px 16px',
          opacity: 0.05
        }}
      />
      
      <div className="container mx-auto px-6 relative z-10">
        <div ref={headerRef} className="flex flex-col items-center text-center mb-16">
          <span className="font-serif italic text-gold-accent text-xl mb-4">Our Presence Map</span>
          <h2 className="font-serif text-dark-blue text-5xl font-bold mb-6">Find Nearest Corner</h2>
          <div className="w-24 h-1 bg-gold-accent mb-6 rounded-full"></div>
          <p className="text-gray-600 max-w-xl mx-auto mb-10 font-sans">
            With 15+ outlets and growing, your perfect cup of chai is never too far. Discover our locations across the city.
          </p>
          
          <div className="flex flex-col items-center">
            <button 
              onClick={handleLocate}
              disabled={isLocating}
              className="group bg-gold-accent hover:bg-gold-accent/90 text-white font-montserrat font-semibold py-4 px-8 rounded-full flex items-center transition-all hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLocating ? (
                <Loader2 className="w-5 h-5 mr-3 animate-spin" />
              ) : (
                <Crosshair className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
              )}
              LOCATE MY NEAREST OUTLET
            </button>
            {locationStatus && (
              <span className={`mt-4 text-sm font-medium ${locationStatus.includes('error') || locationStatus.includes('Unable') ? 'text-red-500' : 'text-primary-blue animate-pulse'}`}>
                {locationStatus}
              </span>
            )}
          </div>
        </div>

        <div className="relative">
          {/* Scroll Buttons */}
          <button 
            onClick={() => scrollContainer('left')}
            className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-8 z-20 bg-white shadow-xl rounded-full p-3 text-dark-blue hover:text-gold-accent hover:scale-110 transition-all border border-gray-100"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button 
            onClick={() => scrollContainer('right')}
            className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-8 z-20 bg-white shadow-xl rounded-full p-3 text-dark-blue hover:text-gold-accent hover:scale-110 transition-all border border-gray-100"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div 
            ref={cardsRef}
            className="flex overflow-x-auto hide-scrollbar snap-x snap-mandatory gap-6 pb-12 pt-4 px-4 -mx-4 scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {sortedOutlets.map((outlet: OutletWithDistance, idx: number) => {
            const isNearest = userCoords && nearestIndex === idx;
            
            return (
              <div 
                key={idx} 
                className={`snap-center shrink-0 min-w-[290px] md:min-w-[340px] h-[280px] rounded-3xl p-6 flex flex-col transition-all duration-500 relative overflow-hidden shadow-xl
                  ${isNearest 
                    ? 'bg-gradient-to-br from-dark-blue to-primary-blue border-2 border-gold-accent text-white scale-[1.02]' 
                    : 'bg-white/70 backdrop-blur-md border border-gray-200 text-charcoal'
                  }`}
              >
                {isNearest && (
                  <div className="absolute top-0 right-0 bg-gold-accent text-white text-xs font-bold px-3 py-1 rounded-bl-xl z-10">
                    NEAREST TO YOU
                  </div>
                )}
                
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-2xl ${isNearest ? 'bg-white/10' : 'bg-primary-blue/10'}`}>
                    <MapPin className={`w-6 h-6 ${isNearest ? 'text-gold-accent' : 'text-primary-blue'}`} />
                  </div>
                  <div className={`text-xs font-semibold px-2 py-1 rounded-full ${isNearest ? 'bg-white/20' : 'bg-gray-100'}`}>
                    {outlet.state}
                  </div>
                </div>
                
                <h3 className={`font-serif text-xl font-bold mb-2 ${isNearest ? 'text-white' : 'text-dark-blue'}`}>
                  {outlet.name}
                </h3>
                
                <p className={`text-sm flex-grow ${isNearest ? 'text-white/80' : 'text-gray-600'}`}>
                  {outlet.address}
                </p>
                
                {(outlet.distance !== undefined) && (
                  <p className={`text-sm font-semibold mb-2 ${isNearest ? 'text-gold-accent' : 'text-primary-blue'}`}>
                    {outlet.distance.toFixed(1)} km away
                  </p>
                )}
                
                {outlet.phone && (
                  <p className={`text-sm mb-4 ${isNearest ? 'text-white/70' : 'text-gray-500'}`}>
                    {outlet.phone}
                  </p>
                )}
                
                <a 
                  href={`https://maps.google.com/?q=${encodeURIComponent(outlet.mapsQuery || outlet.name + ' ' + outlet.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-auto inline-flex items-center text-sm font-semibold transition-colors
                    ${isNearest ? 'text-gold-accent hover:text-white' : 'text-primary-blue hover:text-dark-blue'}`}
                >
                  <Navigation className="w-4 h-4 mr-2" />
                  GET DIRECTIONS
                </a>
              </div>
            );
          })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OutletsSection;
