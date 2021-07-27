import React from 'react';
import {Link} from 'react-router-dom';
import {AppRoute, AuthorizationStatus } from '../../const';
import {useSelector, useDispatch} from 'react-redux';
import {logout} from '../../store/api-actions';
import {getAuthorizationStatus, getUser} from '../../store/user/selectors';

function NavList() {
  const user = useSelector(getUser);
  const authorizationStatus = useSelector(getAuthorizationStatus);

  const dispatch = useDispatch();
  const onSignOutClick = () => {
    dispatch(logout());
  };

  if (authorizationStatus === AuthorizationStatus.AUTH) {
    return (
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link className="header__nav-link header__nav-link--profile" to={AppRoute.FAVORITES}>
            <div className="header__avatar-wrapper user__avatar-wrapper">
            </div>
            <span className="header__user-name user__name">{user.email}</span>
          </Link>
        </li>
        <li className="header__nav-item">
          <div onClick={onSignOutClick} tabIndex="0" style={{cursor: 'pointer'}} className="header__nav-link">
            <span className="header__signout">Sign out</span>
          </div>
        </li>
      </ul>
    );
  }
  return (
    <ul className="header__nav-list">
      <li className="header__nav-item user">
        <Link className="header__nav-link header__nav-link--profile" to={AppRoute.SIGN_IN}>
          <div className="header__avatar-wrapper user__avatar-wrapper">
          </div>
          <span className="header__login">Sign in</span>
        </Link>
      </li>
    </ul>
  );
}

export default NavList;
