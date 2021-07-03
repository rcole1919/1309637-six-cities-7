export const ActionType = {
  CHANGE_CITY: 'CHANGE_CITY',
  SORT_OFFERS: 'SORT_OFFERS',
  FILL_OFFERS: 'FILL_OFFERS',
  REQUIRED_AUTHORIZATION: 'REQUIRED_AUTHORIZATION',
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
};
