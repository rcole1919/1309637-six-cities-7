import React from 'react';
import {Link} from 'react-router-dom';
import Header from '../header/header';
import CardList from '../card-list/card-list';
import {Offers} from '../../prop-types';
import {CardType, AppRoute} from '../../const';

function Favorites({cards}) {
  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              <li className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <div className="locations__item-link">
                      <span>Amsterdam</span>
                    </div>
                  </div>
                </div>
                <CardList cards={cards} cardType={CardType.FAVORITES} />
              </li>
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to={AppRoute.MAIN}>
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width={64} height={33} />
        </Link>
      </footer>
    </div>
  );
}

Favorites.propTypes = {
  cards: Offers,
};

export default Favorites;
