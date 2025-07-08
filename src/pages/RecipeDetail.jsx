import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchRecipeById } from '../services/recipeApi';
import { FaClock, FaUtensils, FaUserFriends } from 'react-icons/fa';

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecipeById(id).then(data => {
      setRecipe(data);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <div>Loading recipe...</div>;
  if (!recipe) return <div>Recipe not found.</div>;

  // Support both 'ingredients' and 'Ingredients', and 'instructions' and 'Instructions'
  const ingredients = recipe.ingredients || recipe.Ingredients || [];
  const instructions = recipe.instructions || recipe.Instructions || [];

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 24 }}>
      <h2 style={{ color: '#6e3a59', fontFamily: 'Lora, serif', fontWeight: 800, fontSize: 36, marginBottom: 18, textAlign: 'center' }}>{recipe.name}</h2>
      <div style={{ marginBottom: 18, color: '#f5b945', fontWeight: 700, fontSize: 20, textAlign: 'center' }}>
        {recipe.rating && <span style={{ marginRight: 12 }}>★ {recipe.rating} / 5</span>}
        {recipe.reviewCount && <span>({recipe.reviewCount} reviews)</span>}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 32, marginBottom: 18, color: '#6e3a59', fontWeight: 600, fontSize: 17 }}>
        {recipe.prepTimeMinutes !== undefined && (
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><FaClock /> Prep: {recipe.prepTimeMinutes} min</span>
        )}
        {recipe.cookTimeMinutes !== undefined && (
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><FaUtensils /> Cook: {recipe.cookTimeMinutes} min</span>
        )}
        {recipe.servings !== undefined && (
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><FaUserFriends /> Serves: {recipe.servings}</span>
        )}
      </div>
      <img src={recipe.image} alt={recipe.name} style={{ width: '100%', maxHeight: 280, objectFit: 'cover', borderRadius: 16, marginBottom: 32, boxShadow: '0 2px 16px rgba(110,58,89,0.10)' }} />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, marginBottom: 32 }}>
        <div style={{ flex: 1, minWidth: 260, background: '#faf9f7', borderRadius: 14, boxShadow: '0 2px 12px rgba(110,58,89,0.07)', padding: 24 }}>
          <h3 style={{ color: '#6e3a59', fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: 22, marginBottom: 12, textAlign: 'center' }}>Ingredients</h3>
          <ul style={{ paddingLeft: 20, fontSize: 17, color: '#333', marginBottom: 0 }}>
            {ingredients.map((ing, idx) => (
              <li key={idx}>{ing}</li>
            ))}
          </ul>
        </div>
        <div style={{ flex: 2, minWidth: 320, background: '#faf9f7', borderRadius: 14, boxShadow: '0 2px 12px rgba(110,58,89,0.07)', padding: 24 }}>
          <h3 style={{ color: '#6e3a59', fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: 22, marginBottom: 12, textAlign: 'center' }}>Instructions</h3>
          <ol style={{ paddingLeft: 20, fontSize: 17, color: '#333' }}>
            {instructions.map((step, idx) => (
              <li key={idx} style={{ marginBottom: 10 }}>{step}</li>
            ))}
          </ol>
        </div>
      </div>
      <div style={{ marginBottom: 18, color: '#6e3a59', fontWeight: 700, fontSize: 18, textAlign: 'center' }}>
        {recipe.cuisine && <span style={{ marginRight: 18 }}>Cuisine: {recipe.cuisine}</span>}
        {recipe.category && <span style={{ marginRight: 18 }}>Category: {recipe.category}</span>}
        {recipe.tags && recipe.tags.length > 0 && (
          <span>Tags: {recipe.tags.join(', ')}</span>
        )}
      </div>
    </div>
  );
} 