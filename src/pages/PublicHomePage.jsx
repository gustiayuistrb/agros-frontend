import React from 'react';
import HeroSection from '../components/HeroSection';
import IntroSection from '../components/IntroSection';
import ServiceSection from '../components/ServiceSection';
import StorySection from '../components/StorySection';
import CTASection from '../components/CTASection';

function PublicHomePage() {
  return (
    <div>
      <HeroSection />
      <IntroSection />
      <ServiceSection />
      <StorySection />
      <CTASection />
    </div>
  );
}

export default PublicHomePage;
