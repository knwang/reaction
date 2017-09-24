export default function cardsReducer(state = [], action) {
  if (action.type === 'FETCH_BOARD_SUCCESS') {
    const lists = action.board.lists;
    let cards = [];
    lists.forEach(list => cards = cards.concat(list.cards));

    const newCardIds = cards.map(card => card.id);
    const otherCards = state.filter(card => newCardIds.indexOf(card.id) === -1);

    return otherCards.concat(cards);
  } else {
    return state;
  }
};
