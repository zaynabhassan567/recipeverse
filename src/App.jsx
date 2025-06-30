import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopBar from './components/TopBar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Recipes from './pages/Recipes';
import RecipeDetail from './pages/RecipeDetail';
import './styles/global.css';

const App = () => {
  return (
    <Router>
      <TopBar />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipes/:category" element={<Recipes />} />
        <Route path="/recipes/:id" element={<RecipeDetail />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App; 