export function cardComments(state, cardId, sortFunction) {
  const comments = state.comments.filter(comment => comment.card_id === cardId);
  const actions = state.actions.filter(
    action => action.card_id === cardId
  ).map(
    action => ({...action, isAction: true})
  );

  if (typeof sortFunction === 'function') {
    return comments.concat(actions).sort(sortFunction);
  } else {
    return comments.concat(actions)
  }
}
