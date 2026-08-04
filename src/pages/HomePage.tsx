import React from 'react';
import HeroSection from '../components/HeroSection';
import StorySection from '../components/StorySection';
import InstagramReels from '../components/InstagramReels';
import MenuSection from '../components/MenuSection';
import GallerySection from '../components/GallerySection';
import OutletsSection from '../components/OutletsSection';
import ReviewsSection from '../components/ReviewsSection';
import CtaSection from '../components/CtaSection';
import Footer from '../components/Footer';
import { outlets } from '../data';

interface HomePageProps {
  setLightboxSrc: (src: string | null) => void;
  handleDownloadPdf: () => void;
}

export default function HomePage({ setLightboxSrc, handleDownloadPdf }: HomePageProps) {
  return (
    <>
      <HeroSection />
      <StorySection />
      <InstagramReels />
      <MenuSection 
        onImageClick={setLightboxSrc}
        onDownloadPdf={handleDownloadPdf}
      />
      <GallerySection 
        onImageClick={setLightboxSrc}
      />
      <OutletsSection outlets={outlets} />
      <ReviewsSection />
      <CtaSection />
      <Footer />
    </>
  );
}
