import React, { useEffect, useState } from 'react';
import { FaInstagram, FaPinterest, FaTiktok, FaFacebookF, FaTimes, FaYoutube } from 'react-icons/fa';
import foodblogger from '../assets/foodblogger.png';
import clariti from '../assets/clariti.png';
import '../styles/global.css';
import { fetchCuisinesData } from '../utils/cusinesData';

const links1 = [
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Recipe Index', href: '/recipes' },
  { label: 'Blogging Resources', href: '/resources' },
  { label: 'Income Reports', href: '/income-reports' },
  { label: 'Sponsored Content', href: '/sponsored' },
  { label: 'Media Mentions', href: '/media' },
  { label: 'Contact', href: '/contact' },
];

export default function Footer() {
  const [cuisines, setCuisines] = useState([]);
  useEffect(() => {
    fetchCuisinesData().then(setCuisines);
  }, []);

  return (
    <footer style={{ background: '#fff', marginTop: 48, padding: '0 0 32px 0', borderTop: '1px solid #e5e5e5' }}>
      <div className="footer-outer">
        <div className="footer-main-row">
          {/* Links columns */}
          <div className="footer-links-row">
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, letterSpacing: '0.08em', fontSize: 14, marginBottom: 12 }}>PINCH OF YUM</div>
              {links1.map(link => (
                <a key={link.label} href={link.href} style={{ fontSize: 15, color: '#444', marginBottom: 6, display: 'block', textDecoration: 'none' }}>{link.label}</a>
              ))}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, letterSpacing: '0.08em', fontSize: 14, marginBottom: 12 }}>FOOD & RECIPES</div>
              {cuisines.map(cuisine => (
                <a key={cuisine.id || cuisine.name} href={`/recipes/${cuisine.name.toLowerCase()}`} style={{ fontSize: 15, color: '#444', marginBottom: 6, display: 'block', textDecoration: 'none' }}>{cuisine.name}</a>
              ))}
            </div>
          </div>
          {/* Signup box */}
          <div className="footer-signup-container">
            <div className="footer-signup-box">
              <div style={{ fontFamily: 'Dancing Script, cursive', fontSize: 22, fontWeight: 700, marginBottom: 2 }}>signup</div>
              <div style={{ fontWeight: 700, letterSpacing: '0.08em', fontSize: 15, marginBottom: 6 }}>FOR EMAIL UPDATES</div>
              <div style={{ fontSize: 14, marginBottom: 10 }}>Get a Free eCookbook with our top 25 recipes.</div>
              <form className="footer-signup-form">
                <input type="text" placeholder="First Name" />
                <input type="email" placeholder="Email" />
                <button type="submit">GO</button>
              </form>
            </div>
            <div className="footer-brands-section">
              <div className="footer-brands-label">OUR OTHER BRANDS</div>
              <div className="footer-brands-logos">
                <a href="https://www.foodbloggerpro.com/" target="_blank" rel="noopener noreferrer">
                  <img src={foodblogger} alt="Food Blogger Pro" className="footer-brand-logo" style={{ height: 32 }} />
                </a>
                <a href="https://clariti.com/" target="_blank" rel="noopener noreferrer">
                  <img src={clariti} alt="Clariti" className="footer-brand-logo" style={{ height: 38 }} />
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* Social icons */}
        <div className="footer-social-row" style={{ display: 'flex', gap: 18, margin: '32px 0 0 0', alignItems: 'center', justifyContent: 'flex-start' }}>
          <FaInstagram size={26} style={{ color: '#6e3a59' }} />
          <FaPinterest size={26} style={{ color: '#6e3a59' }} />
          <FaTiktok size={26} style={{ color: '#6e3a59' }} />
          <FaFacebookF size={26} style={{ color: '#6e3a59' }} />
          <FaTimes size={26} style={{ color: '#6e3a59' }} />
          <FaYoutube size={26} style={{ color: '#6e3a59' }} />
        </div>
        {/* Logo and copyright */}
        <div className="footer-logo-row" style={{ margin: '32px 0 0 0', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
          <span style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ fontFamily: 'Lora, serif', fontSize: 32, fontWeight: 400, color: '#6e3a59', letterSpacing: '-2px', marginRight: 6 }}>pinch</span>
            <span style={{ fontFamily: 'Dancing Script, cursive', fontSize: 32, fontWeight: 400, color: '#aaa', marginLeft: -2 }}>of yum</span>
          </span>
          <span style={{ fontSize: 13, color: '#888', lineHeight: 1.4, display: 'flex', flexDirection: 'column' }}>
            <span>© 2025 Pinch of Yum. All Rights Reserved.</span>
            <span style={{ display: 'block' }}>A Raptive Partner Site.</span>
          </span>
        </div>
        <div style={{ marginTop: 16, fontSize: 13, color: '#888', display: 'flex', gap: 16, justifyContent: 'center' }}>
          <a href="/privacy-policy" style={{ color: '#888', textDecoration: 'underline' }}>Privacy Policy</a>
          <a href="/terms" style={{ color: '#888', textDecoration: 'underline' }}>Terms</a>
        </div>
        <div style={{ marginTop: 12, fontSize: 12, color: '#bbb', textAlign: 'center' }}>
          Information from your device can be used to personalize your ad experience.
        </div>
      </div>
    </footer>
  );
} 