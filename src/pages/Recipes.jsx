import React, { useEffect, useState } from 'react';
import { fetchRecipe01 } from '../services/firestoreApi';

export default function Recipes() {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRecipe01()
      .then(data => {
        setRecipe(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message || 'Error fetching recipe');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading recipe...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Recipe 01 (from Firestore)</h2>
      <pre style={{ background: '#f8f8f8', padding: 16, borderRadius: 8 }}>
        {JSON.stringify(recipe, null, 2)}
      </pre>
    </div>
  );
} 