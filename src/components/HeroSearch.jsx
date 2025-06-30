import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import '../styles/global.css';

export default function HeroSearch() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="hero-search-bar-row">
      <form className="hero-search-form" onSubmit={handleSubmit} autoComplete="off">
        <span className="hero-search-icon"><FaSearch /></span>
        <input
          type="text"
          className="hero-search-input"
          placeholder="Search our recipes"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </form>
      <span className="hero-search-or">or</span>
      <button className="hero-search-all-btn" onClick={() => navigate('/recipes')} type="button">
        + VIEW ALL RECIPES
      </button>
    </div>
  );
} 