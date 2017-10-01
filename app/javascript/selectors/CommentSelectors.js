export function cardComments(state, cardId, sortFunction) {
  const comments = state.comments.filter(comment => comment.card_id === cardId);

  if (typeof sortFunction === 'function') {
    return comments.sort(sortFunction);
  } else {
    return comments;
  }
}
