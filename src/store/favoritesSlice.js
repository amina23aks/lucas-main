// src/store/favoritesSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Get a safe localStorage key per user
const getKey = (userId) => `favorites_${encodeURIComponent(userId)}`;

// Load a user's favorites
const loadFavorites = (userId) => {
  const stored = localStorage.getItem(getKey(userId));
  return stored ? JSON.parse(stored) : [];
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    items: [],
    userId: null,
  },
  reducers: {
    setUser(state, action) {
      const userId = action.payload;
      state.userId = userId;
      state.items = loadFavorites(userId);
    },
    addFavorite(state, action) {
      if (!state.userId) return;

      const exists = state.items.find((item) => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
        localStorage.setItem(getKey(state.userId), JSON.stringify(state.items));
      }
    },
    removeFavorite(state, action) {
      if (!state.userId) return;

      state.items = state.items.filter((item) => item.id !== action.payload.id);
      localStorage.setItem(getKey(state.userId), JSON.stringify(state.items));
    },
    clearFavorites(state) {
      if (!state.userId) return;

      state.items = [];
      localStorage.removeItem(getKey(state.userId));
    },
  },
});

export const favoritesActions = favoritesSlice.actions;
export default favoritesSlice.reducer;
