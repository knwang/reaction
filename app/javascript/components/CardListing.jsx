import React from 'react';

import ListCard from './ListCard';

const CardListing = props => (
  <div id="cards-container">
    {
      props.cards.map(card => (
        <ListCard key={card.id} card={card} />
      ))
    }
  </div>
);

export default CardListing;
