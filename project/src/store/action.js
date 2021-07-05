export const ActionType = {
  CHANGE_CITY: 'CHANGE_CITY',
  SORT_OFFERS: 'SORT_OFFERS',
  FILL_OFFERS: 'FILL_OFFERS',
  REQUIRED_AUTHORIZATION: 'REQUIRED_AUTHORIZATION',
  REDIRECT_TO_ROUTE: 'REDIRECT_TO_ROUTE',
  LOGOUT: 'LOGOUT',
  SET_USER: 'SET_USER',
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
  fillOffersAction: (offers) => ({
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
};
