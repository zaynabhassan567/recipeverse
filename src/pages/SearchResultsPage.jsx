import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function SearchResultsPage() {
  const query = useQuery().get('query') || '';
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    fetch(`https://dummyjson.com/recipes/search?q=${encodeURIComponent(query)}`)
      .then(res => res.json())
      .then(data => {
        setRecipes(data.recipes || []);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch recipes.');
        setLoading(false);
      });
  }, [query]);

  return (
    <div style={{ background: '#fff', minHeight: '100vh', paddingBottom: 48 }}>
      <div style={{ textAlign: 'center', marginTop: 48 }}>
        <h1 style={{ color: '#6e3a59', fontFamily: 'Montserrat, sans-serif', fontWeight: 800, fontSize: 32, letterSpacing: '0.08em', textTransform: 'capitalize' }}>
          Search Results for "{query}"
        </h1>
        {loading && <div>Loading...</div>}
        {error && <div style={{ color: 'red' }}>{error}</div>}
        {!loading && !error && recipes.length === 0 && (
          <div>No recipes found for this search.</div>
        )}
        {!loading && !error && recipes.length > 0 && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 32,
            maxWidth: 1200,
            margin: '32px auto 0 auto',
            padding: '0 16px'
          }}>
            {recipes.map(recipe => (
              <Link
                key={recipe.id}
                to={`/recipes/detail/${recipe.id}`}
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
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 