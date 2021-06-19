import React, {useState} from 'react';
import Header from '../header/header';
import ReviewForm from '../review-form/review-form';
import ReviewList from '../review-list/review-list';
import CardList from '../card-list/card-list';
import Map from '../map/map';
import {OfferItem} from '../../prop-types';
import {getRatingPercent} from '../../utils';
import {REVIEWS} from '../../mock/reviews';
import {AMSTERDAM} from '../../mock/coord';
import {OFFERS} from '../../mock/offers';
import {MapType, CardType} from '../../const';

function Room({offer}) {
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
    host: {avatarUrl, isPro, name},
    description,
  } = offer;
  const [selectedPoint, setSelectedPoint] = useState({});

  const points = OFFERS.map((el) => ({...el.location, name: el.host.name}));

  const onListItemHover = (listItemName) => {
    const currentPoint = points.find((point) => point.name === listItemName);
    setSelectedPoint(currentPoint);
  };

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
                <ReviewForm />
              </section>
            </div>
          </div>
          <Map
            mapHeight={MapType.ROOM.height}
            className={MapType.ROOM.class}
            city={AMSTERDAM}
            points={points}
            selectedPoint={selectedPoint}
          />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <CardList
              cards={OFFERS}
              cardType={CardType.ROOM}
              onListItemHover={onListItemHover}
            />
          </section>
        </div>
      </main>
    </div>
  );
}

Room.propTypes = {
  offer: OfferItem,
};

export default Room;
