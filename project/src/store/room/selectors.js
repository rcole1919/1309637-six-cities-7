import {NameSpace} from '../root-reducer';

export const getActiveOffer = (state) => state[NameSpace.ROOM].activeOffer;
export const getNearbyOffers = (state) => state[NameSpace.ROOM].nearbyOffers;
export const getLoadedActiveRoomStatus = (state) => state[NameSpace.ROOM].isActiveLoaded;
export const getLoadedReviewStatus = (state) => state[NameSpace.ROOM].isReviewUploaded;
export const getReviews = (state) => state[NameSpace.ROOM].reviews;
