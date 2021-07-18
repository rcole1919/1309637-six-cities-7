import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './components/app/app';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {createAPI} from './services/api';
import {ActionCreator} from './store/action';
import {composeWithDevTools} from 'redux-devtools-extension';
import {redirect} from './store/middlewares/redirect';
import {AuthorizationStatus} from './const';
import {reducer} from './store/reducer';

const api = createAPI(
  () => store.dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH)),
  () => store.dispatch(ActionCreator.finishLoading()),
);

export const store = createStore(reducer,
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument({api})),
    applyMiddleware(redirect),
  ),
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));
