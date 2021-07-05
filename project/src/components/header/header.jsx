import React from 'react';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';
import NavList from '../nav-list/nav-list';

function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link" to={AppRoute.MAIN}>
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width={81} height={41} />
            </Link>
          </div>
          <nav className="header__nav">
            <NavList />
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
