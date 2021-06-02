import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

const Setting = {
  CARDS: [
    {
      id: 1,
      name: 'Beautiful &amp; luxurious apartment at great location',
    },
    {
      id: 2,
      name: 'Wood and stone place',
    },
    {
      id: 3,
      name: 'Canal View Prinsengracht',
    },
    {
      id: 4,
      name: 'Nice, cozy, warm big bed apartment',
    },
    {
      id: 5,
      name: 'Wood and stone place',
    },
  ],
  PLACES_COUNT: 312,
};

ReactDOM.render(
  <React.StrictMode>
    <App cards={Setting.CARDS} placesCount={Setting.PLACES_COUNT} />
  </React.StrictMode>,
  document.getElementById('root'));
