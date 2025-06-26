import React, { useState } from 'react';
import { FaHeart, FaTimes } from 'react-icons/fa';

const TopBar = () => {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  return (
    <div style={{
      background: '#6e3a59',
      color: '#f8e7ec',
      width: '100%',
      minHeight: 38,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      fontFamily: 'Lora, serif',
      fontWeight: 800,
      textTransform: 'uppercase',
      letterSpacing: '0.04em',
      fontSize: '0.82rem',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    }}>
      <style>{`
        @media (max-width: 600px) {
          .topbar-inner { font-size: 0.72rem !important; }
        }
      `}</style>
      <div className="topbar-inner" style={{
        flex: 1,
        maxWidth: 1200,
        margin: '0 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 38,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}>
        <FaHeart style={{ color: '#f5b945', marginRight: 8, fontSize: '1em', verticalAlign: 'middle' }} />
        <span>
          our recipes, your inbox.{' '}
          <a
            href="#signup"
            style={{
              color: '#fff',
              textDecoration: 'none',
              fontWeight: 800,
              cursor: 'pointer',
            }}
          >
            sign up
          </a>
        </span>
      </div>
      <FaTimes
        style={{ color: '#f8e7ec', fontSize: 20, marginRight: 16, cursor: 'pointer', opacity: 0.8 }}
        onClick={() => setVisible(false)}
        aria-label="Close top bar"
      />
    </div>
  );
};

export default TopBar; 