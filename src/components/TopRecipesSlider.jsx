import React from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function TopRecipesSlider({ recipes = [], loading }) {
  const topRecipes = [...recipes]
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 5);
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: Math.min(4, topRecipes.length),
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 3 } },
      { breakpoint: 900, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
  };
  if (loading) return <div style={{ textAlign: 'center', margin: '32px 0' }}>Loading top recipes...</div>;
  if (!topRecipes.length) return null;
  return (
    <div style={{ maxWidth: 1200, margin: '0 auto 32px auto', padding: '0 16px' }}>
      <Slider {...settings}>
        {topRecipes.map(recipe => (
          <div key={recipe.id} style={{ padding: 12 }}>
            <Link to={`/recipes/detail/${recipe.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{
                background: '#fff',
                borderRadius: 14,
                boxShadow: '0 2px 12px rgba(110,58,89,0.07)',
                overflow: 'hidden',
                textAlign: 'center',
                border: '1px solid #eee',
                minHeight: 220,
                maxWidth: 320,
                margin: '0 auto',
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <img src={recipe.image} alt={recipe.name} style={{ width: '100%', height: 120, objectFit: 'cover', borderTopLeftRadius: 14, borderTopRightRadius: 14, borderBottomLeftRadius: 0, borderBottomRightRadius: 0, display: 'block' }} />
                <div style={{ fontWeight: 700, fontSize: 20, fontFamily: 'Lora, serif', color: '#6e3a59', margin: '16px 0 0 0', padding: '0 14px 16px 14px', textAlign: 'center', lineHeight: 1.18, flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{recipe.name}</div>
                <div style={{ color: '#f5b945', fontWeight: 700, fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, marginBottom: 12 }}>
                  <FaStar style={{ marginRight: 4 }} /> {recipe.rating || '–'}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
} 