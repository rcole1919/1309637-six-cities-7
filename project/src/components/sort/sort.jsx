import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {SortType} from '../../const';

function Sort({currentSortType, onSortTypeClick}) {
  const [state, setState] = useState({
    isOpened: false,
  });

  const closePopup = () => {
    setState({
      isOpened: false,
    });
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex="0"
        onClick={() => {
          setState({
            isOpened: !state.isOpened,
          });
        }}
      >
        {currentSortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom${state.isOpened ? ' places__options--opened' : ''}`}>
        {
          Object.values(SortType).map((item) => (
            <li
              key={item}
              className={`places__option${item === currentSortType ? ' places__option--active' : ''}`}
              tabIndex="0"
              onClick={() => {
                onSortTypeClick(item);
                closePopup();
              }}
            >
              {item}
            </li>
          ))
        }
      </ul>
    </form>
  );
}

Sort.propTypes = {
  currentSortType: PropTypes.string.isRequired,
  onSortTypeClick: PropTypes.func.isRequired,
};

export default Sort;
