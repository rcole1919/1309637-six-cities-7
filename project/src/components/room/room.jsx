import React, {useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../header/header';
import NotFound from '../not-found/not-found';
import Loading from '../loading/loading';
import ReviewForm from '../review-form/review-form';
import ReviewList from '../review-list/review-list';
import CardList from '../card-list/card-list';
import Map from '../map/map';
import {OfferItem, Offers, Reviews} from '../../prop-types';
import {getRatingPercent} from '../../utils';
import {MapType, CardType, AuthorizationStatus, MarkerType, AppRoute} from '../../const';
import {connect} from 'react-redux';
import {fetchActiveOffer, toggleOfferStatus} from '../../store/api-actions';
import {getAuthorizationStatus} from '../../store/user/selectors';
import {getLoadedActiveRoomStatus, getActiveOffer, getNearbyOffers, getReviews} from '../../store/room/selectors';

function Room(props) {
  const hystory = useHistory();
  const cardId = props.match.params.id;
  const {isActiveLoaded, onFetchActiveOffer, activeOffer, nearbyOffers, reviews, authorizationStatus, onToggleFavorite} = props;
  useEffect(() => {
    if (activeOffer === null || activeOffer.id !== Number(cardId)) {
      onFetchActiveOffer(cardId);
    }
  }, [cardId, onFetchActiveOffer, activeOffer]);

  if (!isActiveLoaded) {
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
    isFavorite,
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

  const nearbyCards = nearbyOffers;
  const points = nearbyCards.length > 0 ? nearbyCards.map((el) => ({...el.location, name: el.id})) : null;

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
                <button
                  className={`property__bookmark-button button ${isFavorite && 'property__bookmark-button--active'}`}
                  type="button"
                  onClick={() => {
                    if (authorizationStatus !== AuthorizationStatus.AUTH) {
                      hystory.push(`${AppRoute.SIGN_IN}?back=${cardId}`);
                      return;
                    }
                    const newStatus = isFavorite ? 0 : 1;
                    onToggleFavorite(Number(cardId), newStatus);
                  }}
                >
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
                {
                  reviews.length > 0 &&
                  <ReviewList reviews={reviews} />
                }
                {
                  props.authorizationStatus === AuthorizationStatus.AUTH &&
                  <ReviewForm id={cardId} />
                }
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
        {
          nearbyCards.length > 0 &&
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>
              <CardList
                cards={nearbyCards}
                cardType={CardType.ROOM}
              />
            </section>
          </div>
        }
      </main>
    </div>
  );
}

Room.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }),
  authorizationStatus: PropTypes.string.isRequired,
  isActiveLoaded: PropTypes.bool.isRequired,
  onFetchActiveOffer: PropTypes.func.isRequired,
  activeOffer: OfferItem,
  nearbyOffers: Offers,
  reviews: Reviews,
  onToggleFavorite: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  isActiveLoaded: getLoadedActiveRoomStatus(state),
  activeOffer: getActiveOffer(state),
  nearbyOffers: getNearbyOffers(state),
  reviews: getReviews(state),
});

const mapDispatchToProps = (dispatch) => ({
  onFetchActiveOffer(id) {
    dispatch(fetchActiveOffer(id));
  },
  onToggleFavorite(id, status) {
    dispatch(toggleOfferStatus(id, status, CardType.ROOM));
  },
});

export {Room};
export default connect(mapStateToProps, mapDispatchToProps)(Room);
