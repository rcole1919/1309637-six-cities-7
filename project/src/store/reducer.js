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
  reviews: [],
  favoriteOffers: [],
  isFavoriteLoaded: true,
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
    case ActionType.TOGGLE_FAVORITE:
      return {
        ...state,
        offers: [
          ...state.offers.slice(0, state.offers.findIndex((el) => el.id === action.payload)),
          {
            ...state.offers[state.offers.findIndex((el) => el.id === action.payload)],
            isFavorite: !state.offers[state.offers.findIndex((el) => el.id === action.payload)].isFavorite,
          },
          ...state.offers.slice(state.offers.findIndex((el) => el.id === action.payload) + 1),
        ],
      };
    case ActionType.TOGGLE_ACTIVE_FAVORITE:
      return {
        ...state,
        activeOffer: {
          ...state.activeOffer,
          isFavorite: !state.activeOffer.isFavorite,
        },
      };
    case ActionType.FILL_FAVORITE_OFFERS:
      return {
        ...state,
        favoriteOffers: action.payload,
        isFavoriteLoaded: true,
      };
    case ActionType.TOGGLE_FAVORITE_LOADING:
      return {
        ...state,
        isFavoriteLoaded: !state.isFavoriteLoaded,
      };
    case ActionType.REMOVE_FAVORITE:
      return {
        ...state,
        favoriteOffers: state.favoriteOffers.filter((el) => el.id !== action.payload),
      };
    default:
      return state;
  }
};

