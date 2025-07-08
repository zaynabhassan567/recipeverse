import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    setRecipes: (state, action) => {
      state.items = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    fetchRecipesSaga: (state) => {}, // saga trigger
    addRecipe: (state, action) => {
      state.items.push(action.payload);
    },
    updateRecipe: (state, action) => {
      const idx = state.items.findIndex(r => r.id === action.payload.id);
      if (idx !== -1) state.items[idx] = action.payload;
    },
    deleteRecipe: (state, action) => {
      state.items = state.items.filter(r => r.id !== action.payload);
    },
    addRecipeSaga: (state, action) => {}, // saga trigger
    updateRecipeSaga: (state, action) => {}, // saga trigger
    deleteRecipeSaga: (state, action) => {}, // saga trigger
  },
});

export const { setRecipes, setLoading, setError, fetchRecipesSaga, addRecipeSaga, updateRecipeSaga, deleteRecipeSaga, addRecipe, updateRecipe, deleteRecipe } = recipesSlice.actions;
export default recipesSlice.reducer; 