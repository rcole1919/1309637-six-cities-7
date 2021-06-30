import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {OfferItem} from '../../prop-types';
import {CardType, AppRoute} from '../../const';
import {getRatingPercent} from '../../utils';

function Card({card, cardType, onListItemHover}) {
  const {host: {name}, isPremium, previewImage, price, rating, type, id} = card;

  const [offer, setOffer] = useState({
    isActive: false,
    isFavorite: false,
  });
  const {isFavorite} = offer;

  const premiumMark = cardType === CardType.MAIN && isPremium && (
    <div className="place-card__mark">
      <span>Premium</span>
    </div>
  );

  const getClassByType = (cardTypeValue) => {
    switch (cardTypeValue) {
      case CardType.MAIN:
        return ['cities__place-card', 'cities__image-wrapper'];
      case CardType.FAVORITES:
        return ['cities__image-wrapper', 'favorites__image-wrapper'];
      case CardType.ROOM:
        return ['near-places__card', 'near-places__image-wrapper'];
      default:
        return ['', ''];
    }
  };
  const [articleClass, wrapperClass] = getClassByType(cardType);

  return (
    <article
      className={`${articleClass} place-card`}
      onMouseEnter={() => {
        setOffer({
          ...offer,
          isActive: true,
        });
        onListItemHover && onListItemHover(name);
      }}
      onMouseLeave={() => {
        setOffer({
          ...offer,
          isActive: false,
        });
        onListItemHover && onListItemHover();
      }}
    >
      {premiumMark}
      <div className={`${wrapperClass} place-card__image-wrapper`}>
        <Link to={`${AppRoute.ROOM_LINK}${id}`}>
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place" />
        </Link>
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
            <span style={{width: getRatingPercent(rating)}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.ROOM_LINK}${id}`}>{name}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

Card.propTypes = {
  card: OfferItem,
  cardType: PropTypes.string.isRequired,
  onListItemHover: PropTypes.func,
};

export default Card;
