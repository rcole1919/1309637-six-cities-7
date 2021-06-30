import {MAX_RATING, SortType} from './const';

export const getRatingPercent = (rating) => `${Math.floor(rating) * 100 / MAX_RATING}%`;

export const sort = {
  [SortType.POPULAR]: (cards) => cards,
  [SortType.PRICE_LOW_TO_HIGH]: (cards) => cards.sort((a, b) => a.price - b.price),
  [SortType.PRICE_HIGH_TO_LOW]: (cards) => cards.sort((a, b) => b.price - a.price),
  [SortType.TOP_RATED_FIRST]: (cards) => cards.sort((a, b) => b.rating - a.rating),
};


