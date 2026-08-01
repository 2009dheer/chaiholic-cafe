import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 800); // Wait for exit animation
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0c0054] overflow-hidden"
        >
          <div className="relative flex items-center justify-center w-64 h-64">
            {/* Concentric Circles */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-[1px] border-[#D4A64A]/30 rounded-full"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute inset-4 border-[1px] border-[#D4A64A]/20 rounded-full"
            />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-8 border-[1px] border-[#D4A64A]/40 rounded-full border-dashed"
            />
            
            {/* Logo */}
            <motion.img
              src="/clean_logo.png"
              alt="Chaiholic Logo"
              className="w-32 h-auto relative z-10"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-center"
          >
            <motion.p
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="font-montserrat text-[#D4A64A] tracking-[0.2em] text-sm uppercase font-light"
            >
              Brewing your experience...
            </motion.p>
          </motion.div>

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-[#0c0054]">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.5, ease: "easeInOut" }}
              className="h-full bg-gradient-to-r from-[#D4A64A]/50 via-[#D4A64A] to-[#D4A64A]/50"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
