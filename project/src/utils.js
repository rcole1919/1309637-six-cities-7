import {MAX_RATING} from './const';

export const getRatingPercent = (rating) => `${Math.floor(rating) * 100 / MAX_RATING}%`;

