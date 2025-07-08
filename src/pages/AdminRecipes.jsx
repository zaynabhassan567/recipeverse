import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { fetchCuisinesData } from '../utils/cusinesData';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { addRecipeSaga, updateRecipeSaga, deleteRecipeSaga } from '../recipesSlice';
import { uploadRecipeImage } from '../services/recipeApi';

const cardStyle = {
  background: '#fff',
  borderRadius: 16,
  boxShadow: '0 2px 12px rgba(110,58,89,0.07)',
  padding: 24,
  minWidth: 220,
  textAlign: 'center',
  alignSelf: 'flex-start',
  marginTop: 64,
};

const actionsWrapperStyle = {
  display: 'flex',
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: 400,
};

const actionsStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
  alignItems: 'center',
};

const buttonStyle = {
  background: '#e75480',
  color: '#fff',
  border: 'none',
  borderRadius: 8,
  fontWeight: 700,
  fontSize: 18,
  padding: '16px 0',
  width: 220,
  cursor: 'pointer',
  letterSpacing: '0.04em',
  transition: 'background 0.18s',
};

const modalBackdrop = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  background: 'rgba(0,0,0,0.18)',
  zIndex: 2000,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const modalStyle = {
  background: '#fff',
  borderRadius: 16,
  boxShadow: '0 4px 32px rgba(110,58,89,0.18)',
  padding: 18,
  minWidth: 280,
  maxWidth: 340,
  maxHeight: '90vh',
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const inputStyle = {
  width: '100%',
  padding: 8,
  margin: '6px 0',
  borderRadius: 6,
  border: '1px solid #ccc',
  fontSize: 15,
};

const closeBtnStyle = {
  background: '#b03060',
  color: '#fff',
  border: 'none',
  borderRadius: 6,
  padding: '8px 18px',
  fontWeight: 700,
  fontSize: 16,
  marginTop: 16,
  cursor: 'pointer',
};

function Modal({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div style={modalBackdrop}>
      <div style={modalStyle}>
        {children}
        <button style={closeBtnStyle} onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default function AdminRecipes() {
  const recipes = useSelector((state) => state.recipes.items);
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [modal, setModal] = useState(null); // { type: 'add' | 'update' | 'delete', recipe: object|null }
  const [success, setSuccess] = useState('');
  const [actionModal, setActionModal] = useState(null); // { recipe: object|null }
  const [hoveredCard, setHoveredCard] = useState(null);
  const [cuisines, setCuisines] = useState([]);

  // Add/Update form state
  const [form, setForm] = useState({ name: '', cuisine: '', difficulty: 'Easy', ingredients: '', instructions: '', prepTimeMinutes: '', cookTimeMinutes: '', servings: '', image: '', uploadedImage: '', uploadedImageFile: null });

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm(f => ({ ...f, uploadedImage: reader.result, uploadedImageFile: file }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Add Recipe
  async function handleAddRecipe(e) {
    e.preventDefault();
    let imageToUse = form.image;
    if (form.uploadedImageFile) {
      imageToUse = await uploadRecipeImage(form.uploadedImageFile, form.name);
    }
    const newRecipe = {
      name: form.name,
      title: form.name, // Ensure search compatibility
      cuisine: form.cuisine,
      difficulty: form.difficulty,
      ingredients: form.ingredients.split('\n').map(i => i.trim()).filter(Boolean),
      instructions: form.instructions.split('\n').map(i => i.trim()).filter(Boolean),
      prepTimeMinutes: form.prepTimeMinutes ? Number(form.prepTimeMinutes) : undefined,
      cookTimeMinutes: form.cookTimeMinutes ? Number(form.cookTimeMinutes) : undefined,
      servings: form.servings ? Number(form.servings) : undefined,
      image: imageToUse,
    };
    dispatch(addRecipeSaga(newRecipe));
    setSuccess('Recipe added!');
    setModal(null);
    setForm({ name: '', cuisine: '', difficulty: 'Easy', ingredients: '', instructions: '', prepTimeMinutes: '', cookTimeMinutes: '', servings: '', image: '', uploadedImage: '', uploadedImageFile: null });
    setTimeout(() => setSuccess(''), 2000);
  }

  // Update Recipe
  async function handleUpdateRecipe(e) {
    e.preventDefault();
    let imageToUse = form.image;
    if (form.uploadedImageFile) {
      imageToUse = await uploadRecipeImage(form.uploadedImageFile, form.name);
    }
    dispatch(updateRecipeSaga({ ...form, ingredients: form.ingredients.split(',').map(i => i.trim()).filter(Boolean), instructions: form.instructions.split('\n').map(i => i.trim()).filter(Boolean), prepTimeMinutes: form.prepTimeMinutes ? Number(form.prepTimeMinutes) : undefined, cookTimeMinutes: form.cookTimeMinutes ? Number(form.cookTimeMinutes) : undefined, servings: form.servings ? Number(form.servings) : undefined, image: imageToUse, id: modal.recipe.id }));
    setSuccess('Recipe updated!');
    setModal(null);
    setForm({ name: '', cuisine: '', difficulty: 'Easy', ingredients: '', instructions: '', prepTimeMinutes: '', cookTimeMinutes: '', servings: '', image: '', uploadedImage: '', uploadedImageFile: null });
    setTimeout(() => setSuccess(''), 2000);
  }

  // Delete Recipe
  function handleDeleteRecipe(e) {
    e.preventDefault();
    if (!modal || !modal.recipe) return;
    dispatch(deleteRecipeSaga(modal.recipe.id));
    setSuccess('Recipe deleted!');
    setModal(null);
    setActionModal(null);
    dispatch({ type: 'recipes/fetchRecipesSaga' });
    setTimeout(() => setSuccess(''), 2000);
  }

  // Open modals with recipe context
  const openUpdateModal = (recipe) => {
    setForm({
      name: recipe.name || '',
      cuisine: recipe.cuisine || '',
      difficulty: recipe.difficulty || 'Easy',
      ingredients: (recipe.ingredients || []).join(', '),
      instructions: (recipe.instructions || []).join('\n'),
      prepTimeMinutes: recipe.prepTimeMinutes || '',
      cookTimeMinutes: recipe.cookTimeMinutes || '',
      servings: recipe.servings || '',
      image: recipe.image || '',
    });
    setModal({ type: 'update', recipe });
  };
  const openDeleteModal = (recipe) => {
    setActionModal(null);
    setModal({ type: 'delete', recipe });
  };
  const openAddModal = () => {
    setForm({ name: '', cuisine: '', difficulty: 'Easy', ingredients: '', instructions: '', prepTimeMinutes: '', cookTimeMinutes: '', servings: '', image: '', uploadedImage: '', uploadedImageFile: null });
    setModal({ type: 'add', recipe: null });
  };

  useEffect(() => {
    fetchCuisinesData().then(setCuisines);
  }, []);

  useEffect(() => {
    dispatch({ type: 'recipes/fetchRecipesSaga' });
  }, [dispatch]);

  // Avatar card layout
  return (
    <div style={{ background: '#ffe6f2', width: '100%', minHeight: 'calc(100vh - 64px)' }}>
      {/* Total Recipes Card at top right */}
      <div style={{ position: 'absolute', top: 80, right: 0, zIndex: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
        <span role="img" aria-label="Recipes" style={{ fontSize: 22, color: '#e75480', marginRight: 6 }}>🍽️</span>
        <span style={{ fontWeight: 800, fontSize: 18, color: '#b03060' }}>{recipes.length}</span>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'center', justifyContent: 'center', margin: '48px 0' }}>
        {recipes.length === 0 ? (
          Array.from({ length: 8 }).map((_, idx) => (
            <div key={idx} style={{ width: 100, height: 100, borderRadius: '50%', background: '#eee', animation: 'pulse 1.2s infinite' }} />
          ))
        ) : (
          <>
            {recipes.map(recipe => (
              <div
                key={recipe.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: 120,
                  cursor: 'pointer',
                  background: 'none',
                }}
                onMouseEnter={() => setHoveredCard(recipe.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => setActionModal({ recipe })}
              >
                <img
                  src={recipe.image || 'https://via.placeholder.com/80x80?text=No+Image'}
                  alt={recipe.name}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '2px solid #e75480',
                    marginBottom: 8,
                    transition: 'box-shadow 0.18s, transform 0.18s',
                    boxShadow: hoveredCard === recipe.id ? '0 4px 16px rgba(110,58,89,0.13)' : 'none',
                    transform: hoveredCard === recipe.id ? 'translateY(-6px) scale(1.04)' : 'none',
                  }}
                />
                <div style={{ fontWeight: 700, fontSize: 14, textAlign: 'center', marginBottom: 4 }}>{recipe.name}</div>
              </div>
            ))}
            {/* Add Recipe Button always at the end */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 120 }}>
              <button
                style={{ width: 80, height: 80, borderRadius: '50%', background: '#6e3a59', color: '#fff', fontSize: 36, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8, cursor: 'pointer' }}
                onClick={openAddModal}
                aria-label="Add Recipe"
              >+
              </button>
              <div style={{ fontWeight: 700, fontSize: 14, textAlign: 'center' }}>Add Recipe</div>
            </div>
          </>
        )}
      </div>
      {/* Action Modal for Update/Delete */}
      {actionModal && (
        <>
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(255, 230, 242, 0.7)',
            backdropFilter: 'blur(4px)',
            zIndex: 3000,
          }} onClick={() => setActionModal(null)} />
          <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: '#fff',
            borderRadius: 16,
            boxShadow: '0 4px 32px rgba(110,58,89,0.18)',
            padding: 24,
            minWidth: 220,
            maxWidth: 320,
            zIndex: 4000,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <button onClick={() => setActionModal(null)} style={{ position: 'absolute', top: 12, right: 18, background: 'none', border: 'none', fontSize: 22, color: '#e75480', cursor: 'pointer' }}>&times;</button>
            <img src={actionModal.recipe.image || 'https://via.placeholder.com/80x80?text=No+Image'} alt={actionModal.recipe.name} style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', border: '2px solid #e75480', marginBottom: 12 }} />
            <div style={{ fontWeight: 800, fontSize: 16, textAlign: 'center', marginBottom: 16 }}>{actionModal.recipe.name}</div>
            <button
              style={{ background: '#e75480', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 24px', fontWeight: 700, fontSize: 16, marginBottom: 10, cursor: 'pointer' }}
              onClick={() => { setActionModal(null); openUpdateModal(actionModal.recipe); }}
            >Update</button>
            <button
              style={{ background: '#fff', color: '#e75480', border: '2px solid #e75480', borderRadius: 6, padding: '8px 24px', fontWeight: 700, fontSize: 16, cursor: 'pointer' }}
              onClick={() => { setActionModal(null); openDeleteModal(actionModal.recipe); }}
            >Delete</button>
          </div>
            </>
          )}
      {/* Add/Update/Delete Modals */}
      <Modal open={modal && modal.type === 'add'} onClose={() => setModal(null)}>
        <h2 style={{ color: '#e75480', marginBottom: 16 }}>Add Recipe</h2>
        <Formik
          initialValues={{
            name: '',
            cuisine: '',
            difficulty: 'Easy',
            ingredients: '',
            instructions: '',
            prepTimeMinutes: '',
            cookTimeMinutes: '',
            servings: '',
            image: '',
            uploadedImage: '',
            uploadedImageFile: null
          }}
          validate={values => {
            const errors = {};
            if (!values.name) errors.name = 'Required';
            if (!values.cuisine) errors.cuisine = 'Required';
            if (!values.ingredients) errors.ingredients = 'Required';
            else if (values.ingredients.length < 8) errors.ingredients = 'Must be at least 8 characters';
            return errors;
          }}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            const imageToUse = values.uploadedImage || values.image;
            const newRecipe = {
              name: values.name,
              title: values.name,
              cuisine: values.cuisine,
              difficulty: values.difficulty,
              ingredients: values.ingredients.split(',').map(i => i.trim()).filter(Boolean),
              instructions: values.instructions.split('\n').map(i => i.trim()).filter(Boolean),
              prepTimeMinutes: values.prepTimeMinutes ? Number(values.prepTimeMinutes) : undefined,
              cookTimeMinutes: values.cookTimeMinutes ? Number(values.cookTimeMinutes) : undefined,
              servings: values.servings ? Number(values.servings) : undefined,
              image: imageToUse,
            };
            dispatch(addRecipeSaga(newRecipe));
            setSuccess('Recipe added!');
            setModal(null);
            resetForm();
            setTimeout(() => setSuccess(''), 2000);
            setSubmitting(false);
          }}
        >
          {({ values, setFieldValue, isSubmitting }) => (
            <Form style={{ width: '100%' }}>
              <Field style={inputStyle} name="name" required placeholder="Recipe Name" />
              <ErrorMessage name="name" component="div" style={{ color: '#b03060', fontSize: 13, marginBottom: 4 }} />
              <Field as="select" style={inputStyle} name="cuisine" required>
                <option value="">Select Cuisine</option>
                {cuisines.map(c => (
                  <option key={c.id || c.name} value={c.name}>{c.name}</option>
                ))}
              </Field>
              <ErrorMessage name="cuisine" component="div" style={{ color: '#b03060', fontSize: 13, marginBottom: 4 }} />
              <Field as="textarea" style={{ ...inputStyle, minHeight: 36 }} name="ingredients" required placeholder="Ingredients (comma separated)" />
              <ErrorMessage name="ingredients" component="div" style={{ color: '#b03060', fontSize: 13, marginBottom: 4 }} />
              <Field as="textarea" style={{ ...inputStyle, minHeight: 80 }} name="instructions" required placeholder="Instructions (one step per line)" />
              <ErrorMessage name="instructions" component="div" style={{ color: '#b03060', fontSize: 13, marginBottom: 4 }} />
              <Field as="select" style={inputStyle} name="difficulty">
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
              </Field>
              <Field style={inputStyle} name="image" placeholder="Image URL (optional)" />
              <div style={{ margin: '10px 0' }}>
                <label style={{ fontWeight: 700 }}>Or Upload Image: </label>
                <input type="file" accept="image/*" onChange={handleImageUpload} />
              </div>
              {values.uploadedImage && (
                <img src={values.uploadedImage} alt="Preview" style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', margin: '10px 0' }} />
              )}
              <label style={{ fontWeight: 700, marginTop: 12 }}>Prep Time (minutes):</label>
              <input
                style={inputStyle}
                type="number"
                min="0"
                value={values.prepTimeMinutes}
                onChange={e => setFieldValue('prepTimeMinutes', e.target.value)}
                placeholder="e.g. 10"
              />
              <label style={{ fontWeight: 700, marginTop: 12 }}>Cook Time (minutes):</label>
              <input
                style={inputStyle}
                type="number"
                min="0"
                value={values.cookTimeMinutes}
                onChange={e => setFieldValue('cookTimeMinutes', e.target.value)}
                placeholder="e.g. 20"
              />
              <label style={{ fontWeight: 700, marginTop: 12 }}>Serves:</label>
              <input
                style={inputStyle}
                type="number"
                min="1"
                value={values.servings}
                onChange={e => setFieldValue('servings', e.target.value)}
                placeholder="e.g. 4"
              />
              <button style={{ ...buttonStyle, width: '100%', marginTop: 12 }} type="submit" disabled={isSubmitting}>Add</button>
            </Form>
          )}
        </Formik>
      </Modal>
      <Modal open={modal && modal.type === 'update'} onClose={() => setModal(null)}>
        <h2 style={{ color: '#e75480', marginBottom: 16 }}>Update Recipe</h2>
        <Formik
          initialValues={{
            name: form.name,
            cuisine: form.cuisine,
            difficulty: form.difficulty,
            ingredients: form.ingredients,
            instructions: form.instructions,
            prepTimeMinutes: form.prepTimeMinutes,
            cookTimeMinutes: form.cookTimeMinutes,
            servings: form.servings,
            image: form.image,
            uploadedImage: form.uploadedImage || '',
            uploadedImageFile: form.uploadedImageFile || null
          }}
          enableReinitialize
          validate={values => {
            const errors = {};
            if (!values.name) errors.name = 'Required';
            if (!values.cuisine) errors.cuisine = 'Required';
            if (!values.ingredients) errors.ingredients = 'Required';
            else if (values.ingredients.length < 8) errors.ingredients = 'Must be at least 8 characters';
            return errors;
          }}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            dispatch(updateRecipeSaga({ ...values, ingredients: values.ingredients.split(',').map(i => i.trim()).filter(Boolean), instructions: values.instructions.split('\n').map(i => i.trim()).filter(Boolean), prepTimeMinutes: values.prepTimeMinutes ? Number(values.prepTimeMinutes) : undefined, cookTimeMinutes: values.cookTimeMinutes ? Number(values.cookTimeMinutes) : undefined, servings: values.servings ? Number(values.servings) : undefined, image: values.image, id: modal.recipe.id }));
            setSuccess('Recipe updated!');
            setModal(null);
            resetForm();
            setTimeout(() => setSuccess(''), 2000);
            setSubmitting(false);
          }}
        >
          {({ values, setFieldValue, isSubmitting }) => (
            <Form style={{ width: '100%' }}>
              <Field style={inputStyle} name="name" required placeholder="Recipe Name" />
              <ErrorMessage name="name" component="div" style={{ color: '#b03060', fontSize: 13, marginBottom: 4 }} />
              <Field as="select" style={inputStyle} name="cuisine" required>
                <option value="">Select Cuisine</option>
                {cuisines.map(c => (
                  <option key={c.id || c.name} value={c.name}>{c.name}</option>
                ))}
              </Field>
              <ErrorMessage name="cuisine" component="div" style={{ color: '#b03060', fontSize: 13, marginBottom: 4 }} />
              <Field as="textarea" style={{ ...inputStyle, minHeight: 36 }} name="ingredients" required placeholder="Ingredients (comma separated)" />
              <ErrorMessage name="ingredients" component="div" style={{ color: '#b03060', fontSize: 13, marginBottom: 4 }} />
              <Field as="textarea" style={{ ...inputStyle, minHeight: 80 }} name="instructions" required placeholder="Instructions (one step per line)" />
              <ErrorMessage name="instructions" component="div" style={{ color: '#b03060', fontSize: 13, marginBottom: 4 }} />
              <Field as="select" style={inputStyle} name="difficulty">
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </Field>
              <Field style={inputStyle} name="image" placeholder="Image URL (optional)" />
              <div style={{ margin: '10px 0' }}>
                <label style={{ fontWeight: 700 }}>Or Upload Image: </label>
                <input type="file" accept="image/*" onChange={handleImageUpload} />
              </div>
              {values.uploadedImage && (
                <img src={values.uploadedImage} alt="Preview" style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', margin: '10px 0' }} />
              )}
              <label style={{ fontWeight: 700, marginTop: 12 }}>Prep Time (minutes):</label>
              <input
                style={inputStyle}
                type="number"
                min="0"
                value={values.prepTimeMinutes}
                onChange={e => setFieldValue('prepTimeMinutes', e.target.value)}
                placeholder="e.g. 10"
              />
              <label style={{ fontWeight: 700, marginTop: 12 }}>Cook Time (minutes):</label>
              <input
                style={inputStyle}
                type="number"
                min="0"
                value={values.cookTimeMinutes}
                onChange={e => setFieldValue('cookTimeMinutes', e.target.value)}
                placeholder="e.g. 20"
              />
              <label style={{ fontWeight: 700, marginTop: 12 }}>Serves:</label>
              <input
                style={inputStyle}
                type="number"
                min="1"
                value={values.servings}
                onChange={e => setFieldValue('servings', e.target.value)}
                placeholder="e.g. 4"
              />
              <button style={{ ...buttonStyle, width: '100%', marginTop: 12 }} type="submit" disabled={isSubmitting}>Update</button>
            </Form>
          )}
        </Formik>
      </Modal>
      <Modal open={modal && modal.type === 'delete'} onClose={() => setModal(null)}>
        <h2 style={{ color: '#e75480', marginBottom: 16 }}>Delete Recipe</h2>
        <div style={{ marginBottom: 16, fontWeight: 700 }}>Are you sure you want to delete <span style={{ color: '#b03060' }}>{modal && modal.recipe && modal.recipe.name}</span>?</div>
        <form onSubmit={handleDeleteRecipe} style={{ width: '100%' }}>
          <button style={{ ...buttonStyle, width: '100%', marginTop: 12, background: '#b03060' }} type="submit">Delete</button>
        </form>
      </Modal>
      {success && <div style={{ color: '#20bf6b', fontWeight: 700, marginTop: 16, textAlign: 'center' }}>{success}</div>}
    </div>
  );
} 