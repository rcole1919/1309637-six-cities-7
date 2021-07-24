// import {ActionType} from '../action';
import {createReducer} from '@reduxjs/toolkit';
import {fillFavoriteOffers, toggleFavoriteLoading, removeFavorite} from '../action';

const initialState = {
  favoriteOffers: [],
  isFavoriteLoaded: true,
};

// export const favorite = (state = initialState, action) => {
//   switch (action.type) {
//     case ActionType.FILL_FAVORITE_OFFERS:
//       return {
//         ...state,
//         favoriteOffers: action.payload,
//         isFavoriteLoaded: true,
//       };
//     case ActionType.TOGGLE_FAVORITE_LOADING:
//       return {
//         ...state,
//         isFavoriteLoaded: !state.isFavoriteLoaded,
//       };
//     case ActionType.REMOVE_FAVORITE:
//       return {
//         ...state,
//         favoriteOffers: state.favoriteOffers.filter((el) => el.id !== action.payload),
//       };
//     default:
//       return state;
//   }
// };

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
