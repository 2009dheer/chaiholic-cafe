import React from 'react';
import { motion } from 'motion/react';

// Coordinates calibrated to official 612x696 India Map SVG
const locations = [
  { name: 'Delhi NCR', top: '27%', left: '38%', count: '5 Outlets' },
  { name: 'Gurugram', top: '29%', left: '37%', count: '3 Outlets' },
  { name: 'Chandigarh', top: '20%', left: '35%', count: '2 Outlets' },
  { name: 'Jaipur', top: '33%', left: '31%', count: '1 Outlet' },
  { name: 'Lucknow', top: '34%', left: '50%', count: '1 Outlet' },
  { name: 'Ahmedabad', top: '46%', left: '23%', count: '1 Outlet' },
  { name: 'Mumbai', top: '65%', left: '26%', count: '2 Outlets' },
  { name: 'Pune', top: '68%', left: '29%', count: '1 Outlet' },
  { name: 'Hyderabad', top: '65%', left: '44%', count: '1 Outlet' },
  { name: 'Bangalore', top: '78%', left: '39%', count: '1 Outlet' },
];

export default function IndiaMapLocations() {
  return (
    <div className="relative w-full max-w-2xl mx-auto h-[550px] md:h-[650px] flex items-center justify-center p-4">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-[#D4A64A]/15 rounded-full blur-[100px] pointer-events-none" />

      {/* Real Geographically Accurate India SVG Map */}
      <div className="relative w-full h-full flex items-center justify-center">
        <img 
          src="/india-map.svg" 
          alt="India Map Outlets" 
          className="w-full h-full object-contain filter invert contrast-125 opacity-40 drop-shadow-[0_0_20px_rgba(212,166,74,0.3)] pointer-events-none select-none"
        />

        {/* Map Location Pins & Markers */}
        <div className="absolute inset-0 w-full h-full max-w-[550px] max-h-[620px] m-auto">
          {locations.map((loc, i) => (
            <motion.div
              key={loc.name}
              className="absolute group z-20"
              style={{ top: loc.top, left: loc.left }}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.08, type: "spring", stiffness: 220, damping: 15 }}
              viewport={{ once: true }}
            >
              {/* Glowing Pulse Dot */}
              <div className="relative -translate-x-1/2 -translate-y-1/2 cursor-pointer">
                <div className="w-3.5 h-3.5 bg-[#D4A64A] rounded-full shadow-[0_0_15px_#D4A64A] border-2 border-white" />
                <div className="absolute -inset-1 bg-[#D4A64A] rounded-full animate-ping opacity-75" />
              </div>
              
              {/* Interactive Tooltip Card */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-30 transform group-hover:-translate-y-1">
                <div className="bg-[#0c0054] text-white px-4 py-2 rounded-xl border border-[#D4A64A]/40 shadow-[0_10px_25px_rgba(0,0,0,0.5)] backdrop-blur-md text-center">
                  <p className="font-serif font-bold text-sm text-[#D4A64A] whitespace-nowrap">{loc.name}</p>
                  <p className="font-sans text-[11px] text-white/80 font-medium whitespace-nowrap">{loc.count}</p>
                </div>
                {/* Arrow */}
                <div className="w-2 h-2 bg-[#0c0054] border-r border-b border-[#D4A64A]/40 rotate-45 mx-auto -mt-1" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
