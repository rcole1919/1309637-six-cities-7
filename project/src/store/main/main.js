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
      state.offers = state.offers.map((el) => {
        if (el.id === action.payload) {
          el.isFavorite = !el.isFavorite;
        }
        return el;
      });
    });
});
