import React from 'react';
import HeroShowcase from '../components/HeroShowcase';
import CuisinesNav from '../components/CuisinesNav';
import CuratedPicks from '../components/CuratedPicks';
import HeroSearch from '../components/HeroSearch';
import AsSeenIn from '../components/AsSeenIn';
import AboutSection from '../components/AboutSection';
import AboutFooterBar from '../components/AboutFooterBar';

const Home = () => {
  return (
    <div>
      <HeroShowcase />
      <CuisinesNav />
      <HeroSearch />
      <AsSeenIn />
      <AboutSection />
      <AboutFooterBar />
      <CuratedPicks />
      {/* Main content goes here */}
    </div>
  );
};

export default Home; 