function listsReducer(state = [], action) {
  if (action.type === 'FETCH_LISTS_SUCCESS') {
    return [
      ...state.filter(list => list.board_id !== action.boardId),
      ...action.lists
    ];
  } else if (action.type === 'CREATE_LIST_SUCCESS') {
    return state.concat(action.list);
  } else if (action.type === 'UPDATE_LIST_SUCCESS') {
    const { boardId, listId, updatedList } = action;

    return state.map(list => {
      if (list.board_id === boardId && list.id === listId) {
        return updatedList;
      } else {
        return list;
      }
    });
  } else {
    return state;
  }
}

export default listsReducer;
