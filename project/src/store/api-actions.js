import {APIRoute, AuthorizationStatus} from '../const';
import {ActionCreator} from './action';
import {adaptOfferToClient, adaptUserToClient} from '../services/api';

export const fetchOffers = () => (dispatch, _getState, {api}) => (
  api.get(APIRoute.HOTELS)
    .then(({data}) => data.map((offer) => adaptOfferToClient(offer)))
    .then((data) => dispatch(ActionCreator.fillOffers(data)))
);

export const checkAuth = () => (dispatch, _getState, {api}) => (
  api.get(APIRoute.LOGIN)
    .then(() => dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH)))
    .catch(() => {})
);

export const login = ({login: email, password}) => (dispatch, _getState, {api}) => (
  api.post(APIRoute.LOGIN, {email, password})
    .then(({data}) => {
      localStorage.setItem('token', data.token);
      return adaptUserToClient(data);
    })
    .then((data) => dispatch(ActionCreator.setUser(data)))
    .then(() => dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH)))
);

export const logout = () => (dispatch, _getState, {api}) => (
  api.delete(APIRoute.LOGOUT)
    .then(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    })
    .then(() => dispatch(ActionCreator.signOut()))
);

export const fetchActiveOffer = (id) => (dispatch, _getState, {api}) => {
  dispatch(ActionCreator.startLoading());
  api.get(`${APIRoute.HOTELS}/${id}`)
    .then(({data}) => adaptOfferToClient(data))
    .then((data) => dispatch(ActionCreator.setActiveOffer(data)));
};

export const fetchNearbyOffers = (id) => (dispatch, _getState, {api}) => (
  api.get(`${APIRoute.HOTELS}/${id}/${APIRoute.NEARBY}`)
    .then(({data}) => data.map((offer) => adaptOfferToClient(offer)))
    .then((data) => dispatch(ActionCreator.setNearbyOffers(data)))
);
