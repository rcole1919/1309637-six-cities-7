import {SortType, DEFAULT_CITY} from '../../const';
import {createReducer} from '@reduxjs/toolkit';
import {changeCity, sortOffers, fillOffers, toggleFavorite} from '../action';

const initialState = {
  city: DEFAULT_CITY,
  sortType: SortType.POPULAR,
  offers: [],
  isDataLoaded: false,
};

export const main = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(sortOffers, (state, action) => {
      state.sortType = action.payload;
    })
    .addCase(fillOffers, (state, action) => {
      state.offers = action.payload;
      state.isDataLoaded = true;
    })
    .addCase(toggleFavorite, (state, action) => {
      const index = state.offers.findIndex((el) => el.id === action.payload);
      state.offers = [
        ...state.offers.slice(0, index),
        {
          ...state.offers[index],
          isFavorite: !state.offers[index].isFavorite,
        },
        ...state.offers.slice(index + 1),
      ];
    });
});
