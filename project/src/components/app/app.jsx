import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import PropTypes from 'prop-types';
import Main from '../main/main';
import SignIn from '../sign-in/sign-in';
import Favorites from '../favorites/favorites';
import Room from '../room/room';
import NotFound from '../not-found/not-found';
import {AppRoute} from '../../const';
import {Offers} from '../../prop-types';
import {OFFERS} from '../../mock/offers';

function App({cards, placesCount}) {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.MAIN}>
          <Main cards={cards} placesCount={placesCount} />
        </Route>
        <Route exact path={AppRoute.SIGN_IN}>
          <SignIn />
        </Route>
        <Route exact path={AppRoute.FAVORITES}>
          <Favorites cards={cards} />
        </Route>
        <Route exact path={AppRoute.ROOM}>
          <Room offer={OFFERS[0]} />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

App.propTypes = {
  cards: Offers,
  placesCount :PropTypes.number.isRequired,
};

export default App;
