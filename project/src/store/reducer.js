import {OFFERS} from '../mock/offers';
import {ActionType} from './action';

const initialState = {
  city: 'Paris',
  offers: OFFERS,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return {
        ...state,
        city: action.payload,
      };
    case ActionType.FILL_OFFERS:
      return {
        ...state,
        offers: action.payload,
      };
    default:
      return state;
  }
};
