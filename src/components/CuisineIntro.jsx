import React from 'react';

const bgStyle = {
  width: '100%',
  background: '#f7f6f3',
  borderRadius: 18,
  margin: '0 auto 32px auto',
  maxWidth: 1200,
  padding: '32px 24px',
  textAlign: 'center',
  boxShadow: '0 2px 16px rgba(110,58,89,0.06)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 18,
};

export default function CuisineIntro({ cuisineName, description, image }) {
  return (
    <div style={bgStyle}>
      {image && <img src={image} alt={cuisineName + ' cuisine'} style={{ width: 120, height: 120, objectFit: 'cover', borderRadius: '50%', marginBottom: 12 }} />}
      <h2 style={{ color: '#6e3a59', fontFamily: 'Montserrat, sans-serif', fontWeight: 800, fontSize: 36, letterSpacing: '0.08em', textTransform: 'capitalize', margin: 0 }}>{cuisineName} Cuisine</h2>
      <div style={{ color: '#555', fontSize: 20, fontFamily: 'Lora, serif', marginTop: 8 }}>{description}</div>
    </div>
  );
} 