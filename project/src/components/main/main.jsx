import React, {useState} from 'react';
import Header from '../header/header';
import CardList from '../card-list/card-list';
import CityList from '../city-list/city-list';
import Sort from '../sort/sort';
import Map from '../map/map';
import {useSelector, useDispatch} from 'react-redux';
import {changeCity, sortOffers} from '../../store/action';
import {CardType, MapType, MarkerType} from '../../const';
import {sort} from '../../utils';
import {getOffers, getCity, getSortType} from '../../store/main/selectors';

function Main() {
  const city = useSelector(getCity);
  const sortType = useSelector(getSortType);
  const cards = useSelector(getOffers);

  const dispatch = useDispatch();

  const onCityChange = (currentCity) => {
    dispatch(changeCity(currentCity));
  };
  const onSortTypeClick = (currentSortType) => {
    dispatch(sortOffers(currentSortType));
  };
  const [selectedPoint, setSelectedPoint] = useState({});
  if (cards.length > 0) {
    const filtredCards = sort[sortType](cards.filter((el) => el.city.name === city));

    const points = filtredCards.map((el) => ({...el.location, name: el.id}));

    const onListItemHover = (listItemName) => {
      if (listItemName) {
        const currentPoint = points.find((point) => point.name === listItemName);
        setSelectedPoint(currentPoint);
        return;
      }
      setSelectedPoint({name: 0});
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
                <Sort currentSortType={sortType} onSortTypeClick={onSortTypeClick} />
                <CardList onListItemHover={onListItemHover} cards={filtredCards} cardType={CardType.MAIN} />
              </section>
              <div className="cities__right-section">
                <Map
                  mapHeight={MapType.MAIN.height}
                  className={MapType.MAIN.class}
                  city={filtredCards[0] && filtredCards[0].city.location}
                  points={points}
                  selectedPoint={selectedPoint}
                  markerType={MarkerType.DYNAMIC}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
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
          <div className="cities__places-container cities__places-container--empty container">
            <section className="cities__no-places">
              <div className="cities__status-wrapper tabs__content">
                <b className="cities__status">No places to stay available</b>
                <p className="cities__status-description">We could not find any property available at the moment in Dusseldorf</p>
              </div>
            </section>
            <div className="cities__right-section" />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Main;
