import React, { useEffect, useState } from 'react';
import { cuisinesData } from '../utils/cusinesData';
import { useRecipes } from '../contexts/RecipesContext';

const cardStyle = {
  background: '#fff',
  borderRadius: 16,
  boxShadow: '0 2px 12px rgba(110,58,89,0.07)',
  padding: 18,
  minWidth: 180,
  maxWidth: 220,
  textAlign: 'center',
  alignSelf: 'flex-start',
  margin: 8,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};
const buttonStyle = {
  background: '#e75480',
  color: '#fff',
  border: 'none',
  borderRadius: 6,
  fontWeight: 700,
  fontSize: 15,
  padding: '6px 18px',
  margin: '6px 4px',
  cursor: 'pointer',
  letterSpacing: '0.04em',
  transition: 'background 0.18s',
};
const whiteButtonStyle = {
  background: '#fff',
  color: '#e75480',
  border: '2px solid #e75480',
  borderRadius: 6,
  fontWeight: 700,
  fontSize: 15,
  padding: '6px 18px',
  margin: '6px 4px',
  cursor: 'pointer',
  letterSpacing: '0.04em',
  transition: 'background 0.18s, color 0.18s',
};
const inputStyle = {
  width: '100%',
  padding: 8,
  margin: '6px 0',
  borderRadius: 6,
  border: '1px solid #ccc',
  fontSize: 15,
};

function Modal({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(255, 230, 242, 0.7)',
      backdropFilter: 'blur(4px)',
      zIndex: 3000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }} onClick={onClose}>
      <div style={{
        background: '#fff',
        borderRadius: 16,
        boxShadow: '0 4px 32px rgba(110,58,89,0.18)',
        padding: 18,
        minWidth: 260,
        maxWidth: 340,
        maxHeight: '90vh',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }} onClick={e => e.stopPropagation()}>
        {children}
        <button style={{ ...whiteButtonStyle, marginTop: 12 }} onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default function AdminCuisines() {
  const [cuisines, setCuisines] = useState([]);
  const { recipes, setRecipes } = useRecipes();
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null); // { type: 'add'|'edit'|'delete', cuisine: object|null }
  const [form, setForm] = useState({ name: '', description: '', image: '', uploadedImage: '' });
  const [success, setSuccess] = useState('');
  const [addRecipeModal, setAddRecipeModal] = useState(null); // { cuisineName: string|null, added: boolean }
  const [recipeForm, setRecipeForm] = useState({ name: '', cuisine: '', difficulty: 'Easy', ingredients: '', image: '', uploadedImage: '' });
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch('https://dummyjson.com/recipes/cuisines')
      .then(res => res.json())
      .then(data => {
        if (data.cuisines && data.cuisines.length > 0) {
          setCuisines(data.cuisines);
        } else {
          setCuisines(cuisinesData);
        }
      })
      .catch(() => setCuisines(cuisinesData))
      .finally(() => setLoading(false));
  }, []);

  // Count recipes per cuisine
  const cuisineCounts = cuisines.reduce((acc, c) => {
    acc[c.name] = recipes.filter(r => (r.cuisine || '').toLowerCase() === c.name.toLowerCase()).length;
    return acc;
  }, {});

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm(f => ({ ...f, uploadedImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Add Cuisine
  function handleAddCuisine(e) {
    e.preventDefault();
    const imageToUse = form.uploadedImage || form.image;
    const newCuisine = {
      name: form.name,
      description: form.description,
      image: imageToUse,
    };
    setCuisines(prev => {
      const updated = [...prev, newCuisine];
      console.log('Updated cuisines:', updated);
      return updated;
    });
    setSuccess('Cuisine added!');
    setModal(null);
    setForm({ name: '', description: '', image: '', uploadedImage: '' });
    setTimeout(() => setSuccess(''), 2000);
    // Open add recipe modal for the new cuisine
    setRecipeForm({ name: '', cuisine: newCuisine.name, difficulty: 'Easy', ingredients: '', image: '', uploadedImage: '' });
    setAddRecipeModal({ cuisineName: newCuisine.name, added: false });
  }

  // Edit Cuisine
  function handleEditCuisine(e) {
    e.preventDefault();
    const imageToUse = form.uploadedImage || form.image;
    setCuisines(prev => {
      const updated = prev.map(c => c.name === modal.cuisine.name ? { ...c, ...form, image: imageToUse } : c);
      console.log('Updated cuisines:', updated);
      return updated;
    });
    setSuccess('Cuisine updated!');
    setModal(null);
    setForm({ name: '', description: '', image: '', uploadedImage: '' });
    setTimeout(() => setSuccess(''), 2000);
  }

  // Delete Cuisine
  function handleDeleteCuisine() {
    setCuisines(prev => {
      const updated = prev.filter(c => c.name !== modal.cuisine.name);
      console.log('Updated cuisines:', updated);
      return updated;
    });
    setSuccess('Cuisine deleted!');
    setModal(null);
    setTimeout(() => setSuccess(''), 2000);
  }

  // Open modals
  const openEditModal = (cuisine) => {
    setForm({
      name: cuisine.name || '',
      description: cuisine.description || '',
      image: cuisine.image || '',
      uploadedImage: '',
    });
    setModal({ type: 'edit', cuisine });
  };
  const openDeleteModal = (cuisine) => {
    setModal({ type: 'delete', cuisine });
  };
  const openAddModal = () => {
    setForm({ name: '', description: '', image: '', uploadedImage: '' });
    setModal({ type: 'add', cuisine: null });
  };

  // Add Recipe for new cuisine
  function handleAddRecipeForCuisine(e) {
    e.preventDefault();
    const imageToUse = recipeForm.uploadedImage || recipeForm.image;
    const newRecipe = {
      id: Date.now(),
      name: recipeForm.name,
      cuisine: recipeForm.cuisine,
      difficulty: recipeForm.difficulty,
      ingredients: recipeForm.ingredients.split(',').map(i => i.trim()).filter(Boolean),
      image: imageToUse,
    };
    setRecipes(prev => {
      const updated = [...prev, newRecipe];
      console.log('Updated recipes:', updated);
      return updated;
    });
    setAddRecipeModal(null);
    setRecipeForm({ name: '', cuisine: recipeForm.cuisine, difficulty: 'Easy', ingredients: '', image: '', uploadedImage: '' });
  }

  return (
    <div style={{ background: '#ffe6f2', width: '100%', minHeight: 'calc(100vh - 64px)', padding: '32px 0' }}>
      {/* Total Cuisines Card at top right */}
      <div style={{ position: 'absolute', top: 80, right: 0, zIndex: 10 }}>
        <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(110,58,89,0.10)', padding: '12px 24px', minWidth: 80, display: 'flex', alignItems: 'center', gap: 10 }}>
          <span role="img" aria-label="Cuisines" style={{ fontSize: 22, color: '#e75480', marginRight: 6 }}>🍲</span>
          <span style={{ fontWeight: 800, fontSize: 18, color: '#b03060' }}>{cuisines.length}</span>
        </div>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'center', justifyContent: 'center', margin: '24px 0' }}>
        {loading ? (
          Array.from({ length: 8 }).map((_, idx) => (
            <div key={idx} style={{ ...cardStyle, width: 180, height: 180, background: '#eee', animation: 'pulse 1.2s infinite' }} />
          ))
        ) : (
          cuisines.map((cuisine, idx) => (
            <div
              key={cuisine.name}
              style={{
                ...cardStyle,
                transition: 'box-shadow 0.18s, transform 0.18s',
                boxShadow: hoveredCard === idx ? '0 4px 16px rgba(110,58,89,0.13)' : cardStyle.boxShadow,
                transform: hoveredCard === idx ? 'translateY(-6px) scale(1.04)' : 'none',
              }}
              onMouseEnter={() => setHoveredCard(idx)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <img src={cuisine.image || 'https://via.placeholder.com/80x80?text=No+Image'} alt={cuisine.name} style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', border: '2px solid #e75480', marginBottom: 8 }} />
              <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 4 }}>{cuisine.name}</div>
              <div style={{ color: '#b03060', fontWeight: 700, fontSize: 13, marginBottom: 8 }}>{cuisineCounts[cuisine.name] || 0} recipes</div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button style={buttonStyle} onClick={() => openEditModal(cuisine)}>Edit</button>
                <button style={whiteButtonStyle} onClick={() => openDeleteModal(cuisine)}>Delete</button>
              </div>
            </div>
          ))
        )}
        {/* Add Cuisine Card */}
        {!loading && (
          <div style={{ ...cardStyle, justifyContent: 'center', alignItems: 'center', minHeight: 180 }}>
            <button
              style={{ width: 60, height: 60, borderRadius: '50%', background: '#6e3a59', color: '#fff', fontSize: 32, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8, cursor: 'pointer' }}
              onClick={openAddModal}
              aria-label="Add Cuisine"
            >+</button>
            <div style={{ fontWeight: 700, fontSize: 14, textAlign: 'center' }}>Add Cuisine</div>
          </div>
        )}
      </div>
      {/* Add/Edit Modal */}
      <Modal open={modal && (modal.type === 'add' || modal.type === 'edit')} onClose={() => setModal(null)}>
        <h2 style={{ color: '#e75480', marginBottom: 16 }}>{modal && modal.type === 'add' ? 'Add Cuisine' : 'Edit Cuisine'}</h2>
        <form onSubmit={modal && modal.type === 'add' ? handleAddCuisine : handleEditCuisine} style={{ width: '100%' }}>
          <input style={inputStyle} required placeholder="Cuisine Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
          <textarea style={{ ...inputStyle, minHeight: 36 }} required placeholder="Description" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
          <input style={inputStyle} placeholder="Image URL (optional)" value={form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))} />
          <div style={{ margin: '10px 0' }}>
            <label style={{ fontWeight: 700 }}>Or Upload Image: </label>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
          </div>
          {form.uploadedImage && (
            <img src={form.uploadedImage} alt="Preview" style={{ width: 60, height: 60, borderRadius: '50%', objectFit: 'cover', margin: '10px 0' }} />
          )}
          <button style={{ ...buttonStyle, width: '100%', marginTop: 12 }} type="submit">{modal && modal.type === 'add' ? 'Add' : 'Update'}</button>
        </form>
      </Modal>
      {/* Delete Modal */}
      <Modal open={modal && modal.type === 'delete'} onClose={() => setModal(null)}>
        <h2 style={{ color: '#e75480', marginBottom: 16 }}>Delete Cuisine</h2>
        <div style={{ marginBottom: 16, fontWeight: 700 }}>Are you sure you want to delete <span style={{ color: '#b03060' }}>{modal && modal.cuisine && modal.cuisine.name}</span>?</div>
        <button style={{ ...whiteButtonStyle, width: '100%', marginTop: 12 }} onClick={handleDeleteCuisine}>Delete</button>
      </Modal>
      {/* Add Recipe Modal for New Cuisine */}
      {addRecipeModal && (
        <Modal open={true} onClose={() => setAddRecipeModal(null)}>
          <h2 style={{ color: '#e75480', marginBottom: 16 }}>Add Recipe for {addRecipeModal.cuisineName}</h2>
          <form onSubmit={handleAddRecipeForCuisine} style={{ width: '100%' }}>
            <input style={inputStyle} required placeholder="Recipe Name" value={recipeForm.name} onChange={e => setRecipeForm(f => ({ ...f, name: e.target.value }))} />
            <input style={inputStyle} required placeholder="Cuisine" value={recipeForm.cuisine} disabled />
            <textarea style={{ ...inputStyle, minHeight: 36 }} required placeholder="Ingredients (comma separated)" value={recipeForm.ingredients} onChange={e => setRecipeForm(f => ({ ...f, ingredients: e.target.value }))} />
            <select style={inputStyle} value={recipeForm.difficulty} onChange={e => setRecipeForm(f => ({ ...f, difficulty: e.target.value }))}>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
            <input style={inputStyle} placeholder="Image URL (optional)" value={recipeForm.image} onChange={e => setRecipeForm(f => ({ ...f, image: e.target.value }))} />
            <div style={{ margin: '10px 0' }}>
              <label style={{ fontWeight: 700 }}>Or Upload Image: </label>
              <input type="file" accept="image/*" onChange={e => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setRecipeForm(f => ({ ...f, uploadedImage: reader.result }));
                  };
                  reader.readAsDataURL(file);
                }
              }} />
            </div>
            {recipeForm.uploadedImage && (
              <img src={recipeForm.uploadedImage} alt="Preview" style={{ width: 60, height: 60, borderRadius: '50%', objectFit: 'cover', margin: '10px 0' }} />
            )}
            <button style={{ ...buttonStyle, width: '100%', marginTop: 12 }} type="submit">Add Recipe</button>
          </form>
        </Modal>
      )}
      {success && <div style={{ color: '#20bf6b', fontWeight: 700, marginTop: 16, textAlign: 'center' }}>{success}</div>}
    </div>
  );
} 