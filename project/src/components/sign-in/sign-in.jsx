import React, {useRef, useState} from 'react';
import {Redirect} from 'react-router-dom';
import Header from '../header/header';
import {useSelector, useDispatch} from 'react-redux';
import {login} from '../../store/api-actions';
import {AppRoute, AuthorizationStatus, BACK_GET_PARAM} from '../../const';
import {getAuthorizationStatus} from '../../store/user/selectors';
import useQuery from '../../hooks/use-query';

function SignIn() {
  const authorizationStatus = useSelector(getAuthorizationStatus);

  const dispatch = useDispatch();
  const query = useQuery();

  const [isValid, setIsValid] = useState(false);
  const [isBadRequest, setIsBadRequest] = useState(false);
  const loginRef = useRef();
  const passwordRef = useRef();

  if (authorizationStatus === AuthorizationStatus.AUTH) {
    return (
      <Redirect to={AppRoute.MAIN} />
    );
  }

  const getBadRequest = () => setIsBadRequest(true);

  const getRoomIdForBack = () => query.get(BACK_GET_PARAM);

  const onLoginFormSubmit = (evt) => {
    evt.preventDefault();
    dispatch(login({
      login: loginRef.current.value,
      password: passwordRef.current.value,
    }, getBadRequest, getRoomIdForBack));
  };

  const onPasswordChange = (evt) => {
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
            <form onSubmit={onLoginFormSubmit} className="login__form form">
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
                  onChange={onPasswordChange}
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

export default SignIn;
