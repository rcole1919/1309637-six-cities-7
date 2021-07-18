import {APIRoute, AuthorizationStatus, MAX_REVIEWS} from '../const';
import {ActionCreator} from './action';
import {adaptOfferToClient, adaptReviewToClient, adaptUserToClient} from '../services/api';

export const fetchOffers = () => (dispatch, _getState, {api}) => (
  api.get(APIRoute.HOTELS)
    .then(({data}) => data.map((offer) => adaptOfferToClient(offer)))
    .then((data) => dispatch(ActionCreator.fillOffers(data)))
);

export const checkAuth = () => (dispatch, _getState, {api}) => (
  api.get(APIRoute.LOGIN)
    .then(({data}) => {
      localStorage.setItem('token', data.token);
      return adaptUserToClient(data);
    })
    .then((data) => dispatch(ActionCreator.setUser(data)))
    .then(() => dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH)))
    .catch(() => {})
);

export const login = ({login: email, password}, getBadRequest) => (dispatch, _getState, {api}) => (
  api.post(APIRoute.LOGIN, {email, password})
    .then(({data}) => {
      localStorage.setItem('token', data.token);
      return adaptUserToClient(data);
    })
    .then((data) => dispatch(ActionCreator.setUser(data)))
    .then(() => dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH)))
    .catch(() => getBadRequest())
);

export const logout = () => (dispatch, _getState, {api}) => (
  api.delete(APIRoute.LOGOUT)
    .then(() => {
      localStorage.removeItem('token');
    })
    .then(() => dispatch(ActionCreator.signOut()))
);

export const fetchActiveOffer = (id) => (dispatch, _getState, {api}) => {
  dispatch(ActionCreator.startLoading());

  const getActiveOffer = api.get(`${APIRoute.HOTELS}/${id}`)
    .then(({data}) => adaptOfferToClient(data))
    .then((data) => dispatch(ActionCreator.setActiveOffer(data)));

  const getNearbyOffers = api.get(`${APIRoute.HOTELS}/${id}${APIRoute.NEARBY}`)
    .then(({data}) => data.map((offer) => adaptOfferToClient(offer)))
    .then((data) => dispatch(ActionCreator.setNearbyOffers(data)));

  const getReviews = api.get(`${APIRoute.COMMENTS}/${id}`)
    .then(({data}) => data.map((review) => adaptReviewToClient(review)).slice(-MAX_REVIEWS).reverse())
    .then((data) => dispatch(ActionCreator.setReviews(data)));

  Promise.all([getActiveOffer, getNearbyOffers, getReviews])
    .then(() => dispatch(ActionCreator.finishLoading()));
};

export const uploadReview = (id, uploadingReview, clearForm) => (dispatch, _getState, {api}) => {
  dispatch(ActionCreator.toggleReviewUploading());
  api.post(`${APIRoute.COMMENTS}/${id}`, uploadingReview)
    .then(({data}) => data.map((review) => adaptReviewToClient(review)).slice(-MAX_REVIEWS).reverse())
    .then((data) => {
      dispatch(ActionCreator.setReviews(data));
      dispatch(ActionCreator.toggleReviewUploading());
      clearForm();
    })
    .catch(() => {
      dispatch(ActionCreator.toggleReviewUploading());
      clearForm();
    });
};
