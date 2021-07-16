import {ActionType} from './action';
import {SortType, DEFAULT_CITY, AuthorizationStatus} from '../const';

const initialState = {
  city: DEFAULT_CITY,
  sortType: SortType.POPULAR,
  offers: [],
  activeOffer: null,
  nearbyOffers: [],
  authorizationStatus: AuthorizationStatus.UNKNOWN,
  isDataLoaded: false,
  isActiveLoaded: true,
  isReviewUploaded: true,
  user: null,
  isBadRequest: false,
  reviews: [],
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return {
        ...state,
        city: action.payload,
      };
    case ActionType.SORT_OFFERS:
      return {
        ...state,
        sortType: action.payload,
      };
    case ActionType.FILL_OFFERS:
      return {
        ...state,
        offers: action.payload,
        isDataLoaded: true,
      };
    case ActionType.REQUIRED_AUTHORIZATION:
      return {
        ...state,
        authorizationStatus: action.payload,
        isBadRequest: action.payload === AuthorizationStatus.AUTH && false,
      };
    case ActionType.LOGOUT:
      return {
        ...state,
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        user: null,
      };
    case ActionType.SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case ActionType.SET_BAD_REQUEST:
      return {
        ...state,
        isBadRequest: action.payload,
      };
    case ActionType.SET_ACTIVE_OFFER:
      return {
        ...state,
        activeOffer: action.payload,
      };
    case ActionType.SET_NEARBY_OFFERS:
      return {
        ...state,
        nearbyOffers: action.payload,
      };
    case ActionType.START_ACTIVE_LOADING:
      return {
        ...state,
        isActiveLoaded: false,
        nearbyOffers: [],
        reviews: [],
      };
    case ActionType.FINISH_ACTIVE_LOADING:
      return {
        ...state,
        isActiveLoaded: true,
      };
    case ActionType.SET_REVIEWS:
      return {
        ...state,
        reviews: action.payload,
      };
    case ActionType.TOGGLE_REVIEW_UPLOADING:
      return {
        ...state,
        isReviewUploaded: !state.isReviewUploaded,
      };
    default:
      return state;
  }
};
