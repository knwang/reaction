export function getCardById(state, id) {
  return state.cards.find(card => card.id === id);
};
