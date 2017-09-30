export function getCardById(state, id) {
  return state.cards.find(card => card.id === id);
}

export function listCards(state, listId) {
  return state.cards.filter(card => !card.archived && card.list_id === listId);
}
