function listsReducer(state = {}, action) {
  if (action.type === 'FETCH_LISTS_SUCCESS') {
    return {
      ...state,
      [action.boardId]: action.lists.map(
        list => ({ ...list, id: Number(list.id)})
      )
    };
  } else if (action.type === 'CREATE_LIST_SUCCESS') {
    return {
      ...state,
      [action.boardId]: (state[action.boardId] || []).concat(
        { ...action.list, id: Number(action.list.id) }
      )
    }
  } else {
    return state;
  }
}

export default listsReducer;
