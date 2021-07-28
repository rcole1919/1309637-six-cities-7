import {createAction} from '@reduxjs/toolkit';

export const ActionType = {
  CHANGE_CITY: 'main/changeCity',
  SORT_OFFERS: 'main/sortOffers',
  FILL_OFFERS: 'main/fillOffers',
  REQUIRED_AUTHORIZATION: 'user/requiredAuthorization',
  REDIRECT_TO_ROUTE: 'route/redirectToRoute',
  LOGOUT: 'user/logout',
  SET_USER: 'user/setUser',
  SET_ACTIVE_OFFER: 'room/setActiveOffer',
  SET_NEARBY_OFFERS: 'room/setNearbyOffers',
  START_ACTIVE_LOADING: 'room/startActiveLoading',
  FINISH_ACTIVE_LOADING: 'room/finishActiveLoading',
  SET_REVIEWS: 'room/setReviews',
  TOGGLE_REVIEW_UPLOADING: 'room/toggleReviewUploading',
  TOGGLE_FAVORITE: 'main/toggleFavorite',
  TOGGLE_ACTIVE_FAVORITE: 'room/toggleActiveFavorite',
  TOGGLE_NEARBY_FAVORITE: 'room/toggleNearbyFavorite',
  FILL_FAVORITE_OFFERS: 'favorite/fillFavoriteOffers',
  TOGGLE_FAVORITE_LOADING: 'favorite/toggleFavoriteLoading',
  REMOVE_FAVORITE: 'favorite/removeFavorite',
};

export const changeCity = createAction(ActionType.CHANGE_CITY, (city) => ({
  payload: city,
}));

export const sortOffers = createAction(ActionType.SORT_OFFERS, (sortType) => ({
  payload: sortType,
}));

export const fillOffers = createAction(ActionType.FILL_OFFERS, (offers) => ({
  payload: offers,
}));

export const requireAuthorization = createAction(ActionType.REQUIRED_AUTHORIZATION, (status) => ({
  payload: status,
}));

export const redirectToRoute = createAction(ActionType.REDIRECT_TO_ROUTE, (url) => ({
  payload: url,
}));

export const signOut = createAction(ActionType.LOGOUT);

export const setUser = createAction(ActionType.SET_USER, (user) => ({
  payload: user,
}));

export const setActiveOffer = createAction(ActionType.SET_ACTIVE_OFFER, (offer) => ({
  payload: offer,
}));

export const setNearbyOffers = createAction(ActionType.SET_NEARBY_OFFERS, (offers) => ({
  payload: offers,
}));

export const startLoading = createAction(ActionType.START_ACTIVE_LOADING);

export const finishLoading = createAction(ActionType.FINISH_ACTIVE_LOADING);

export const setReviews = createAction(ActionType.SET_REVIEWS, (reviews) => ({
  payload: reviews,
}));

export const toggleReviewUploading = createAction(ActionType.TOGGLE_REVIEW_UPLOADING);

export const toggleFavorite = createAction(ActionType.TOGGLE_FAVORITE, (id) => ({
  payload: id,
}));

export const toggleActiveFavorite = createAction(ActionType.TOGGLE_ACTIVE_FAVORITE, (id) => ({
  payload: id,
}));

export const toggleNearbyFavorite = createAction(ActionType.TOGGLE_NEARBY_FAVORITE, (id) => ({
  payload: id,
}));

export const fillFavoriteOffers = createAction(ActionType.FILL_FAVORITE_OFFERS, (offers) => ({
  payload: offers,
}));

export const toggleFavoriteLoading = createAction(ActionType.TOGGLE_FAVORITE_LOADING);

export const removeFavorite = createAction(ActionType.REMOVE_FAVORITE, (id) => ({
  payload: id,
}));
