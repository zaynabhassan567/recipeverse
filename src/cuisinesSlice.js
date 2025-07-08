import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const cuisinesSlice = createSlice({
  name: 'cuisines',
  initialState,
  reducers: {
    setCuisines: (state, action) => {
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
    addCuisine: (state, action) => {
      state.items.push(action.payload);
    },
    updateCuisine: (state, action) => {
      const idx = state.items.findIndex(c => c.id === action.payload.id);
      if (idx !== -1) state.items[idx] = action.payload;
    },
    deleteCuisine: (state, action) => {
      state.items = state.items.filter(c => c.id !== action.payload);
    },
    fetchCuisinesSaga: (state) => {}, // saga trigger
    addCuisineSaga: (state, action) => {}, // saga trigger
    updateCuisineSaga: (state, action) => {}, // saga trigger
    deleteCuisineSaga: (state, action) => {}, // saga trigger
  },
});

export const { setCuisines, setLoading, setError, fetchCuisinesSaga, addCuisineSaga, updateCuisineSaga, deleteCuisineSaga, addCuisine, updateCuisine, deleteCuisine } = cuisinesSlice.actions;
export default cuisinesSlice.reducer; 