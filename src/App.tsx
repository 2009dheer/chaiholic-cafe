/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'motion/react';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { Routes, Route, useLocation } from 'react-router-dom';

// Hooks
import { useLenis } from './hooks/useLenis';
import { useScrollProgress } from './hooks/useScrollProgress';

// Components
import Loader from './components/Loader';
import SectionDots from './components/SectionDots';
import Navbar from './components/Navbar';
import ProfileModal from './components/ProfileModal';
import LightboxModal from './components/LightboxModal';

// Pages
import HomePage from './pages/HomePage';
import FranchisePage from './pages/FranchisePage';

// ═══════════════════════════════════════════════
// Firebase Configuration
// ═══════════════════════════════════════════════

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

// ═══════════════════════════════════════════════
// Section IDs for scroll tracking (Home Page Only)
// ═══════════════════════════════════════════════

const SECTION_IDS = ['home', 'story', 'signature', 'menu', 'gallery', 'outlets', 'reviews', 'footer'];

// ═══════════════════════════════════════════════
// Main Application Orchestrator
// ═══════════════════════════════════════════════

export default function App() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  // Loading state
  const [isLoading, setIsLoading] = useState(true);

  // Auth state
  const [user, setUser] = useState<User | null>(null);
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  // Lightbox state
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  // PDF download simulation
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const [pdfDownloadProgress, setPdfDownloadProgress] = useState(0);

  // Initialize smooth scroll & scroll tracking
  const { scrollTo } = useLenis();
  const { activeSection } = useScrollProgress(SECTION_IDS);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // ═══════════════════════════════════════════════
  // Firebase Auth
  // ═══════════════════════════════════════════════

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = useCallback(async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error("Google Auth failed: ", err);
      alert(`Sign-in could not be completed. Please ensure this origin is whitelisted in your Firebase Console: ${window.location.hostname}`);
    }
  }, []);

  const handleSignOut = useCallback(async () => {
    try {
      await signOut(auth);
      setProfileModalOpen(false);
    } catch (err) {
      console.error("Sign out failed: ", err);
    }
  }, []);

  // ═══════════════════════════════════════════════
  // Navigation
  // ═══════════════════════════════════════════════

  const handleNavigate = useCallback((target: string) => {
    const selector = target.startsWith('#') ? target : `#${target}`;
    scrollTo(selector, { duration: 1.8 });
  }, [scrollTo]);

  // ═══════════════════════════════════════════════
  // PDF Download Simulation
  // ═══════════════════════════════════════════════

  const handleDownloadPdf = useCallback(() => {
    setIsDownloadingPdf(true);
    setPdfDownloadProgress(10);
    const interval = setInterval(() => {
      setPdfDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsDownloadingPdf(false);
            window.open("/menu.pdf", "_blank");
          }, 600);
          return 100;
        }
        return prev + 15;
      });
    }, 150);
  }, []);

  // ═══════════════════════════════════════════════
  // Loader Complete
  // ═══════════════════════════════════════════════

  const handleLoadComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  // ═══════════════════════════════════════════════
  // Render
  // ═══════════════════════════════════════════════

  return (
    <>
      {/* Scroll Progress Bar */}
      <div 
        className="scroll-progress" 
        style={{ 
          transform: `scaleX(${isLoading ? 0 : undefined})`,
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 0.5s ease'
        }} 
      />

      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && <Loader onComplete={handleLoadComplete} />}
      </AnimatePresence>

      {/* Main Content */}
      <div 
        className={`min-h-screen overflow-x-hidden transition-opacity duration-700 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
      >
        {/* Section Progress Dots (right side) - Only show on Home page */}
        {isHomePage && (
          <SectionDots 
            activeSection={activeSection} 
            onNavigate={handleNavigate} 
          />
        )}

        {/* Navigation */}
        <Navbar
          user={user}
          onLogin={handleGoogleLogin}
          onSignOut={handleSignOut}
          onProfileOpen={() => setProfileModalOpen(true)}
          scrollTo={handleNavigate}
        />

        {/* Routes */}
        <Routes>
          <Route path="/" element={<HomePage setLightboxSrc={setLightboxSrc} handleDownloadPdf={handleDownloadPdf} />} />
          <Route path="/franchise" element={<FranchisePage />} />
        </Routes>
      </div>

      {/* ══════════════ MODALS & OVERLAYS ══════════════ */}

      {/* Profile / Loyalty Modal */}
      <ProfileModal
        user={user}
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        onSignOut={handleSignOut}
      />

      {/* Image / Video Lightbox */}
      <LightboxModal
        src={lightboxSrc}
        onClose={() => setLightboxSrc(null)}
      />

      {/* PDF Download Progress Overlay */}
      <AnimatePresence>
        {isDownloadingPdf && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <div 
              className="absolute inset-0 bg-deep-navy/80 backdrop-blur-md" 
              onClick={() => setIsDownloadingPdf(false)}
            />
            <div className="glass-card-dark rounded-[2.5rem] shadow-cinematic p-8 relative z-10 max-w-sm w-full text-center space-y-4 text-white">
              <div className="bg-white/5 p-3 rounded-full inline-block border border-white/10 animate-spin">
                <svg className="w-8 h-8 text-gold-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h4 className="font-serif font-bold text-xl text-white">Downloading Café Book</h4>
              <p className="text-xs text-white/60">Structuring culinary layout for high quality printing...</p>
              
              <div className="w-full bg-white/10 border border-white/5 rounded-full h-2.5 overflow-hidden">
                <div 
                  className="bg-gold-accent h-full transition-all duration-150 shadow-gold-glow" 
                  style={{ width: `${pdfDownloadProgress}%` }}
                />
              </div>
              <span className="font-mono text-xs text-gold-accent font-bold mt-2 inline-block counter-number">
                {pdfDownloadProgress}% Completed
              </span>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
