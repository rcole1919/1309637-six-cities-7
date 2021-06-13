import React from 'react';
import Card from '../card/card';
import PropTypes from 'prop-types';
import {Offers} from '../../prop-types';
import {CardType} from '../../const';

function CardList({cards, cardType}) {
  return (
    <div className={cardType === CardType.MAIN ? 'cities__places-list places__list tabs__content' : 'favorites__places'}>
      {cards.map((card) => <Card key={card.id} card={card} cardType={cardType} />)}
    </div>
  );
}

CardList.propTypes = {
  cards: Offers,
  cardType: PropTypes.string.isRequired,
};

export default CardList;
