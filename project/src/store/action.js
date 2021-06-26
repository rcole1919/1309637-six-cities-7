export const ActionType = {
  CHANGE_CITY: 'CHANGE_CITY',
  FILL_OFFERS: 'FILL_OFFERS',
};

export const ActionCreator = {
  changeCity: (city) => ({
    type: ActionType.CHANGE_CITY,
    payload: city,
  }),
  fillOffersAction: (offers) => ({
    type: ActionType.FILL_OFFERS,
    payload: offers,
  }),
};
