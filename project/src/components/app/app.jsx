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
import browserHistory from '../../browser-history';
import PrivateRoute from '../private-route/private-route';
import {fetchOffers, checkAuth} from '../../store/api-actions';
import {getLoadedDataStatus} from '../../store/main/selectors';
import {getAuthorizationStatus} from '../../store/user/selectors';

function App({isDataLoaded, authorizationStatus, init}) {

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
        <PrivateRoute exact path={AppRoute.FAVORITES} render={(props) => <Favorites {...props} /> } />
        <Route exact path={AppRoute.ROOM}  render={(props) => <Room {...props} /> } />
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

App.propTypes = {
  isDataLoaded: PropTypes.bool.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  init: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isDataLoaded: getLoadedDataStatus(state),
  authorizationStatus: getAuthorizationStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  init() {
    dispatch(checkAuth());
    dispatch(fetchOffers());
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
