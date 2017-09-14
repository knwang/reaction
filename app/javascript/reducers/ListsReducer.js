function listsReducer(state = [], action) {
  if (action.type === 'FETCH_LISTS_SUCCESS') {
    return [
      ...state.filter(list => list.board_id !== action.boardId),
      ...action.lists.map(
        list => ({
          ...list,
          id: Number(list.id),
          board_id: Number(list.board_id)
        })
      )
    ];
  } else if (action.type === 'CREATE_LIST_SUCCESS') {
    return [
      ...state,
      {
        ...action.list,
        id: Number(action.list.id),
        board_id: Number(action.list.board_id)
      }
    ];
  } else {
    return state;
  }
}

export default listsReducer;
