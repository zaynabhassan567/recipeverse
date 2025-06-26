import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const navLinks = [
  { label: 'HOME', href: '/' },
  { label: 'ABOUT', href: '/about' },
  { label: 'RECIPES', href: '/recipes' },
  { label: 'START HERE', href: '/start' },
];

const headerStyle = {
  background: '#fff',
  borderTop: '6px solid #6e3a59',
  borderBottom: '1px solid #e5e5e5',
  padding: '20px 0 16px 0',
  width: '100%',
  boxSizing: 'border-box',
  position: 'relative',
  zIndex: 3000,
};

const innerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  maxWidth: 1100,
  margin: '0 auto',
  minHeight: 56,
};

const logoStyle = {
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  height: '100%',
};

const pinchStyle = {
  fontFamily: 'Lora, serif',
  fontSize: 36,
  fontWeight: 400,
  color: '#6e3a59',
  letterSpacing: '-2px',
  marginRight: 6,
};

const ofYumStyle = {
  fontFamily: 'Dancing Script, cursive',
  fontSize: 36,
  fontWeight: 400,
  color: '#aaa',
  marginLeft: -2,
};

const navStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 24,
  marginLeft: 'auto',
};

const linkStyle = {
  color: '#222',
  fontFamily: 'Montserrat, sans-serif',
  fontWeight: 700,
  textTransform: 'uppercase',
  fontSize: 20,
  letterSpacing: '0.04em',
  textDecoration: 'none',
  margin: 0,
  transition: 'color 0.2s',
  padding: '0 2px',
  position: 'relative',
  cursor: 'pointer',
  marginBottom: 0,
};

const searchIconStyle = {
  color: '#6e3a59',
  fontSize: 22,
  marginLeft: 18,
  cursor: 'pointer',
  verticalAlign: 'middle',
  transition: 'color 0.2s',
};

const hamburgerContainerStyle = {
  display: 'none',
  width: 24,
  height: 24,
  position: 'absolute',
  right: 8,
  top: '50%',
  transform: 'translateY(-50%)',
  margin: 0,
  cursor: 'pointer',
  background: 'none',
  border: 'none',
  zIndex: 3100,
  alignItems: 'center',
  justifyContent: 'center',
  boxSizing: 'border-box',
};

const hamburgerBarStyle = {
  position: 'absolute',
  left: 0,
  width: 20,
  height: 3,
  background: '#6e3a59',
  borderRadius: 2,
  transition: 'all 0.3s',
};

const drawerOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  background: 'rgba(0,0,0,0.2)',
  zIndex: 2000,
};

const drawerStyle = {
  position: 'absolute',
  top: 'calc(100% + 8px)',
  left: 0,
  width: '50vw',
  maxWidth: 340,
  height: 'calc(100vh - 72px - 8px)',
  background: 'rgba(255,255,255,0.85)',
  zIndex: 2100,
  display: 'flex',
  flexDirection: 'column',
  padding: 0,
  margin: 0,
  transition: 'transform 0.5s cubic-bezier(0.22, 0.61, 0.36, 1)',
  boxShadow: '2px 0 8px rgba(0,0,0,0.08)',
  willChange: 'transform',
};

const drawerLinksContainer = {
  display: 'flex',
  flexDirection: 'column',
  padding: '32px 0 0 0',
  flex: 1,
};

const drawerLinkStyle = {
  ...linkStyle,
  color: '#6e3a59',
  fontWeight: 700,
  fontSize: 20,
  margin: '0 0 28px 32px',
  textAlign: 'left',
  display: 'block',
};

const drawerSearchIconStyle = {
  color: '#6e3a59',
  fontSize: 24,
  margin: '0 0 0 32px',
  cursor: 'pointer',
  verticalAlign: 'middle',
  alignSelf: 'flex-start',
};

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <div style={{ ...headerStyle, position: 'relative' }}>
      <style>{`
        .nav-link-custom:hover, .nav-link-custom:active {
          color: #6e3a59 !important;
          text-decoration: underline;
        }
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .desktop-search { display: none !important; }
          .hamburger-menu { display: flex !important; }
        }
        @media (min-width: 901px) {
          .hamburger-menu { display: none !important; }
          .desktop-search { display: inline-block !important; }
        }
      `}</style>
      <div style={innerStyle}>
        {/* Logo */}
        <a href="/" style={logoStyle}>
          <span style={pinchStyle}>pinch</span>
          <span style={{...ofYumStyle, fontFamily: 'Dancing Script, cursive'}}>of</span>
          <span style={pinchStyle}>yum</span>
        </a>
        {/* Nav Links (desktop only) */}
        <nav style={navStyle} className="desktop-nav">
          {navLinks.map(link => (
            <a key={link.label} href={link.href} style={linkStyle} className="nav-link-custom">
              {link.label}
            </a>
          ))}
          <FaSearch style={searchIconStyle} className="desktop-search" />
        </nav>
        {/* Hamburger (mobile only) */}
        <button
          className="hamburger-menu"
          style={hamburgerContainerStyle}
          onClick={() => setDrawerOpen(!drawerOpen)}
          aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
        >
          <span
            style={{
              ...hamburgerBarStyle,
              top: 4,
              transform: drawerOpen ? 'rotate(45deg)' : 'none',
            }}
          />
          <span
            style={{
              ...hamburgerBarStyle,
              top: 10.5,
              opacity: drawerOpen ? 0 : 1,
            }}
          />
          <span
            style={{
              ...hamburgerBarStyle,
              top: 17,
              transform: drawerOpen ? 'rotate(-45deg)' : 'none',
            }}
          />
        </button>
      </div>
      <div style={{ position: 'relative' }}>
        {/* Drawer overlay */}
        {drawerOpen && <div style={drawerOverlayStyle} onClick={() => setDrawerOpen(false)} />}
        {/* Drawer */}
        <div style={{
          ...drawerStyle,
          transform: drawerOpen ? 'translateX(0)' : 'translateX(-100%)',
        }}>
          <div style={drawerLinksContainer}>
            {navLinks.map(link => (
              <a key={link.label} href={link.href} style={drawerLinkStyle} onClick={() => setDrawerOpen(false)}>
                {link.label}
              </a>
            ))}
            <FaSearch style={drawerSearchIconStyle} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header; 