export default function commentsReducer(state = [], action) {
  if (action.type === 'CREATE_COMMENT_SUCCESS') {
    return state.concat(action.comment);
  } else if (action.type === 'FETCH_CARD_SUCCESS') {
    const filteredState = state.filter(
      (comment) => comment.card_id !== action.card.id
    );

    return filteredState.concat(action.card.comments);
  } else if (action.type === 'FETCH_BOARD_SUCCESS') {
    let newComments = [];
    let filteredState = state;

    action.board.lists.forEach((list) => {
      list.cards.forEach((card) => {
        filteredState = filteredState.filter(
          (comment) => comment.card_id !== card.id
        )

        newComments = newComments.concat(card.comments);
      });
    });

    return filteredState.concat(newComments);
  } else {
    return state;
  }
}
