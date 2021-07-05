import browserHystory from '../../browser-history';
import {ActionType} from '../action';

export const redirect = (_store) => (next) => (action) => {
  if (action.type === ActionType.REDIRECT_TO_ROUTE) {
    browserHystory.push(action.payload);
  }

  return next(action);
};
