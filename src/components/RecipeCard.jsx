import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaRegStar } from 'react-icons/fa';

const cardStyles = {
  background: 'transparent',
  borderRadius: 0,
  boxShadow: 'none',
  overflow: 'visible',
  textAlign: 'center',
  cursor: 'pointer',
  border: 'none',
  transition: 'box-shadow 0.22s, transform 0.22s',
  display: 'flex',
  flexDirection: 'column',
  minHeight: 320,
  marginBottom: 8,
  padding: 0,
};
const cardHover = {
  boxShadow: '0 8px 32px rgba(110,58,89,0.13)',
  transform: 'translateY(-6px) scale(1.025)',
};
const imgStyles = {
  width: '100%',
  aspectRatio: '1/1',
  objectFit: 'cover',
  display: 'block',
  borderRadius: 18,
};
const ratingRow = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 0,
  fontSize: 22,
  color: '#f5b945',
  margin: '22px 0 0 0',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.04em',
  lineHeight: 1.1,
};
const ratingText = {
  color: '#888',
  fontWeight: 800,
  fontSize: 16,
  marginLeft: 0,
  letterSpacing: '0.04em',
  fontFamily: 'Montserrat, sans-serif',
  marginTop: 12,
  marginBottom: 0,
  display: 'block',
};
const titleStyles = {
  fontWeight: 700,
  fontSize: 22,
  fontFamily: 'Lora, serif',
  color: '#6e3a59',
  margin: '18px 0 0 0',
  padding: '0 18px',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  minHeight: 54,
  textAlign: 'center',
  lineHeight: 1.18,
};
const tagStyles = {
  display: 'inline-block',
  background: '#f5b945',
  color: '#fff',
  fontWeight: 700,
  fontSize: 14,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  borderRadius: 16,
  padding: '6px 18px 4px 18px',
  margin: '18px auto 8px auto',
  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
};

const RecipeCard = ({ recipe }) => {
  const [hovered, setHovered] = useState(false);
  const reviews = recipe.reviews || recipe.reviewCount || 0;
  const rating = recipe.rating || recipe.ratingAverage || recipe.stars || null;
  return (
    <div
      style={{ ...cardStyles, ...(hovered ? cardHover : {}) }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link to={`/recipes/detail/${recipe.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <img src={recipe.image} alt={recipe.name} style={imgStyles} />
        { (recipe.category || (recipe.tags && recipe.tags[0])) && (
          <div style={tagStyles}>
            {(recipe.category || recipe.tags[0]).toUpperCase()}
          </div>
        )}
        <div style={ratingRow}>
          {[...Array(5)].map((_, i) =>
            i < Math.round(rating || 0) ? (
              <FaStar key={i} />
            ) : (
              <FaRegStar key={i} />
            )
          )}
        </div>
        <span style={ratingText}>
          {reviews} REVIEWS / {rating ? rating : '–'} AVERAGE
        </span>
        <div style={titleStyles}>{recipe.name}</div>
      </Link>
    </div>
  );
};

export default RecipeCard; 