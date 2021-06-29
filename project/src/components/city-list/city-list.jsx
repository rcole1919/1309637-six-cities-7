import React from 'react';
import PropTypes from 'prop-types';
import {CITIES} from '../../const';

function CityList({currentCity, onCityChange}) {
  return (
    <ul className="locations__list tabs__list">
      {
        CITIES.map((item) => (
          <li key={item} className="locations__item">
            <div
              style={{cursor: 'pointer'}}
              tabIndex="0"
              className={`locations__item-link tabs__item${item === currentCity ? ' tabs__item--active' : ''}`}
              onClick={(evt) => {
                evt.preventDefault();
                onCityChange(item);
              }}
            >
              <span>{item}</span>
            </div>
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
