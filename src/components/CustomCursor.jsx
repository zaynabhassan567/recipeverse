import React, { useEffect, useRef } from 'react';

const cursorStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: 32,
  height: 32,
  borderRadius: '50%',
  background: 'black',
  pointerEvents: 'none',
  zIndex: 9999,
  transform: 'translate(-50%, -50%)',
  transition: 'transform 0.15s cubic-bezier(.17,.67,.83,.67), width 0.15s, height 0.15s',
  mixBlendMode: 'difference'
};

export default function CustomCursor() {
  const cursorRef = useRef();

  useEffect(() => {
    const moveCursor = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  // Grow cursor on link/button hover
  useEffect(() => {
    const grow = () => {
      if (cursorRef.current) {
        cursorRef.current.style.width = '48px';
        cursorRef.current.style.height = '48px';
      }
    };
    const shrink = () => {
      if (cursorRef.current) {
        cursorRef.current.style.width = '32px';
        cursorRef.current.style.height = '32px';
      }
    };
    document.querySelectorAll('a,button').forEach(el => {
      el.addEventListener('mouseenter', grow);
      el.addEventListener('mouseleave', shrink);
    });
    return () => {
      document.querySelectorAll('a,button').forEach(el => {
        el.removeEventListener('mouseenter', grow);
        el.removeEventListener('mouseleave', shrink);
      });
    };
  }, []);

  return <div ref={cursorRef} style={cursorStyle} />;
} 