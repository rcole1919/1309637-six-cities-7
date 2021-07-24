import {NameSpace} from '../root-reducer';

export const getCity = (state) => state[NameSpace.MAIN].city;
export const getSortType = (state) => state[NameSpace.MAIN].sortType;
export const getOffers = (state) => state[NameSpace.MAIN].offers;
export const getLoadedDataStatus = (state) => state[NameSpace.MAIN].isDataLoaded;
