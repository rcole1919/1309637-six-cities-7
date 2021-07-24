import {NameSpace} from '../root-reducer';

export const getAuthorizationStatus = (state) => state[NameSpace.USER].authorizationStatus;
export const getUser = (state) => state[NameSpace.USER].user;
