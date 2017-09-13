function listsReducer(state = [], action) {
  if (action.type === 'FETCH_LISTS_SUCCESS') {
    return action.lists;
  } else if (action.type === 'CREATE_LIST_SUCCESS') {
    return state.concat({ ...action.list, id: Number(action.list.id)});
  } else {
    return state;
  }
}

export default listsReducer;
