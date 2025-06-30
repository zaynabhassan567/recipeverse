import React from 'react';
import { useNavigate } from 'react-router-dom';
import aboutPortrait from '../assets/about-portrait.jpg';
import aboutLifestyle from '../assets/about-lifestyle.jpg';

const aboutStyles = {
  maxWidth: 1200,
  margin: '56px auto 0 auto',
  background: '#f7f6f3',
  borderRadius: 18,
  display: 'flex',
  alignItems: 'stretch',
  gap: 0,
  boxShadow: '0 2px 16px rgba(110,58,89,0.06)',
  overflow: 'hidden',
  flexWrap: 'wrap',
};
const cardBase = {
  flex: 1,
  minWidth: 260,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  background: '#f7f6f3',
  padding: '36px 24px',
};
const leftCard = {
  ...cardBase,
  alignItems: 'center',
  background: '#f3f2ef',
  borderRight: '1px solid #ececec',
  textAlign: 'center',
};
const centerCard = {
  ...cardBase,
  background: '#fff',
  borderRight: '1px solid #ececec',
  padding: 0,
  justifyContent: 'center',
};
const rightCard = {
  ...cardBase,
  background: '#fff',
  padding: 0,
  justifyContent: 'center',
};
const portraitImg = {
  width: '100%',
  height: 340,
  objectFit: 'cover',
  border: 'none',
  borderRadius: 0,
  display: 'block',
};
const lifestyleImg = {
  width: '100%',
  height: 340,
  objectFit: 'cover',
  border: 'none',
  borderRadius: 0,
  display: 'block',
};
const intro = {
  fontSize: 22,
  fontWeight: 700,
  color: '#6e3a59',
  marginBottom: 8,
  fontFamily: 'Lora, serif',
};
const script = {
  fontFamily: 'Dancing Script, cursive',
  fontSize: 32,
  color: '#a97c50',
  marginBottom: 8,
  display: 'block',
};
const desc = {
  fontSize: 18,
  color: '#444',
  marginBottom: 24,
  lineHeight: 1.6,
  maxWidth: 320,
};
const btn = {
  background: '#444',
  color: '#fff',
  fontWeight: 700,
  fontSize: 18,
  border: 'none',
  borderRadius: 4,
  padding: '12px 32px',
  cursor: 'pointer',
  letterSpacing: '0.04em',
  transition: 'background 0.18s',
};

// Responsive styles
const responsive = `
@media (max-width: 900px) {
  .about-section-flex { flex-direction: column !important; }
  .about-section-card { min-width: 0 !important; border-right: none !important; border-bottom: 1px solid #ececec !important; }
  .about-section-card:last-child { border-bottom: none !important; }
  .about-section-img { height: 220px !important; }
}
`;

export default function AboutSection() {
  const navigate = useNavigate();
  return (
    <div style={aboutStyles} className="about-section-flex">
      <style>{responsive}</style>
      {/* Left Card: About Text */}
      <div style={leftCard} className="about-section-card">
        <div style={intro}>HI! I'M LINDSAY.</div>
        <span style={script}>nice to meet you!</span>
        <div style={desc}>
          I'm a former 4th grade teacher, now full time food blogger. My husband Bjork and I live in Minnesota. Favorite things include my camera, lake days, and dark chocolate.
        </div>
        <button style={btn} onClick={() => navigate('/about')}>LEARN MORE</button>
      </div>
      {/* Center Card: Portrait */}
      <div style={centerCard} className="about-section-card">
        <img
          src={aboutPortrait}
          alt="Author portrait"
          style={{ ...portraitImg }}
          className="about-section-img"
        />
      </div>
      {/* Right Card: Lifestyle/Food */}
      <div style={rightCard} className="about-section-card">
        <img
          src={aboutLifestyle}
          alt="Lifestyle food"
          style={{ ...lifestyleImg }}
          className="about-section-img"
        />
      </div>
    </div>
  );
} 