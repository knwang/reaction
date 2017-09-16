function listsReducer(state = [], action) {
  if (action.type === 'FETCH_LISTS_SUCCESS') {
    return [
      ...state.filter(list => list.board_id !== action.boardId),
      ...action.lists
    ];
  } else if (action.type === 'CREATE_LIST_SUCCESS') {
    return state.concat(action.list);
  } else {
    return state;
  }
}

export default listsReducer;
