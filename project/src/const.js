export const MAX_RATING = 5;

export const AppRoute = {
  MAIN: '/',
  SIGN_IN: '/login',
  FAVORITES: '/favorites',
  ROOM: '/offer/:id',
  ROOM_LINK: '/offer/',
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

export const CITIES = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
];

export const DEFAULT_CITY = CITIES[0];

export const SortType = {
  POPULAR: 'Popular',
  PRICE_LOW_TO_HIGH: 'Price: low to high',
  PRICE_HIGH_TO_LOW: 'Price: high to low',
  TOP_RATED_FIRST: 'Top rated first',
};

export const APIRoute = {
  HOTELS: '/hotels',
  NEARBY: '/nearby',
  FAVORITE: '/favorite',
  LOGIN: '/login',
  LOGOUT: '/logout',
};

export const AuthorizationStatus = {
  AUTH: 'AUTH',
  NO_AUTH: 'NO_AUTH',
  UNKNOWN: 'UNKNOWN',
};
