import React, {useRef, useState} from 'react';
import {Redirect} from 'react-router-dom';
import Header from '../header/header';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {login} from '../../store/api-actions';
import {AppRoute, AuthorizationStatus} from '../../const';

function SignIn({onSubmit, authorizationStatus, isBadRequest}) {
  const [isValid, setIsValid] = useState(false);
  const loginRef = useRef();
  const passwordRef = useRef();

  if (authorizationStatus === AuthorizationStatus.AUTH) {
    return (
      <Redirect to={AppRoute.MAIN} />
    );
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();

    onSubmit({
      login: loginRef.current.value,
      password: passwordRef.current.value,
    });
  };

  const handlePasswordChange = (evt) => {
    const {value} = evt.target;
    value.trim().length > 0 ? setIsValid(true) : setIsValid(false);
  };

  return (
    <div className="page page--gray page--login">
      <Header />
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form onSubmit={handleSubmit} className="login__form form">
              <div className="login__input-wrapper form__input-wrapper">
                <label htmlFor="login" className="visually-hidden">E-mail</label>
                <input
                  ref={loginRef}
                  id="login"
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label htmlFor="password" className="visually-hidden">Password</label>
                <input
                  ref={passwordRef}
                  id="password"
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  onChange={handlePasswordChange}
                />
              </div>
              <button disabled={!isValid} className="login__submit form__submit button" type="submit">{isBadRequest ? 'Enter correct data' : 'Sign in'}</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <div className="locations__item-link">
                <span>Amsterdam</span>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

SignIn.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  isBadRequest: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: state.authorizationStatus,
  isBadRequest: state.isBadRequest,
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit(authData) {
    dispatch(login(authData));
  },
});

export {SignIn};
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

