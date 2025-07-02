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
import Login from './pages/Login';
import AdminLayout from './pages/AdminLayout';
import AdminDashboard from './pages/AdminDashboard';
import AdminRecipes from './pages/AdminRecipes';
import AdminCuisines from './pages/AdminCuisines';
import { RecipesProvider } from './contexts/RecipesContext';
import './styles/global.css';
import StartHere from './pages/StartHere';

// ScrollToTop component
function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppRoutes() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  return (
    <>
      <SplashScreen />
      <ScrollToTop />
      {!isAdminRoute && <TopBar />}
      {!isAdminRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipes/all" element={<AllRecipesPage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/recipes/detail/:id" element={<RecipeDetail />} />
        <Route path="/recipes/:cuisineName" element={<CuisineListingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/start" element={<StartHere />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={
          <RecipesProvider>
            <AdminLayout />
          </RecipesProvider>
        }>
          <Route index element={<AdminDashboard />} />
          <Route path="recipes" element={<AdminRecipes />} />
          <Route path="cuisines" element={<AdminCuisines />} />
        </Route>
      </Routes>
      {!isAdminRoute && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
} 