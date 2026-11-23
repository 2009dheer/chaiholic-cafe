import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Crown } from 'lucide-react';

// Geographically calibrated coordinates for Chaiholic's 11 real outlets
// Calibrated to official 612x696 India Map SVG coordinate space
const locations = [
  { 
    name: 'Rohtak', 
    label: 'Rohtak (Flagship Outlet)', 
    outletName: 'Model Town, Opp. Raymond Store',
    state: 'Haryana',
    top: '29.3%', 
    left: '28.4%', 
    isFlagship: true 
  },
  { 
    name: 'Gurgaon', 
    label: 'Gurgaon Outlet', 
    outletName: 'DLF Cyber-Hub, Phase 3',
    state: 'Haryana / NCR',
    top: '30.8%', 
    left: '29.8%' 
  },
  { 
    name: 'Sonipat', 
    label: 'Sonipat Outlet', 
    outletName: 'Sector 14 Housing Board',
    state: 'Haryana',
    top: '28.9%', 
    left: '29.8%' 
  },
  { 
    name: 'Panipat', 
    label: 'Panipat Outlet', 
    outletName: 'Sector 11 HUDA Market',
    state: 'Haryana',
    top: '27.6%', 
    left: '29.6%' 
  },
  { 
    name: 'Karnal', 
    label: 'Karnal Outlet', 
    outletName: 'Sector 13, Near Matka Chowk',
    state: 'Haryana',
    top: '26.6%', 
    left: '29.7%' 
  },
  { 
    name: 'Kurukshetra', 
    label: 'Kurukshetra Outlet', 
    outletName: 'University Hub / DD Complex',
    state: 'Haryana',
    top: '25.6%', 
    left: '29.3%' 
  },
  { 
    name: 'Yamunanagar', 
    label: 'Yamunanagar Outlet', 
    outletName: 'Model Town Market',
    state: 'Haryana',
    top: '25.0%', 
    left: '30.6%' 
  },
  { 
    name: 'Hisar', 
    label: 'Hisar Outlet', 
    outletName: 'Red Square Market (Miraj Cinema)',
    state: 'Haryana',
    top: '28.4%', 
    left: '25.4%' 
  },
  { 
    name: 'Bhiwani', 
    label: 'Bhiwani Outlet', 
    outletName: 'HUDA City Centre',
    state: 'Haryana',
    top: '29.7%', 
    left: '26.8%' 
  },
  { 
    name: 'Kanpur', 
    label: 'Kanpur Outlet', 
    outletName: 'Kakadeo, Avon Market',
    state: 'Uttar Pradesh',
    top: '37.6%', 
    left: '41.1%' 
  },
  { 
    name: 'Lucknow', 
    label: 'Lucknow Outlet', 
    outletName: 'Crown Mall, Ayodhya Road',
    state: 'Uttar Pradesh',
    top: '36.3%', 
    left: '43.2%' 
  },
];

export default function IndiaMapLocations() {
  const [activeLoc, setActiveLoc] = useState<string | null>(null);

  return (
    <div className="relative w-full max-w-[480px] mx-auto flex flex-col items-center">
      {/* Aspect Ratio Box strictly locked to 612 x 696 */}
      <div className="relative w-full aspect-[612/696] select-none">
        {/* Background Regional Glow over Haryana & UP */}
        <div className="absolute top-[30%] left-[32%] -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] bg-[#D4A64A]/20 rounded-full blur-[60px] pointer-events-none" />
        <div className="absolute top-[36%] left-[42%] -translate-x-1/2 -translate-y-1/2 w-[180px] h-[180px] bg-[#2B5C8F]/20 rounded-full blur-[60px] pointer-events-none" />

        {/* Real Geographically Accurate India SVG Map */}
        <img 
          src="/india-map.svg" 
          alt="Chaiholic Outlets Map" 
          className="w-full h-full object-contain filter invert contrast-125 opacity-40 drop-shadow-[0_0_20px_rgba(212,166,74,0.3)] pointer-events-none"
        />

        {/* Map Location Pins & Markers */}
        <div className="absolute inset-0 w-full h-full">
          {locations.map((loc, i) => {
            const isActive = activeLoc === loc.name;
            return (
              <motion.div
                key={loc.name}
                className="absolute group z-20 cursor-pointer"
                style={{ top: loc.top, left: loc.left }}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.05, type: "spring", stiffness: 220, damping: 15 }}
                viewport={{ once: true }}
                onClick={() => setActiveLoc(isActive ? null : loc.name)}
              >
                {/* Glowing Pulse Dot */}
                <div className="relative -translate-x-1/2 -translate-y-1/2 p-1">
                  {loc.isFlagship ? (
                    <div className="relative">
                      <div className="w-4 h-4 bg-gradient-to-r from-[#D4A64A] to-[#fde08b] rounded-full shadow-[0_0_20px_#D4A64A] border-2 border-white flex items-center justify-center animate-pulse" />
                      <div className="absolute -inset-1.5 bg-[#D4A64A] rounded-full animate-ping opacity-75" />
                    </div>
                  ) : (
                    <div className="relative">
                      <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-[#D4A64A] rounded-full shadow-[0_0_12px_#D4A64A] border-[1.5px] border-white transition-transform group-hover:scale-125" />
                      <div className="absolute -inset-1 bg-[#D4A64A] rounded-full animate-ping opacity-60" />
                    </div>
                  )}
                </div>
                
                {/* Interactive Tooltip Card (Hover & Touch) */}
                <div 
                  className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 pointer-events-none z-30 transition-all duration-300 transform ${
                    isActive 
                      ? 'opacity-100 scale-100 -translate-y-1' 
                      : 'opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 group-hover:-translate-y-1'
                  }`}
                >
                  <div className="bg-[#0c0054]/95 text-white px-3.5 py-2 rounded-xl border border-[#D4A64A]/50 shadow-[0_10px_25px_rgba(0,0,0,0.6)] backdrop-blur-md text-center min-w-[140px] whitespace-nowrap">
                    <div className="flex items-center justify-center gap-1.5 mb-0.5">
                      {loc.isFlagship && <Crown className="w-3.5 h-3.5 text-[#D4A64A]" />}
                      <p className="font-serif font-bold text-xs md:text-sm text-[#D4A64A]">{loc.name}</p>
                    </div>
                    <p className="font-sans text-[10px] text-white/90 font-medium">{loc.outletName}</p>
                    <p className="font-montserrat text-[9px] text-white/60 tracking-wider uppercase mt-0.5">{loc.state}</p>
                  </div>
                  {/* Arrow */}
                  <div className="w-2 h-2 bg-[#0c0054] border-r border-b border-[#D4A64A]/50 rotate-45 mx-auto -mt-1" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Network Badge */}
      <div className="mt-4 flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
        <MapPin className="w-3.5 h-3.5 text-[#D4A64A]" />
        <span className="font-montserrat text-xs text-white/80 font-medium">
          11 Outlets across Haryana, NCR &amp; Uttar Pradesh
        </span>
      </div>
    </div>
  );
}
