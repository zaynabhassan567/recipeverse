import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CuisineIntro from '../components/CuisineIntro';
import TopRecipesSlider from '../components/TopRecipesSlider';
// import RecipesGrid from '../components/RecipesGrid';

const CuisineListingPage = () => {
  const { cuisineName } = useParams();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch('https://dummyjson.com/recipes?limit=100')
      .then(res => res.json())
      .then(data => {
        console.log('Fetched recipes:', data.recipes);
        // Match cuisineName with cuisine, category, or tags (partial, case-insensitive)
        const filtered = (data.recipes || []).filter(r => {
          const cuisineMatch = (r.cuisine || '').toLowerCase().includes(cuisineName.toLowerCase());
          const categoryMatch = (r.category || '').toLowerCase().includes(cuisineName.toLowerCase());
          const tagsMatch = Array.isArray(r.tags) && r.tags.some(tag => tag.toLowerCase().includes(cuisineName.toLowerCase()));
          return cuisineMatch || categoryMatch || tagsMatch;
        });
        setRecipes(filtered);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch recipes.');
        setLoading(false);
      });
  }, [cuisineName]);

  // Compute top 1 recipe for slider if 2 or more, else all in slider
  let topRecipes = [];
  let gridRecipes = [];
  if (recipes.length >= 2) {
    topRecipes = [...recipes].sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 1);
    const topRecipeIds = new Set(topRecipes.map(r => r.id));
    gridRecipes = recipes.filter(r => !topRecipeIds.has(r.id));
  } else {
    topRecipes = recipes;
    gridRecipes = [];
  }

  return (
    <div style={{ background: '#fff', minHeight: '100vh', paddingBottom: 48 }}>
      <CuisineIntro
        cuisineName={cuisineName.charAt(0).toUpperCase() + cuisineName.slice(1) + ' favourites'}
        description={`Explore flavorful ${cuisineName.charAt(0).toUpperCase() + cuisineName.slice(1)} classics and favorites.`}
      />
      <TopRecipesSlider recipes={topRecipes} loading={loading} />
      <div style={{ textAlign: 'center', marginTop: 24 }}>
        <h1 style={{ color: '#6e3a59', fontFamily: 'Montserrat, sans-serif', fontWeight: 800, fontSize: 36, letterSpacing: '0.08em', textTransform: 'capitalize' }}>Other {cuisineName.charAt(0).toUpperCase() + cuisineName.slice(1)} recipes</h1>
        {loading && <div>Loading...</div>}
        {error && <div style={{ color: 'red' }}>{error}</div>}
        {!loading && !error && gridRecipes.length === 0 && (
          <div>No recipes found for this cuisine.</div>
        )}
        {!loading && !error && gridRecipes.length > 0 && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 32,
            maxWidth: 1200,
            margin: '32px auto 0 auto',
            padding: '0 16px'
          }}>
            {gridRecipes.map(recipe => (
              <a
                key={recipe.id}
                href={`/recipes/detail/${recipe.id}`}
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  background: '#fff',
                  borderRadius: 14,
                  boxShadow: '0 2px 12px rgba(110,58,89,0.07)',
                  overflow: 'hidden',
                  textAlign: 'center',
                  cursor: 'pointer',
                  border: '1px solid #eee',
                  transition: 'box-shadow 0.22s, transform 0.22s',
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: 220,
                  maxWidth: 320,
                  margin: '0 auto',
                  padding: 0,
                }}
              >
                <img src={recipe.image} alt={recipe.name} style={{
                  width: '100%',
                  height: 120,
                  objectFit: 'cover',
                  display: 'block',
                  borderTopLeftRadius: 14,
                  borderTopRightRadius: 14,
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                }} />
                <div style={{
                  fontWeight: 700,
                  fontSize: 20,
                  fontFamily: 'Lora, serif',
                  color: '#6e3a59',
                  margin: '16px 0 0 0',
                  padding: '0 14px 16px 14px',
                  textAlign: 'center',
                  lineHeight: 1.18,
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>{recipe.name}</div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CuisineListingPage; 