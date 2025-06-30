import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchAllRecipes, filterRecipesByCuisine, searchRecipes } from '../services/recipeApi';
import { Link } from 'react-router-dom';

const cuisineApiMap = {
  'quick-and-easy': { type: 'search', value: 'quick' },
  'dinner': { type: 'search', value: 'dinner' },
  'vegetarian': { type: 'search', value: 'vegetarian' },
  'healthy': { type: 'search', value: 'healthy' },
  'instant-pot': { type: 'search', value: 'instant pot' },
  'vegan': { type: 'search', value: 'vegan' },
  'meal-prep': { type: 'search', value: 'meal prep' },
  'soups': { type: 'search', value: 'soup' },
  'salads': { type: 'search', value: 'salad' },
  // 'most-popular' handled separately
};

export default function Recipes() {
  const { category } = useParams();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (category) {
      if (category === 'most-popular') {
        fetchAllRecipes(8).then(data => {
          setRecipes(data || []);
          setLoading(false);
        });
      } else {
        const apiInfo = cuisineApiMap[category];
        if (apiInfo) {
          if (apiInfo.type === 'search') {
            searchRecipes(apiInfo.value).then(data => {
              setRecipes(data || []);
              setLoading(false);
            });
          }
        } else {
          // fallback to search if not mapped
          searchRecipes(category).then(data => {
            setRecipes(data || []);
            setLoading(false);
          });
        }
      }
    } else {
      fetchAllRecipes().then(data => {
        setRecipes(data || []);
        setLoading(false);
      });
    }
  }, [category]);

  if (loading) return <div>Loading recipes...</div>;

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: 24 }}>
      <h2>{category ? `${category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, ' ')} Recipes` : 'All Recipes'}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24 }}>
        {recipes.map(recipe => (
          <Link to={`/recipes/${recipe.id}`} key={recipe.id} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ border: '1px solid #eee', borderRadius: 8, overflow: 'hidden', background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <img src={recipe.image} alt={recipe.name} style={{ width: '100%', height: 160, objectFit: 'cover' }} />
              <div style={{ padding: 12, fontWeight: 600, fontSize: 18 }}>{recipe.name}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 