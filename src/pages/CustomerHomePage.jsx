import React, { useEffect, useState } from 'react';
import WelcomeBanner from '../components/WelcomeBanner';
import IntroSection from '../components/IntroSection';
import ServiceSection from '../components/ServiceSection';
import PartnerSection from '../components/PartnerSection';

function CustomerHomePage() {

  return (
    <div>
      <WelcomeBanner />
      <IntroSection />
      <ServiceSection />
      <PartnerSection />
    </div>
  );
}

export default CustomerHomePage;
