import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {createAPI} from './services/api';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import App from './components/app/app';
import {reducer} from './store/reducer';
import {ActionCreator} from './store/action';
import {AuthorizationStatus} from './const';
import {fetchOffers, checkAuth} from './store/api-actions';
import {redirect} from './store/middlewares/redirect';
import NotFound from './components/not-found/not-found';

const api = createAPI(
  () => store.dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH)),
  () => store.dispatch(ActionCreator.setBadRequest(true)),
  () => <NotFound />,
);

const store = createStore(reducer,
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument({api})),
    applyMiddleware(redirect),
  ),
);

store.dispatch(checkAuth());
store.dispatch(fetchOffers());
const user = localStorage.getItem('user');
if (user) {
  store.dispatch(ActionCreator.setUser(JSON.parse(user)));
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));
