import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Header from '../header/header';
import CardList from '../card-list/card-list';
import CityList from '../city-list/city-list';
import Map from '../map/map';
import {connect} from 'react-redux';
import {ActionCreator} from '../../store/action';
import {Offers} from '../../prop-types';
import {CardType, MapType} from '../../const';

function Main({cards, city, onCityChange}) {
  const [selectedPoint, setSelectedPoint] = useState({});

  const filtredCards = cards.slice().filter((el) => el.city.name === city);

  const points = filtredCards.map((el) => ({...el.location, name: el.host.name}));

  const onListItemHover = (listItemName) => {
    if (listItemName) {
      const currentPoint = points.find((point) => point.name === listItemName);
      setSelectedPoint(currentPoint);
      return;
    }
    setSelectedPoint({name: ''});
  };
  return (
    <div className="page page--gray page--main">
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CityList currentCity={city} onCityChange={onCityChange} />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{filtredCards.length} places to stay in {city}</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex="0">
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex="0">Popular</li>
                  <li className="places__option" tabIndex="0">Price: low to high</li>
                  <li className="places__option" tabIndex="0">Price: high to low</li>
                  <li className="places__option" tabIndex="0">Top rated first</li>
                </ul>
              </form>
              <CardList onListItemHover={onListItemHover} cards={filtredCards} cardType={CardType.MAIN} />
            </section>
            <div className="cities__right-section">
              <Map
                mapHeight={MapType.MAIN.height}
                className={MapType.MAIN.class}
                city={filtredCards[0] && filtredCards[0].city.location}
                points={points}
                selectedPoint={selectedPoint}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

Main.propTypes = {
  cards: Offers,
  city: PropTypes.string.isRequired,
  onCityChange: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  city: state.city,
  cards: state.offers,
});

const mapDispatchToProps = (dispatch) => ({
  onCityChange(currentCity) {
    dispatch(ActionCreator.changeCity(currentCity));
  },
});

export {Main};
export default connect(mapStateToProps, mapDispatchToProps)(Main);
