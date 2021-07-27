import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import Header from '../header/header';
import CardList from '../card-list/card-list';
import {CardType, AppRoute, CITIES} from '../../const';
import {fetchFavoriteOffers} from '../../store/api-actions';
import {useSelector, useDispatch} from 'react-redux';
import Loading from '../loading/loading';
import {getFavoriteOffers, getLoadedFavoriteOffersStatus} from '../../store/favorite/selectors';

function Favorites() {
  const cards = useSelector(getFavoriteOffers);
  const isFavoriteLoaded = useSelector(getLoadedFavoriteOffersStatus);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFavoriteOffers());
  }, [dispatch]);

  if (!isFavoriteLoaded) {
    return (
      <Loading />
    );
  }
  return (
    <div className="page">
      <Header />
      {
        cards.length > 0 ?
          <main className="page__main page__main--favorites">
            <div className="page__favorites-container container">
              <section className="favorites">
                <h1 className="favorites__title">Saved listing</h1>
                <ul className="favorites__list">
                  {
                    CITIES.map((city) => (
                      cards.filter((card) => card.city.name === city).length > 0 ?
                        <li key={city} className="favorites__locations-items">
                          <div className="favorites__locations locations locations--current">
                            <div className="locations__item">
                              <div className="locations__item-link">
                                <span>{city}</span>
                              </div>
                            </div>
                          </div>
                          <CardList cards={cards.filter((card) => card.city.name === city)} cardType={CardType.FAVORITES} />
                        </li>
                        : ''
                    ))
                  }
                </ul>
              </section>
            </div>
          </main>
          :
          <main className="page__main page__main--favorites page__main--favorites-empty">
            <div className="page__favorites-container container">
              <section className="favorites favorites--empty">
                <h1 className="visually-hidden">Favorites (empty)</h1>
                <div className="favorites__status-wrapper">
                  <b className="favorites__status">Nothing yet saved.</b>
                  <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
                </div>
              </section>
            </div>
          </main>
      }
      <footer className="footer container">
        <Link className="footer__logo-link" to={AppRoute.MAIN}>
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width={64} height={33} />
        </Link>
      </footer>
    </div>
  );
}

export default Favorites;
