import React, { useEffect, useState, useMemo } from 'react';
import RecipeCard from '../components/RecipeCard';
import { subscribeToAllRecipes } from '../services/recipeApi';
import { useSearchParams } from 'react-router-dom';
import { FaRegClipboard } from 'react-icons/fa';

const RECIPES_PER_PAGE = 12;

const AllRecipesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [cuisine, setCuisine] = useState(searchParams.get('cuisine') || 'All');

  useEffect(() => {
    setLoading(true);
    const unsubscribe = subscribeToAllRecipes((data) => {
      setRecipes(data || []);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Filter recipes client-side for cuisine
  const filteredRecipes = useMemo(() => {
    let filtered = recipes;
    if (cuisine !== 'All') {
      filtered = filtered.filter(r => (r.cuisine || '').toLowerCase() === cuisine.toLowerCase());
    }
    return filtered;
  }, [recipes, cuisine]);

  // Pagination
  const paginatedRecipes = useMemo(() => {
    const start = (page - 1) * RECIPES_PER_PAGE;
    return filteredRecipes.slice(start, start + RECIPES_PER_PAGE);
  }, [filteredRecipes, page]);

  useEffect(() => {
    setPage(1);
    setSearchParams({ cuisine, page: 1 });
  }, [cuisine]);

  useEffect(() => {
    setSearchParams({ cuisine, page });
  }, [page]);

  // Pagination controls
  const totalPages = Math.ceil(filteredRecipes.length / RECIPES_PER_PAGE);

  if (loading) return <div>Loading recipes...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ background: '#fff', minHeight: '100vh', paddingBottom: 48 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, margin: '48px 0 8px 0' }}>
        <FaRegClipboard style={{ fontSize: 38, color: '#6e3a59', marginBottom: 4 }} />
        <h2 style={{ fontSize: 36, fontWeight: 800, fontFamily: 'Lora, serif', color: '#6e3a59', letterSpacing: '0.01em', margin: 0 }}>
          All Recipes
        </h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18, maxWidth: 1100, margin: '0 auto', padding: '0 8px' }}>
        {paginatedRecipes.map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
      </div>
      {/* Pagination controls */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 32, gap: 8 }}>
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx + 1}
              onClick={() => setPage(idx + 1)}
              style={{
                background: page === idx + 1 ? '#e75480' : '#fff',
                color: page === idx + 1 ? '#fff' : '#e75480',
                border: '1.5px solid #e75480',
                borderRadius: 6,
                fontWeight: 700,
                fontSize: 16,
                padding: '6px 16px',
                cursor: 'pointer',
                margin: '0 2px',
                transition: 'background 0.18s, color 0.18s',
              }}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllRecipesPage;