import {NameSpace} from '../root-reducer';

export const getFavoriteOffers = (state) => state[NameSpace.FAVORITE].favoriteOffers;
export const getLoadedFavoriteOffersStatus = (state) => state[NameSpace.FAVORITE].isFavoriteLoaded;
