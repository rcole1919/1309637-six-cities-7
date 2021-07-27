import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Link, useHistory} from 'react-router-dom';
import {OfferItem} from '../../prop-types';
import {CardType, AppRoute, AuthorizationStatus} from '../../const';
import {getRatingPercent} from '../../utils';
import {useSelector, useDispatch} from 'react-redux';
import { toggleOfferStatus } from '../../store/api-actions';
import {getAuthorizationStatus} from '../../store/user/selectors';

function Card({card, cardType, onListItemHover}) {
  const {host: {name}, isPremium, isFavorite, previewImage, price, rating, type, id} = card;

  const authorizationStatus = useSelector(getAuthorizationStatus);

  const dispatch = useDispatch();
  const onToggleFavorite = (cardId, status, offerType) => {
    dispatch(toggleOfferStatus(cardId, status, offerType));
  };

  const [offer, setOffer] = useState({
    isActive: false,
  });

  const hystory = useHistory();

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
        onListItemHover && onListItemHover(id);
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
        <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place" />
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button button ${isFavorite && 'place-card__bookmark-button--active'}`} type="button"
            onClick={() => {
              if (authorizationStatus !== AuthorizationStatus.AUTH) {
                hystory.push(AppRoute.SIGN_IN);
                return;
              }
              const newStatus = isFavorite ? 0 : 1;
              onToggleFavorite(id, newStatus, cardType);
            }}
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
