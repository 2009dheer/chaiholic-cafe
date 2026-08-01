import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface LightboxModalProps {
  src: string | null;
  onClose: () => void;
}

export default function LightboxModal({ src, onClose }: LightboxModalProps) {
  if (!src) return null;

  const isVideo = src.toLowerCase().endsWith('.mp4');

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[1000] flex items-center justify-center bg-[#0B1D34]/90 backdrop-blur-md p-4 md:p-8"
        onClick={onClose}
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-[#D4A64A] text-white rounded-full transition-colors duration-300 backdrop-blur-sm z-10"
          aria-label="Close lightbox"
        >
          <X size={24} />
        </button>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative max-w-5xl w-full max-h-[85vh] rounded-xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10 bg-black"
          onClick={(e) => e.stopPropagation()}
        >
          {isVideo ? (
            <video
              src={src}
              autoPlay
              loop
              controls
              className="w-full h-full object-contain max-h-[85vh]"
            />
          ) : (
            <img
              src={src}
              alt="Expanded view"
              className="w-full h-full object-contain max-h-[85vh]"
              loading="lazy"
            />
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
