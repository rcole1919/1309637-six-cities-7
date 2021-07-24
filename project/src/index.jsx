import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './components/app/app';
import {createAPI} from './services/api';
import {requireAuthorization, finishLoading} from './store/action';
import {redirect} from './store/middlewares/redirect';
import {AuthorizationStatus} from './const';
import rootReducer from './store/root-reducer';
import {configureStore} from '@reduxjs/toolkit';

const api = createAPI(
  () => store.dispatch(requireAuthorization(AuthorizationStatus.NO_AUTH)),
  () => store.dispatch(finishLoading()),
);

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {api},
      },
    }).concat(redirect),
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));
