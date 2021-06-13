import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {OFFERS} from './mock/offers';

const Setting = {
  PLACES_COUNT: 312,
};

ReactDOM.render(
  <App cards={OFFERS} placesCount={Setting.PLACES_COUNT} />,
  document.getElementById('root'));
