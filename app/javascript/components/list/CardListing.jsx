import React from 'react';

import ListCard from './ListCard';

const sortedCards = (cards) => {
  const copy = cards.slice();
  return copy.sort((a, b) => a.position - b.position);
};

const CardListing = props => (
  <div id="cards-container">
    {
      sortedCards(props.cards).map(card => (
        <ListCard key={card.id} card={card} />
      ))
    }
  </div>
);

export default CardListing;
