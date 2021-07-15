import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import Header from '../header/header';
import NotFound from '../not-found/not-found';
import Loading from '../loading/loading';
import ReviewForm from '../review-form/review-form';
import ReviewList from '../review-list/review-list';
import CardList from '../card-list/card-list';
import Map from '../map/map';
import {OfferItem, Offers} from '../../prop-types';
import {getRatingPercent} from '../../utils';
import {REVIEWS} from '../../mock/reviews';
import {MapType, CardType, AuthorizationStatus, MarkerType, MAX_NEARBY} from '../../const';
import {connect} from 'react-redux';
import {fetchActiveOffer} from '../../store/api-actions';
// import {ActionCreator} from '../../store/action';

function Room(props) {
  const cardId = props.match.params.id;
  const {isActiveLoaded, onfetchActiveOffer, activeOffer} = props;
  // const currentCard = props.cards.find((el) => el.id === Number(cardId));
  useEffect(() => {
    if (activeOffer === null || activeOffer.id !== Number(cardId)) {
      console.log('fetch');
      onfetchActiveOffer(cardId);
    }
  }, [cardId, onfetchActiveOffer, activeOffer]);

  if (!isActiveLoaded) {
    console.log('loading')
    return (
      <Loading />
    );
  }
  const currentCard = activeOffer;
  if (activeOffer === null) {
    return (
      <NotFound />
    );
  }

  const {
    images,
    isPremium,
    title,
    rating,
    bedrooms,
    maxAdults,
    type,
    price,
    goods,
    location,
    city,
    host: {avatarUrl, isPro, name},
    description,
  } = currentCard;

  const nearbyCards = props.cards
    .filter((el) => el.city.name === city.name && el.id !== Number(cardId))
    .slice(0, MAX_NEARBY);
  const points = nearbyCards.map((el) => ({...el.location, name: el.id}));

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {
                images.map((image, i) => (
                  <div key={`${i + 1}`} className="property__image-wrapper">
                    <img className="property__image" src={image} alt="Studio" />
                  </div>
                ))
              }
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {
                isPremium &&
                <div className="property__mark">
                  <span>Premium</span>
                </div>
              }
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {title}
                </h1>
                <button className="property__bookmark-button button" type="button">
                  <svg className="property__bookmark-icon" width={31} height={33}>
                    <use xlinkHref="#icon-bookmark" />
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: getRatingPercent(rating)}} />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {`${type[0].toUpperCase()}${type.slice(1)}`}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">€{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {
                    goods.map((el, i) => (
                      <li key={`${i + 1}`} className="property__inside-item">
                        {el}
                      </li>
                    ))
                  }
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="property__avatar user__avatar" src={avatarUrl} width={74} height={74} alt="Host avatar" />
                  </div>
                  <span className="property__user-name">
                    {name}
                  </span>
                  {
                    isPro &&
                    <span className="property__user-status">
                      Pro
                    </span>
                  }
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {description}
                  </p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <ReviewList reviews={REVIEWS} />
                {props.authorizationStatus === AuthorizationStatus.AUTH && <ReviewForm />}
              </section>
            </div>
          </div>
          <Map
            mapHeight={MapType.ROOM.height}
            className={MapType.ROOM.class}
            city={city.location}
            points={points}
            selectedPoint={location}
            markerType={MarkerType.STATIC}
          />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <CardList
              cards={nearbyCards}
              cardType={CardType.ROOM}
            />
          </section>
        </div>
      </main>
    </div>
  );
}

Room.propTypes = {
  cards: Offers,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }),
  authorizationStatus: PropTypes.string.isRequired,
  isActiveLoaded: PropTypes.bool.isRequired,
  onfetchActiveOffer: PropTypes.func.isRequired,
  activeOffer: OfferItem,
  // onStartLoading: PropTypes.func.isRequired,
  // onFinishLoading: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: state.authorizationStatus,
  isActiveLoaded: state.isActiveLoaded,
  activeOffer: state.activeOffer,
});

const mapDispatchToProps = (dispatch) => ({
  // onStartLoading() {
  //   dispatch(ActionCreator.startLoading());
  // },
  // onFinishLoading() {
  //   dispatch(ActionCreator.finishLoading());
  // },
  onfetchActiveOffer(id) {
    dispatch(fetchActiveOffer(id));
  },
});

export {Room};
export default connect(mapStateToProps, mapDispatchToProps)(Room);
