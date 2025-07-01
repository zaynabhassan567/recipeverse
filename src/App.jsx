import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import TopBar from './components/TopBar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Recipes from './pages/Recipes';
import RecipeDetail from './pages/RecipeDetail';
import AllRecipesPage from './pages/AllRecipesPage';
import CuisineListingPage from './pages/CuisineListingPage';
import SearchResultsPage from './pages/SearchResultsPage';
import About from './pages/About';
import SplashScreen from './components/SplashScreen';
import './styles/global.css';

// ScrollToTop component
function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const App = () => {
  return (
    <Router>
      <SplashScreen />
      <ScrollToTop />
      <TopBar />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipes/all" element={<AllRecipesPage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/recipes/detail/:id" element={<RecipeDetail />} />
        <Route path="/recipes/:cuisineName" element={<CuisineListingPage />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App; 