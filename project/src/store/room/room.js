import {createReducer} from '@reduxjs/toolkit';
import {setActiveOffer, setNearbyOffers, startLoading, finishLoading, setReviews, toggleReviewUploading, toggleActiveFavorite, toggleNearbyFavorite} from '../action';

const initialState = {
  activeOffer: null,
  nearbyOffers: [],
  isActiveLoaded: true,
  isReviewUploaded: true,
  reviews: [],
};

export const room = createReducer(initialState, (builder) => {
  builder
    .addCase(setActiveOffer, (state, action) => {
      state.activeOffer = action.payload;
    })
    .addCase(setNearbyOffers, (state, action) => {
      state.nearbyOffers = action.payload;
    })
    .addCase(startLoading, (state) => {
      state.isActiveLoaded = false;
      state.nearbyOffers = [];
      state.reviews = [];
    })
    .addCase(finishLoading, (state) => {
      state.isActiveLoaded = true;
    })
    .addCase(setReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(toggleReviewUploading, (state) => {
      state.isReviewUploaded = !state.isReviewUploaded;
    })
    .addCase(toggleActiveFavorite, (state, action) => {
      if (state.activeOffer && state.activeOffer.id === action.payload) {
        state.activeOffer = {
          ...state.activeOffer,
          isFavorite: !state.activeOffer.isFavorite,
        };
      }
    })
    .addCase(toggleNearbyFavorite, (state, action) => {
      if (state.nearbyOffers.length > 0) {
        state.nearbyOffers = state.nearbyOffers.map((el) => {
          if (el.id === action.payload) {
            el.isFavorite = !el.isFavorite;
          }
          return el;
        });
      }
    });
});
