import {createAction} from '@reduxjs/toolkit';

export const ActionType = {
  CHANGE_CITY: 'CHANGE_CITY',
  SORT_OFFERS: 'SORT_OFFERS',
  FILL_OFFERS: 'FILL_OFFERS',
  REQUIRED_AUTHORIZATION: 'REQUIRED_AUTHORIZATION',
  REDIRECT_TO_ROUTE: 'REDIRECT_TO_ROUTE',
  LOGOUT: 'LOGOUT',
  SET_USER: 'SET_USER',
  SET_BAD_REQUEST: 'SET_BAD_REQUEST',
  SET_ACTIVE_OFFER: 'OFFER',
  SET_NEARBY_OFFERS: 'SET_NEARBY_OFFERS',
  START_ACTIVE_LOADING: 'START_ACTIVE_LOADING',
  FINISH_ACTIVE_LOADING: 'FINISH_ACTIVE_LOADING',
  SET_REVIEWS: 'SET_REVIEWS',
  TOGGLE_REVIEW_UPLOADING: 'TOGGLE_REVIEW_UPLOADING',
  TOGGLE_FAVORITE: 'TOGGLE_FAVORITE',
  TOGGLE_ACTIVE_FAVORITE: 'TOGGLE_ACTIVE_FAVORITE',
  FILL_FAVORITE_OFFERS: 'FILL_FAVORITE_OFFERS',
  TOGGLE_FAVORITE_LOADING: 'TOGGLE_FAVORITE_LOADING',
  REMOVE_FAVORITE: 'REMOVE_FAVORITE',
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

export const toggleActiveFavorite = createAction(ActionType.TOGGLE_ACTIVE_FAVORITE);

export const fillFavoriteOffers = createAction(ActionType.FILL_FAVORITE_OFFERS, (offers) => ({
  payload: offers,
}));

export const toggleFavoriteLoading = createAction(ActionType.TOGGLE_FAVORITE_LOADING);

export const removeFavorite = createAction(ActionType.REMOVE_FAVORITE, (id) => ({
  payload: id,
}));
