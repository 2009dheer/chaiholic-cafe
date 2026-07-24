/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Coffee, 
  MapPin, 
  Phone, 
  Mail, 
  MessageCircle, 
  Download, 
  Crosshair, 
  ArrowRight, 
  LogIn, 
  CheckCircle, 
  LogOut, 
  X, 
  Crown, 
  Coins, 
  ShoppingBag, 
  History, 
  Gift, 
  ChevronRight, 
  ChevronLeft, 
  Star, 
  Heart, 
  Flame, 
  Compass, 
  Menu,
  Clock,
  Send,
  Sparkles,
  Info,
  TrendingUp,
  Users
} from 'lucide-react';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { menuData, outlets, reviews as initialReviews, signatureChais } from './data';
import { MenuItem, Outlet } from './types';

// Real-world configuration from user's live deployment
const firebaseConfig = {
  apiKey: "AIzaSyB_7hz1HrUu3iAbuPV4IgKPitdU0D6FwQo",
  authDomain: "kaafirana-282c6.firebaseapp.com",
  projectId: "kaafirana-282c6",
  storageBucket: "kaafirana-282c6.firebasestorage.app",
  messagingSenderId: "10865471702",
  appId: "1:10865471702:web:a25ae41a9778ba663b5977",
  measurementId: "G-HME807KBPR"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export default function App() {
  // Mobile Nav Menu State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Hero Counter State
  const [outletCount, setOutletCount] = useState(0);

  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      count++;
      setOutletCount(count);
      if (count >= 16) {
        clearInterval(interval);
      }
    }, 120);
    return () => clearInterval(interval);
  }, []);

  // Auth User States
  const [user, setUser] = useState<User | null>(null);
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  // Search and Switcher States
  const [activeCategory, setActiveCategory] = useState('hotsips');
  const [menuSearchQuery, setMenuSearchQuery] = useState('');

  // Outlets Routing & Distance States
  const [outletList, setOutletList] = useState<Outlet[]>(outlets);
  const [nearestIndex, setNearestIndex] = useState<number | null>(null);
  const [locationStatus, setLocationStatus] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const [calculatedDistances, setCalculatedDistances] = useState<Record<string, number>>({});

  // Recipe Unlocking State (Signature Chai Feature)
  const [unlockedRecipeId, setUnlockedRecipeId] = useState<string | null>(null);

  // Real-time custom reviews/feedback input states
  const [reviewsList, setReviewsList] = useState(initialReviews);
  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [showReviewSuccess, setShowReviewSuccess] = useState(false);

  // Franchise Application Form State
  const [franchiseName, setFranchiseName] = useState('');
  const [franchisePhone, setFranchisePhone] = useState('');
  const [franchiseCity, setFranchiseCity] = useState('');
  const [franchiseEmail, setFranchiseEmail] = useState('');
  const [franchiseHasLocation, setFranchiseHasLocation] = useState('No');
  const [franchiseBudget, setFranchiseBudget] = useState('₹13-17 Lakhs');
  const [franchiseProfession, setFranchiseProfession] = useState('Job');
  const [franchiseBusinessExp, setFranchiseBusinessExp] = useState('No');
  const [franchiseManager, setFranchiseManager] = useState('Self');
  const [franchiseHearAboutUs, setFranchiseHearAboutUs] = useState('Instagram');

  // Simulated PDF Menu Downloading Progress Bar Modal
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const [pdfDownloadProgress, setPdfDownloadProgress] = useState(0);

  // Expanded menu image lightbox viewer state
  const [selectedMenuImage, setSelectedMenuImage] = useState<string | null>(null);

  // Ref and helpers for horizontal menu layout scrolling
  const menuScrollRef = useRef<HTMLDivElement>(null);
  const scrollMenu = (direction: 'left' | 'right') => {
    if (menuScrollRef.current) {
      const scrollAmount = menuScrollRef.current.clientWidth * 0.75;
      menuScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Horizontal gallery scroll auto-play is now handled elegantly by CSS animate-marquee config

  // Monitor Auth Changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // Safe client auth flows
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      console.error("Google Auth failed: ", err);
      alert(`Sign-in could not be completed automatically. Please ensure this origin is whitelisted in your Firebase Console: ${window.location.hostname}`);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setProfileModalOpen(false);
    } catch (err) {
      console.error("Sign out failed: ", err);
    }
  };

  // Quick interactive recipe unlocking animation trigger
  const handleToggleRecipe = (id: string) => {
    if (unlockedRecipeId === id) {
      setUnlockedRecipeId(null);
    } else {
      setUnlockedRecipeId(id);
    }
  };

  // Simulated PDF generation / download sequence
  const startPdfDownload = () => {
    setIsDownloadingPdf(true);
    setPdfDownloadProgress(10);
    const interval = setInterval(() => {
      setPdfDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsDownloadingPdf(false);
            // Open absolute offline reference
            window.open("https://raw.githubusercontent.com/weblyfy/chaiholic-assets/main/menu.pdf", "_blank");
          }, 600);
          return 100;
        }
        return prev + 15;
      });
    }, 150);
  };

  // Submit Franchise lead directly to official WhatsApp business contact
  const handleFranchiseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!franchiseName || !franchisePhone || !franchiseCity || !franchiseEmail) {
      alert("Please enter all required business application fields.");
      return;
    }

    const messageText = `*New High-Net-Worth Franchise Application*

*Applicant Name:* ${franchiseName}
*Phone Number:* ${franchisePhone}
*Email:* ${franchiseEmail}
*City Interested In:* ${franchiseCity}
*Has Location?:* ${franchiseHasLocation}
*Approx. Investment Budget:* ${franchiseBudget}
*Current Profession:* ${franchiseProfession}
*Operated business before?:* ${franchiseBusinessExp}
*Who will manage the café?:* ${franchiseManager}
*How did you hear about us?:* ${franchiseHearAboutUs}

Submitted safely via Chaiholic Cafe Premium Gateway.`;
    
    // Redirect to WhatsApp API
    const waUrl = `https://wa.me/919812989816?text=${encodeURIComponent(messageText)}`;
    window.open(waUrl, '_blank');
  };

  // Custom customer feedback review submission with instant active item insert
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewName || !newReviewComment) {
      alert("Please fill out both your name and feedback message.");
      return;
    }

    const nextReview = {
      name: newReviewName,
      role: user ? "Verified Member" : "Guest Chaiholic",
      comment: newReviewComment,
      rating: newReviewRating,
      date: "Today"
    };

    setReviewsList([nextReview, ...reviewsList]);
    setNewReviewName('');
    setNewReviewComment('');
    setNewReviewRating(5);
    setShowReviewSuccess(true);
    setTimeout(() => setShowReviewSuccess(false), 4000);
  };

  // Haversine Trigonometric Distance Calculator
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  // Get current device location and rearrange outlet lists nearest first
  const handleFindNearestOutlet = () => {
    if (!navigator.geolocation) {
      setLocationStatus("Geolocation is not supported by your current browser.");
      return;
    }

    setIsLocating(true);
    setLocationStatus("Accessing fine GPS coordinates...");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLon = position.coords.longitude;

        const updatedWithDistances = outlets.map((outlet) => {
          const dist = calculateDistance(userLat, userLon, outlet.lat, outlet.lon);
          return { ...outlet, distance: dist };
        });

        // Sort items nearest first
        const sorted = [...updatedWithDistances].sort((a, b) => (a.distance ?? 0) - (b.distance ?? 0));
        
        // Map distance states
        const distancesMap: Record<string, number> = {};
        sorted.forEach(item => {
          distancesMap[item.name] = item.distance ?? 0;
        });

        setCalculatedDistances(distancesMap);
        setOutletList(sorted);
        setNearestIndex(0); // The item at index 0 is now officially the absolute closest
        setLocationStatus("GPS Sync completed! Nearest outlets ranked.");
        setIsLocating(false);
      },
      (error) => {
        console.error("GPS retrieval error: ", error);
        setLocationStatus("Unable to access GPS location. Please check browser permissions.");
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  // Computed and filtered digital menu items list based on tabs and live search bar
  const filteredSections = useMemo(() => {
    const cat = menuData[activeCategory];
    if (!cat) return [];

    if (!menuSearchQuery.trim()) return cat.sections;

    const query = menuSearchQuery.toLowerCase();
    return cat.sections.map(section => {
      const items = section.items.filter(item => 
        item.name.toLowerCase().includes(query) || 
        (item.description && item.description.toLowerCase().includes(query)) ||
        item.price.includes(query)
      );
      return { ...section, items };
    }).filter(section => section.items.length > 0);

  }, [activeCategory, menuSearchQuery]);

  return (
    <div className="bg-soft-white text-charcoal min-h-screen selection:bg-gold-accent selection:text-white flex flex-col font-sans transition-colors duration-300">
      
      {/* 1. Bespoke Luxury Navigation Header */}
      <header className="sticky top-0 z-50 bg-dark-blue/75 border-b border-white/15 backdrop-blur-2xl shadow-[0_8px_32px_rgba(43,92,143,0.15)] transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
          
          {/* Brand Logo Identity */}
          <a href="#home" className="flex items-center gap-2 group focus:outline-none">
            <div className="relative w-16 h-12 flex items-center justify-center rounded-xl overflow-hidden bg-transparent group-hover:scale-105 transition-all duration-500 ease-out">
              <img 
                src="/clean_logo.png" 
                alt="Chaiholic Logo" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain invert grayscale contrast-200 mix-blend-screen"
              />
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-white/95 text-xs sm:text-sm font-medium tracking-wide">
            {['#home', '#menu', '#gallery', '#outlets', '#franchise', '#about'].map((anchor) => {
              const labelMap: Record<string, string> = {
                '#home': 'Home',
                '#menu': 'Our Menu',
                '#gallery': 'Gallery',
                '#outlets': '15+ Outlets',
                '#franchise': 'Apply Franchise',
                '#about': "Founder's Story"
              };
              return (
                <a 
                  key={anchor}
                  href={anchor} 
                  className="relative hover:text-gold-accent transition-colors duration-300 font-sans py-1 group/item"
                >
                  {labelMap[anchor]}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold-accent transition-all duration-300 group-hover/item:w-full" />
                </a>
              );
            })}
          </nav>

          {/* User Sign-In Action Widgets */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <button 
                onClick={() => setProfileModalOpen(true)}
                className="flex items-center gap-3 bg-white/5 border border-white/15 hover:border-gold-accent px-4 py-2 rounded-full cursor-pointer transition-all duration-300 hover:bg-white/10 group text-[#F8FAFC] backdrop-blur-md shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
              >
                <div className="relative">
                  <img 
                    src={user.photoURL || `https://api.dicebear.com/7.x/pixel-art/svg?seed=${user.displayName}`} 
                    alt="avatar" 
                    referrerPolicy="no-referrer"
                    className="w-7 h-7 rounded-full border border-gold-accent object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-gold-accent w-3 h-3 rounded-full flex items-center justify-center border border-dark-blue">
                    <Crown className="w-1.5 h-1.5 text-dark-blue" />
                  </div>
                </div>
                <div className="text-left text-xs">
                  <p className="font-semibold text-white truncate max-w-[80px]">{user.displayName || 'Chai Lover'}</p>
                  <p className="text-[10px] text-gold-accent font-mono">450 Coins</p>
                </div>
              </button>
            ) : (
              <button 
                onClick={handleGoogleLogin}
                className="bg-gold-accent hover:bg-gold-accent/90 text-white font-montserrat font-bold px-5 py-2.5 rounded-full transition-all duration-300 flex items-center gap-2 text-xs shadow-md tracking-wider border border-white/10 active:scale-[97%] hover:shadow-[0_0_20px_rgba(212,166,74,0.3)]"
              >
                <LogIn className="w-3.5 h-3.5" />
                SIGN IN WITH GOOGLE
              </button>
            )}
          </div>

          {/* Mobile Menu Icon */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white hover:text-gold-accent transition-colors p-1"
          >
            <Menu className="w-7 h-7" />
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "100vh", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="md:hidden overflow-hidden fixed top-[4.5rem] left-0 w-full bg-dark-blue z-40 flex flex-col items-center justify-start pt-12 pb-24"
            >
              <div className="flex flex-col items-center justify-center space-y-6 w-full px-6">
                <nav className="flex flex-col gap-6 font-serif text-3xl text-center text-[#e8ded3] w-full items-center">
                  <a href="#home" onClick={() => setMobileMenuOpen(false)} className="hover:text-gold-accent transition-colors">Home</a>
                  <a href="#about" onClick={() => setMobileMenuOpen(false)} className="hover:text-gold-accent transition-colors">Story</a>
                  <a href="#menu" onClick={() => setMobileMenuOpen(false)} className="hover:text-gold-accent transition-colors">Menu</a>
                  <a href="#outlets" onClick={() => setMobileMenuOpen(false)} className="hover:text-gold-accent transition-colors">Events</a>
                  {user ? (
                    <button 
                      onClick={() => {
                        setMobileMenuOpen(false);
                        handleSignOut();
                      }}
                      className="hover:text-red-400 text-[#e8ded3] transition-colors flex items-center justify-center gap-2 text-2xl mt-2 w-full"
                    >
                      <LogOut className="w-5 h-5 text-red-500" /> <span className="text-red-400">Sign Out</span>
                    </button>
                  ) : null}
                </nav>

                {/* Mobile Auth Portal or Booking Button */}
                <div className="pt-8 flex flex-col gap-4 w-full items-center">
                  {!user && (
                    <button 
                      onClick={() => {
                        setMobileMenuOpen(false);
                        handleGoogleLogin();
                      }}
                      className="w-full max-w-[200px] mt-4 bg-white/10 text-white text-center py-3 rounded-full font-montserrat font-medium text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:bg-white/20 transition-colors"
                    >
                      <LogIn className="w-4 h-4" /> Sign In
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 2. Premium Hero Hub Section: Full-Page Immersive Background Video with Liquid Glass Floating Frame */}
      <section id="home" className="relative h-[85vh] sm:h-[90vh] overflow-hidden bg-dark-blue w-full">
        {/* Background Video */}
        <video 
          src="/hero_video.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-85"
        />
        
        {/* Centered Name over Video */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/20">
          <motion.img 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            src="/chaiholic_homepage_logo.png"
            alt="Chaiholic"
            className="w-48 sm:w-64 md:w-96 lg:w-[450px] object-contain invert grayscale brightness-200 contrast-200 mix-blend-screen opacity-90"
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 px-6 py-2.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md flex items-center justify-center gap-3 shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
          >
            <span className="w-1.5 h-1.5 bg-gold-accent rounded-full animate-pulse" />
            <span className="text-white text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase">{outletCount} Outlets</span>
            <span className="w-1.5 h-1.5 bg-gold-accent rounded-full animate-pulse" />
          </motion.div>
        </div>
      </section>

      {/* 3. Luxury Golden Marquee Slider */}
      <div className="bg-gold-accent text-white py-3 overflow-hidden border-y border-white/10 shadow-md">
        <div className="animate-marquee gap-8">
          {Array(2).fill([
            "✨ ORIGINAL KASHMIRI KESAR CHAI",
            "🥪 GOURMET CRISPY BUN MASKA",
            "🥤 BHAYANKAR THANDI COLD COFFEE",
            "🍕 TANDOORI PANEER MAKHNI PIZZA",
            "🍟 SPICY PERI-PERI CRUNCHY FRIES",
            "☕ RICH ESPRESSO CLASSICO ARABICA"
          ]).flat().map((phrase, i) => (
            <span key={i} className="font-montserrat font-semibold text-xs tracking-wider uppercase flex items-center gap-2">
              <span>{phrase}</span>
              <span className="text-white/40">•</span>
            </span>
          ))}
        </div>
      </div>

      {/* 5. Pictures of Menu (Soft White Background) */}
      <section id="menu" className="py-24 bg-soft-white relative scroll-mt-20 border-t border-primary-blue/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Centered Headers from Image */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-hand text-3xl text-gold-accent inline-block mb-2 font-bold select-none animate-bounce">
              Our Menu
            </span>
            <h2 className="text-4xl sm:text-5xl font-serif font-black text-dark-blue tracking-tight leading-tight">
              Explore the Flavors
            </h2>
            <p className="text-charcoal/80 text-sm mt-3 font-sans max-w-xl mx-auto">
              Browse through our printed café menu cards. Click on any menu sheet to enlarge, zoom, and inspect our recipes in high definition.
            </p>
            <div className="w-16 h-1 bg-gold-accent mx-auto mt-4"></div>
          </div>

          {/* Horizontal scroll container with scrollable indicators, decreased image heights, and no hover overlay */}
          <div className="relative max-w-7xl mx-auto mb-6 px-4 group/carousel">
            
            {/* Elegant Left/Right Clickable Scroll Buttons */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 w-full flex justify-between px-1 sm:px-3 pointer-events-none z-30">
              <button 
                onClick={() => scrollMenu('left')}
                className="pointer-events-auto bg-white/95 hover:bg-gold-accent hover:text-white text-dark-blue p-3.5 rounded-full shadow-premium border border-gold-accent/20 transition-all active:scale-90 hover:shadow-xl hover:-translate-x-0.5 flex items-center justify-center cursor-pointer"
                aria-label="Scroll Left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button 
                onClick={() => scrollMenu('right')}
                className="pointer-events-auto bg-white/95 hover:bg-gold-accent hover:text-white text-dark-blue p-3.5 rounded-full shadow-premium border border-gold-accent/20 transition-all active:scale-90 hover:shadow-xl hover:translate-x-0.5 flex items-center justify-center cursor-pointer"
                aria-label="Scroll Right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            
            <div ref={menuScrollRef} className="flex overflow-x-auto overflow-y-hidden gap-8 pb-8 snap-x snap-mandatory scroll-smooth hide-scrollbar">
              {[
                {
                  title: "Chaiholic Menu Cover",
                  subtitle: "Page 1 of 5",
                  image: "/menu_1.png"
                },
                {
                  title: "Burgers, Pizzas & Garlic Bread",
                  subtitle: "Page 2 of 5",
                  image: "/menu_2.png"
                },
                {
                  title: "Chinese & Kuch Healthy",
                  subtitle: "Page 3 of 5",
                  image: "/menu_3.png"
                },
                {
                  title: "Wraps, Sandwiches & Combos",
                  subtitle: "Page 4 of 5",
                  image: "/menu_4.png"
                },
                {
                  title: "Chais, Hot Coffees & Love Bites",
                  subtitle: "Page 5 of 5",
                  image: "/menu_5.png"
                }
              ].map((sheet, index) => (
                <div 
                  key={index}
                  onClick={() => setSelectedMenuImage(sheet.image)}
                  className="flex-shrink-0 w-[325px] sm:w-[350px] md:w-[410px] snap-center flex flex-col group cursor-pointer"
                >
                  {/* Luxury Board Frame representing physical menu layouts with zero edge curvature */}
                  <div className="relative rounded-none border border-charcoal/10 bg-white p-3 shadow-premium hover:shadow-[0_25px_60px_rgba(11,35,66,0.18)] transition-all duration-500 transform group-hover:-translate-y-2 overflow-hidden">
                    
                    {/* Sharp images wrapper - tall vertical format on phone as requested */}
                    <div className="relative w-full h-[420px] sm:h-[480px] md:h-[480px] rounded-none overflow-hidden bg-gray-50 flex items-center justify-center border border-charcoal/5">
                      <img 
                        src={sheet.image} 
                        alt={sheet.title} 
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                        referrerPolicy="no-referrer"
                      />
                      
                      {/* Active liquid glass hover glare reflection sweep */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out z-10 pointer-events-none" />
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Lightbox Overlay Modal */}
          <AnimatePresence>
            {selectedMenuImage && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedMenuImage(null)}
                className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-md cursor-zoom-out"
              >
                {/* Close Button overlay */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedMenuImage(null);
                  }}
                  className="absolute top-6 right-6 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-all border border-white/20 active:scale-95 cursor-pointer z-50 hover:text-gold-accent"
                >
                  <X className="w-6 h-6" />
                </button>

                <motion.div 
                  initial={{ scale: 0.95, y: 15 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.95, y: 15 }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative max-w-4xl max-h-[90vh] w-full flex flex-col items-center justify-center pointer-events-none"
                >
                  {selectedMenuImage.endsWith('.mp4') ? (
                    <video 
                      src={selectedMenuImage} 
                      autoPlay 
                      loop 
                      controls 
                      className="max-h-[82vh] max-w-[95vw] rounded-2xl md:rounded-3xl shadow-2xl border border-white/10 object-contain pointer-events-auto"
                    />
                  ) : (
                    <img 
                      src={selectedMenuImage} 
                      alt="Expanded Menu Details"
                      className="max-h-[82vh] max-w-[95vw] rounded-2xl md:rounded-3xl shadow-2xl border border-white/10 object-contain pointer-events-auto"
                      referrerPolicy="no-referrer"
                    />
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Menu PDF Downloader identical to image */}
          <div className="text-center mt-20 pt-8 border-t border-primary-blue/5">
            <p className="text-gray-400 text-xs mb-3 font-semibold uppercase tracking-widest leading-relaxed">
              Prefer to keep it offline?
            </p>
            <button 
              onClick={startPdfDownload}
              className="inline-flex items-center gap-2 text-gold-accent border border-gold-accent/30 hover:border-gold-accent hover:bg-gold-accent hover:text-dark-blue transition-all px-6 py-2.5 rounded-full font-montserrat font-bold text-xs tracking-wider uppercase cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              Download Full Menu PDF
            </button>
          </div>

        </div>
      </section>

      {/* 9. Premium About Founder Section (Soft White Theme with Ambient Liquid Lights) */}
      <section id="about" className="py-24 bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#F8FAFC] relative scroll-mt-20 overflow-hidden">
        {/* Subtle decorative glowing glass backdrops */}
        <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-gold-accent/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-sky-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          
          {/* Centered Headers with balanced spacing */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-hand text-3xl text-gold-accent inline-block mb-3 font-bold select-none">
              Our Story
            </span>
            <h2 className="text-4xl sm:text-5xl font-serif font-black text-dark-blue tracking-tight leading-tight">
              Tradition Meets Modernity
            </h2>
            <div className="w-16 h-1 bg-gold-accent mx-auto mt-4 mb-6"></div>
            <p className="text-charcoal/85 text-xs sm:text-sm lg:text-base leading-relaxed font-sans font-light max-w-2xl mx-auto">
              Chaiholic Café was created with a simple belief — India’s love for chai deserves a modern space. What began as a passion-driven café has today evolved into a growing café chain known for a pocket-friendly and youth-friendly experience. Good for you and your pocket.
            </p>
          </div>

          {/* Majestic Hero Card - Pure Luxury Liquid Design */}
          <div className="max-w-6xl mx-auto bg-gradient-to-br from-dark-blue/95 to-primary-blue/90 border border-white/15 rounded-[2.5rem] overflow-hidden shadow-[0_30px_70px_rgba(43,92,143,0.25)] grid grid-cols-1 lg:grid-cols-12 relative group/card hover:shadow-[0_40px_80px_rgba(43,92,143,0.35)] transition-all duration-500">
            
            {/* Left Column: Founder Biography & Details */}
            <div className="lg:col-span-7 p-8 md:p-12 lg:p-16 flex flex-col justify-center space-y-6 relative z-10">
              
              {/* Visionary Leadership Yellow Tag */}
              <span className="bg-gold-accent text-dark-blue font-extrabold uppercase tracking-widest px-3.5 py-1.5 rounded-md text-[9px] w-fit font-sans shadow-[0_2px_10px_rgba(212,166,74,0.3)]">
                VISIONARY LEADERSHIP
              </span>

              <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight leading-none mb-1">
                Meet the Founder
              </h3>

              {/* Founder identity layout with Gold Vertical border */}
              <div className="border-l-4 border-gold-accent pl-4 py-0.5 space-y-1">
                <h4 className="text-xl sm:text-2xl font-bold font-serif text-gold-accent leading-snug">
                  Rishabh Gulati
                </h4>
                <p className="text-[10px] uppercase font-bold text-white/50 tracking-widest font-sans">
                  OWNER & VISIONARY
                </p>
              </div>

              <p className="text-white/80 text-xs sm:text-sm md:text-base leading-relaxed font-sans font-light">
                Chaiholic Café is owned and led by Rishabh Gulati, whose vision was to build a café brand that blends traditional Indian chai with modern café vibes. Under his stewardship, Chaiholic has emerged as a beloved meeting ground for genuine conversations, authentic kulhad blends, and delightful aesthetics.
              </p>
            </div>

            {/* Column 2: Profile Photo Banner */}
            <div className="lg:col-span-5 p-8 lg:p-12 flex items-center justify-center relative z-10">
              <div className="relative rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] aspect-[4/5] w-full max-w-sm border border-white/15 bg-dark-blue/50 transition-all duration-500 hover:scale-[1.02] hover:border-gold-accent/40">
                <img 
                  src="/founder.jpeg" 
                  alt="Rishabh Gulati Founder Portrait" 
                  className="w-full h-full object-cover transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />
                
                {/* Yellow handwriting quote overlaid exactly on bottom area */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-dark-blue via-dark-blue/40 to-transparent p-6 pt-20 flex flex-col justify-end">
                  <p className="font-hand text-3xl md:text-3.5xl text-gold-accent tracking-wide transform translate-y-1 drop-shadow-md select-none">
                    "Redefining chai culture."
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 6. Cozy Boutique Café Gallery (Dark Midnight Blue `#0B2342`) */}
      <section id="gallery" className="py-24 bg-dark-blue text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-serif text-lg italic text-gold-accent font-medium inline-block mb-2">Visual Ambience</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">The Cozy Corner Gallery</h2>
            <div className="w-16 h-1 bg-gold-accent mx-auto mt-4 mb-4"></div>
            <p className="text-[#B2C7E2] text-xs uppercase tracking-widest">Our Modern Lifestyles & Atmosphere</p>
          </div>

          {/* Horizontal scroll container with scrollable auto-play row, styled as elegant boards slightly smaller than menu sheets */}
          <div className="relative w-full overflow-hidden">
            <div 
              className="flex gap-6 sm:gap-8 pb-4 animate-marquee hover:[animation-play-state:paused]"
            >
              {[...Array(2)].flatMap((_, setIdx) => [
                {
                  title: "Cozy Celebrations",
                  desc: "Festive lights and warm holiday setup at Chaiholic",
                  url: "/gallery_christmas.jpeg"
                },
                {
                  title: "Signature Poha",
                  desc: "Delicious tempered poha topped with Paneer and fresh herbs",
                  url: "/gallery_poha.jpeg"
                },
                {
                  title: "Our Iconic Facade",
                  desc: "Spread love, peace, and good vibes starting at our door",
                  url: "/gallery_storefront.png"
                },
                {
                  title: "Pure Kulhad Magic",
                  desc: "Authentic steaming hot clay cup chai brewed with fresh spices",
                  url: "/gallery_kulhad_chai.png"
                },
                {
                  title: "Chaiholic Vibes",
                  desc: "Take a cozy stroll inside our boutique cafe with soulful design",
                  url: "/gallery_video.mp4",
                  isVideo: true
                }
              ]).map((photo, i) => (
                <div 
                  key={i}
                  onClick={() => setSelectedMenuImage(photo.url)}
                  className="flex-shrink-0 w-[325px] sm:w-[325px] md:w-[380px] flex flex-col group cursor-pointer px-1"
                >
                  {/* Premium Midnight Glass Plaque - Flat styling with zero edge curvature */}
                  <div className="relative rounded-none border border-white/15 bg-white/5 backdrop-blur-md p-3 shadow-premium hover:shadow-[0_25px_60px_rgba(212,166,74,0.22)] transition-all duration-500 transform group-hover:-translate-y-2 overflow-hidden">
                    
                    {/* Sharp images wrapper - tall vertical format on phone as requested */}
                    <div className="relative w-full h-[420px] sm:h-[450px] md:h-[450px] rounded-none overflow-hidden bg-white/5 flex items-center justify-center border border-white/5">
                      {"isVideo" in photo && photo.isVideo ? (
                        <video 
                          src={photo.url} 
                          autoPlay 
                          loop 
                          muted 
                          playsInline
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                        />
                      ) : (
                        <img 
                          src={photo.url} 
                          alt={photo.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                        />
                      )}
                      
                      {/* Active liquid glass hover glare reflection sweep */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out z-10 pointer-events-none" />
                    </div>

                    {/* Highly subtle text footer details under glass, very modern and clean */}
                    <div className="mt-3.5 space-y-1 text-left px-1">
                      <h4 className="text-sm font-serif font-bold text-white tracking-wide group-hover:text-gold-accent transition-colors">
                        {photo.title}
                      </h4>
                      <p className="text-[11px] text-white/60 font-sans font-light leading-snug line-clamp-2">
                        {photo.desc}
                      </p>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 7. Interactive Outlets Locator (Rank Nearest First via Live Geolocation) */}
      <section id="outlets" className="py-24 bg-soft-white relative border-t border-primary-blue/5">
        
        {/* Background maps design element */}
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(var(--color-primary-blue)_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="font-serif text-lg italic text-gold-accent font-medium inline-block mb-2">Our Presence Map</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-dark-blue">Find Nearest Corner</h2>
            <div className="w-16 h-1 bg-gold-accent mx-auto mt-4 mb-4"></div>
            <p className="text-charcoal/70 text-xs uppercase tracking-widest leading-relaxed mb-6">
              Serving Happiness Across 15+ Distinct Outlets in Haryana and Uttar Pradesh
            </p>

            {/* Geolocation Button */}
            <div className="inline-block relative">
              <button 
                onClick={handleFindNearestOutlet}
                disabled={isLocating}
                className="bg-gold-accent text-white font-montserrat font-semibold text-xs tracking-wider px-8 py-3.5 rounded-full hover:bg-gold-accent/90 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-premium disabled:opacity-60 disabled:cursor-not-allowed mx-auto"
              >
                <Crosshair className={`w-4 h-4 ${isLocating ? 'animate-spin' : ''}`} />
                {isLocating ? 'SORTING CORNERS' : 'LOCATE MY NEAREST OUTLET'}
              </button>
              
              {locationStatus && (
                <p className="text-xs text-dark-blue font-mono mt-3 animate-pulse text-center">
                  {locationStatus}
                </p>
              )}
            </div>
          </div>

          {/* Outlets Horizontal Horizontal-Scroll or Flex Layout with ambient glass backdrops */}
          <div className="flex overflow-x-auto gap-6 pb-8 pt-4 hide-scrollbar snap-x snap-mandatory px-4 md:px-0 relative">
            {outletList.map((outlet, idx) => {
              const distance = calculatedDistances[outlet.name];
              const isNearest = nearestIndex === idx;

              return (
                <div 
                  key={idx}
                  className={`min-w-[290px] md:min-w-[340px] rounded-3xl p-6 snap-center flex flex-col justify-between transition-all duration-500 ease-out group h-[280px] shadow-sm transform hover:-translate-y-1.5 hover:shadow-2xl ${
                    isNearest 
                      ? 'bg-gradient-to-br from-dark-blue/95 to-primary-blue/90 border-2 border-gold-accent text-white scale-[1.03] shadow-[0_15px_40px_rgba(212,166,74,0.18)]' 
                      : 'bg-white/70 backdrop-blur-xl border border-black/5 text-dark-blue hover:bg-white/95'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className={`p-2.5 rounded-xl transition-colors duration-300 ${isNearest ? 'bg-gold-accent text-dark-blue' : 'bg-primary-blue/5 text-primary-blue group-hover:bg-primary-blue/10'}`}>
                        <MapPin className="w-5 h-5" />
                      </div>
                      
                      {/* Distance Badge */}
                      <span className={`text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full ${isNearest ? 'bg-gold-accent/20 text-gold-accent border border-gold-accent/30' : 'bg-primary-blue/5 border border-primary-blue/5 text-primary-blue/70'}`}>
                        {distance !== undefined ? (
                          <span className="flex items-center gap-1 font-mono">
                            <CheckCircle className="w-3 h-3 text-gold-accent" />
                            {isNearest ? 'Nearest Corner' : ''} ({distance.toFixed(1)} km)
                          </span>
                        ) : (
                          outlet.state
                        )}
                      </span>
                    </div>

                    <h4 className={`font-serif text-xl font-bold tracking-tight ${isNearest ? 'text-white' : 'text-dark-blue hover:text-gold-accent'} transition-colors duration-300`}>
                      {outlet.name}
                    </h4>
                    
                    <p className={`text-xs mt-2 leading-relaxed font-sans font-light ${isNearest ? 'text-white/75' : 'text-charcoal/70'}`}>
                      {outlet.address}
                    </p>
                  </div>

                  <div className={`pt-4 border-t flex justify-between items-center text-xs font-montserrat font-bold ${isNearest ? 'border-white/10 text-white/90' : 'border-primary-blue/5 text-dark-blue'}`}>
                    {outlet.phone && (
                      <span className="flex items-center gap-1 font-mono font-medium">
                        <Phone className="w-3.5 h-3.5 text-gold-accent animate-pulse" /> {outlet.phone}
                      </span>
                    )}

                    <a 
                      href={`https://www.google.com/maps/search/?api=1&query=${outlet.mapsQuery || encodeURIComponent(outlet.name)}`}
                      target="_blank"
                      className="text-gold-accent hover:text-gold-accent/80 flex items-center gap-1 group/btn border-b border-transparent hover:border-gold-accent transition-all uppercase tracking-wider text-[10px]"
                    >
                      <span>GET DIRECTIONS</span>
                      <ArrowRight className="w-3 h-3 transform group-hover/btn:translate-x-0.5 transition-transform" />
                    </a>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 8. WhatsApp Franchise Application Engine (Premium Wood Slate) */}
      <section id="franchise" className="py-24 bg-dark-blue text-white relative overflow-hidden">
        {/* Decorative background gradients for glassmorphism */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-gold-accent/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-sky-500/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Column Copy */}
            <div className="space-y-6">
              <span className="inline-block bg-white/10 border border-white/20 text-gold-accent rounded-full text-[10px] font-bold tracking-wider uppercase px-3 py-1.5 font-sans">
                FRANCHISE OPPORTUNITY
              </span>
              
              <h3 className="text-5xl md:text-6xl font-sans font-extrabold tracking-tight text-white leading-tight">
                Be Your Own <br />
                <span className="font-hand text-6xl md:text-7xl text-gold-accent block mt-2 hover:scale-105 transition-transform duration-300 origin-left">
                  Boss Today!
                </span>
              </h3>
              
              <p className="text-white/70 text-base md:text-lg max-w-md font-light leading-relaxed pt-2">
                Join the Chaiholic revolution. We provide end-to-end support, from setup to sales. Fill out the form to start your journey with a proven business model.
              </p>

              {/* Bento Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 w-full max-w-lg">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col items-start gap-4 hover:bg-white/10 transition-all duration-300 group">
                  <div className="p-3 border border-gold-accent/30 rounded-xl text-gold-accent bg-gold-accent/5 group-hover:scale-110 transition-transform">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-sans font-bold text-base text-white">High ROI</h5>
                    <p className="text-xs text-white/50 mt-1 leading-relaxed">Fastest return on your investment.</p>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col items-start gap-4 hover:bg-white/10 transition-all duration-300 group">
                  <div className="p-3 border border-gold-accent/30 rounded-xl text-gold-accent bg-gold-accent/5 group-hover:scale-110 transition-transform">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-sans font-bold text-base text-white">Full Support</h5>
                    <p className="text-xs text-white/50 mt-1 leading-relaxed">Training, marketing & hiring.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column Form (Super Liquid Glassmorphic Card) */}
            <div className="bg-primary-blue/25 backdrop-blur-2xl border border-white/15 rounded-[2.5rem] p-6 sm:p-10 shadow-[0_30px_70px_rgba(0,0,0,0.3)] relative overflow-hidden group/form">
              {/* Internal subtle glow highlighting absolute premium structure */}
              <div className="absolute -top-16 -right-16 w-32 h-32 bg-gold-accent/10 rounded-full blur-2xl pointer-events-none" />

              <div className="mb-8 relative z-10">
                <h4 className="text-2xl font-serif font-bold text-white tracking-tight">Apply for Franchise</h4>
                <p className="text-xs text-white/60 mt-1.5 font-sans font-light">Details will be sent directly to our WhatsApp with zero delay.</p>
              </div>

              <form onSubmit={handleFranchiseSubmit} className="space-y-4 relative z-10">
                {/* 1. Full Name & 2. Mobile Number */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-white/50 tracking-wider mb-1.5 font-sans">FULL NAME</label>
                    <input 
                      type="text" 
                      required
                      placeholder="John Doe"
                      value={franchiseName}
                      onChange={(e) => setFranchiseName(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 focus:border-gold-accent focus:bg-white/10 focus:shadow-[0_0_20px_rgba(212,166,74,0.15)] rounded-xl px-4 py-3.5 text-xs text-white placeholder-white/30 focus:outline-none transition-all duration-300 font-sans"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-white/50 tracking-wider mb-1.5 font-sans">MOBILE NUMBER</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="+91 98765 43210"
                      value={franchisePhone}
                      onChange={(e) => setFranchisePhone(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 focus:border-gold-accent focus:bg-white/10 focus:shadow-[0_0_20px_rgba(212,166,74,0.15)] rounded-xl px-4 py-3.5 text-xs text-white placeholder-white/30 focus:outline-none transition-all duration-300 font-sans"
                    />
                  </div>
                </div>

                {/* 3. Email ID & 4. City Interested In */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-white/50 tracking-wider mb-1.5 font-sans">EMAIL ID</label>
                    <input 
                      type="email" 
                      required
                      placeholder="john@example.com"
                      value={franchiseEmail}
                      onChange={(e) => setFranchiseEmail(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 focus:border-gold-accent focus:bg-white/10 focus:shadow-[0_0_20px_rgba(212,166,74,0.15)] rounded-xl px-4 py-3.5 text-xs text-white placeholder-white/30 focus:outline-none transition-all duration-300 font-sans"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-white/50 tracking-wider mb-1.5 font-sans">CITY INTERESTED IN</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Rohtak"
                      value={franchiseCity}
                      onChange={(e) => setFranchiseCity(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 focus:border-gold-accent focus:bg-white/10 focus:shadow-[0_0_20px_rgba(212,166,74,0.15)] rounded-xl px-4 py-3.5 text-xs text-white placeholder-white/30 focus:outline-none transition-all duration-300 font-sans"
                    />
                  </div>
                </div>

                {/* 5. Do you already have a location? & 8. Have you operated any business before? */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-white/50 tracking-wider mb-1.5 font-sans">DO YOU ALREADY HAVE A LOCATION?</label>
                    <div className="grid grid-cols-2 gap-2">
                      {["Yes", "No"].map((option) => {
                        const isSelected = franchiseHasLocation === option;
                        return (
                          <button
                            key={option}
                            type="button"
                            onClick={() => setFranchiseHasLocation(option)}
                            className={`py-2.5 px-2 text-[11px] font-bold font-sans border rounded-lg transition-all duration-300 text-center cursor-pointer ${
                              isSelected 
                                ? 'bg-gold-accent text-dark-blue border-gold-accent shadow-[0_0_15px_rgba(212,166,74,0.3)] scale-[1.03]' 
                                : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white'
                            }`}
                          >
                            {option}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase text-white/50 tracking-wider mb-1.5 font-sans">HAVE OPERATED BUSINESS BEFORE?</label>
                    <div className="grid grid-cols-2 gap-2">
                      {["Yes", "No"].map((option) => {
                        const isSelected = franchiseBusinessExp === option;
                        return (
                          <button
                            key={option}
                            type="button"
                            onClick={() => setFranchiseBusinessExp(option)}
                            className={`py-2.5 px-2 text-[11px] font-bold font-sans border rounded-lg transition-all duration-300 text-center cursor-pointer ${
                              isSelected 
                                ? 'bg-gold-accent text-dark-blue border-gold-accent shadow-[0_0_15px_rgba(212,166,74,0.3)] scale-[1.03]' 
                                : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white'
                            }`}
                          >
                            {option}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* 6. Approximate Investment Budget */}
                <div>
                  <label className="block text-[10px] font-bold uppercase text-white/50 tracking-wider mb-1.5 font-sans">APPROXIMATE INVESTMENT BUDGET</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {["₹13-17 Lakhs", "₹17-21 Lakhs", "₹21-25 Lakhs", "Above ₹25 lakhs"].map((level) => {
                      const isSelected = franchiseBudget === level;
                      return (
                        <button
                          key={level}
                          type="button"
                          onClick={() => setFranchiseBudget(level)}
                          className={`py-2.5 px-1 text-[10px] sm:text-[11px] font-bold font-sans border rounded-lg transition-all duration-300 text-center cursor-pointer ${
                            isSelected 
                              ? 'bg-gold-accent text-dark-blue border-gold-accent shadow-[0_0_15px_rgba(212,166,74,0.3)] scale-[1.03]' 
                              : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white'
                          }`}
                        >
                          {level}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 7. Your Current Profession & 9. Who will manage the café? */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-white/50 tracking-wider mb-1.5 font-sans">YOUR CURRENT PROFESSION</label>
                    <div className="relative">
                      <select 
                        value={franchiseProfession}
                        onChange={(e) => setFranchiseProfession(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 focus:border-gold-accent focus:bg-white/10 rounded-xl px-4 py-3.5 text-xs text-white focus:outline-none transition-all duration-300 font-sans appearance-none cursor-pointer"
                      >
                        <option value="Job" className="bg-dark-blue text-white">Job / Salaried</option>
                        <option value="Business" className="bg-dark-blue text-white">Business Owner</option>
                        <option value="Student" className="bg-dark-blue text-white">Student</option>
                        <option value="Other" className="bg-dark-blue text-white">Other</option>
                      </select>
                      <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-white/40">
                        <ChevronRight className="w-4 h-4 rotate-90" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase text-white/50 tracking-wider mb-1.5 font-sans">WHO WILL MANAGE THE CAFÉ?</label>
                    <div className="relative">
                      <select 
                        value={franchiseManager}
                        onChange={(e) => setFranchiseManager(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 focus:border-gold-accent focus:bg-white/10 rounded-xl px-4 py-3.5 text-xs text-white focus:outline-none transition-all duration-300 font-sans appearance-none cursor-pointer"
                      >
                        <option value="Self" className="bg-dark-blue text-white">Self</option>
                        <option value="Family Member" className="bg-dark-blue text-white">Family Member</option>
                        <option value="Manager" className="bg-dark-blue text-white">Manager</option>
                      </select>
                      <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-white/40">
                        <ChevronRight className="w-4 h-4 rotate-90" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 10. How did you hear about us? */}
                <div>
                  <label className="block text-[10px] font-bold uppercase text-white/50 tracking-wider mb-1.5 font-sans">HOW DID YOU HEAR ABOUT US?</label>
                  <div className="relative">
                    <select 
                      value={franchiseHearAboutUs}
                      onChange={(e) => setFranchiseHearAboutUs(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 focus:border-gold-accent focus:bg-white/10 rounded-xl px-4 py-3.5 text-xs text-white focus:outline-none transition-all duration-300 font-sans appearance-none cursor-pointer"
                    >
                      <option value="Instagram" className="bg-dark-blue text-white">Instagram</option>
                      <option value="Website" className="bg-dark-blue text-white">Website</option>
                      <option value="Friend/Reference" className="bg-dark-blue text-white">Friend / Reference</option>
                      <option value="Existing Franchise Partner" className="bg-dark-blue text-white">Existing Franchise Partner</option>
                      <option value="Other" className="bg-dark-blue text-white">Other</option>
                    </select>
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-white/40">
                      <ChevronRight className="w-4 h-4 rotate-90" />
                    </div>
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-gold-accent hover:bg-gold-accent/90 active:scale-[98%] text-dark-blue font-sans font-extrabold text-sm tracking-widest uppercase py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-[0_8px_30px_rgba(212,166,74,0.2)] hover:shadow-[0_12px_40px_rgba(212,166,74,0.4)] mt-6 border border-white/10"
                >
                  <MessageCircle className="w-5 h-5 fill-dark-blue" />
                  Send on WhatsApp
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* About Section replaced and moved after the homepage marquee */}

      {/* Reviews section removed at user request */}

      {/* 11. Bespoke Luxury Footer */}
      <footer id="footer" className="bg-dark-blue text-white pt-20 pb-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            
            {/* Column 1: Identity */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <img 
                  src="/clean_logo.png" 
                  alt="Chaiholic Logo Icon" 
                  className="w-10 h-10 object-contain invert grayscale contrast-200 mix-blend-screen opacity-90"
                />
                <img 
                  src="/chaiholic_homepage_logo.png" 
                  alt="Chaiholic" 
                  className="h-10 w-auto object-contain invert grayscale brightness-200 contrast-200 mix-blend-screen opacity-90"
                />
              </div>
              <p className="text-white/60 text-xs leading-relaxed font-light">
                Pocket-friendly and youth-friendly experience. Good for you and your pocket.
              </p>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h4 className="font-serif font-bold text-base text-white mb-6">Quick Discover</h4>
              <ul className="space-y-3 text-xs text-white/75">
                <li><a href="#home" className="hover:text-gold-accent transition-colors">Hero Entry</a></li>
                <li><a href="#signature" className="hover:text-gold-accent transition-colors">Our Signature Teas</a></li>
                <li><a href="#menu" className="hover:text-gold-accent transition-colors">Digital Menu Book</a></li>
                <li><a href="#outlets" className="hover:text-gold-accent transition-colors">Outlet Coordinates</a></li>
                <li><a href="#franchise" className="hover:text-gold-accent transition-colors">High-Net-Worth Franchise</a></li>
              </ul>
            </div>

            {/* Column 3: Contacts */}
            <div>
              <h4 className="font-serif font-bold text-base text-white mb-6">Reach Our Desk</h4>
              <ul className="space-y-3.5 text-xs text-white/70">
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-gold-accent shrink-0 mt-0.5" />
                  <span>Model Town Circle Market, Rohtak, Haryana 124001</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-gold-accent shrink-0" />
                  <span>+91 8395989816</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-gold-accent shrink-0" />
                  <span>franchise@chaiholic.in</span>
                </li>
              </ul>
            </div>

            {/* Column 4: Hours & Operations */}
            <div>
              <h4 className="font-serif font-bold text-base text-white mb-6">Opening Times</h4>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#B2C7E2]">Mon - Sun</span>
                  <span className="font-bold">9:00 AM - 11:00 PM</span>
                </div>
                <div className="text-[10px] text-gold-accent font-semibold flex items-center gap-1 pt-1 border-t border-white/5 uppercase">
                  <Clock className="w-3.5 h-3.5 text-gold-accent shrink-0" />
                  Open on all National holidays
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Copyright Credentials */}
          <div className="border-t border-white/5 pt-8 text-center text-[11px] text-white/50 leading-relaxed space-y-2">
            <div className="flex flex-col items-center justify-center space-y-2">
              <p>&copy; {new Date().getFullYear()} Chaiholic Cafe. All rights reserved.</p>
              <div className="flex items-center gap-2">
                <span className="text-white/40">Designed by</span>
                <img src="/weblyfy_logo.jpeg" alt="Weblyfy Logo" className="h-4 object-contain opacity-80 hover:opacity-100 transition-opacity mix-blend-screen" />
              </div>
            </div>
          </div>

        </div>
      </footer>

      {/* 12. User Profile / Loyalty Dashboard Modal (AnimatePresence Overlay) */}
      <AnimatePresence>
        {profileModalOpen && user && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            
            {/* Dark Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setProfileModalOpen(false)}
              className="absolute inset-0 bg-dark-blue/70 backdrop-blur-md"
            />

            {/* Profile Panel Container (Royal Midnight Glass) */}
            <motion.div 
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              className="relative max-w-md w-full bg-dark-blue/90 backdrop-blur-2xl rounded-[2.5rem] overflow-hidden border border-white/15 shadow-[0_30px_80px_rgba(0,0,0,0.5)] z-10 p-6 md:p-8 text-white mt-10 md:mt-0"
            >
              {/* Header Visual */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-white tracking-tight">Loyalty Portal</h3>
                  <p className="text-xs text-white/55 mt-0.5">Manage your coins and verified account statistics</p>
                </div>
                <button 
                  onClick={() => setProfileModalOpen(false)}
                  className="bg-white/5 hover:bg-white/10 text-white/80 hover:text-white rounded-full p-2 cursor-pointer transition-colors border border-white/15 active:scale-90"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* User Bio Panel */}
              <div className="flex flex-col items-center text-center p-4 bg-white/5 rounded-3xl border border-white/10 mb-6">
                <div className="relative">
                  <img 
                    src={user.photoURL || `https://api.dicebear.com/7.x/pixel-art/svg?seed=${user.displayName}`} 
                    alt="Current user avatar" 
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-full border-2 border-gold-accent object-cover shadow-[0_0_15px_rgba(212,166,74,0.3)]"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-gold-accent text-dark-blue p-1 rounded-full border border-dark-blue">
                    <Crown className="w-2.5 h-2.5" />
                  </div>
                </div>
                <h4 className="font-serif font-bold text-xl text-white mt-3 leading-tight">{user.displayName || "Chai Lover"}</h4>
                <p className="text-xs text-white/50 mt-0.5">{user.email || "partner@weblyfy.site"}</p>
                
                <span className="mt-2.5 px-3 py-1 font-montserrat font-bold text-[9px] uppercase tracking-widest text-black bg-gold-accent rounded-full leading-none shadow-[0_0_10px_rgba(212,166,74,0.4)] animate-pulse">
                  ⭐ Gold Loyalty Tier
                </span>
              </div>

              {/* Coins Account Summary Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex flex-col items-center justify-center text-center">
                  <Coins className="w-5 h-5 text-gold-accent mb-1" />
                  <span className="text-2xl font-serif font-black text-white">450</span>
                  <span className="text-[10px] text-white/50 font-bold uppercase tracking-wider font-sans mt-0.5">Chai Coins</span>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex flex-col items-center justify-center text-center">
                  <ShoppingBag className="w-5 h-5 text-sky-400 mb-1" />
                  <span className="text-2xl font-serif font-black text-white">12</span>
                  <span className="text-[10px] text-white/50 font-bold uppercase tracking-wider font-sans mt-0.5">Total Orders</span>
                </div>
              </div>

              {/* Extra Account Settings Navigations */}
              <div className="space-y-2 mb-6">
                <button className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 text-left transition-colors font-sans text-xs font-semibold text-white/90 cursor-pointer">
                  <span className="flex items-center gap-2">
                    <History className="w-4 h-4 text-gold-accent" />
                    Order History Logs
                  </span>
                  <ChevronRight className="w-4 h-4 text-white/40" />
                </button>
                <button className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 text-left transition-colors font-sans text-xs font-semibold text-white/90 cursor-pointer">
                  <span className="flex items-center gap-2">
                    <Gift className="w-4 h-4 text-sky-450" />
                    Redeem Chai Coin Rewards
                  </span>
                  <ChevronRight className="w-4 h-4 text-white/40" />
                </button>
              </div>

              {/* Logout Action Buttons */}
              <div className="flex gap-3">
                <button 
                  onClick={handleSignOut}
                  className="flex-1 bg-red-500/10 border border-red-500/20 hover:bg-red-500/25 text-red-400 font-montserrat font-bold text-xs py-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 uppercase tracking-wider"
                >
                  <LogOut className="w-3.5 h-3.5 text-red-400" />
                  Sign Out Account
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 13. Simulated PDF menu download progress bar modal overlays */}
      <AnimatePresence>
        {isDownloadingPdf && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-dark-blue/70 backdrop-blur-md" onClick={() => setIsDownloadingPdf(false)}></div>
            <div className="bg-dark-blue/90 backdrop-blur-2xl border border-white/15 rounded-[2.5rem] overflow-hidden shadow-[0_35px_80px_rgba(0,0,0,0.5)] p-8 relative z-10 max-w-sm w-full text-center space-y-4 text-white">
              <div className="bg-white/5 p-3 rounded-full inline-block border border-white/10 animate-spin">
                <Coffee className="w-8 h-8 text-gold-accent" />
              </div>
              <h4 className="font-serif font-bold text-xl text-white">Downloading Café Book</h4>
              <p className="text-xs text-white/60">Structuring culinary layout details for high quality printing...</p>
              
              {/* Progress Container */}
              <div className="w-full bg-white/10 border border-white/5 rounded-full h-2.5 overflow-hidden">
                <div 
                  className="bg-gold-accent h-full transition-all duration-150 shadow-[0_0_10px_rgba(212,166,74,0.4)]" 
                  style={{ width: `${pdfDownloadProgress}%` }}
                ></div>
              </div>
              <span className="font-mono text-xs text-gold-accent font-bold mt-2 inline-block">
                {pdfDownloadProgress}% Completed
              </span>
            </div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

// Simple fallback icon component when help circle is not available
function HelpCircleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <path d="M12 17h.01" />
    </svg>
  );
}
