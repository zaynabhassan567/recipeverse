import React, { useEffect, useRef } from 'react';

const CursorTrail = () => {
  const trailRef = useRef([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const trail = document.createElement('div');
      trail.className = 'trail';
      trail.style.left = `${e.clientX}px`;
      trail.style.top = `${e.clientY}px`;

      document.body.appendChild(trail);
      trailRef.current.push(trail);

      setTimeout(() => {
        trail.remove();
        trailRef.current.shift();
      }, 400); // trail disappears after 400ms
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Inject the CSS for the trail effect
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .trail {
        position: fixed;
        width: 10px;
        height: 10px;
        background: rgba(0, 255, 255, 0.6);
        border-radius: 50%;
        pointer-events: none;
        transform: translate(-50%, -50%);
        animation: fadeOut 0.4s ease-out forwards;
        z-index: 9999;
      }
      @keyframes fadeOut {
        to {
          opacity: 0;
          transform: scale(2);
        }
      }
    `;
    document.head.appendChild(style);
    return () => {
      if (style.parentNode) style.parentNode.removeChild(style);
    };
  }, []);

  return null; // nothing rendered directly
};

export default CursorTrail; 