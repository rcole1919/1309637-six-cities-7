import {createReducer} from '@reduxjs/toolkit';
import {fillFavoriteOffers, toggleFavoriteLoading, removeFavorite} from '../action';

const initialState = {
  favoriteOffers: [],
  isFavoriteLoaded: true,
};

export const favorite = createReducer(initialState, (builder) => {
  builder
    .addCase(fillFavoriteOffers, (state, action) => {
      state.favoriteOffers = action.payload;
      state.isFavoriteLoaded = true;
    })
    .addCase(toggleFavoriteLoading, (state) => {
      state.isFavoriteLoaded = !state.isFavoriteLoaded;
    })
    .addCase(removeFavorite, (state, action) => {
      state.favoriteOffers = state.favoriteOffers.filter((el) => el.id !== action.payload);
    });
});
