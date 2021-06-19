export const MAX_RATING = 5;

export const AppRoute = {
  MAIN: '/',
  SIGN_IN: '/login',
  FAVORITES: '/favorites',
  ROOM: '/offer/:id',
  ROOM_DEV: '/offer',
};

export const DEFAULT_ICON_URL = 'img/pin.svg';

export const ACTIVE_ICON_URL = 'img/pin-active.svg';

export const CardType = {
  MAIN: 'main',
  FAVORITES: 'favorites',
  ROOM: 'room',
};

export const MapType = {
  MAIN: {
    class: 'cities__map map',
    height: '100%',
  },
  ROOM: {
    class: 'property__map map',
    height: '579',
  },
};
