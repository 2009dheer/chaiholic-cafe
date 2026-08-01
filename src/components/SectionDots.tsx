import React from 'react';

interface SectionDotsProps {
  activeSection: number;
  onNavigate: (sectionId: string) => void;
}

const SECTIONS = [
  { name: 'Home', id: 'home' },
  { name: 'Story', id: 'story' },
  { name: 'Signature', id: 'signature' },
  { name: 'Menu', id: 'menu' },
  { name: 'Gallery', id: 'gallery' },
  { name: 'Outlets', id: 'outlets' },
  { name: 'Franchise', id: 'franchise' },
  { name: 'Footer', id: 'footer' },
];

export default function SectionDots({ activeSection, onNavigate }: SectionDotsProps) {
  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-4">
      {SECTIONS.map((section, index) => {
        const isActive = activeSection === index;
        return (
          <button
            key={section.id}
            onClick={() => onNavigate(section.id)}
            className="group relative flex items-center justify-end w-8 h-4 focus:outline-none"
            aria-label={`Navigate to ${section.name}`}
          >
            {/* Label */}
            <span 
              className={`absolute right-6 px-2 py-1 bg-[#1A1A1A]/80 backdrop-blur-sm text-white text-xs font-montserrat rounded pointer-events-none transition-all duration-300 origin-right
                ${isActive ? 'opacity-0 translate-x-2' : 'opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-2'}
              `}
            >
              {section.name}
            </span>
            
            {/* Dot */}
            <div 
              className={`rounded-full transition-all duration-300 ${
                isActive 
                  ? 'w-2.5 h-2.5 bg-[#D4A64A] shadow-[0_0_10px_rgba(212,166,74,0.6)]' 
                  : 'w-2 h-2 bg-white/30 group-hover:bg-white/70 group-hover:scale-110'
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}
