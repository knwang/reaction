export default function cardsReducer(state = [], action) {
  if (action.type === 'FETCH_BOARD_SUCCESS') {
    const lists = action.board.lists;
    let cards = [];
    lists.forEach(list => cards = cards.concat(list.cards));

    const newCardIds = cards.map(card => card.id);
    const otherCards = state.filter(card => newCardIds.indexOf(card.id) === -1);

    return otherCards.concat(cards);
  } else if (action.type === 'CREATE_CARD_SUCCESS') {
    return state.concat(action.card);
  } else if (action.type === 'FETCH_CARD_SUCCESS') {
    const excludedCards = state.filter(card => card.id !== action.card.id);
    return excludedCards.concat(action.card);
  } else if (action.type === 'UPDATE_CARD_SUCCESS') {
    return state.map(card => {
      if (card.id === action.card.id) return action.card;
      else return card;
    });
  } else {
    return state;
  }
};
