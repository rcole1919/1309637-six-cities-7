import {APIRoute, AuthorizationStatus, MAX_REVIEWS, CardType, AppRoute} from '../const';
import {fillOffers, setUser, requireAuthorization, signOut, startLoading, setActiveOffer, setNearbyOffers, setReviews, finishLoading, toggleReviewUploading, toggleFavorite, toggleActiveFavorite, removeFavorite, toggleFavoriteLoading, fillFavoriteOffers, redirectToRoute} from './action';
import {adaptOfferToClient, adaptReviewToClient, adaptUserToClient} from '../services/api';

export const fetchOffers = () => (dispatch, _getState, {api}) => (
  api.get(APIRoute.HOTELS)
    .then(({data}) => data.map((offer) => adaptOfferToClient(offer)))
    .then((data) => dispatch(fillOffers(data)))
);

export const checkAuth = () => (dispatch, _getState, {api}) => (
  api.get(APIRoute.LOGIN)
    .then(({data}) => {
      localStorage.setItem('token', data.token);
      return adaptUserToClient(data);
    })
    .then((data) => dispatch(setUser(data)))
    .then(() => dispatch(requireAuthorization(AuthorizationStatus.AUTH)))
    .catch(() => {})
);

export const login = ({login: email, password}, getBadRequest, getRoomIdForBack) => (dispatch, _getState, {api}) => {
  const id = getRoomIdForBack();
  api.post(APIRoute.LOGIN, {email, password})
    .then(({data}) => {
      localStorage.setItem('token', data.token);
      return adaptUserToClient(data);
    })
    .then((data) => dispatch(setUser(data)))
    .then(() => dispatch(requireAuthorization(AuthorizationStatus.AUTH)))
    .then(() => id && dispatch(redirectToRoute(`${AppRoute.ROOM_LINK}${id}`)))
    .catch(() => getBadRequest());
};

export const logout = () => (dispatch, _getState, {api}) => (
  api.delete(APIRoute.LOGOUT)
    .then(() => {
      localStorage.removeItem('token');
    })
    .then(() => dispatch(signOut()))
);

export const fetchActiveOffer = (id) => (dispatch, _getState, {api}) => {
  dispatch(startLoading());

  const getActiveOffer = api.get(`${APIRoute.HOTELS}/${id}`)
    .then(({data}) => adaptOfferToClient(data))
    .then((data) => dispatch(setActiveOffer(data)));

  const getNearbyOffers = api.get(`${APIRoute.HOTELS}/${id}${APIRoute.NEARBY}`)
    .then(({data}) => data.map((offer) => adaptOfferToClient(offer)))
    .then((data) => dispatch(setNearbyOffers(data)));

  const getReviews = api.get(`${APIRoute.COMMENTS}/${id}`)
    .then(({data}) => data.map((review) => adaptReviewToClient(review)).slice(-MAX_REVIEWS).reverse())
    .then((data) => dispatch(setReviews(data)));

  Promise.all([getActiveOffer, getNearbyOffers, getReviews])
    .then(() => dispatch(finishLoading()));
};

export const uploadReview = (id, uploadingReview, clearForm) => (dispatch, _getState, {api}) => {
  dispatch(toggleReviewUploading());
  api.post(`${APIRoute.COMMENTS}/${id}`, uploadingReview)
    .then(({data}) => data.map((review) => adaptReviewToClient(review)).slice(-MAX_REVIEWS).reverse())
    .then((data) => {
      dispatch(setReviews(data));
      dispatch(toggleReviewUploading());
      clearForm();
    })
    .catch(() => {
      dispatch(toggleReviewUploading());
      clearForm();
    });
};

export const toggleOfferStatus = (id, status, cardType) => (dispatch, _getState, {api}) => {
  api.post(`${APIRoute.FAVORITE}/${id}/${status}`)
    .then(() => {
      dispatch(toggleFavorite(id));
      cardType === CardType.ROOM && dispatch(toggleActiveFavorite());
      cardType === CardType.FAVORITES && dispatch(removeFavorite(id));
    });
};

export const fetchFavoriteOffers = () => (dispatch, _getState, {api}) => {
  dispatch(toggleFavoriteLoading());
  api.get(APIRoute.FAVORITE)
    .then(({data}) => data.map((offer) => adaptOfferToClient(offer)))
    .then((data) => dispatch(fillFavoriteOffers(data)));
};
