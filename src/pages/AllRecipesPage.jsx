import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import RecipeCard from '../components/RecipeCard';
import { FaRegClipboard } from 'react-icons/fa';
import { cuisinesData } from '../utils/cusinesData';
import { Button } from 'antd';
import { IoClose } from 'react-icons/io5';
import { useSearchParams, useNavigate } from 'react-router-dom';

const gridStyles = {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: 32,
  maxWidth: 1200,
  margin: '0 auto',
  padding: '0 16px',
};
const headerStyles = {
  textAlign: 'center',
  fontSize: 36,
  fontWeight: 800,
  fontFamily: 'Lora, serif',
  color: '#6e3a59',
  margin: '48px 0 8px 0',
  letterSpacing: '0.01em',
};
const countStyles = {
  textAlign: 'center',
  color: '#888',
  fontSize: 18,
  marginBottom: 32,
};

const RECIPES_PER_PAGE = 12;

const AllRecipesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [cuisine, setCuisine] = useState(searchParams.get('cuisine') || 'All');
  const [time, setTime] = useState(searchParams.get('time') || 'All');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [pendingCuisine, setPendingCuisine] = useState(searchParams.get('cuisine') || 'All');
  const [pendingTime, setPendingTime] = useState(searchParams.get('time') || 'All');

  // Responsive: detect if mobile
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 600);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setLoading(true);
    let url = `https://dummyjson.com/recipes?limit=1000`;
    axios.get(url)
      .then(res => {
        setRecipes(res.data.recipes || []);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch recipes.');
        setLoading(false);
      });
  }, []);

  // Filter recipes client-side for cuisine and time
  const filteredRecipes = useMemo(() => {
    let filtered = recipes;
    if (cuisine !== 'All') {
      filtered = filtered.filter(r => (r.cuisine || '').toLowerCase() === cuisine.toLowerCase());
    }
    if (time !== 'All') {
      filtered = filtered.filter(r => {
        const total = (r.prepTimeMinutes || 0) + (r.cookTimeMinutes || 0);
        if (time === '15') return total <= 15;
        if (time === '30') return total <= 30;
        if (time === '45') return total <= 45;
        if (time === '60') return total <= 60;
        if (time === '60plus') return total > 60;
        return true;
      });
    }
    return filtered;
  }, [recipes, cuisine, time]);

  // Pagination
  const paginatedRecipes = useMemo(() => {
    const start = (page - 1) * RECIPES_PER_PAGE;
    return filteredRecipes.slice(start, start + RECIPES_PER_PAGE);
  }, [filteredRecipes, page]);

  // When cuisine/time changes, reset page and update URL
  useEffect(() => {
    setPage(1);
    setSearchParams({ cuisine, time, page: 1 });
  }, [cuisine, time]);

  // When page changes, update URL
  useEffect(() => {
    setSearchParams({ cuisine, time, page });
  }, [page]);

  // Responsive grid columns
  const getGridColumns = () => {
    if (window.innerWidth < 600) return '1fr';
    if (window.innerWidth < 900) return '1fr 1fr';
    if (window.innerWidth < 1200) return '1fr 1fr 1fr';
    return '1fr 1fr 1fr 1fr';
  };
  const [gridCols, setGridCols] = useState(getGridColumns());
  useEffect(() => {
    const handleResize = () => setGridCols(getGridColumns());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // When opening drawer, sync pending state
  const openDrawer = () => {
    setPendingCuisine(cuisine);
    setPendingTime(time);
    setDrawerOpen(true);
  };
  const applyFilters = () => {
    setCuisine(pendingCuisine);
    setTime(pendingTime);
    setPage(1);
    setDrawerOpen(false);
    setSearchParams({ cuisine: pendingCuisine, time: pendingTime, page: 1 });
  };
  const resetFilters = () => {
    setPendingCuisine('All');
    setPendingTime('All');
  };

  useEffect(() => {
    // On mount, sync state with URL
    setCuisine(searchParams.get('cuisine') || 'All');
    setTime(searchParams.get('time') || 'All');
    setPage(Number(searchParams.get('page')) || 1);
  }, []);

  // Add handlers for update, delete, and add
  const handleDeleteRecipe = (id) => {
    setRecipes(prev => {
      const updated = prev.filter(r => r.id !== id);
      console.log('Updated recipes:', updated);
      return updated;
    });
  };
  const handleUpdateRecipe = (recipe) => {
    const name = prompt('Edit recipe name:', recipe.name);
    if (name === null) return;
    const image = prompt('Edit image URL:', recipe.image);
    if (image === null) return;
    const category = prompt('Edit category:', recipe.category || '');
    if (category === null) return;
    const cuisine = prompt('Edit cuisine:', recipe.cuisine || '');
    if (cuisine === null) return;
    const rating = Number(prompt('Edit rating (0-5):', recipe.rating || 0));
    if (isNaN(rating)) return;
    setRecipes(prev => {
      const updated = prev.map(r => r.id === recipe.id ? { ...r, name, image, category, cuisine, rating } : r);
      console.log('Updated recipes:', updated);
      return updated;
    });
  };
  const handleAddRecipe = () => {
    const name = prompt('Recipe name:');
    if (!name) return;
    const image = prompt('Image URL:');
    if (!image) return;
    const category = prompt('Category:');
    if (category === null) return;
    const cuisine = prompt('Cuisine:');
    if (cuisine === null) return;
    const rating = Number(prompt('Rating (0-5):', 0));
    if (isNaN(rating)) return;
    setRecipes(prev => {
      const newRecipe = { id: Date.now(), name, image, category, cuisine, rating };
      const updated = [...prev, newRecipe];
      console.log('Updated recipes:', updated);
      return updated;
    });
  };

  return (
    <div>
      <div style={{ background: '#fff', minHeight: '100vh', paddingBottom: 48 }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 24,
          margin: '48px 0 32px 0',
        }}>
          {/* Custom SVG Notepad Icon */}
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: 'block' }}
          >
            <rect x="8" y="8" width="32" height="32" rx="2" stroke="#f5b945" strokeWidth="2.5" fill="none" />
            {/* Rings */}
            <circle cx="14" cy="12" r="1.2" stroke="#f5b945" strokeWidth="1.5" fill="#fff" />
            <circle cx="24" cy="12" r="1.2" stroke="#f5b945" strokeWidth="1.5" fill="#fff" />
            <circle cx="34" cy="12" r="1.2" stroke="#f5b945" strokeWidth="1.5" fill="#fff" />
            {/* Lines */}
            <rect x="16" y="20" width="16" height="1.5" rx="0.75" fill="#f5b945" />
            <rect x="16" y="25" width="16" height="1.5" rx="0.75" fill="#f5b945" />
            <rect x="16" y="30" width="10" height="1.5" rx="0.75" fill="#f5b945" />
            <rect x="16" y="35" width="14" height="1.5" rx="0.75" fill="#f5b945" />
          </svg>
          <span style={{
            fontSize: 36,
            fontWeight: 800,
            fontFamily: 'Montserrat, sans-serif',
            color: '#6e3a59',
            letterSpacing: '0.13em',
            textTransform: 'uppercase',
            lineHeight: 1.1,
            display: 'block',
          }}>ALL RECIPES</span>
        </div>
        {/* Unified count and filter row for all screens */}
        <div className="recipes-count-filter-row">
          <div className="recipes-count-text">
            {loading ? 'Loading...' : `Showing ${filteredRecipes.length} recipes`}
          </div>
          {!drawerOpen && (
            <Button
              type="primary"
              className="recipes-filter-btn"
              onClick={openDrawer}
            >
              Apply Filter
            </Button>
          )}
        </div>
        {error && <div style={{ color: 'red', textAlign: 'center', marginBottom: 24 }}>{error}</div>}
        <div style={{ ...gridStyles, gridTemplateColumns: gridCols }}>
          {loading
            ? Array.from({ length: 8 }).map((_, idx) => (
                <div key={idx} style={{ background: '#eee', borderRadius: 18, minHeight: 320, animation: 'pulse 1.2s infinite' }} />
              ))
            : paginatedRecipes.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
        </div>
        {filteredRecipes.length > RECIPES_PER_PAGE && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, margin: '36px 0 0 0' }}>
            {Array.from({ length: Math.ceil(filteredRecipes.length / RECIPES_PER_PAGE) }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setPage(idx + 1)}
                style={{
                  background: page === idx + 1 ? '#6e3a59' : '#fff',
                  color: page === idx + 1 ? '#fff' : '#6e3a59',
                  border: '1.5px solid #6e3a59',
                  borderRadius: 6,
                  fontWeight: 700,
                  fontSize: 18,
                  padding: '6px 18px',
                  cursor: 'pointer',
                  outline: 'none',
                  transition: 'background 0.18s, color 0.18s',
                  boxShadow: page === idx + 1 ? '0 2px 8px rgba(110,58,89,0.10)' : 'none',
                }}
                disabled={page === idx + 1}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        )}
        <style>{`@keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; } }`}</style>
        {/* Custom Sidebar Drawer */}
        {drawerOpen && (
          isMobile ? (
            // MOBILE: Overlay + Drawer
            <>
              {/* Overlay */}
              <div
                onClick={() => setDrawerOpen(false)}
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100vw',
                  height: '100vh',
                  background: 'rgba(0,0,0,0.18)',
                  zIndex: 1999,
                  transition: 'background 0.2s',
                }}
              />
              {/* Drawer */}
              <div
                style={{
                  position: 'fixed',
                  bottom: 0,
                  left: 0,
                  width: '100vw',
                  height: '60vh',
                  background: '#fff',
                  zIndex: 2000,
                  boxShadow: '0 -2px 16px rgba(110,58,89,0.13)',
                  borderTopLeftRadius: 18,
                  borderTopRightRadius: 18,
                  padding: 24,
                  display: 'flex',
                  flexDirection: 'column',
                  animation: 'slideUpMobile 0.25s cubic-bezier(0.22, 0.61, 0.36, 1)',
                }}
              >
                <button
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Close filter sidebar"
                  style={{
                    position: 'absolute',
                    top: 16,
                    right: 18,
                    background: 'none',
                    border: 'none',
                    fontSize: 28,
                    color: '#6e3a59',
                    cursor: 'pointer',
                    zIndex: 10,
                    padding: 0,
                    lineHeight: 1,
                    opacity: 0.85,
                    transition: 'opacity 0.18s',
                  }}
                  tabIndex={0}
                >
                  <IoClose />
                </button>
                <div style={{ color: '#6e3a59', fontWeight: 800, fontSize: 22, marginBottom: 24, marginTop: 8 }}>Filter Recipes</div>
                <div style={{ marginBottom: 24 }}>
                  <div style={{ fontWeight: 700, color: '#6e3a59', fontSize: 16, marginBottom: 8 }}>Cuisine</div>
                  <select
                    value={pendingCuisine}
                    onChange={e => setPendingCuisine(e.target.value)}
                    style={{ width: '100%', padding: '10px 16px', borderRadius: 8, border: '1.5px solid #6e3a59', fontWeight: 700, color: '#6e3a59', fontSize: 15 }}
                  >
                    <option value="All">All Cuisines</option>
                    {cuisinesData.map(c => (
                      <option key={c.name} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div style={{ marginBottom: 24 }}>
                  <div style={{ fontWeight: 700, color: '#6e3a59', fontSize: 16, marginBottom: 8 }}>Time</div>
                  <select
                    value={pendingTime}
                    onChange={e => setPendingTime(e.target.value)}
                    style={{ width: '100%', padding: '10px 16px', borderRadius: 8, border: '1.5px solid #6e3a59', fontWeight: 700, color: '#6e3a59', fontSize: 15 }}
                  >
                    <option value="All">All Times</option>
                    <option value="15">Under 15 min</option>
                    <option value="30">Under 30 min</option>
                    <option value="45">Under 45 min</option>
                    <option value="60">Under 60 min</option>
                    <option value="60plus">60+ min</option>
                  </select>
                </div>
                <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
                  <Button type="primary" style={{ background: '#6e3a59', fontWeight: 700, fontSize: 15, borderRadius: 8, flex: 1 }} onClick={applyFilters}>Apply</Button>
                  <Button style={{ fontWeight: 700, fontSize: 15, borderRadius: 8, flex: 1 }} onClick={resetFilters}>Reset</Button>
                </div>
              </div>
              <style>{`
                @keyframes slideUpMobile {
                  from { transform: translateY(100%); opacity: 0.5; }
                  to { transform: translateY(0); opacity: 1; }
                }
              `}</style>
            </>
          ) : (
            // DESKTOP: Fixed Sidebar, no overlay
            <div
              style={{
                position: 'fixed',
                top: 104, // header height
                right: 0,
                width: 340,
                height: 'calc(100vh - 104px)',
                background: '#fff',
                zIndex: 2000,
                boxShadow: '-2px 0 16px rgba(110,58,89,0.13)',
                borderTopLeftRadius: 18,
                borderBottomLeftRadius: 18,
                padding: 32,
                display: 'flex',
                flexDirection: 'column',
                animation: 'slideInRight 0.25s cubic-bezier(0.22, 0.61, 0.36, 1)',
              }}
            >
              <button
                onClick={() => setDrawerOpen(false)}
                aria-label="Close filter sidebar"
                style={{
                  position: 'absolute',
                  top: 56,
                  right: 18,
                  background: 'none',
                  border: 'none',
                  fontSize: 28,
                  color: '#6e3a59',
                  cursor: 'pointer',
                  zIndex: 10,
                  padding: 0,
                  lineHeight: 1,
                  opacity: 0.85,
                  transition: 'opacity 0.18s',
                }}
                tabIndex={0}
              >
                <IoClose />
              </button>
              <div style={{ color: '#6e3a59', fontWeight: 800, fontSize: 26, marginBottom: 32, marginTop: 8 }}>Filter Recipes</div>
              <div style={{ marginBottom: 32 }}>
                <div style={{ fontWeight: 700, color: '#6e3a59', fontSize: 18, marginBottom: 8 }}>Cuisine</div>
                <select
                  value={pendingCuisine}
                  onChange={e => setPendingCuisine(e.target.value)}
                  style={{ width: '100%', padding: '10px 16px', borderRadius: 8, border: '1.5px solid #6e3a59', fontWeight: 700, color: '#6e3a59', fontSize: 16 }}
                >
                  <option value="All">All Cuisines</option>
                  {cuisinesData.map(c => (
                    <option key={c.name} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div style={{ marginBottom: 32 }}>
                <div style={{ fontWeight: 700, color: '#6e3a59', fontSize: 18, marginBottom: 8 }}>Time</div>
                <select
                  value={pendingTime}
                  onChange={e => setPendingTime(e.target.value)}
                  style={{ width: '100%', padding: '10px 16px', borderRadius: 8, border: '1.5px solid #6e3a59', fontWeight: 700, color: '#6e3a59', fontSize: 16 }}
                >
                  <option value="All">All Times</option>
                  <option value="15">Under 15 min</option>
                  <option value="30">Under 30 min</option>
                  <option value="45">Under 45 min</option>
                  <option value="60">Under 60 min</option>
                  <option value="60plus">60+ min</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: 12, marginTop: 32 }}>
                <Button type="primary" style={{ background: '#6e3a59', fontWeight: 700, fontSize: 16, borderRadius: 8, flex: 1 }} onClick={applyFilters}>Apply</Button>
                <Button style={{ fontWeight: 700, fontSize: 16, borderRadius: 8, flex: 1 }} onClick={resetFilters}>Reset</Button>
              </div>
              <style>{`
                @keyframes slideInRight {
                  from { transform: translateX(100%); opacity: 0.5; }
                  to { transform: translateX(0); opacity: 1; }
                }
              `}</style>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default AllRecipesPage;