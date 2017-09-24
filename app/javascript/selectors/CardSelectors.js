export function getCardById(state, id) {
  return state.cards.find(card => card.id === id);
}

export function listCards(state, listId) {
  return state.cards.filter(card => card.list_id === listId);
}
