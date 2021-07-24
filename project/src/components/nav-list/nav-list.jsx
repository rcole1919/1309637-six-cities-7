import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {AppRoute, AuthorizationStatus } from '../../const';
import {connect} from 'react-redux';
import {logout} from '../../store/api-actions';
import {authInfo} from '../../prop-types';
import {getAuthorizationStatus, getUser} from '../../store/user/selectors';

function NavList({onClick, authorizationStatus, user}) {
  const handleLogoutClick = () => {
    onClick();
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
          <div onClick={handleLogoutClick} tabIndex="0" style={{cursor: 'pointer'}} className="header__nav-link">
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

NavList.propTypes = {
  onClick: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  user: authInfo,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  user: getUser(state),
});

const mapDispatchToProps = (dispatch) => ({
  onClick() {
    dispatch(logout());
  },
});

export {NavList};
export default connect(mapStateToProps, mapDispatchToProps)(NavList);
