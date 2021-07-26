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
        const index = state.nearbyOffers.findIndex((el) => el.id === action.payload);
        if (index !== -1) {
          state.nearbyOffers = [
            ...state.nearbyOffers.slice(0, index),
            {
              ...state.nearbyOffers[index],
              isFavorite: !state.nearbyOffers[index].isFavorite,
            },
            ...state.nearbyOffers.slice(index + 1),
          ];
        }
      }
    });
});
