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
  const [isDesktop, setIsDesktop] = React.useState(window.innerWidth > 900);

  React.useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth > 900);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="hero-showcase">
      <div className="hero-tagline">
        <div className="hero-tagline-main">SIMPLE RECIPES MADE FOR</div>
        <div className="hero-tagline-script">real, everyday life.</div>
      </div>
      {/* Desktop grid - only render on desktop */}
      {isDesktop && (
        <div className="hero-showcase-grid desktop-only">
          {heroCards.map(card => (
            <a
              key={card.title}
              href={card.link}
              className="hero-card"
              style={{ backgroundImage: `url(${card.image})`, position: 'relative' }}
              onClick={e => { e.preventDefault(); navigate(card.link); }}
              tabIndex={0}
              aria-label={card.title}
            >
              <div className="hero-card-overlay"></div>
              <div className="hero-card-label-box">
                {card.title.toUpperCase()}
              </div>
            </a>
          ))}
        </div>
      )}
      {/* Mobile cards - only render on mobile */}
      {!isDesktop && (
        <div className="hero-mobile-cards">
          {heroCards.map(card => (
            <div className="hero-card-mobile" key={card.title} onClick={() => navigate(card.link)} tabIndex={0} aria-label={card.title}>
              <img src={card.image} alt={card.title} className="hero-card-mobile-img" />
              <div className="hero-card-mobile-label">{card.title.toUpperCase()}</div>
            </div>
          ))}
        </div>
      )}
      <div className="hero-showcase-carousel">
        {/* Carousel code can be added here if needed for mobile */}
      </div>
    </div>
  );
} 