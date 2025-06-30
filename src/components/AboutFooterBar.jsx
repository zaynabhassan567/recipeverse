import React from 'react';
import { FaInstagram, FaPinterest, FaTiktok, FaFacebook, FaYoutube, FaXTwitter } from 'react-icons/fa6';

const barStyles = {
  background: '#77405c',
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 32,
  padding: '10px 48px',
  borderRadius: 0,
  margin: '-24px auto 0 auto',
  maxWidth: 1200,
  position: 'relative',
  zIndex: 2,
  boxShadow: '0 4px 24px rgba(110,58,89,0.10)',
  flexWrap: 'wrap',
};
const leftCol = {
  display: 'flex',
  alignItems: 'center',
  gap: 18,
  flex: 1,
  minWidth: 220,
};
const followText = {
  fontWeight: 700,
  fontSize: 18,
  letterSpacing: '0.04em',
  marginRight: 12,
};
const iconStyle = {
  fontSize: 36,
  color: '#fff',
  background: 'none',
  marginRight: 0,
  transition: 'color 0.18s',
  cursor: 'pointer',
};
const rightCol = {
  display: 'flex',
  alignItems: 'center',
  gap: 18,
  flex: 2,
  minWidth: 320,
  justifyContent: 'flex-end',
  flexWrap: 'wrap',
};
const signupScript = {
  fontFamily: 'Dancing Script, cursive',
  fontSize: 32,
  color: '#fff',
  marginRight: 10,
  fontWeight: 400,
};
const signupText = {
  fontWeight: 700,
  fontSize: 18,
  letterSpacing: '0.04em',
  color: '#fff',
  marginRight: 18,
};
const inputRow = {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  flexWrap: 'nowrap',
};
const input = {
  padding: '12px 16px',
  fontSize: 18,
  border: 'none',
  borderRadius: 2,
  minWidth: 160,
  fontFamily: 'Lora, serif',
};
const btn = {
  background: '#f5b945',
  color: '#fff',
  fontWeight: 700,
  fontSize: 18,
  border: 'none',
  borderRadius: 2,
  padding: '12px 32px',
  cursor: 'pointer',
  letterSpacing: '0.04em',
  transition: 'background 0.18s',
};

// Responsive styles
const responsive = `
@media (max-width: 900px) {
  .about-footer-bar-flex { flex-direction: column !important; align-items: stretch !important; padding: 10px 8px !important; gap: 24px !important; max-width: 98vw !important; }
  .about-footer-bar-left, .about-footer-bar-right { justify-content: center !important; }
  .about-footer-bar-right { flex-wrap: wrap !important; }
  .about-footer-bar-input-row { flex-direction: column !important; align-items: stretch !important; gap: 8px !important; }
  .about-footer-bar-input { min-width: 0 !important; font-size: 16px !important; }
  .about-footer-bar-btn { padding: 10px 18px !important; font-size: 16px !important; }
  .about-footer-bar-script { font-size: 24px !important; }
}
`;

export default function AboutFooterBar() {
  return (
    <div style={barStyles} className="about-footer-bar-flex">
      <style>{responsive}</style>
      {/* Left: Socials */}
      <div style={leftCol} className="about-footer-bar-left">
        <span style={followText}>FOLLOW US</span>
        <FaInstagram style={iconStyle} />
        <FaPinterest style={iconStyle} />
        <FaTiktok style={iconStyle} />
        <FaFacebook style={iconStyle} />
        <FaXTwitter style={iconStyle} />
        <FaYoutube style={iconStyle} />
      </div>
      {/* Right: Signup */}
      <div style={rightCol} className="about-footer-bar-right">
        <span style={signupScript} className="about-footer-bar-script">signup</span>
        <span style={signupText}>FOR EMAIL UPDATES</span>
        <div style={inputRow} className="about-footer-bar-input-row">
          <input type="text" placeholder="First Name" style={input} className="about-footer-bar-input" />
          <input type="email" placeholder="Email" style={input} className="about-footer-bar-input" />
          <button style={btn} className="about-footer-bar-btn">GO</button>
        </div>
      </div>
    </div>
  );
} 