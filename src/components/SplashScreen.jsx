import React, { useEffect, useState } from 'react';
import logo from '../assets/pinch-of-yum-logo.png';

export default function SplashScreen() {
  const [hide, setHide] = useState(false);
  const [remove, setRemove] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHide(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (hide) {
      const fadeTimer = setTimeout(() => setRemove(true), 700); // match transition duration
      return () => clearTimeout(fadeTimer);
    }
  }, [hide]);

  if (remove) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: '#f5eafd', // light purple
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        zIndex: 9999,
        transition: 'opacity 0.7s',
        opacity: hide ? 0 : 1,
        pointerEvents: hide ? 'none' : 'auto',
      }}
    >
      <img
        src={logo}
        alt="Pinch of Yum Logo"
        style={{
          width: 120,
          height: 120,
          objectFit: 'contain',
          borderRadius: 24,
          boxShadow: '0 4px 32px rgba(110,58,89,0.10)',
          background: '#fff',
          padding: 16,
        }}
      />
      <div style={{ marginTop: 32, display: 'flex', justifyContent: 'center' }}>
        <div className="splash-spinner" style={{
          width: 48,
          height: 48,
          border: '5px solid #e1c6f7',
          borderTop: '5px solid #a259c4',
          borderRadius: '50%',
          animation: 'splash-spin 1s linear infinite',
        }} />
      </div>
      <style>{`
        @keyframes splash-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
} 