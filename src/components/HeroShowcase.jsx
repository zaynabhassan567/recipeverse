import React from 'react';
import { useNavigate } from 'react-router-dom';
import { cuisinesData } from '../utils/cusinesData';
import '../styles/global.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const heroCards = cuisinesData.slice(0, 4).map(cuisine => ({
  title: cuisine.name,
  image: cuisine.image,
  link: `/recipes/${cuisine.name.toLowerCase()}`,
}));

export default function HeroShowcase() {
  const navigate = useNavigate();

  return (
    <div className="hero-showcase">
      <div className="hero-tagline">
        SIMPLE RECIPES MADE FOR <span className="hero-tagline-script">real, everyday life.</span>
      </div>
      <div className="hero-showcase-grid">
        {heroCards.map(card => (
          <a
            key={card.title}
            href={card.link}
            className="hero-card"
            style={{ backgroundImage: `url(${card.image})` }}
            onClick={e => { e.preventDefault(); navigate(card.link); }}
            tabIndex={0}
            aria-label={card.title}
          >
            <div className="hero-card-overlay"></div>
          </a>
        ))}
      </div>
      <div className="hero-showcase-carousel">
        {/* Carousel code can be added here if needed for mobile */}
      </div>
      <div className="hero-card-label-row">
        {heroCards.map(card => (
          <div className="hero-card-label-box" key={card.title}>{card.title.toUpperCase()}</div>
        ))}
      </div>
    </div>
  );
} 