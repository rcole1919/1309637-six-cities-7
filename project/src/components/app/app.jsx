import React, {useEffect} from 'react';
import {Router as BrowserRouter, Switch, Route} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Main from '../main/main';
import Loading from '../loading/loading';
import SignIn from '../sign-in/sign-in';
import Favorites from '../favorites/favorites';
import Room from '../room/room';
import NotFound from '../not-found/not-found';
import {AppRoute, AuthorizationStatus} from '../../const';
import {Offers} from '../../prop-types';
import browserHistory from '../../browser-history';
import PrivateRoute from '../private-route/private-route';
import {fetchOffers, checkAuth} from '../../store/api-actions';

function App({cards, isDataLoaded, authorizationStatus, init}) {

  useEffect(() => {
    init();
  }, [init]);

  if (authorizationStatus === AuthorizationStatus.UNKNOWN || !isDataLoaded) {
    return (
      <Loading />
    );
  }

  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route exact path={AppRoute.MAIN}>
          <Main />
        </Route>
        <Route exact path={AppRoute.SIGN_IN}>
          <SignIn />
        </Route>
        <PrivateRoute exact path={AppRoute.FAVORITES} render={(props) => <Favorites {...props} cards={cards} /> } />
        <Route exact path={AppRoute.ROOM}  render={(props) => <Room {...props} cards={cards} /> } />
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

App.propTypes = {
  cards: Offers,
  isDataLoaded: PropTypes.bool.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  init: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  cards: state.offers,
  isDataLoaded: state.isDataLoaded,
  authorizationStatus: state.authorizationStatus,
});

const mapDispatchToProps = (dispatch) => ({
  init() {
    dispatch(checkAuth());
    dispatch(fetchOffers());
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
