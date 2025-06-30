import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { filterRecipesByCuisine } from '../services/recipeApi';

const TABS = [
  { key: 'italian', label: 'Italian', search: 'Italian' },
  { key: 'mexican', label: 'Mexican', search: 'Mexican' },
  { key: 'indian', label: 'Indian', search: 'Indian' },
];

const fadeInKeyframes = `
@keyframes fadeInCard {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: none; }
}`;

const sectionHeading = {
  textAlign: 'center',
  fontSize: 32,
  fontWeight: 800,
  fontFamily: 'Lora, serif',
  color: '#6e3a59',
  marginBottom: 8,
  letterSpacing: '0.01em',
};
const divider = {
  width: 60,
  height: 4,
  background: '#f5b945',
  border: 'none',
  borderRadius: 2,
  margin: '0 auto 32px auto',
  display: 'block',
};
const tabStyles = {
  display: 'flex',
  justifyContent: 'center',
  gap: 0,
  marginBottom: 32,
};
const tabBtnStyles = (active) => ({
  padding: '16px 32px',
  fontWeight: 700,
  fontSize: 18,
  background: active ? '#fff' : 'transparent',
  color: active ? '#6e3a59' : '#222',
  border: 'none',
  borderBottom: active ? '6px solid #f5b945' : '6px solid transparent',
  cursor: 'pointer',
  outline: 'none',
  transition: 'background 0.2s, color 0.2s, border-bottom 0.2s',
  marginRight: 0,
  borderRadius: '8px 8px 0 0',
  position: 'relative',
  boxShadow: active ? '0 4px 16px rgba(245,185,69,0.08)' : 'none',
});
const gridStyles = {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: 32,
  maxWidth: 1200,
  margin: '0 auto',
  padding: '0 16px',
};
const cardStyles = {
  background: '#fff',
  borderRadius: 18,
  boxShadow: '0 2px 12px rgba(110,58,89,0.07)',
  overflow: 'hidden',
  textAlign: 'center',
  cursor: 'pointer',
  border: '1px solid #eee',
  transition: 'box-shadow 0.22s, transform 0.22s',
  opacity: 0,
  animation: 'fadeInCard 0.7s forwards',
};
const cardHover = {
  boxShadow: '0 8px 32px rgba(110,58,89,0.13)',
  transform: 'translateY(-6px) scale(1.025)',
};
const imgStyles = {
  width: '100%',
  aspectRatio: '1/1',
  objectFit: 'cover',
  display: 'block',
};
const tagStyles = {
  display: 'inline-block',
  background: '#f5b945',
  color: '#fff',
  fontWeight: 700,
  fontSize: 15,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  borderRadius: 3,
  padding: '8px 22px 6px 22px',
  margin: '18px auto 10px auto',
  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
};
const titleStyles = {
  fontWeight: 700,
  fontSize: 22,
  fontFamily: 'Lora, serif',
  color: '#222',
  margin: '0 0 18px 0',
  padding: '0 10px',
};

// Responsive grid
const getGridStyles = () => {
  if (window.innerWidth < 600) {
    return { ...gridStyles, gridTemplateColumns: '1fr', gap: 18 };
  } else if (window.innerWidth < 900) {
    return { ...gridStyles, gridTemplateColumns: '1fr 1fr', gap: 22 };
  }
  return gridStyles;
};

export default function CuratedPicks() {
  const [activeTab, setActiveTab] = useState(TABS[0].key);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [gridStyle, setGridStyle] = useState(getGridStyles());
  const navigate = useNavigate();
  const cardRefs = useRef([]);
  const [visibleCards, setVisibleCards] = useState([]);

  useEffect(() => {
    setLoading(true);
    const tab = TABS.find(t => t.key === activeTab);
    filterRecipesByCuisine(tab.search).then(data => {
      setRecipes((data || []).slice(0, 4));
      setLoading(false);
    });
  }, [activeTab]);

  useEffect(() => {
    const handleResize = () => setGridStyle(getGridStyles());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!recipes.length) return;
    const observer = new window.IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleCards(prev => {
              const idx = Number(entry.target.getAttribute('data-idx'));
              if (!prev.includes(idx)) return [...prev, idx];
              return prev;
            });
          }
        });
      },
      { threshold: 0.2 }
    );
    cardRefs.current.forEach(ref => ref && observer.observe(ref));
    return () => observer.disconnect();
  }, [recipes]);

  return (
    <div style={{ background: '#faf9f7', padding: '56px 0 48px 0' }}>
      <style>{fadeInKeyframes}</style>
      <div style={sectionHeading}>Curated Picks</div>
      <hr style={divider} />
      <div style={tabStyles}>
        {TABS.map(tab => (
          <button
            key={tab.key}
            style={tabBtnStyles(activeTab === tab.key)}
            onClick={() => setActiveTab(tab.key)}
            aria-selected={activeTab === tab.key}
            onMouseOver={e => e.currentTarget.style.background = '#f5b945'}
            onMouseOut={e => e.currentTarget.style.background = activeTab === tab.key ? '#fff' : 'transparent'}
          >
            {tab.label}
            {activeTab === tab.key && (
              <span style={{
                display: 'block',
                position: 'absolute',
                left: 0, right: 0, bottom: -6,
                height: 6,
                background: '#f5b945',
                borderRadius: '0 0 8px 8px',
              }} />
            )}
          </button>
        ))}
      </div>
      <div style={gridStyle}>
        {loading ? (
          Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} style={{ ...cardStyles, background: '#eee', minHeight: 260, animation: 'pulse 1.2s infinite', opacity: 1 }} />
          ))
        ) : (
          recipes.map((recipe, idx) => (
            <div
              key={recipe.id}
              ref={el => cardRefs.current[idx] = el}
              data-idx={idx}
              className={visibleCards.includes(idx) ? 'fade-in-card' : ''}
              style={{ ...cardStyles, ...(hovered === idx ? cardHover : {}), animationDelay: `${idx * 0.08 + 0.1}s` }}
              onClick={() => navigate(`/recipes/${recipe.id}`)}
              tabIndex={0}
              role="button"
              aria-label={recipe.name}
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
            >
              <img src={recipe.image} alt={recipe.name} style={imgStyles} />
              <div style={tagStyles}>{(recipe.tags && recipe.tags[0]) ? recipe.tags[0].toUpperCase() : 'RECIPE'}</div>
              <div style={titleStyles}>{recipe.name}</div>
            </div>
          ))
        )}
      </div>
      <div style={{ textAlign: 'center', marginTop: 24 }}>
        <button
          style={{
            background: '#6e3a59',
            color: '#fff',
            fontWeight: 700,
            fontSize: 18,
            border: 'none',
            borderRadius: 4,
            padding: '12px 32px',
            cursor: 'pointer',
            letterSpacing: '0.04em',
            transition: 'background 0.18s',
          }}
          onClick={() => navigate(`/recipes?cuisine=${TABS.find(t => t.key === activeTab).search}`)}
        >
          View All
        </button>
      </div>
      <style>{`@keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; } }`}</style>
      <style>{`.fade-in-card { opacity: 1 !important; animation: fadeInCard 0.7s forwards !important; }`}</style>
    </div>
  );
} 