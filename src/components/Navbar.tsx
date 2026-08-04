import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

interface NavbarProps {
  user: any;
  onLogin: () => void;
  onSignOut: () => void;
  onProfileOpen: () => void;
  scrollTo: (target: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogin, onSignOut, onProfileOpen, scrollTo }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', target: '#home' },
    { name: 'Story', target: '#story' },
    { name: 'Menu', target: '#menu' },
    { name: 'Gallery', target: '#gallery' },
    { name: 'Outlets', target: '#outlets' },
    { name: 'Franchise', target: '/franchise' },
  ];

  const handleNavClick = (target: string) => {
    setMobileMenuOpen(false);
    if (target.startsWith('#')) {
      if (location.pathname !== '/') {
         navigate('/');
         setTimeout(() => scrollTo(target), 500);
      } else {
         scrollTo(target);
      }
    } else {
      navigate(target);
    }
  };

  const menuVariants = {
    closed: { opacity: 0, y: '-100%' },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const linkVariants = {
    closed: { opacity: 0, y: 20 },
    open: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'py-4 bg-[#0c0054]/80 backdrop-blur-md shadow-lg' : 'py-6 bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Left: Logo */}
          <div className="flex-shrink-0 cursor-pointer" onClick={() => handleNavClick('#home')}>
            <img src="/clean_logo.png" alt="Chaiholic Logo" className="h-10 invert brightness-0" style={{ filter: 'invert(1)' }} />
          </div>

          {/* Center: Desktop Links */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.target)}
                className="text-[#F8FAFC] font-montserrat text-sm uppercase tracking-wider relative group transition-colors hover:text-[#D4A64A]"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#D4A64A] transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </div>

          {/* Right: Auth / Mobile Toggle */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              {user ? (
                <button
                  onClick={onProfileOpen}
                  className="w-10 h-10 rounded-full border-2 border-[#D4A64A] overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#D4A64A] focus:ring-offset-2 focus:ring-offset-[#0c0054] transition-transform hover:scale-105"
                >
                  <img
                    src={user.photoURL || `https://api.dicebear.com/7.x/initials/svg?seed=${user.displayName || 'User'}`}
                    alt="User Profile"
                    className="w-full h-full object-cover"
                  />
                </button>
              ) : (
                <button
                  onClick={onLogin}
                  className="bg-[#D4A64A] text-white px-6 py-2 rounded-full font-montserrat text-sm font-semibold hover:bg-[#b88c3a] transition-colors"
                >
                  SIGN IN
                </button>
              )}
            </div>

            <button
              className="md:hidden text-white focus:outline-none"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-[60] bg-[#0c0054] flex flex-col justify-center items-center"
          >
            <button
              className="absolute top-8 right-8 text-white focus:outline-none"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X size={32} />
            </button>
            
            <div className="flex flex-col items-center space-y-8">
              {navLinks.map((link) => (
                <motion.button
                  key={link.name}
                  variants={linkVariants}
                  onClick={() => handleNavClick(link.target)}
                  className="text-white font-serif text-4xl hover:text-[#D4A64A] transition-colors"
                >
                  {link.name}
                </motion.button>
              ))}
              
              <motion.div variants={linkVariants} className="pt-8 mt-8 border-t border-white/20 w-48 flex justify-center">
                {user ? (
                  <button
                    onClick={() => { setMobileMenuOpen(false); onProfileOpen(); }}
                    className="flex items-center space-x-3 text-white"
                  >
                    <img
                      src={user.photoURL || `https://api.dicebear.com/7.x/initials/svg?seed=${user.displayName || 'User'}`}
                      alt="User Profile"
                      className="w-10 h-10 rounded-full border-2 border-[#D4A64A]"
                    />
                    <span className="font-montserrat">Profile</span>
                  </button>
                ) : (
                  <button
                    onClick={() => { setMobileMenuOpen(false); onLogin(); }}
                    className="bg-[#D4A64A] text-white px-8 py-3 rounded-full font-montserrat text-sm font-semibold tracking-wider hover:bg-[#b88c3a] transition-colors"
                  >
                    SIGN IN
                  </button>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
