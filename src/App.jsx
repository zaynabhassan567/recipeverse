import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
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
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Signup from './pages/Signup';
import { useDispatch } from 'react-redux';
import { watchAuthState } from './userSlice';

// ScrollToTop component
function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// ProtectedRoute component
function ProtectedRoute({ children }) {
  const [authChecked, setAuthChecked] = React.useState(false);
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setAuthChecked(true);
    });
    return () => unsubscribe();
  }, []);

  if (!authChecked) {
    return <div style={{margin: 80, fontSize: 22, color: '#b03060'}}>Checking authentication...</div>;
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function AppRoutes() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state;

  return (
    <>
      <SplashScreen />
      <ScrollToTop />
      {!location.pathname.startsWith('/admin') && <TopBar />}
      {!location.pathname.startsWith('/admin') && <Navbar />}
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipes/all" element={<AllRecipesPage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/recipes/detail/:id" element={<RecipeDetail />} />
        <Route path="/recipes/:cuisineName" element={<CuisineListingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/start" element={<StartHere />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={
          <ProtectedRoute>
            <RecipesProvider>
              <AdminLayout />
            </RecipesProvider>
          </ProtectedRoute>
        }>
          <Route index element={<AdminDashboard />} />
          <Route path="recipes" element={<AdminRecipes />} />
          <Route path="cuisines" element={<AdminCuisines />} />
        </Route>
      </Routes>
      {!location.pathname.startsWith('/admin') && location.pathname !== '/login' && <Footer />}
    </>
  );
}

export default function App() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(watchAuthState());
  }, [dispatch]);
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
} 