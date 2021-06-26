import React from 'react';
import PropTypes from 'prop-types';
import {CITIES} from '../../const';

function CityList({currentCity, onCityChange}) {
  return (
    <ul className="locations__list tabs__list">
      {
        CITIES.map((item) => (
          <li key={item} className="locations__item">
            <a
              className={`locations__item-link tabs__item${item === currentCity && ' tabs__item--active'}`}
              href="/"
              onClick={(evt) => {
                evt.preventDefault();
                onCityChange(item);
              }}
            >
              <span>{item}</span>
            </a>
          </li>
        ))
      }
    </ul>
  );
}

CityList.propTypes = {
  currentCity: PropTypes.string.isRequired,
  onCityChange: PropTypes.func.isRequired,
};

export default CityList;
