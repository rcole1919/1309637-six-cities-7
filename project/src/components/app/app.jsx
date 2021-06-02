import React from 'react';
import PropTypes from 'prop-types';
import Page from '../page/page';

function App({cards, placesCount}) {
  return (
    <Page cards={cards} placesCount={placesCount} />
  );
}

App.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ),
  placesCount :PropTypes.number.isRequired,
};

export default App;
