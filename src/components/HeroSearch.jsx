import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaSearch, FaStar } from 'react-icons/fa';
import { Drawer } from 'antd';
import { IoClose } from 'react-icons/io5';
import '../styles/global.css';

export default function HeroSearch() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [noResults, setNoResults] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef();
  const drawerInputRef = useRef();

  // Debounced search
  const debounceRef = useRef();
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setError(null);
    setNoResults(false);
    setSuggestions([]);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (value.trim().length === 0) {
      setLoading(false);
      return;
    }
    setLoading(true);
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`https://dummyjson.com/recipes/search?q=${encodeURIComponent(value)}`);
        if (!res.ok) throw new Error('API error');
        const data = await res.json();
        const results = (data.recipes || []).slice(0, 6);
        setSuggestions(results);
        setNoResults(results.length === 0);
        setLoading(false);
      } catch {
        setSuggestions([]);
        setError('Something went wrong. Please try again.');
        setLoading(false);
      }
    }, 400);
  };

  const handleHeroBarClick = () => {
    setDrawerOpen(true);
    setTimeout(() => {
      if (drawerInputRef.current) drawerInputRef.current.focus();
    }, 200);
  };

  const handleInputBlur = (e) => {
    // Optionally close drawer on blur, but usually keep open
  };

  const handleSuggestionClick = (id) => {
    setDrawerOpen(false);
    setQuery('');
    navigate(`/recipes/detail/${id}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setDrawerOpen(false);
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query.trim())}`);
    }
  };

  // Accessibility: ESC closes drawer
  useEffect(() => {
    if (!drawerOpen) return;
    const handleEsc = (e) => {
      if (e.key === 'Escape') setDrawerOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [drawerOpen]);

  return (
    <div className="hero-search-bar-row" style={{ position: 'relative' }}>
      {!drawerOpen && (
        <>
          <div className="hero-search-desktop" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, width: '100%' }}>
            <div
              className="hero-search-form"
              style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', width: 380, maxWidth: '100%' }}
              onClick={handleHeroBarClick}
            >
              <span className="hero-search-icon"><FaSearch /></span>
              <input
                type="text"
                className="hero-search-input"
                placeholder="Search our recipes"
                value={query}
                readOnly
                style={{ background: '#f8f6fa', cursor: 'pointer' }}
              />
            </div>
            <span className="hero-search-or">or</span>
            <Link
              to="/recipes/all"
              className="hero-search-all-btn"
              style={{ textDecoration: 'none', position: 'relative', display: 'inline-block' }}
            >
              + VIEW ALL RECIPES
            </Link>
          </div>
          <div className="hero-search-mobile">
            <Link
              to="/recipes/all"
              className="hero-search-all-btn-mobile"
            >
              + VIEW ALL RECIPES
            </Link>
            <form className="hero-search-mobile-form" onSubmit={handleSubmit} autoComplete="off" style={{ width: '100%' }}>
              <div className="hero-search-mobile-input-wrap">
                <span className="hero-search-mobile-icon"><FaSearch /></span>
                <input
                  type="text"
                  className="hero-search-mobile-input"
                  placeholder="Search our recipes"
                  value={query}
                  onChange={handleInputChange}
                  ref={inputRef}
                  onFocus={handleHeroBarClick}
                  readOnly={drawerOpen}
                  style={{ width: '100%' }}
                />
              </div>
            </form>
          </div>
        </>
      )}
      <Drawer
        title={null}
        placement="bottom"
        closable={false}
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        height={480}
        bodyStyle={{ padding: '32px 0 24px 0', background: 'rgba(255,255,255,0.97)', transition: 'background 0.3s' }}
        style={{ borderRadius: '18px 18px 0 0', boxShadow: '0 -8px 32px rgba(110,58,89,0.10)' }}
        mask={false}
      >
        <button
          onClick={() => setDrawerOpen(false)}
          aria-label="Close search drawer"
          style={{
            position: 'absolute',
            top: 18,
            right: 24,
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
        <form onSubmit={handleSubmit} style={{ maxWidth: 600, margin: '0 auto', width: '100%' }} autoComplete="off">
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
            <span className="hero-search-icon"><FaSearch /></span>
            <input
              type="text"
              className="hero-search-input"
              placeholder="Search our recipes"
              value={query}
              onChange={handleInputChange}
              ref={drawerInputRef}
              style={{ flex: 1 }}
              aria-label="Search recipes"
              autoFocus
            />
          </div>
        </form>
        {/* Loading Spinner */}
        {loading && (
          <div style={{ textAlign: 'center', margin: '32px 0' }}>
            <div className="loader" style={{ display: 'inline-block', width: 40, height: 40, border: '4px solid #f5b945', borderTop: '4px solid #fff', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
            <style>{`@keyframes spin { 0% { transform: rotate(0deg);} 100% { transform: rotate(360deg);} }`}</style>
          </div>
        )}
        {/* Error State */}
        {error && !loading && (
          <div style={{ textAlign: 'center', color: '#c00', fontWeight: 700, margin: '32px 0' }}>{error}</div>
        )}
        {/* No Results State */}
        {noResults && !loading && !error && (
          <div style={{ textAlign: 'center', color: '#888', fontWeight: 700, margin: '32px 0' }}>No results for '{query}'</div>
        )}
        {suggestions.length > 0 && !loading && !error && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 24,
              maxWidth: 900,
              margin: '0 auto',
              width: '100%',
              padding: '0 24px',
            }}
          >
            {suggestions.map(s => (
              <div
                key={s.id}
                onMouseDown={() => handleSuggestionClick(s.id)}
                style={{
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
                  minHeight: 180,
                  maxWidth: 260,
                  margin: '0 auto',
                  padding: 0,
                  alignItems: 'center',
                }}
              >
                <img src={s.image} alt={s.name} style={{
                  width: '100%',
                  height: 90,
                  objectFit: 'cover',
                  display: 'block',
                  borderTopLeftRadius: 14,
                  borderTopRightRadius: 14,
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                }} />
                <div style={{
                  fontWeight: 700,
                  fontSize: 17,
                  fontFamily: 'Lora, serif',
                  color: '#6e3a59',
                  margin: '12px 0 0 0',
                  padding: '0 10px 10px 10px',
                  textAlign: 'center',
                  lineHeight: 1.18,
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>{s.name}</div>
                <div style={{ color: '#f5b945', fontWeight: 700, fontSize: 15, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, marginBottom: 10 }}>
                  {[...Array(5)].map((_, i) =>
                    i < Math.round(s.rating || 0) ? (
                      <FaStar key={i} />
                    ) : (
                      <FaStar key={i} style={{ opacity: 0.25 }} />
                    )
                  )}
                  <span style={{ marginLeft: 6, color: '#888', fontWeight: 600, fontSize: 14 }}>{s.rating ? s.rating : '–'}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </Drawer>
    </div>
  );
} 