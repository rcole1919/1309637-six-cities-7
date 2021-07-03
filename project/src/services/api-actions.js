import {APIRoute} from '../const';
import {ActionCreator} from '../store/action';
import {adaptOfferToClient} from './api';

export const fetchOffers = () => (dispatch, _getState, api) => (
  api.get(APIRoute.HOTELS)
    .then(({data}) => data.map((offer) => adaptOfferToClient(offer)))
    .then((data) => dispatch(ActionCreator.fillOffersAction(data)))
);
