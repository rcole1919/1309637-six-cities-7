import React, {useEffect} from 'react';
import {Router as BrowserRouter, Switch, Route} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import Main from '../main/main';
import Loading from '../loading/loading';
import SignIn from '../sign-in/sign-in';
import Favorites from '../favorites/favorites';
import Room from '../room/room';
import NotFound from '../not-found/not-found';
import ServerError from '../server-error/server-error';
import {AppRoute, AuthorizationStatus} from '../../const';
import browserHistory from '../../browser-history';
import PrivateRoute from '../private-route/private-route';
import {fetchOffers, checkAuth} from '../../store/api-actions';
import {getLoadedDataStatus} from '../../store/main/selectors';
import {getAuthorizationStatus} from '../../store/user/selectors';

function App() {
  const isDataLoaded = useSelector(getLoadedDataStatus);
  const authorizationStatus = useSelector(getAuthorizationStatus);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
    dispatch(fetchOffers());
  }, [dispatch]);

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
        <Route exact path={AppRoute.SERVER_ERROR}>
          <ServerError />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
