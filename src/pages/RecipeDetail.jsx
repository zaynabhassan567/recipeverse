import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchRecipeById } from '../services/recipeApi';

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

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 24 }}>
      <h2>{recipe.name}</h2>
      <img src={recipe.image} alt={recipe.name} style={{ width: '100%', maxHeight: 400, objectFit: 'cover', borderRadius: 12 }} />
      {/* Add more recipe details here as needed */}
    </div>
  );
} 