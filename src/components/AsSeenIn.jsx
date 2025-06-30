import React from 'react';
import Slider from 'react-slick';
import purewow from '../assets/purewow.png';
import britco from '../assets/britco.png';
import kitchn from '../assets/kitchn.png';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const logos = [
  { src: purewow, alt: 'PureWow' },
  { src: britco, alt: 'Brit + Co' },
  { src: kitchn, alt: 'Kitchn' },
];

export default function AsSeenIn() {
  const settings = {
    infinite: true,
    speed: 4000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: 'linear',
    arrows: false,
    pauseOnHover: false,
    variableWidth: true,
  };
  return (
    <div style={{ background: 'white', padding: '40px 0 0 0', textAlign: 'center', position: 'relative' }}>
      <div style={{ color: '#e2a84b', fontSize: '1.2rem', fontWeight: 700, letterSpacing: '0.25em', marginBottom: 32, textTransform: 'uppercase' }}>
        AS SEEN IN
      </div>
      <div style={{ width: '100%', overflow: 'hidden', marginBottom: 32, position: 'relative', height: 56 }}>
        <Slider {...settings}>
          {[...logos, ...logos, ...logos].map((logo, idx) => (
            <div key={logo.alt + idx} style={{ width: 200, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img
                src={logo.src}
                alt={logo.alt}
                style={{ height: 56, width: 'auto', maxWidth: 180, filter: 'grayscale(1) brightness(0.7)', opacity: 0.8 }}
              />
            </div>
          ))}
        </Slider>
      </div>
      <hr style={{ border: 'none', borderTop: '1px solid #ececec', margin: '0 2vw' }} />
    </div>
  );
} 