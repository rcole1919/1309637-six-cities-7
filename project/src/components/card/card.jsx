import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {OfferItem} from '../../prop-types';
import {MAX_RATING, CardType, AppRoute} from '../../const';

function Card({card, cardType}) {
  const {host: {name}, isPremium, previewImage, price, rating, type} = card;

  const [offer, setOffer] = useState({
    isActive: false,
    isFavorite: false,
  });

  const premiumMark = isPremium && (
    <div className="place-card__mark">
      <span>Premium</span>
    </div>
  );

  const ratingWidth = `${Math.floor(rating) * 100 / MAX_RATING}%`;

  const {isFavorite} = offer;

  return (
    <article
      className={`${cardType === CardType.MAIN ? 'cities__place-card' : 'favorites__card'} place-card`}
      onMouseEnter={() => setOffer({
        ...offer,
        isActive: true,
      })}
      onMouseLeave={() => setOffer({
        ...offer,
        isActive: false,
      })}
    >
      {premiumMark}
      <div className={`${cardType === CardType.MAIN ? 'cities__image-wrapper' : 'favorites__image-wrapper'} place-card__image-wrapper`}>
        <a href="/#">
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place" />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button button ${isFavorite && 'place-card__bookmark-button--active'}`} type="button"
            onClick={() => setOffer({
              ...offer,
              isFavorite: !isFavorite,
            })}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: ratingWidth}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={AppRoute.ROOM}>{name}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

Card.propTypes = {
  card: OfferItem,
  cardType: PropTypes.string.isRequired,
};

export default Card;
