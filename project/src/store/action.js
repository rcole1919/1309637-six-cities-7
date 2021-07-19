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

export const ActionCreator = {
  changeCity: (city) => ({
    type: ActionType.CHANGE_CITY,
    payload: city,
  }),
  sortOffers: (sortType) => ({
    type: ActionType.SORT_OFFERS,
    payload: sortType,
  }),
  fillOffers: (offers) => ({
    type: ActionType.FILL_OFFERS,
    payload: offers,
  }),
  requireAuthorization: (status) => ({
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: status,
  }),
  redirectToRoute: (url) => ({
    type: ActionType.REDIRECT_TO_ROUTE,
    payload: url,
  }),
  signOut: () => ({
    type: ActionType.LOGOUT,
  }),
  setUser: (user) => ({
    type: ActionType.SET_USER,
    payload: user,
  }),
  setActiveOffer: (offer) => ({
    type: ActionType.SET_ACTIVE_OFFER,
    payload: offer,
  }),
  setNearbyOffers: (offers) => ({
    type: ActionType.SET_NEARBY_OFFERS,
    payload: offers,
  }),
  startLoading: () => ({
    type: ActionType.START_ACTIVE_LOADING,
  }),
  finishLoading: () => ({
    type: ActionType.FINISH_ACTIVE_LOADING,
  }),
  setReviews: (reviews) => ({
    type: ActionType.SET_REVIEWS,
    payload: reviews,
  }),
  toggleReviewUploading: () => ({
    type: ActionType.TOGGLE_REVIEW_UPLOADING,
  }),
  toggleFavorite: (id) => ({
    type: ActionType.TOGGLE_FAVORITE,
    payload: id,
  }),
  toggleActiveFavorite: () => ({
    type: ActionType.TOGGLE_ACTIVE_FAVORITE,
  }),
  fillFavoriteOffers: (offers) => ({
    type: ActionType.FILL_FAVORITE_OFFERS,
    payload: offers,
  }),
  toggleFavoriteLoading: () => ({
    type: ActionType.TOGGLE_FAVORITE_LOADING,
  }),
  removeFavorite: (id) => ({
    type: ActionType.REMOVE_FAVORITE,
    payload: id,
  }),
};
