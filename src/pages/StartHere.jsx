import React from 'react';
import aboutLifestyle from '../assets/about-lifestyle.jpg';
// import CustomCursor from '../components/CustomCursor';

export default function StartHere() {
  return (
    <div style={{ background: '#f8f6f3', minHeight: '100vh', padding: 0 }}>
      {/* <CustomCursor /> */}
      <style>{`
        .advanced-hover {
          transition: box-shadow 0.35s cubic-bezier(.22,.61,.36,1),
                      transform 0.35s cubic-bezier(.22,.61,.36,1),
                      background 0.25s cubic-bezier(.22,.61,.36,1);
          will-change: transform, box-shadow;
          position: relative;
          z-index: 1;
        }
        .advanced-hover:hover, .advanced-hover:focus-visible {
          box-shadow: 0 8px 32px 0 rgba(110,58,89,0.18), 0 1.5px 8px 0 rgba(232,67,147,0.10);
          transform: translateY(-4px) scale(1.035);
          background: rgba(255,255,255,0.98);
        }
      `}</style>
      <div className="advanced-hover" style={{
        display: 'flex',
        flexDirection: 'row',
        maxWidth: 1200,
        margin: '0 auto',
        background: '#fff',
        boxShadow: '0 2px 16px rgba(110,58,89,0.07)',
        borderRadius: 18,
        overflow: 'hidden',
        marginTop: 48,
      }}>
        {/* Left: Image */}
        <div style={{ flex: 1, minWidth: 320, maxWidth: 480, height: 420, overflow: 'hidden' }}>
          <img
            src={aboutLifestyle}
            alt="About Lifestyle"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>
        {/* Right: Welcome Text */}
        <div style={{ flex: 2, padding: '48px 40px', background: '#f8f6f3', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h1 style={{ color: '#7c466a', fontFamily: 'Lora, serif', fontWeight: 800, fontSize: 54, margin: 0, marginBottom: 18 }}>
            Welcome to Pinch of Yum
          </h1>
          <div style={{ fontWeight: 800, fontSize: 22, color: '#7c466a', letterSpacing: '0.04em', marginBottom: 12 }}>
            LET'S TALK FOOD <span style={{ fontFamily: 'Dancing Script, cursive', color: '#aaa', fontWeight: 400, fontSize: 32, marginLeft: 8 }}>shall we?</span>
          </div>
          <div style={{ color: '#444', fontSize: 20, lineHeight: 1.6, fontFamily: 'Montserrat, sans-serif', marginBottom: 18 }}>
            Well, we hope that's why you're here. Our recipes are designed for real, actual, every day life, and we try to focus on real foods and healthy recipes (which honestly means a lot of different things to us, including the perfect chocolate chip cookie and cheese on cheese on cheese, because health is all about balance, right?).
          </div>
          <div style={{ color: '#444', fontSize: 18, lineHeight: 1.6, fontFamily: 'Montserrat, sans-serif' }}>
            This is the place to find those recipes — everything from our most popular, to meal prep, to Instant Pot recipes, or if you just, like, have some sad greens in your fridge to use up and you need some inspiration.
          </div>
        </div>
      </div>
    </div>
  );
} 