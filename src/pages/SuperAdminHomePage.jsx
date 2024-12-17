import React from 'react';
import WelcomeBanner from '../components/WelcomeBanner';
import IntroSection from '../components/IntroSection';
import ServiceSection from '../components/ServiceSection';
import PartnerSection from '../components/PartnerSection';

function SuperAdminHomePage() {
  return (
    <div>
      <WelcomeBanner />
      <IntroSection />
      <ServiceSection />
      <PartnerSection />
    </div>
  );
}

export default SuperAdminHomePage;
