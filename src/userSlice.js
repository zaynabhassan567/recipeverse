import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    // Saga triggers (no-op reducers)
    loginUser: (state, action) => {},
    logoutUser: (state) => {},
    watchAuthState: (state) => {},
  },
});

export const { setUser, clearUser, setLoading, loginUser, logoutUser, watchAuthState } = userSlice.actions;
export default userSlice.reducer; 