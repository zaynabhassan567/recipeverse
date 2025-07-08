import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, PieChart, Pie, Cell } from 'recharts';
import { fetchCuisinesData } from '../utils/cusinesData';

const DIFFICULTY_COLORS = ['#20bf6b', '#f7b731', '#eb3b5a']; // Easy, Medium, Hard
const DIFFICULTY_LABELS = ['Easy', 'Medium', 'Hard'];

export default function AdminDashboard() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cuisines, setCuisines] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch('https://dummyjson.com/recipes?limit=50')
      .then(res => res.json())
      .then(data => {
        setRecipes(data.recipes || []);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch recipes.');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchCuisinesData().then(setCuisines);
  }, []);

  // Top 5 rated recipes
  const topRated = [...recipes]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);

  // Difficulty distribution for Doughnut chart
  const difficultyCounts = DIFFICULTY_LABELS.map(label => ({
    name: label,
    value: recipes.filter(r => r.difficulty === label).length
  })).filter(d => d.value > 0);

  // Top 5 Longest Recipes (by prep time)
  const topLongest = [...recipes]
    .sort((a, b) => (b.prepTimeMinutes || 0) - (a.prepTimeMinutes || 0))
    .slice(0, 5)
    .map(r => ({ name: r.name, prepTime: r.prepTimeMinutes || 0 }));

  return (
    <div style={{ marginTop: 64, marginLeft: 60, minHeight: '70vh', width: 'calc(100vw - 280px)' }}>
      {loading && <div style={{ color: '#b03060', fontWeight: 700, fontSize: 22 }}>Loading...</div>}
      {error && <div style={{ color: '#c00', fontWeight: 700 }}>{error}</div>}
      {!loading && !error && (
        <>
          {/* First row: Two summary cards side by side, centered */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 32, marginBottom: 40, width: '100%' }}>
            {/* Total Recipes Card */}
            <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px rgba(110,58,89,0.07)', padding: 32, minWidth: 220, maxWidth: 260, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <div style={{ fontSize: 22, color: '#b03060', fontWeight: 800, marginBottom: 8 }}>Total Recipes</div>
              <div style={{ fontSize: 48, fontWeight: 900, color: '#e75480' }}>{recipes.length}</div>
            </div>
            {/* Total Cuisines Card */}
            <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px rgba(110,58,89,0.07)', padding: 32, minWidth: 220, maxWidth: 260, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <div style={{ fontSize: 22, color: '#b03060', fontWeight: 800, marginBottom: 8 }}>Total Cuisines</div>
              <div style={{ fontSize: 48, fontWeight: 900, color: '#e75480' }}>{cuisines.length}</div>
            </div>
          </div>
          {/* Second row: All charts side by side, centered */}
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: 32, flexWrap: 'wrap', width: '100%' }}>
            {/* Recipe Difficulty Doughnut Chart */}
            <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px rgba(110,58,89,0.07)', padding: 24, width: 340, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ fontSize: 18, color: '#8e44ad', fontWeight: 700, marginBottom: 8 }}>Recipe Difficulty</div>
              <ResponsiveContainer width={280} height={220}>
                <PieChart>
                  <Pie
                    data={difficultyCounts}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    fill="#20bf6b"
                    label={false}
                  >
                    {difficultyCounts.map((entry, index) => (
                      <Cell key={`cell-diff-${index}`} fill={DIFFICULTY_COLORS[index % DIFFICULTY_COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            {/* Top 5 Longest Recipes Bar Chart */}
            <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px rgba(110,58,89,0.07)', padding: 24, width: 340, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ fontSize: 18, color: '#8e44ad', fontWeight: 700, marginBottom: 8 }}>Top 5 Longest Recipes</div>
              <ResponsiveContainer width={280} height={220}>
                <BarChart data={topLongest} margin={{ top: 16, right: 16, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} interval={0} angle={-20} textAnchor="end" height={60} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 12 }} label={{ value: 'Prep Time (min)', angle: -90, position: 'insideLeft', fontSize: 12 }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="prepTime" fill="#8e44ad" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            {/* Top 5 Recipe Ratings Bar Chart */}
            <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px rgba(110,58,89,0.07)', padding: 24, width: 340, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ fontSize: 18, color: '#b03060', fontWeight: 700, marginBottom: 8 }}>Top 5 Recipe Ratings</div>
              <ResponsiveContainer width={280} height={220}>
                <BarChart data={topRated} margin={{ top: 16, right: 16, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} interval={0} angle={-20} textAnchor="end" height={60} />
                  <YAxis domain={[0, 5]} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="rating" fill="#e75480" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </div>
  );
} 