import React, { createContext, useContext, useEffect, useState } from 'react';

const RecipesContext = createContext();

export function RecipesProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('https://dummyjson.com/recipes?limit=1000')
      .then(res => res.json())
      .then(data => setRecipes(data.recipes || []))
      .catch(() => setRecipes([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <RecipesContext.Provider value={{ recipes, setRecipes, loading }}>
      {children}
    </RecipesContext.Provider>
  );
}

export function useRecipes() {
  return useContext(RecipesContext);
} 