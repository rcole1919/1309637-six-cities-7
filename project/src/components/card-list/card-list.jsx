import React from 'react';
import Card from '../card/card';
import PropTypes from 'prop-types';
import {Offers} from '../../prop-types';
import {CardType} from '../../const';

function CardList({cards, cardType, onListItemHover}) {
  const getClassByType = (type) => {
    switch (type) {
      case CardType.MAIN:
        return 'cities__places-list places__list tabs__content';
      case CardType.FAVORITES:
        return 'favorites__places';
      case CardType.ROOM:
        return 'near-places__list places__list';
      default:
        return '';
    }
  };

  return (
    <div className={getClassByType(cardType)}>
      {cards.map((card) => <Card key={card.id} card={card} cardType={cardType} onListItemHover={onListItemHover} />)}
    </div>
  );
}

CardList.propTypes = {
  cards: Offers,
  cardType: PropTypes.string.isRequired,
  onListItemHover: PropTypes.func,
};

export default CardList;
