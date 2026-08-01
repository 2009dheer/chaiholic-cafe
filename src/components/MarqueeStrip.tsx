import React from 'react';

const ITEMS = [
  '✨ ORIGINAL KASHMIRI KESAR CHAI',
  '🥪 GOURMET CRISPY BUN MASKA',
  '🥤 BHAYANKAR THANDI COLD COFFEE',
  '🍕 TANDOORI PANEER MAKHNI PIZZA',
  '🍟 SPICY PERI-PERI CRUNCHY FRIES',
  '☕ RICH ESPRESSO CLASSICO ARABICA'
];

// Duplicate items to ensure smooth scrolling
const MARQUEE_ITEMS = [...ITEMS, ...ITEMS, ...ITEMS];

export default function MarqueeStrip() {
  return (
    <div className="w-full bg-[#D4A64A] border-y border-white/10 overflow-hidden py-3 flex flex-col gap-2 relative z-20">
      {/* Top Row - Normal Direction */}
      <div className="flex whitespace-nowrap group">
        <div className="flex animate-[marquee_30s_linear_infinite] group-hover:[animation-play-state:paused]">
          {MARQUEE_ITEMS.map((item, i) => (
            <div key={`top-${i}`} className="flex items-center">
              <span className="text-white font-montserrat text-[10px] font-bold tracking-wider uppercase px-4">
                {item}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-white/50 mx-2" />
            </div>
          ))}
        </div>
      </div>
      
      {/* Bottom Row - Reverse Direction */}
      <div className="flex whitespace-nowrap group">
        <div className="flex animate-[marqueeReverse_30s_linear_infinite] group-hover:[animation-play-state:paused]">
          {MARQUEE_ITEMS.map((item, i) => (
            <div key={`bottom-${i}`} className="flex items-center">
              <span className="text-white font-montserrat text-[10px] font-bold tracking-wider uppercase px-4">
                {item}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-white/50 mx-2" />
            </div>
          ))}
        </div>
      </div>
      
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        @keyframes marqueeReverse {
          0% { transform: translateX(-33.33%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
